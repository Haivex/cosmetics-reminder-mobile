import 'intl';
import 'intl/locale-data/jsonp/pl';
import 'intl/locale-data/jsonp/en';
import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import { format } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from 'i18n-js';

interface DatePickerInputProps {
  onBlur: () => void; onChange: (...event: any[]) => void;
}

function getDatePattern() {
  const currentLocale = i18n.currentLocale();
  if(currentLocale === 'en-US') return 'LL-dd-uu'
  return 'dd-LL-uu'
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
      onChange(params.date)
    },
    [setOpen, setDate]
  );
  return (
    <>
      <TextInput right={<TextInput.Icon name='calendar' />} onTouchEnd={() => setOpen(true)} mode='outlined' placeholder={i18n.t('datePicker.label')}>
        {date ? format(date, getDatePattern()) : ''} 
      </TextInput>
      <DatePickerModal
        locale={i18n.currentLocale()}
        mode='single'
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
        saveLabel={i18n.t('datePicker.acceptButton')}
        label={i18n.t('datePicker.label')}
      />
    </>
  );
}
