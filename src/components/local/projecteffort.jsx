// jshint ignore: start
import React, { Component } from 'react';
import { map as _map, sortBy as _sortBy } from 'lodash';
import { Table, Grid, Container } from 'semantic-ui-react';
import DirectionIcon from '../directionicon';

export default class ProjectEffort extends Component {
  constructor(props) {
    const { effort } = props;
    super(props);
    this.state = {
      column: null,
      data: effort,
      direction: null,
    };
  }

  handleSort(clickedColumn) {
    return () => {
      const { column, data, direction } = this.state;

      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          data: _sortBy(data, [clickedColumn]),
          direction: 'ascending',
        });

        return;
      }

      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      });
    };
  }

  render() {
    const { analysis } = this.props;
    const { column, data, direction } = this.state;

    return (
      <Grid columns="2">
        <Grid.Column width="10">
          <Table
            compact
            sortable
            celled
            fixed
            basic
            inverted
            singleLine
            selectable
          >
            <Table.Header>
              <Table.Row style={{ background: 'rgba(0, 0, 0, .3)' }}>
                <Table.HeaderCell
                  sorted={column === 'name' ? direction : null}
                  onClick={this.handleSort('name')}
                >
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'latestEffort' ? direction : null}
                  onClick={this.handleSort('latestEffort')}
                >
                  Latest Effort
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'totalEffort' ? direction : null}
                  onClick={this.handleSort('totalEffort')}
                >
                  Total Effort
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === 'effortChange' ? direction : null}
                  onClick={this.handleSort('effortChange')}
                >
                  Effort Change
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_map(
                data,
                ({ latestEffort, effortChange, totalEffort, name }) => (
                  <Table.Row key={name}>
                    <Table.Cell style={{ background: 'rgba(0, 0, 0, .2)' }}>
                      {name}
                    </Table.Cell>
                    <Table.Cell>{latestEffort.toPrecision(3)}</Table.Cell>
                    <Table.Cell>{totalEffort.toPrecision(3)}</Table.Cell>
                    <Table.Cell>
                      <DirectionIcon delta={effortChange} />
                      {effortChange.toPrecision(3)}
                    </Table.Cell>
                  </Table.Row>
                ),
              )}
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width="6" style={{ color: 'white' }}>
          <Container>
            Effort is measured as the percentage of merge requests and comments
            a project has, compared to all projects. It is intended to be used
            as an approximation for how your team is spending their time.
          </Container>

          <Table compact fixed basic inverted singleLine>
            <Table.Body>
              {_map(analysis, (analysisData) => (
                <Table.Row key={analysisData.name}>
                  <Table.Cell style={{ background: 'rgba(0, 0, 0, .2)' }}>
                    {analysisData.name}
                  </Table.Cell>
                  <Table.Cell>{analysisData.value.toPrecision(3)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}
