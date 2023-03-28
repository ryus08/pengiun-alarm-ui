import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';

class ConfigError extends Component {
  constructor(props) {
    super(props);
    this.state = { dismissed: false };
  }

  close() {
    return () => this.setState({ dismissed: true });
  }

  render() {
    const { error } = this.props;
    const { dismissed } = this.state;
    return (
      <Modal
        closeIcon
        open={error && !dismissed}
        closeOnEscape
        closeOnRootNodeClick
        onClose={this.close}
      >
        <Modal.Header>Cannot load configuration</Modal.Header>
        <Modal.Content image>{JSON.stringify(error)}</Modal.Content>
      </Modal>
    );
  }
}

export default ConfigError;
