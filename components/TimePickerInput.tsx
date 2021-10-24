import {format} from 'date-fns';
import i18n from 'i18n-js';
import 'intl';
import 'intl/locale-data/jsonp/pl';
import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';
import {translate} from '../translation/config';

export type Time = {
  hours: number | undefined;
  minutes: number | undefined;
};

interface TimePickerInputProps {
  onBlur: () => void;
  onChange: (...event: any[]) => void;
  value: Time;
}

function getTimePattern() {
  const currentLocale = i18n.currentLocale();
  if (currentLocale.startsWith('en')) {
    return 'hh:mm aa';
  }
  return 'HH:mm';
}

const TimePickerInput = React.forwardRef<TextInput, TimePickerInputProps>(
  ({onChange, onBlur, value}: TimePickerInputProps, ref) => {
    const [visible, setVisible] = React.useState(false);
    const onDismiss = React.useCallback(() => {
      setVisible(false);
      onBlur();
    }, [setVisible]);

    const onConfirm = React.useCallback(
      ({hours, minutes}) => {
        setVisible(false);
        onChange({hours, minutes});
      },
      [setVisible],
    );

    return (
      <>
        <TextInput
          showSoftInputOnFocus={false}
          caretHidden
          right={<TextInput.Icon name="clock-outline" />}
          onFocus={() => setVisible(true)}
          mode="outlined"
          placeholder={translate('timePicker.label')}
          ref={ref}>
          {value.hours !== undefined && value.minutes !== undefined
            ? `${format(
                new Date(1, 1, 2000, value.hours, value.minutes),
                getTimePattern(),
              )}`
            : ''}
        </TextInput>
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={value.hours}
          minutes={value.minutes}
          label={translate('timePicker.label')}
          cancelLabel={translate('timePicker.cancelButton')}
          confirmLabel={translate('timePicker.acceptButton')}
          animationType="fade"
          locale={i18n.currentLocale()}
        />
      </>
    );
  },
);

export default TimePickerInput;
