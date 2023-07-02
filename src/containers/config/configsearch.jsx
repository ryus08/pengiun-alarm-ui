import { connect } from 'react-redux';
import TheComponent from '../../components/local/configsearch';
import { loadConfig } from '../../actioncreators/config';

const mapStateToProps = (state) => ({
  config: {
    label: state.configEdit.name,
  },
  configs: state.configEdit.configs,
});

const mapDispatchToProps = (dispatch) => ({
  load: (name) => {
    dispatch(loadConfig({ name }));
  },
  reset: () => {
    dispatch(dispatch({ type: 'EDIT_CONFIGURATION_RESET' }));
  },
});

const retVal = connect(mapStateToProps, mapDispatchToProps)(TheComponent);

export default retVal;
