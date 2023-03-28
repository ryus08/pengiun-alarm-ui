import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import TheComponent from '../../components/local/configactions';
import {
  updateConfig,
  deleteConfig,
  addNewConfig,
} from '../../actioncreators/config';

const mapStateToProps = (state) => {
  const messageText = state.configEdit.error
    ? _get(state, 'configEdit.error.message', 'Unknown error')
    : 'Update Successful';

  return {
    updating: state.configEdit.updating,
    messageText,
    disabled: state.configEdit.name === undefined,
  };
};

const mapDispatchToProps = (dispatch) => ({
  update: () => {
    dispatch(updateConfig());
  },
  deleteConfig: () => {
    dispatch(deleteConfig());
  },
  addNew: (name) => {
    dispatch(addNewConfig(name));
  },
});

const retVal = connect(mapStateToProps, mapDispatchToProps)(TheComponent);

export default retVal;
