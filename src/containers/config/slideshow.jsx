import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import TheComponent from '../../components/local/slideshow';

const mapStateToProps = (state) => ({
  tags: state.configEdit.slideshow.youtube,
  disabled: state.configEdit.name === undefined,
  alwaysShowLeaders: _get(state, 'configEdit.gitlab.alwaysShowLeaders'),
});

const mapDispatchToProps = (dispatch) => ({
  update: (data) => {
    dispatch({ type: 'SET_YOUTUBE', data });
  },
  toggleShowLeaders: () => {
    dispatch({ type: 'TOGGLE_SHOWLEADERS' });
  },
});

const retVal = connect(mapStateToProps, mapDispatchToProps)(TheComponent);

export default retVal;
