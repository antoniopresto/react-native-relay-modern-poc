import React from 'react';
import { graphql } from 'relay-runtime';
import { getEnvironment } from '../../relayEnvironment';
import { PostList } from '../Post/PostList';
import { QueryRenderer } from 'react-relay';

export default (variables = {}, reduxStore) => (
  <QueryRenderer
    environment={getEnvironment(reduxStore)}
    variables={variables}
    query={graphql`
      query AppQuery {
        tweets {
          edges {
            node {
              ...Post_post
            }
          }
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        alert(error.message);
      }

      if (props) {
        return <PostList tweets={props.tweets.edges} />;
      }

      return <PostList loading={true} />;
    }}
  />
);
