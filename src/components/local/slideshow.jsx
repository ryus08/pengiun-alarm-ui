/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { map as _map } from 'lodash';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

import { Form, Checkbox } from 'semantic-ui-react';

function Slideshow({
  tags,
  disabled,
  alwaysShowLeaders,
  update,
  toggleShowLeaders,
}) {
  const handleOnChange = (values) => {
    update(_map(values, 'value'));
  };

  const values = () => _map(tags, (tag) => ({ label: tag, value: tag }));

  const goToYoutube = (value) => {
    window.open(`https://www.youtube.com/watch?v=${value.value}`);
  };

  if (disabled) {
    return <span />;
  }

  return (
    <Container>
      <Form.Field>
        <label>YouTube streams</label>
        <CreatableSelect
          isMulti
          {...(disabled ? { isDisabled: true } : {})}
          options={[]}
          onValueClick={goToYoutube} // This seems wrong
          onChange={(value) => handleOnChange(value)}
          value={values()}
        />
      </Form.Field>

      <Form.Field>
        <Checkbox
          checked={alwaysShowLeaders}
          label="Always Show Leaderboard"
          onChange={toggleShowLeaders}
        />
      </Form.Field>
    </Container>
  );
}

export default Slideshow;
