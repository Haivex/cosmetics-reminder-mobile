import 'intl';
import 'intl/locale-data/jsonp/pl';
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';

interface DatePickerInputProps {
  onBlur: () => void; onChange: (...event: any[]) => void;
}

export default function DatePickerInput({onBlur, onChange}: DatePickerInputProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
    onBlur()
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    (params) => {
      setOpen(false);
      setDate(params.date);
      onChange(params)
    },
    [setOpen, setDate]
  );

  return (
    <>
      <TextInput onTouchEnd={() => setOpen(true)} mode='outlined' placeholder='Wybierz datę'>
        {date && format(date, 'dd-LL-uu')}
      </TextInput>
      <DatePickerModal
        locale='pl'
        mode='single'
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        saveLabel='Potwierdź'
        label='Wybierz datę'
      />
    </>
  );
}
