import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-ico-flags';
import {RadioButton} from 'react-native-paper';

interface LanguageRadioButtonProps {
  label: string;
  value: string;
  flagName: string;
}

const LanguageRadioButton = ({
  label,
  value,
  flagName,
}: LanguageRadioButtonProps) => {
  return (
    <View>
      <RadioButton.Item
        position="leading"
        mode="ios"
        label={`${label}`}
        value={value}
        labelStyle={styles.label}
      />
      {value !== 'auto' && (
        <Icon name={flagName} width="32" height="32" style={styles.icon} />
      )}
    </View>
  );
};
export default LanguageRadioButton;

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 32,
    top: 10,
  },
  label: {
    position: 'absolute',
    left: 80,
  },
});
