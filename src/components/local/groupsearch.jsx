/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Select from 'react-select';
import { map as _map } from 'lodash';
import { Form } from 'semantic-ui-react';
import penguinHost from '../../constants';
import { getAccessToken } from '../../auth';

function GroupSearch({ groups, disabled, update }) {
  const onChange = (values) => {
    update(
      _map(values, (value) => ({
        name: value.label,
        id: value.value,
      })),
    );
  };

  const values = () =>
    _map(groups, (group) => ({ label: group.name, value: group.id }));

  const getGroups = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    const options = {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    };
    return fetch(`${penguinHost}/groups?name=${input}`, options)
      .then((response) => response.json())
      .then((json) => ({
        options: _map(json, (group) => ({
          value: group.id,
          label: group.name,
        })),
      }));
  };

  if (disabled) {
    return <span />;
  }

  return (
    <Form.Field>
      <label>GitLab Groups</label>
      <Select.Async
        multi
        {...(disabled ? { disabled: true } : {})}
        value={values()}
        onChange={(value) => onChange(value)}
        loadOptions={getGroups}
      />
    </Form.Field>
  );
}

export default GroupSearch;
