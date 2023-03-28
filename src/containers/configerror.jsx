import { connect } from 'react-redux';
import TheComponent from '../components/configerror';

const mapStateToProps = (state) => ({
  error: state.configuration.error,
});

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
