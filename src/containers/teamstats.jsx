import { connect } from 'react-redux';
import TeamStats from '../components/teamstats';

const mapStateToProps = (state, ownProps) => ({
  teamStats: state.mergeParticipation.teamStats,
  color: ownProps.color,
  loading: state.mergeParticipation.loading,
});

const retVal = connect(mapStateToProps)(TeamStats);

export default retVal;
