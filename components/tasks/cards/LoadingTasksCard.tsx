import React from 'react';
import {StyleSheet} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {translate} from '../../../translation/config';
import {ActivityIndicator} from 'react-native-paper';

const LoadingTasksCard = () => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <ActivityIndicator animating={true} size="large" />
        <Text style={styles.text}>{translate('loadingTasks')}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    aspectRatio: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
});
export default LoadingTasksCard;
