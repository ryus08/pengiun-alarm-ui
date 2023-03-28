import moment from 'moment-business-time';
import {
  map as _map,
  filter as _filter,
  flatMap as _flatMap,
  get as _get,
  orderBy as _orderBy,
  meanBy as _meanBy,
  mapValues as _mapValues,
  concat as _concat,
  forEach as _forEach,
  uniqWith as _uniqWith,
  assign as _assign,
  assignWith as _assignWith,
  isEqual as _isEqual,
  forIn as _forIn,
  pickBy as _pickBy,
  countBy as _countBy,
} from 'lodash';

class MergeStats {
  constructor({ merges, days }) {
    this.merges = merges;
    this.days = days;
    moment.locale('en', {
      workinghours: {
        0: null,
        1: ['08:30:00', '17:30:00'],
        2: ['08:30:00', '17:30:00'],
        3: ['08:30:00', '17:30:00'],
        4: ['08:30:00', '17:30:00'],
        5: ['08:30:00', '17:30:00'],
        6: null,
      },
      holidays: ['2017-11-23', '2017-11-24', '2017-12-24', '2017-12-25'],
    });
  }

  comments() {
    return _flatMap(this.merges, (merge) => merge.comments);
  }

  merged() {
    return _filter(this.merges, (merge) => merge.state === 'merged');
  }

  mergeTime() {
    let mergeTimes = _map(this.merged(), (merge) => {
      merge.mergeDiff =
        moment(merge.updated_at).workingDiff(
          moment(merge.created_at),
          'minutes',
        ) / 60;
      return merge;
    });

    mergeTimes = _orderBy(mergeTimes, 'mergeDiff');

    return _meanBy(mergeTimes, 'mergeDiff');
  }

  mergeRate() {
    return this.merged().length / this.days;
  }

  commentScores() {
    const allComments = this.comments();
    const commentRawScores = _countBy(allComments, (comment) =>
      _get(comment, 'author.id'),
    );
    return _mapValues(commentRawScores, (score) => ({
      raw: score,
      score: (score / allComments.length) * 50,
    }));
  }

  approved() {
    return _filter(this.merges, (merge) => !merge.approvals_before_merge);
  }

  approvalScores() {
    const approved = this.approved();
    const allApprovals = _flatMap(approved, (merge) =>
      _get(merge, 'approvers.approved_by', []),
    );
    const approvalRawScores = _countBy(allApprovals, (approval) =>
      _get(approval, 'user.id'),
    );
    return _mapValues(approvalRawScores, (score) => ({
      raw: score,
      score: (score / approved.length) * 50,
    }));
  }

  people() {
    if (this.peopleValue) {
      return this.peopleValue;
    }

    const retVal = {};
    const authors = _uniqWith(
      _map(this.merges, (merge) => ({
        id: merge.author.id,
        avatar_url: merge.author.avatar_url,
      })),
      _isEqual,
    );

    const allComments = this.comments();
    const commentors = _uniqWith(
      _map(allComments, (comment) => ({
        id: comment.author.id,
        avatar_url: comment.author.avatar_url,
      })),
      _isEqual,
    );

    const approved = _filter(
      this.merges,
      (merge) => !merge.approvals_before_merge,
    );
    const allApprovals = _flatMap(approved, (merge) =>
      _get(merge, 'approvers.approved_by', []),
    );

    const approvers = _uniqWith(
      _map(allApprovals, (approval) => ({
        id: approval.user.id,
        avatar_url: approval.user.avatar_url,
      })),
      _isEqual,
    );

    const people = _concat(authors, commentors, approvers);

    _forEach(people, (person) => {
      retVal[person.id] = person;
    });

    this.peopleValue = retVal;
    return retVal;
  }

  authors() {
    return _countBy(this.merges, (merge) => _get(merge, 'author.id'));
  }

  teamCommentRate() {
    return this.comments().length / this.merges.length;
  }

  totalScores() {
    const people = this.people();
    const commentScores = this.commentScores();
    const approvalScores = this.approvalScores();
    const authors = this.authors();

    let scores = _assign({}, people);

    _assignWith(scores, authors, (score, author) => ({
      score: 0,
      avatar_url: score.avatar_url,
      authored: author || 0,
      participated: this.merges.length - (author || 0),
    }));

    // then add the approval score
    _assignWith(scores, approvalScores, (score, approvalScore) => ({
      approvals: approvalScore.raw,
      score: score.score + approvalScore.score,
      avatar_url: score.avatar_url,
      authored: score.authored,
      participated: score.participated,
    }));

    // sum up both kinds of scores
    _assignWith(scores, commentScores, (score, comment) => ({
      score: score.score + comment.score,
      comments: comment.raw,
      approvals: score.approvals,
      avatar_url: score.avatar_url,
      authored: score.authored,
      participated: score.participated,
    }));

    scores = _map(scores, (score) => {
      score.score /= score.participated;
      return score;
    });

    scores = _pickBy(scores, (score) => score.score);

    // put it back together with the avatar
    let retVal = [];
    _forIn(scores, (value, key) => {
      retVal.push({ id: key, data: value, avatar_url: value.avatar_url });
    });

    retVal = _orderBy(retVal, 'data.score', 'desc');

    return retVal;
  }
}

export default MergeStats;
