import { connect } from 'react-redux';
import prdLayer from '../components/tv/prdlayer';

const mapStateToProps = (state) => ({
  violations: state.production.violations,
  error: state.production.error,
  active: state.userPreferences.nrApiKey,
});

const retVal = connect(mapStateToProps)(prdLayer);

export default retVal;
