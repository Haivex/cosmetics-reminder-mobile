import React, {useEffect} from 'react';
import {useTrackedSelector} from '../redux/RootReducer';
import {selectLanguage} from '../redux/selectors';
import {changeLanguage} from '../translation/config';
import {ChildrenProp} from './types';

const LanguageProvider = ({children}: ChildrenProp) => {
  const state = useTrackedSelector();
  const currentLanguage = selectLanguage(state);
  useEffect(() => {
    changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return <>{children}</>;
};
export default LanguageProvider;
