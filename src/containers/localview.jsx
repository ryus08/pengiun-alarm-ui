import { connect } from 'react-redux';
import TheComponent from '../components/local/localview';

const mapStateToProps = (state, ownProps) => ({
  newAward: state.achievements.justWon,
  showSelf: state.userPreferences.gitLabUsername !== undefined,
  topColor: state.userPreferences.topColor,
  bottomColor: state.userPreferences.bottomColor,
  startPage: ownProps.startPage,
  noConfig: ownProps.noConfig,
});

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
