import React from 'react';
import {Theme} from 'react-native-paper/lib/typescript/types';
import TextTicker from 'react-native-text-ticker';
import {ExtendedTheme} from '../constants/Theme';
import {ChildrenProp} from './types';

type ThemedMarqueeTextProps = {theme: ExtendedTheme | Theme} & ChildrenProp;

const ThemedMarqueeText = ({theme, children}: ThemedMarqueeTextProps) => {
  return (
    <TextTicker style={{color: theme.colors.text}} loop marqueeDelay={1000}>
      {children}
    </TextTicker>
  );
};
export default ThemedMarqueeText;
