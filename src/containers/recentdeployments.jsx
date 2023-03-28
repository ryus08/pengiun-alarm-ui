import { connect } from 'react-redux';
import Deployments from '../components/deploymentfeed';

const mapStateToProps = (state, ownProps) => ({
  deployments: state.deployments.deployments,
  loading: state.deployments.loading,
  size: ownProps.size,
});

const retVal = connect(mapStateToProps)(Deployments);

export default retVal;
