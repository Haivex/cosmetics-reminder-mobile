import {format} from 'date-fns';
import {i18n, translate} from '../../../translation/config';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/pl';
import * as React from 'react';
import {TextInput as TextInputType} from 'react-native';
import {TextInput} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import {CalendarDate} from 'react-native-paper-dates/lib/typescript/src/Date/Calendar';

interface DatePickerInputProps {
  onBlur: () => void;
  onChange: (...event: any[]) => void;
  value: CalendarDate;
}

function getDatePattern() {
  const currentLocale = i18n.locale;
  if (currentLocale === 'en-US') {
    return 'LL-dd-uu';
  }
  return 'dd-LL-uu';
}

const DatePickerInput = React.forwardRef<TextInputType, DatePickerInputProps>(
  ({onBlur, onChange, value}: DatePickerInputProps, ref) => {
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
      setOpen(false);
      onBlur();
    }, [setOpen, onBlur]);

    const onConfirmSingle = React.useCallback(
      params => {
        setOpen(false);
        onChange(params.date);
      },
      [setOpen, onChange],
    );
    return (
      <>
        <TextInput
          showSoftInputOnFocus={false}
          caretHidden
          right={<TextInput.Icon name="calendar" />}
          onFocus={() => setOpen(true)}
          mode="outlined"
          placeholder={translate('datePicker.label')}
          ref={ref}>
          {value ? format(value, getDatePattern()) : ''}
        </TextInput>
        <DatePickerModal
          locale={i18n.locale}
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={value}
          onConfirm={onConfirmSingle}
          saveLabel={translate('datePicker.acceptButton')}
          label={translate('datePicker.label')}
        />
      </>
    );
  },
);

export default DatePickerInput;
