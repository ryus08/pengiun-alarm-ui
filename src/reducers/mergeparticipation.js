import { filter as _filter } from 'lodash';
import MergeStats from '../pollers/mergestats';

const mergeParticipation = (
  state = {
    mergeStats: [],
    teamStats: [],
    recentDeployments: [],
    loading: true,
  },
  action,
) => {
  switch (action.type) {
    case 'MERGE_STATS_UPDATED': {
      return {
        ...state,
        loading: false,
        mergeStats: action.merges.mergeStats,
        teamStats: action.merges.teamStats,
      };
    }

    case 'MERGES_UPDATED': {
      const { merges, numberOfDays } = action.data;

      const d = new Date();
      d.setDate(d.getDate() - numberOfDays);

      const current = new MergeStats({
        merges: _filter(merges, (merge) => merge.created_at > d.toJSON()),
        days: numberOfDays,
      });

      const old = new MergeStats({ merges, days: numberOfDays * 2 });

      return {
        ...state,
        loading: false,
        mergeStats: current.totalScores(),
        teamStats: [
          {
            name: 'Comment Rate',
            type: 'comments',
            current: current.teamCommentRate(),
            previous: old.teamCommentRate(),
          },
          {
            name: 'Merge Rate',
            type: 'merges',
            current: current.mergeRate(),
            previous: old.mergeRate(),
          },
          {
            name: 'Merge Time (hours)',
            type: 'merges',
            current: current.mergeTime(),
            previous: old.mergeTime(),
            golf: true,
          },
        ],
      };
    }
    default: {
      return state;
    }
  }
};

export default mergeParticipation;
