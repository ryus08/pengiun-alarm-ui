import React from 'react';
import { map as _map } from 'lodash';
import Slideshow from '../../containers/slideshow';
import MrLayer from '../../containers/mrlayer';
import PrdLayer from '../../containers/prdlayer';

function Layers({ gitLabActive }) {
  const layers = [<Slideshow key="livestream" />];

  if (gitLabActive) {
    layers.push(<MrLayer key="development" />);
  }

  layers.push(<PrdLayer key="production" />);

  return (
    <div style={{ position: 'relative' }}>
      {_map(layers, (layer, index) => (
        <div
          className="floatLayer"
          key={`layer${index}`}
          style={{ zIndex: index }}
        >
          {layer}
        </div>
      ))}
    </div>
  );
}

export default Layers;
