/* eslint-disable camelcase */
import { connect } from 'react-redux';
import { map as _map, find as _find, get as _get } from 'lodash';
import TheComponent from '../components/mergefeed';
import { setOpinion } from '../actioncreators/opinions';

const mapStateToProps = (state, ownProps) => {
  const mergeRequests = _map(
    state.openMerge.mergeSets[ownProps.type],
    (mergeRequest) => ({
      ...mergeRequest,
      sick: _get(
        _find(
          state.opinions.opinions,
          (opinion) => opinion.id === mergeRequest.id,
        ),
        'sick',
        '',
      ),
    }),
  );
  return {
    mergeRequests,
    loading: state.openMerge.loading && state.opinions.loading,
    showOpinions: ownProps.showOpinions,
    target: ownProps.target,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setSickness: ({ mergeRequest: { id: mergeId, project_id, iid }, value }) => {
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
