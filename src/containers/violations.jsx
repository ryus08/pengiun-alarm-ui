import { connect } from 'react-redux';
import TheComponent from '../components/local/violations';

const mapStateToProps = (state) => ({
  violations: state.production.violations,
  error: state.production.error,
  active: state.userPreferences.nrApiKey,
});

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
