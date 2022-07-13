import React from "react";
import { TextField } from "@material-ui/core";

const TextMultilineInput = ({input, formData, setFormData}) => {

  return (
    <TextField
      label={input.label}
      name={input.name}
      type="text"
      minRows={4}
      multiline
      value={formData[input.name]}
      required={input.required}
      onChange={(event) => setFormData({...formData, [input.name]: event.target.value})}
    />
  )
}

export default TextMultilineInput;