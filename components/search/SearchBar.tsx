import React from 'react';
import {Searchbar} from 'react-native-paper';
import {translate} from '../../translation/config';
import {StyleSheet} from 'react-native';

type SearchBarTopProps = {
  visible: boolean;
  onChangeText: (text: string) => unknown;
};

const SearchBarTop = ({visible, onChangeText}: SearchBarTopProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const styles = StyleSheet.create({
    searchbar: {display: visible ? 'flex' : 'none'},
  });

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    onChangeText(query);
  };

  return (
    <Searchbar
      style={styles.searchbar}
      placeholder={translate('search')}
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchBarTop;
