import { connect } from 'react-redux';
import TheComponent from '../../components/local/merge/mergelist';

const mapStateToProps = (state) => ({
  merges: state.openMerge.mergeSets.allMerges,
});

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
