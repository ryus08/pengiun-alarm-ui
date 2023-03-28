/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { map as _map } from 'lodash';
import { Table } from 'semantic-ui-react';

function ConfigSearch({ load, reset, configs, config }) {
  const onChange = (value) => {
    if (value) {
      load(value.label);
    } else {
      reset();
    }
  };

  const gotoConfig = (value) => {
    window.open(`/${value.label}${window.location.search}`, '_self');
  };

  return (
    <Table compact basic inverted singleLine>
      <Table.Body>
        {_map(configs, (currentConfig) => {
          const style = {};
          if (currentConfig.label === config.label) {
            style.backgroundColor = 'rgba(0, 0, 0, .3)';
          }
          return (
            <Table.Row key={currentConfig.label} style={style}>
              <Table.Cell>
                <a
                  style={{ color: 'white', cursor: 'pointer' }}
                  onClick={() => gotoConfig(currentConfig)}
                >
                  {currentConfig.label}
                </a>
              </Table.Cell>
              <Table.Cell>
                <a
                  style={{ color: 'white', cursor: 'pointer' }}
                  onClick={() => onChange(currentConfig)}
                >
                  edit
                </a>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default ConfigSearch;
