import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import MrLayer from '../components/tv/mrlayer';

const mapStateToProps = (state) => {
  const needsMergeNum = state.openMerge.mergeSets.canMerge.length;
  const needsApprovalNum = state.openMerge.mergeSets.needsApproval.length;

  return {
    showLeaders: _get(
      state,
      'configuration.gitlab.alwaysShowLeaders',
      needsMergeNum + needsApprovalNum !== 0,
    ),
    needsMergeNum,
    needsApprovalNum,
  };
};

const retVal = connect(mapStateToProps)(MrLayer);

export default retVal;
