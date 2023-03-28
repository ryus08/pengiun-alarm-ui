import { connect } from 'react-redux';
import TheComponent from '../components/local/deploymenttimeline';

const mapStateToProps = (state) => ({
  history: state.deployments.history,
});

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
