/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import AsyncSelect from 'react-select/async';
import { map as _map } from 'lodash';
import { Form } from 'semantic-ui-react';
import PenguinClient from '../../clients/penguinclient';

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

    const penguinClient = new PenguinClient();
    // If the user isn't a maintainer, they won't be able to add the config anyways,
    // So filter on that during the search
    return penguinClient
      .searchGroups({ name: input, asMaintainer: true })
      .then((retrievedGroups) =>
        _map(retrievedGroups, (group) => ({
          value: group.id,
          label: group.name,
        })),
      );
  };

  if (disabled) {
    return <span />;
  }

  return (
    <Form.Field>
      <label>GitLab Groups</label>
      <AsyncSelect
        isMulti
        {...(disabled ? { isDisabled: true } : {})}
        value={values()}
        onChange={(value) => onChange(value)}
        loadOptions={getGroups}
      />
    </Form.Field>
  );
}

export default GroupSearch;
