import { connect } from 'react-redux';
import TheComponent from '../../components/local/groupsearch';

const mapStateToProps = (state) => ({
  groups: state.configEdit.gitlab.groups,
  disabled: state.configEdit.name === undefined,
});

const mapDispatchToProps = (dispatch) => ({
  update: (data) => {
    dispatch({ type: 'SET_GITLAB_GROUPS', data });
  },
});

const retVal = connect(mapStateToProps, mapDispatchToProps)(TheComponent);

export default retVal;
