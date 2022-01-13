import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate} from '../../../translation/config';

interface NoTaskProps {
  additionalText?: string;
}

const NoTasksCard = ({additionalText}: NoTaskProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <MaterialIcon
          size={50}
          style={styles.greyText}
          name="card-bulleted-off-outline"
        />
        <View>
          <Text style={[styles.text, styles.greyText]}>
            {translate('noTask.defaultText')}
          </Text>
          {additionalText && (
            <Text style={[styles.text, styles.greyText]}>{additionalText}</Text>
          )}
        </View>
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
  },
  greyText: {color: '#333'},
});

export default NoTasksCard;
