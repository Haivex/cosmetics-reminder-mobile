declare module 'react-native-social-buttons' {
  import {
    TouchableOpacityProps,
    StyleProp,
    TextStyle,
    ImageStyle,
    ViewStyle,
  } from 'react-native';

  export interface SocialButtonProps extends TouchableOpacityProps {
    buttonViewStyle?: StyleProp<ViewStyle>;
    logoStyle?: StyleProp<ImageStyle>;
    textStyle?: StyleProp<TextStyle>;
  }

  export function GoogleSocialButton(
    props: SocialButtonProps,
  ): React.ReactElement;

  export function FacebookSocialButton(
    props: SocialButtonProps,
  ): React.ReactElement;
}
