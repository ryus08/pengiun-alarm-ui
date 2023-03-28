import { connect } from 'react-redux';
import DevCards from '../components/local/devcards';

const mapStateToProps = (state, ownProps) => ({
  mergeStats: state.mergeParticipation.mergeStats,
  maxSize: ownProps.maxSize,
  loading: state.mergeParticipation.loading,
});

const retVal = connect(mapStateToProps)(DevCards);

export default retVal;
