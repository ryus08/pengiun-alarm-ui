/* eslint-disable react/no-unused-state */
import React from 'react';

class InfoLayer extends React.Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    const { rate } = this.props;
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.poll(parseInt(rate, 10) || 30000);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  poll(rate) {
    return (
      this.pollFunction()
        // eslint-disable-next-line no-console
        .catch((e) => console.log(e))
        // go check once a minute
        .delay(rate)
        .then(() => this.poll(rate).bind(this))
    );
  }
}
export default InfoLayer;
