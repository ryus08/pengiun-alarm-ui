import { connect } from 'react-redux';
import TheComponent from '../components/local/achievements';

const mapStateToProps = (state) => ({
  achievements: state.achievements.achievements,
});

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
