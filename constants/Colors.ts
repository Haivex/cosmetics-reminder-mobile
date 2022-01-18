import {ExtendedTheme} from './Theme';

const tintColorLight = '#00bcd4';
const tintColorDark = '#fff';

type ColorsProps = ExtendedTheme['colors'] & {
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

interface Colors {
  light: Partial<ColorsProps>;
  dark: Partial<ColorsProps>;
}

const COLORS: Colors = {
  light: {
    primary: '#00bcd4',
    accent: '#f1c40f',
    text: '#000957',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    error: '#F14A16',
  },
  dark: {
    primary: '#00bcd4',
    accent: '#f1c40f',
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    error: '#F14A16',
  },
};

export default COLORS;
