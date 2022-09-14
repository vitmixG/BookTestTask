import React from "react";
import { Alert, FormControl, MenuItem, Select } from "@mui/material";
import '../TextField/textField.css'

interface Props {
  value: string,
  required: boolean,
  touched: boolean,
  setTouched: (arg:boolean) => void,
  onChange: (event:string) => void,
}

export const SelectField: React.FC<Props> = (props) => {
const {
    value,
    setTouched,
    required,
    touched,
    onChange
  } = props;
  const hasError = touched && required && !value;


  return (
    <div className="field">
      <label>
        Category
      </label>
      <div className="control">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            displayEmpty
            id="textField"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            required
            onBlur={() => setTouched(true)}
          >
            <MenuItem value="" selected disabled hidden>Choose here</MenuItem>
            <MenuItem value="Horror">Horror</MenuItem>
            <MenuItem value="Story">Story</MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
          </Select>
          {hasError && (
            <Alert severity="error">Category is required</Alert>
          )}
        </FormControl>
      </div>
    </div>
  )
}
