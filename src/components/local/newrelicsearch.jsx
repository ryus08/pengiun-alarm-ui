/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import AsyncSelect from 'react-select/async';
import { map as _map } from 'lodash';
import { Label, Form } from 'semantic-ui-react';
import NewRelicClient from '../../clients/newrelicclient';

function NewRelicSearch({ policies, noTeam, nrApiKey, update }) {
  const onChange = (newValues) => {
    const mapResult = _map(newValues, (value) => value.value);
    update(mapResult);
  };

  const values = () =>
    _map(policies, (policy) => ({ label: policy, value: policy }));

  const getPolicies = (input) => {
    if (!input) {
      return Promise.resolve({ options: [] });
    }

    const client = new NewRelicClient({ apiKey: nrApiKey });

    return client.searchPolicy({ search: input }).then((json) => {
      const options = _map(json.policies, (policy) => ({
        value: policy.name,
        label: policy.name,
      }));
      return { options };
    });
  };

  if (noTeam) {
    return <span />;
  }

  return (
    <Form.Field>
      <label>New Relic Policy</label>
      <AsyncSelect
        isMulti
        value={values()}
        {...(nrApiKey === undefined ? { isDisabled: true } : {})}
        onChange={(value) => onChange(value)}
        loadOptions={getPolicies}
      />
      {nrApiKey === undefined && (
        <Label pointing="above" color="red" basic>
          The NewRelic API key is required to edit this value
        </Label>
      )}
    </Form.Field>
  );
}

export default NewRelicSearch;
