import React, { useEffect, useState } from "react";
import { Grid, Switch, Typography } from "@material-ui/core";

const SwitchInput = ({input, formData, setFormData}) => {
  const [check, setCheck] = useState(formData[input.name]);

  const handleOnChange = () => {
    setCheck((prev) => !prev)
  }

  useEffect(() => {
    setFormData({...formData, [input.name]: check})
    // eslint-disable-next-line
  },[check])

  return (
    <Grid container alignItems="center">
      <Switch checked={formData[input.name]} onChange={handleOnChange} />
      <Typography>{input.label}</Typography>
    </Grid>
  )
}

export default SwitchInput;