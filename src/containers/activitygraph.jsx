import { connect } from 'react-redux';
import { map as _map, reduce as _reduce } from 'lodash';
import TheComponent from '../components/local/graph';

const mapStateToProps = (state, ownProps) => {
  let { data } = state.activity[ownProps.type];
  let contributors = _map(state.activity[ownProps.type].contributors, 'name');
  if (ownProps.summed) {
    data = _map(data, (dateData) => {
      const retVal = {};
      retVal[ownProps.type] =
        _reduce(dateData, (result, value) => result + value) /
        (dateData.dateIndex + 1);
      return retVal;
    });
    contributors = [ownProps.type];
  }
  return {
    data,
    contributors,
    title: ownProps.title,
    width: ownProps.width,
    height: ownProps.height,
  };
};

const retVal = connect(mapStateToProps)(TheComponent);

export default retVal;
