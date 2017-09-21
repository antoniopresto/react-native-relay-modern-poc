import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Post } from './Post';
import { ActivityIndicator, Platform } from 'react-native';
import { blue, lightSilver } from '../../colors';

const Loading = () => (
  <View style={style.container}>
    <ActivityIndicator />
  </View>
);

const ItemSeparatorComponent = () => <View style={style.separator} />;

export class PostList extends PureComponent {
  render() {
    const { tweets, loading } = this.props;
    if (loading) return <Loading />;

    return (
      <View style={style.container}>
        <FlatList
          ItemSeparatorComponent={ItemSeparatorComponent}
          data={tweets}
          keyExtractor={(item) => item.node.__id}
          renderItem={({ item, separators }) => (
            <Post post={item.node} separator={separators} />
          )}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightSilver,
    borderTopWidth: 25,
    borderTopColor: blue,
    padding: 3
  },
  separator: {
    flex: 1,
    backgroundColor: lightSilver,
    height: 3,
  },
});
