import React, {useCallback} from 'react';
import {Searchbar} from 'react-native-paper';
import {translate} from '../../translation/config';

type SearchBarTopProps = {
  onChangeText: (text: string) => unknown;
};

const SearchBarTop = ({onChangeText}: SearchBarTopProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchBarRef = React.useRef<Searchbar>(null);

  React.useEffect(() => {
    searchBarRef?.current?.focus();
    return () => {
      setSearchQuery('');
      onChangeText('');
    };
  }, [onChangeText]);

  const onChangeSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      onChangeText(query);
    },
    [onChangeText],
  );

  return (
    <Searchbar
      ref={searchBarRef}
      placeholder={translate('search')}
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
};

export default SearchBarTop;
