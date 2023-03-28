import { connect } from 'react-redux';
import TheComponent from '../components/local/services';

const mapStateToProps = (state) => ({
  projectStats: state.deployments.projectStats,
  loading: state.deployments.loading,
});

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
