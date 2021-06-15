import * as React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pl';
import { TimePickerModal } from 'react-native-paper-dates';
import { TextInput } from 'react-native-paper';

export default function TimePickerInput() {
  const [visible, setVisible] = React.useState(false);
  const [time, setTime] = React.useState({
    hours: undefined,
    minutes: undefined,
  });
  const onDismiss = React.useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setTime({ hours, minutes });
    },
    [setVisible]
  );

  return (
    <>
    <TextInput onTouchEnd={() => setVisible(true)} mode='outlined' placeholder='Wybierz godzinę'>
        {`${time.hours}:${time.minutes}`}
      </TextInput>
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={time.hours}
        minutes={time.minutes}
        label='Wybier godzinę'
        cancelLabel='Anuluj'
        confirmLabel='Potwierdź'
        animationType='fade'
        locale='pl'
      />
    </>
  );
}
