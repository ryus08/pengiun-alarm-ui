/* eslint-disable camelcase */
import React, { Component } from 'react';
import { map as _map, sortBy as _sortBy } from 'lodash';
import { Table, Grid, Container } from 'semantic-ui-react';
import Opinion from './opinion';

export default class SickMergeRequests extends Component {
  constructor(props) {
    super(props);

    const { opinions } = this.props;

    this.state = {
      column: null,
      data: opinions,
      direction: null,
    };
  }

  handleSort(clickedColumn) {
    return () => {
      const { column, data, direction } = this.state;

      if (column === clickedColumn) {
        this.setState({
          data: data.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        });
      } else {
        this.setState({
          column: clickedColumn,
          data: _sortBy(data, [clickedColumn]),
          direction: 'ascending',
        });
      }
    };
  }

  render() {
    const { setSickness } = this.props;
    const { column, data, direction } = this.state;
    return (
      <Grid columns="2" padded>
        <Grid.Column width="10">
          <Table compact sortable celled fixed basic inverted singleLine>
            <Table.Header>
              <Table.Row style={{ background: 'rgba(0, 0, 0, .3)' }}>
                <Table.HeaderCell
                  width={4}
                  sorted={column === 'Project' ? direction : null}
                  onClick={this.handleSort('name')}
                >
                  Project
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'Name' ? direction : null}
                  onClick={this.handleSort('latestEffort')}
                >
                  Merge Request
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={3}
                  sorted={column === 'Opinion' ? direction : null}
                  onClick={this.handleSort('totalEffort')}
                >
                  Opinion
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_map(
                data,
                ({
                  projectName,
                  title,
                  web_url,
                  id,
                  sick,
                  project_id,
                  iid,
                }) => (
                  <Table.Row key={`${id}-${sick}`}>
                    <Table.Cell style={{ background: 'rgba(0, 0, 0, .2)' }}>
                      {projectName}
                    </Table.Cell>
                    <Table.Cell selectable>
                      <a
                        style={{ color: 'white' }}
                        href={web_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {title}
                      </a>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Opinion
                        opinion={sick}
                        setSickness={(value) =>
                          setSickness({
                            mergeId: id,
                            value,
                            project_id,
                            iid,
                          })
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                ),
              )}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width="6" style={{ color: 'white' }}>
          <Container>
            <p>
              Rating the most recent merge requests will help penguin alarm
              learn what you think makes a good merge request. When enough
              ratings are collected, it will start indicating if a merge request
              is sick so your team can take whatever action is needed to get the
              work back on the right track.
            </p>

            <p>
              These ratings are yours and are not shared with the rest of your
              team.
            </p>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}
