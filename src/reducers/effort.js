import { map as _map, find as _find } from 'lodash';

const effortCalc = (state = {}, action) => {
  switch (action.type) {
    case 'PROJECT_EFFORT_UPDATED': {
      const { effort } = action;
      const totals = _map(effort.total, (total) => {
        const latest = _find(
          effort.latest,
          (project) => project.id === total.id,
        );
        const retVal = {
          name: total.id,
          totalData: total.data,
        };

        if (latest) {
          retVal.latestData = latest.data;
        }
        return retVal;
      });
      return { ...state, effort: totals };
    }

    default: {
      return state;
    }
  }
};

export default effortCalc;
