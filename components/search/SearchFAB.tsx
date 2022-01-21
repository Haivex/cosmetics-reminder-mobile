import React from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';

type SearchFABProps = {
  onPress: (opened: boolean) => unknown;
};

const SearchFAB = ({onPress}: SearchFABProps) => {
  let [opened, setOpened] = React.useState(false);
  return (
    <FAB
      color="#000"
      animated={true}
      style={styles.fab}
      icon="magnify"
      onPress={() => {
        onPress(!opened);
        setOpened(!opened);
      }}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 32,
    bottom: 24,
    transform: [{scale: 1.25}],
  },
});

export default SearchFAB;
