import React from 'react';
import { Icon, Container, Button } from 'semantic-ui-react';

function Opinion({ opinion, setSickness }) {
  const inactive = {
    style: { background: 'rgba(0, 0, 0, .2)', color: '#BBBBBB' },
  };
  return (
    <Container fluid compact>
      <Button.Group>
        <Button
          icon
          {...(opinion === 'good' ? { color: 'green' } : inactive)}
          onClick={() => setSickness('good')}
        >
          <Icon size="large" name="smile" />
        </Button>
        <Button
          icon
          {...(opinion === 'neither' ? { color: 'grey' } : inactive)}
          onClick={() => setSickness('neither')}
        >
          <Icon size="large" name="meh" />
        </Button>
        <Button
          icon
          {...(opinion === 'bad' ? { color: 'red' } : inactive)}
          onClick={() => setSickness('bad')}
        >
          <Icon size="large" name="frown" />
        </Button>
      </Button.Group>
    </Container>
  );
}

export default Opinion;
