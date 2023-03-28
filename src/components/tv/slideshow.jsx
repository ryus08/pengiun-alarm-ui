// jshint ignore: start
import React from 'react';
import P from 'bluebird';
import ReactPlayer from 'react-player';
import InfoLayer from './infolayer';

class Slideshow extends InfoLayer {
  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0', currentlyAt: 0 };
  }

  pollFunction() {
    return P.resolve().tap(() =>
      this.setState({
        currentlyAt: this.state.currentlyAt + 1,
      }),
    );
  }

  render() {
    let content;
    if (!this.props.streams.length) {
      content = <div />;
    } else {
      const current = this.state.currentlyAt % this.props.streams.length;
      const next = (this.state.currentlyAt + 1) % this.props.streams.length;
      content = (
        <div>
          <ReactPlayer
            key={current}
            url={this.props.streams[current]}
            playing
            width={this.state.width}
            height={this.state.height}
          />
          <ReactPlayer
            key={next}
            url={this.props.streams[next]}
            playing
            width={this.state.width}
            height={this.state.height}
          />
        </div>
      );
    }

    return (
      <div style={{ width: this.state.width, height: this.state.height }}>
        {content}
      </div>
    );
  }
}

export default Slideshow;
