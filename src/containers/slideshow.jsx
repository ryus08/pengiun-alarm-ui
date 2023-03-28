import { connect } from 'react-redux';
import { map as _map, get as _get } from 'lodash';
import Slideshow from '../components/tv/slideshow';

const mapStateToProps = (state) => {
  const streams = _map(
    _get(state, 'configuration.slideshow.youtube', []),
    (ytStream) => `https://www.youtube.com/watch?v=${ytStream}`,
  );

  return {
    rate: _get(state, 'configuration.slideshow.rate', 120000),
    streams,
  };
};

const retVal = connect(mapStateToProps)(Slideshow);

export default retVal;
