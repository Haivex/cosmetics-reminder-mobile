import React, {memo, useState} from 'react';
import SearchBar from './SearchBar';
import SearchFAB from './SearchFAB';

type SearchProps = {
  onChangeText: (text: string) => unknown;
};

const Search = ({onChangeText}: SearchProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible && <SearchBar onChangeText={onChangeText} />}
      <SearchFAB onPress={setVisible} />
    </>
  );
};
export default memo(Search);
