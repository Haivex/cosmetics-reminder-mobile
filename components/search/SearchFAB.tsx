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
    right: 16,
    bottom: 16,
  },
});

export default SearchFAB;
