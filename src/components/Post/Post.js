import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { createFragmentContainer, QueryRenderer } from 'react-relay';
import { graphql } from 'relay-runtime';
import { white } from '../../colors';

export class PostComponent extends Component {
  render() {
    const { text, id } = this.props.post;
    return (
      <TouchableHighlight
        key={id}
        // onPress={() => this._onPress(item)}
        // onShowUnderlay={separators.highlight}
        // onHideUnderlay={separators.unhighlight}
      >
        <View style={style.post}>
          <Text>{text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export const Post = createFragmentContainer(
  PostComponent,
  graphql`
    fragment Post_post on Tweet {
      #      edges {
      #        node {
      id
      text
      created_at
      url
      userDisplayName
      username
      #        }
      #      }
    }
  `,
);

const style = StyleSheet.create({
  post: {
    backgroundColor: white,
    padding: 5,
  },
});
