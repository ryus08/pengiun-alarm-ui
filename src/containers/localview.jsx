import { connect } from 'react-redux';
import TheComponent from '../components/local/localview';
import {
  setUserGitProvider,
  deleteUserGitProvider,
} from '../actioncreators/userpreferences';

const mapStateToProps = (state, ownProps) => ({
  newAward: state.achievements.justWon,
  showSelf: state.userPreferences.gitLabUsername !== undefined,
  gitProvider: state.userPreferences.gitProvider,
  topColor: state.userPreferences.topColor,
  bottomColor: state.userPreferences.bottomColor,
  startPage: ownProps.startPage,
  noConfig: ownProps.noConfig,
});

const mapDispatchToProps = (dispatch) => ({
  setUserGitProvider: (providerName, data) => {
    dispatch(setUserGitProvider(providerName, data));
  },
  // TODO: For some reason, setUserGitProvider reloads the state, but deleteUserGitProvider doesn't. Maybe setUserGitProvider purely does because of redirects
  deleteUserGitProvider: () => {
    dispatch(deleteUserGitProvider());
  },
});
const retVal = connect(mapStateToProps, mapDispatchToProps)(TheComponent);

export default retVal;
