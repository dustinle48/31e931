import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Button, Grid, FormControl, Typography } from "@material-ui/core";

import { TextInput, TextMultilineInput, SwitchInput } from "./index";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    box: {
        display: "flex",
        justifyContent: "right",
        marginTop: "20px",
    },
    input: {
        margin: "2rem 0",
    },
    rightButton: {
        marginLeft: "auto",
    }
}));

const Step = (props) => {
    const classes = useStyles();
    const { numberOfSteps, activeStep, step, handleNext, handleBack, handleFinish, formData, setFormData } = props;

    const [formCheck, setFormCheck] = useState(true);

    const requiredFields = step?.filter((field) => field.required).filter((field) => 
        formData[field.name]?.toString().trim().length === 0 || formData[field.name] === null
    );

    useEffect(() => {
        const checkRequiredFields = () => {
            if(requiredFields?.length > 0) {
                return setFormCheck(true)
            } else {
                return setFormCheck(false)
            }
        };
        checkRequiredFields();
        // eslint-disable-next-line
    },[step,formData])

    return (
        <form>
        <Grid className={classes.root}>
            { step?.map((input,index) => (
                <FormControl className={classes.input} key={index} required={input.required} margin="dense">
                    { input.type === "text" && <TextInput input={input} formData={formData} setFormData={setFormData} /> }
                    { input.type === "multiline-text" && <TextMultilineInput input={input} formData={formData} setFormData={setFormData} /> }
                    { input.type === "yes-no" && <SwitchInput input={input} formData={formData} setFormData={setFormData} /> }
                </FormControl>
            ))}
            { formCheck && <Typography color="error">Please fill out all required fields before proceeding</Typography>}
            <Box className={classes.box}>
                { activeStep !== 0 && 
                    <Button variant="contained" color="primary" onClick={() => handleBack()}>Back</Button>
                }
                { activeStep === numberOfSteps - 1 ? (
                    <Button variant="contained" disabled={formCheck} className={classes.rightButton} color="primary" onClick={() => handleFinish()}>Finish</Button>
                ) : (
                    <Button variant="contained" disabled={formCheck} className={classes.rightButton} color="primary" onClick={() => handleNext()}>Next</Button>
                )}
            </Box>
        </Grid>
        </form>
    )
}

export default Step;