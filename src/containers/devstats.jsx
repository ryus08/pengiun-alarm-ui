import { connect } from 'react-redux';
import DevStatTable from '../components/tv/devstattable';

const mapStateToProps = (state, ownProps) => ({
  mergeStats: state.mergeParticipation.mergeStats,
  maxSize: ownProps.maxSize,
});

const retVal = connect(mapStateToProps)(DevStatTable);

export default retVal;
