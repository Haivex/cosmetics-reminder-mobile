import * as React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pl';
import { TimePickerModal } from 'react-native-paper-dates';
import { TextInput } from 'react-native-paper';
import { format } from 'date-fns';

interface TimePickerInputProps {
  onBlur: () => void; onChange: (...event: any[]) => void;
}

export default function TimePickerInput({onChange, onBlur}: TimePickerInputProps) {
  const [visible, setVisible] = React.useState(false);
  const [time, setTime] = React.useState({
    hours: undefined,
    minutes: undefined,
  });
  const onDismiss = React.useCallback(() => {
    setVisible(false);
    onBlur()
  }, [setVisible]);

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setTime({ hours, minutes });
      onChange({hours, minutes})
    },
    [setVisible]
  );

  return (
    <>
    <TextInput right={<TextInput.Icon name='clock-outline' />} onTouchEnd={() => setVisible(true)} mode='outlined' placeholder='Wybierz godzinę'>
        {time.hours && time.minutes ? `${format(new Date(1, 1, 2000, time.hours, time.minutes), 'HH:mm')}` : ''}
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
