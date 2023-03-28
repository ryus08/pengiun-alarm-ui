import { get as _get, uniq as _uniq, find as _find, map as _map } from 'lodash';

const normalize = (activity) => {
  const contributors = () => {
    const users = _map(activity, (user) => ({
      name: user.user.name,
      username: user.user.username,
    }));
    return _map(_uniq(_map(users, (user) => JSON.stringify(user))), (str) =>
      JSON.parse(str),
    );
  };

  const contribs = contributors();
  const data = [];

  // populate missing values with 0
  for (let i = 0; i <= 28; i += 1) {
    const row = {
      dateIndex: i,
    };
    data.push(row);
    contribs.forEach((contrib) => {
      const userActivity = _find(
        activity,
        (entry) => entry.dateIndex === i && contrib.name === entry.user.name,
      );
      const start = i > 0 ? data[i - 1][contrib.name] : 0;
      row[contrib.name] = start + _get(userActivity, 'count', 0);
    });
  }

  return {
    contributors: contribs,
    data,
  };
};

const activity = (
  state = {
    comments: {
      contributors: [],
      data: [],
    },
    approvals: {
      contributors: [],
      data: [],
    },
    merges: {
      contributors: [],
      data: [],
    },
    team: {
      contributors: [],
      data: [],
    },
  },
  action,
) => {
  switch (action.type) {
    case 'APPROVAL_ACTIVITY_UPDATED': {
      return { ...state, approvals: normalize(action.approvals) };
    }

    case 'MERGE_ACTIVITY_UPDATED': {
      return { ...state, merges: normalize(action.merges) };
    }

    case 'COMMENT_ACTIVITY_UPDATED': {
      return { ...state, comments: normalize(action.comments) };
    }

    case 'TEAM_ACTIVITY_UPDATED': {
      return {
        ...state,
        team: {
          data: action.teamData,
          contributors: [
            { name: 'mergeRate' },
            { name: 'mergeTime' },
            { name: 'approvalTime' },
            { name: 'commentRate' },
          ],
        },
      };
    }

    default: {
      return state;
    }
  }
};

export default activity;
