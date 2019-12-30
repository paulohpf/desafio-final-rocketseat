import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ptBR from 'date-fns/locale/pt-BR';
import ReactDatePicker, { setDefaultLocale } from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

setDefaultLocale(ptBR);

export default function DatePicker({ name, placeholder, onChange, value }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        // value={value}
        dateFormat="dd/MM/yyyy"
        selected={selected}
        placeholderText={placeholder}
        onChange={date => {
          setSelected(date);
          onChange(date);
        }}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.defaultProps = {
  placeholder: '',
  onChange: PropTypes.func,
};

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
