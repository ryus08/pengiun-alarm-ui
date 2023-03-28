import React from 'react';
import { Image, Header, Grid, Popup, List, Icon } from 'semantic-ui-react';
import Opinion from './opinion';

// eslint-disable-next-line complexity
function MergeCard({
  mergeRequest,
  setSickness,
  showOpinions,
  last,
  target = 'local',
}) {
  const style = {};
  const needsAttention =
    mergeRequest.prediction.Prediction.predictedLabel === 'bad';
  const textColor = target === 'local' ? '#CCCCCC' : '#333333';
  const attentionGradient = needsAttention
    ? 'linear-gradient(to right, rgba(255, 255, 0, 1) 60%, rgba(255, 255, 0, 0))'
    : 'linear-gradient(to right, rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.0))';

  const headingBackground =
    target === 'local'
      ? 'linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.0))'
      : attentionGradient;

  if (needsAttention) {
    style.borderLeft =
      target === 'local' ? '3px solid yellow' : '0px solid yellow';
    if (last) {
      style.borderRadius = '0px 0px 20px 20px';
    }
  }
  return (
    <Grid style={style}>
      <Grid.Column
        width={target === 'local' ? 2 : 4}
        style={{ padding: '12px 0px 12px 10px' }}
      >
        <Image
          src={mergeRequest.author.avatar_url}
          style={{
            borderRadius: '15px 0px 0px 15px',
            border: '1px solid black',
          }}
        />
      </Grid.Column>
      <Grid.Column
        width={target === 'local' ? 14 : 12}
        textAlign="left"
        style={{ padding: '12px 0px 12px 0px' }}
      >
        <div
          style={{
            padding: '8px',
            marginRight: '10px',
            marginBottom: '5px',
            background: headingBackground,
          }}
        >
          <Header color="blue" size={target === 'local' ? 'small' : 'medium'}>
            {needsAttention && (
              <Popup
                trigger={<Icon name="warning sign" />}
                header="This may need attention"
                content="Based on ratings collected so far, this merge request might be problematic.  If you don't think so, please rate it!"
              />
            )}
            <Header.Content>
              {' '}
              <a
                href={mergeRequest.web_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {mergeRequest.title}
              </a>
            </Header.Content>
          </Header>
        </div>
        <List horizontal style={{ paddingLeft: '20px' }} relaxed>
          <List.Item>
            <Header
              size="tiny"
              icon="code"
              style={{ color: textColor, fontSize: '10pt' }}
              content={mergeRequest.projectName}
            />
          </List.Item>
          <List.Item>
            <Header
              size="tiny"
              icon="comment outline"
              style={{ color: textColor, fontSize: '10pt' }}
              content={mergeRequest.comments.length || '0'}
            />
          </List.Item>

          {showOpinions === 'true' && (
            <List.Item>
              <Popup
                inverted
                style={{
                  backgroundColor: '#666666',
                  border: '2px solid black',
                }}
                hoverable
                position="top center"
                trigger={
                  <div>
                    <Header
                      size="tiny"
                      content="Rate It!"
                      style={{
                        color: mergeRequest.sick.length ? 'green' : '#CCCCCC',
                      }}
                      icon="legal"
                    />
                  </div>
                }
              >
                <Popup.Header>Your Opinion/Rating</Popup.Header>
                <Popup.Content>
                  <Opinion
                    opinion={mergeRequest.sick}
                    setSickness={(value) =>
                      setSickness({ mergeRequest, value })
                    }
                  />
                </Popup.Content>
              </Popup>
            </List.Item>
          )}
        </List>
      </Grid.Column>
    </Grid>
  );
}
export default MergeCard;
