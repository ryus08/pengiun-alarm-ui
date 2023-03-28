import React from 'react';
import { Image, Header, Grid, Segment } from 'semantic-ui-react';
import MergeState from './mergestate';

const shorten = (text) => {
  const maxLength = 40; // maximum number of characters to extract

  // trim the string to the maximum length
  let trimmedString = text.substr(0, maxLength);

  if (trimmedString.length < text.length) {
    // re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
    );
  }

  if (trimmedString.length < text.length) {
    trimmedString += ' ...';
  }
  return trimmedString;
};

function MergeCard({ mergeRequest }) {
  return (
    <Segment
      basic
      attached="bottom"
      textAlign="left"
      style={{
        padding: '0px',
        paddingBottom: '20px',
        border: '0px',
        marginRight: '10px',
        marginBottom: '5px',
      }}
    >
      <Grid columns={2}>
        <Grid.Column width={3}>
          <Image
            size="tiny"
            src={mergeRequest.author.avatar_url}
            style={{
              border: '1px solid black',
              borderTop: '0px',
              borderRadius: '15px 0px 0px 15px',
            }}
          />
        </Grid.Column>
        <Grid.Column
          width={11}
          style={{ paddingLeft: '0px', paddingRight: '1px' }}
        >
          <Header
            attach="top"
            size="small"
            style={{ color: '#CCCCCC', fontSize: '12pt' }}
            color="blue"
          >
            <a
              href={mergeRequest.web_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shorten(mergeRequest.title)}
            </a>
          </Header>
          <Header
            size="tiny"
            icon="code"
            style={{ color: '#CCCCCC', marginTop: '2px', fontSize: '9pt' }}
            content={mergeRequest.projectName}
          />
        </Grid.Column>
        <Grid.Column width={2}>
          <MergeState mergeRequest={mergeRequest} />
        </Grid.Column>
      </Grid>
    </Segment>
  );
}

export default MergeCard;
