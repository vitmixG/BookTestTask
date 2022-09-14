import React from 'react';
import { Alert, TextField } from "@mui/material";
import './textField.css'

type Props = {
  name: string,
  value: string,
  label?: string,
  required: boolean,
  onChange?: (newValue: string) => void,
  setTouched: (arg:boolean) => void,
  touched: boolean,
};

export const InputField: React.FC<Props> = ({
  name,
  value,
  required,
  label = name,
  onChange = () => {},
  setTouched,
  touched,
}) => {
  const hasError = touched && required && !value;

  return (
    <div className="field">
      <label className="label">
        {label}
      </label>

      <div className="control">
        <TextField
          variant="outlined"
          id="textField"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => onChange(event.target.value)}
          onBlur={() => setTouched(true)}
          required={required}
        />
      </div>

      {hasError && (
        <Alert severity="error">{label} is required</Alert>
      )}
    </div>
  );
};
