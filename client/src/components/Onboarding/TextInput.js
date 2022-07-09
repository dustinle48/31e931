import React from "react";
import { TextField } from "@material-ui/core";

const TextInput = ({input, formData, setFormData}) => {

  return (
    <TextField
      label={input.label}
      name={input.name}
      type="text"
      multiline={input.type === "multiline-text"}
      required={input.required}
      value={formData[input.name]}
      onChange={(event) => setFormData({...formData, [input.name]: event.target.value})}
    />
  )
}

export default TextInput;