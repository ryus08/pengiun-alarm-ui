import { connect } from 'react-redux';
import { filter as _filter, find as _find, get as _get } from 'lodash';
import TheComponent from '../../components/local/userpreferences';
import { setUserPreferences } from '../../actioncreators/userpreferences';

const mapStateToProps = (state) => {
  const startDate = 28;
  const youToday = (achievement) =>
    _filter(
      achievement.winners,
      (winner) =>
        winner.user.username === state.userPreferences.gitLabUsername &&
        winner.dateIndex === startDate,
    ).length;

  const statsToday = (dataSet, date) => {
    const name = _get(
      _find(
        dataSet.contributors,
        (contrib) => contrib.username === state.userPreferences.gitLabUsername,
      ),
      'name',
    );
    if (date === 0) {
      return _get(dataSet.data[date], name, 0);
    }
    return (
      _get(dataSet.data[date], name, 0) - _get(dataSet.data[date - 1], name, 0)
    );
  };

  const yourActivityToday = (activity) => ({
    comments: statsToday(activity.comments, startDate),
    merges: statsToday(activity.merges, startDate),
    approvals: statsToday(activity.approvals, startDate),
  });

  const yourActivityThisMonth = (activity) => {
    const data = [];
    for (let i = 0; i <= startDate; i += 1) {
      const now = new Date();
      const dateOffset = 24 * 60 * 60 * 1000 * (28 - i);
      data.push({
        comments: statsToday(activity.comments, i),
        merges: statsToday(activity.merges, i),
        approvals: statsToday(activity.approvals, i),
        date: new Date(now.getTime() - dateOffset),
      });
    }

    return data;
  };

  return {
    gitLabUsername: state.userPreferences.gitLabUsername,
    nrApiKey: state.userPreferences.nrApiKey,
    achievements: _filter(state.achievements.achievements, (achievement) =>
      youToday(achievement),
    ),
    activity: yourActivityToday(state.activity),
    monthActivity: yourActivityThisMonth(state.activity),
    topColor: state.userPreferences.topColor,
    bottomColor: state.userPreferences.bottomColor,
  };
};

const mapDispatchToProps = (dispatch) => ({
  update: (data) => {
    dispatch(setUserPreferences(data));
  },
});

const retVal = connect(mapStateToProps, mapDispatchToProps)(TheComponent);

export default retVal;
