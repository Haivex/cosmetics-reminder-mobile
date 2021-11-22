import React, {useState} from 'react';
import SearchBar from './SearchBar';
import SearchFAB from './SearchFAB';

type SearchProps = {
  onChangeText: (text: string) => unknown;
};

const Search = ({onChangeText}: SearchProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <SearchBar visible={visible} onChangeText={onChangeText} />
      <SearchFAB onPress={setVisible} />
    </>
  );
};
export default Search;
