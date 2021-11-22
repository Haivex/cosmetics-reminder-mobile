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
  const searchBarRef = React.useRef<Searchbar>();
  const styles = StyleSheet.create({
    searchbar: {display: visible ? 'flex' : 'none'},
  });

  React.useEffect(() => {
    if (visible) {
      searchBarRef.current?.focus();
    } else {
      onChangeText('');
      setSearchQuery('');
      searchBarRef.current?.blur();
    }
  }, [visible]);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    onChangeText(query);
  };

  return (
    <Searchbar
      focusable={visible}
      ref={searchBarRef}
      style={styles.searchbar}
      placeholder={translate('search')}
      onChangeText={onChangeSearch}
      value={searchQuery}
      autoFocus={visible}
    />
  );
};

export default SearchBarTop;
