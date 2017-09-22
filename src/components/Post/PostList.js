import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, FlatList, Text } from 'react-native';
import { Post } from './Post';
import { ActivityIndicator } from 'react-native';
import { lightSilver, ruby, silver } from '../../colors';
import StatusBarSizeIOS from 'react-native-status-bar-size';

const Loading = () => (
  <View style={style.container}>
    <ActivityIndicator />
  </View>
);

const ItemSeparatorComponent = () => <View style={style.separator} />;

export class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topBarHeight: StatusBar.currentHeight || StatusBarSizeIOS.currentHeight,
    };

    this.handleTopBar = this.handleTopBar.bind(this);
  }

  handleTopBar() {
    this.setState({
      topBarHeight: StatusBar.currentHeight || StatusBarSizeIOS.currentHeight,
    });
  }

  componentDidMount() {
    StatusBarSizeIOS.addEventListener('willChange', this.handleTopBar);
  }

  componentWillUnmount() {
    StatusBarSizeIOS.removeEventListener('willChange', this.handleTopBar);
  }

  render() {
    const { tweets, loading } = this.props;
    if (loading) return <Loading />;
    const sbh = this.state.topBarHeight || StatusBarSizeIOS.currentHeight;

    return (
      <View style={[style.container, { paddingTop: sbh }]}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />

        <FlatList
          ItemSeparatorComponent={ItemSeparatorComponent}
          data={tweets}
          keyExtractor={item => item.node.__id}
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
    backgroundColor: '#cacaca',
  },
  separator: {
    flex: 1,
    // backgroundColor: lightSilver,
    height: 2,
  },
});
