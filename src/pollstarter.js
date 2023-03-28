import pollConfig from './actioncreators/pollconfig';
import pollMergeStats from './actioncreators/pollmergestats';
import pollNewRelic from './actioncreators/pollnewrelic';
import pollDeployments from './actioncreators/polldeployments';
import pollPenguinConfig from './actioncreators/penguinpoll/config';
import pollPenguinMergeStats from './actioncreators/penguinpoll/mergestats';
import pollPenguinDeployments from './actioncreators/penguinpoll/deployments';
import userSettings from './usersettings';
import pollApprovalActivity from './actioncreators/penguinpoll/approvalactivity';
import pollCommentActivity from './actioncreators/penguinpoll/commentactivity';
import pollMergeActivity from './actioncreators/penguinpoll/mergeactivity';
import pollAchievements from './actioncreators/penguinpoll/achievements';
import pollProjectEffort from './actioncreators/penguinpoll/effort';
import pollTeamActivity from './actioncreators/penguinpoll/teamactivity';
import { getOpinions } from './actioncreators/opinions';

export default function pollStarter({ store }) {
  if (!userSettings.noConfig) {
    if (userSettings.penguinClient) {
      store.dispatch(pollPenguinConfig(userSettings));
      store.dispatch(pollPenguinMergeStats(userSettings));
      store.dispatch(pollPenguinDeployments(userSettings));
      store.dispatch(pollApprovalActivity(userSettings));
      store.dispatch(pollCommentActivity(userSettings));
      store.dispatch(pollMergeActivity(userSettings));
      store.dispatch(pollAchievements(userSettings));
      store.dispatch(pollTeamActivity(userSettings));
      store.dispatch(pollProjectEffort(userSettings));
      store.dispatch(getOpinions(userSettings));
    } else {
      store.dispatch(pollConfig(userSettings));
      store.dispatch(pollMergeStats(userSettings));
      store.dispatch(pollDeployments(userSettings));
    }
    store.dispatch(pollNewRelic(userSettings));
  }
}
