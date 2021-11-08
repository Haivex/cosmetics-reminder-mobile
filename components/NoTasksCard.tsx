import React from 'react';
import {Card, Text} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {translate} from '../translation/config';

interface NoTaskProps {
  additionalText?: string;
}

const NoTasksCard = ({additionalText}: NoTaskProps) => {
  return (
    <Card>
      <Card.Content>
        <MaterialIcon name="card-bulleted-off" />
        <Text>{translate('noTask.defaultText')}</Text>
        {additionalText && <Text>{additionalText}</Text>}
      </Card.Content>
    </Card>
  );
};
export default NoTasksCard;
