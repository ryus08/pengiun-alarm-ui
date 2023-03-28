/* eslint-disable camelcase */
import { connect } from 'react-redux';
import TheComponent from '../components/local/sickmergerequests';
import { setOpinion } from '../actioncreators/opinions';

const mapStateToProps = (state) => ({
  opinions: state.opinions.opinions,
});

const mapDispatchToProps = (dispatch) => ({
  setSickness: ({ mergeId, value, project_id, iid }) => {
    dispatch(
      setOpinion({
        mergeId,
        value,
        project_id,
        iid,
      }),
    );
  },
});

const retVal = connect(mapStateToProps, mapDispatchToProps)(TheComponent);

export default retVal;
