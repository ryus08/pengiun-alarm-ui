/* eslint-disable no-return-assign */
/* eslint-disable react/no-unused-class-component-methods */
import React, { Component } from 'react';
import {
  Form,
  Grid,
  Transition,
  Message,
  Icon,
  Input,
} from 'semantic-ui-react';

class ConfigActions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateInProgress: false,
      showUpdateMessage: false,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { updateInProgress } = this.state;
    // the update is ending, time to show the message
    if (!nextProps.updating && updateInProgress) {
      this.setState({
        updateInProgress: false,
        showUpdateMessage: true,
      });
      setTimeout(() => this.setState({ showUpdateMessage: false }), 3000);
    }
  }

  handleChange(e) {
    // eslint-disable-next-line no-console
    console.log(e.target.value);
    this.newName = e.target.value;
  }

  add() {
    const { addNew } = this.props;
    addNew(this.newName);
  }

  remove() {
    const { deleteConfig } = this.props;
    this.setState({ updateInProgress: true });
    deleteConfig();
  }

  submit() {
    const { update } = this.props;
    this.setState({ updateInProgress: true });
    update();
  }

  render() {
    const { disabled, updating, messageText } = this.props;
    const { showUpdateMessage } = this.state;
    return (
      <Grid>
        <Grid.Row columns="2">
          <Grid.Column>
            <Grid stackable>
              <Grid.Row colums="3">
                <Grid.Column>
                  <Form.Button
                    icon="trash"
                    {...(disabled ? { disabled: true } : {})}
                    loading={updating}
                    onClick={() => this.remove()}
                  />
                </Grid.Column>
                <Grid.Column />
                <Grid.Column>
                  <Input
                    onChange={(e) => this.handleChange(e)}
                    icon={
                      <Icon
                        name="add"
                        onClick={() => this.add()}
                        inverted
                        link
                        color="black"
                        ref={(input) => (this.inputtext = input)}
                      />
                    }
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column>
            <Form.Button
              {...(disabled ? { disabled: true } : {})}
              fluid
              loading={updating}
              primary
              onClick={() => this.submit()}
            >
              Save
            </Form.Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns="1">
          <Grid.Column>
            <Transition
              visible={showUpdateMessage}
              animation="slide up"
              duration={500}
            >
              <div>
                <Message
                  color="blue"
                  size="large"
                  style={{ textAlign: 'center' }}
                >
                  {messageText}
                </Message>
              </div>
            </Transition>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ConfigActions;
