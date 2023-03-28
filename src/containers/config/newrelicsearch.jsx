import { connect } from 'react-redux';
import TheComponent from '../../components/local/newrelicsearch';

const mapStateToProps = (state) => ({
  policies: state.configEdit.newrelic.policies,
  // the field is active if you dont have new relic access, or if there is no config
  noTeam: state.configEdit.name === undefined,
  nrApiKey: state.userPreferences.nrApiKey,
});

const mapDispatchToProps = (dispatch) => ({
  update: (data) => {
    dispatch({ type: 'SET_NEWRELIC', data });
  },
});

const retVal = connect(mapStateToProps, mapDispatchToProps)(TheComponent);

export default retVal;
