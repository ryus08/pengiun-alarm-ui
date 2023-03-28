import {
  map as _map,
  sortBy as _sortBy,
  filter as _filter,
  partition as _partition,
  some as _some,
  get as _get,
  find as _find,
  maxBy as _maxBy,
} from 'lodash';

const parseActive = ({ active, username }) => {
  const activeReviewed = _map(active, (merge) => {
    merge.reviewed = merge.author.username === username;
    return merge;
  });

  const toReview = _filter(
    activeReviewed,
    (merge) =>
      !merge.reviewed &&
      !_some(
        merge.approvers.approved_by,
        (approver) => _get(approver, 'user.username') === username,
      ),
  );
  const partitioned = _partition(
    activeReviewed,
    (merge) => merge.approvers.approvals_left === 0,
  );

  const computeLastChange = (merge) => {
    const commits = _filter(
      merge.systemComments,
      (comment) => comment.type === null && comment.body.startsWith('added '),
    );

    return _get(_maxBy(commits, 'created_at'), 'created_at');
  };

  const computeUrgency = (merge) => {
    let urgency = 0;

    // if the user has made a comment, but there's been changes
    // we'd like them to look at those changes, slightly more than
    // changes post-approval with the assumption that those changes
    // are possibly because they asked for them
    if (merge.updates.sinceComment) {
      urgency += 2;
    } else if (merge.updates.sinceApproval) {
      urgency += 3;
    }

    // but if they haven't approved at all, that's far more urgent
    if (!merge.userApproved && !merge.isAuthor) {
      urgency += 5;
    }

    // if you can merge it, you should really take care of it!
    if (merge.youCanMerge) {
      urgency += 6;
    }

    // if the merge request has problems, it becomes more urgent whether you've
    // approved it or not
    if (_get(merge, 'prediction.Prediction.predictedLabel') === 'bad') {
      urgency += 3;
    }
    return urgency;
  };

  const allMerges = _map(active, (merge) => {
    merge.userApproved = _find(
      merge.approvers.approved_by,
      (approver) => _get(approver, 'user.username') === username,
    );
    merge.isAuthor = merge.author.username === username;
    merge.youCanMerge = merge.isAuthor && merge.approvers.approvals_left === 0;
    merge.lastChange = computeLastChange(merge);
    merge.yourComments = _sortBy(
      _filter(
        merge.comments,
        (comment) => comment.author.username === username && !merge.isAuthor,
      ),
      'created_at',
    ).reverse();

    merge.updates = {
      sinceApproval:
        merge.userApproved && merge.lastChange > merge.userApproved.approved_at,
      sinceComment:
        merge.lastChange > _get(merge, 'yourComments[0].created_at'),
    };

    merge.urgency = computeUrgency(merge);
    return merge;
  });

  return {
    toReview: _sortBy(toReview, 'updated_at').reverse(),
    needsApproval: _sortBy(partitioned[1], 'updated_at').reverse(),
    canMerge: _sortBy(partitioned[0], 'updated_at').reverse(),
    allMerges: _sortBy(
      _sortBy(allMerges, 'updated_at').reverse(),
      'urgency',
    ).reverse(),
  };
};

const openMerge = (
  state = {
    mergeSets: {
      toReview: [],
      needsApproval: [],
      canMerge: [],
      recent: [],
      allMerges: [],
    },
    loading: true,
  },
  action,
) => {
  switch (action.type) {
    case 'MERGE_STATS_UPDATED': {
      const { active } = action.merges;
      const { username } = action;
      const mergeSets = parseActive({ active, username });
      mergeSets.recent = action.merges.recent;

      return { ...state, mergeSets, loading: false };
    }

    case 'MERGES_UPDATED': {
      const { merges } = action.data;
      const { username } = action;
      const active = _filter(
        merges,
        (merge) => !merge.work_in_progress && merge.state !== 'merged',
      );
      const mergeSets = parseActive({ active, username });
      mergeSets.recent = action.merges.recent;

      return { ...state, mergeSets, loading: false };
    }
    default: {
      return state;
    }
  }
};

export default openMerge;
