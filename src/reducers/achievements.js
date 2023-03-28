const achievementReducer = (state = { achievements: [] }, action) => {
  switch (action.type) {
    case 'ACHIEVEMENTS_UPDATED': {
      const isYours = ({ achievements, username }) => {
        let retVal = false;
        achievements.forEach((achievement) => {
          achievement.winners.forEach((winner) => {
            winner.isYou = winner.user.username === username;
            // the 28th day is today
            if (winner.isYou && winner.dateIndex === 28) {
              retVal = true;
            }
          });
        });
        return retVal;
      };

      const justWon = isYours(action);

      return { ...state, achievements: action.achievements, justWon };
    }

    default: {
      return state;
    }
  }
};

export default achievementReducer;
