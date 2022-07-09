import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import {
    Box,
    Grid,
    Step,
    StepLabel,
    Stepper,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";
import { Step as StepScreen } from "./components/Onboarding";

const useStyles = makeStyles(() => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "700px",
        padding: "30px 50px",
        backgroundColor: "#F7F9FD",
    },
    stepper: {
        backgroundColor: "#F7F9FD",
    },
    leftButton: {
        justifySelf: "flex-start",
    },
    rightButton: {
        alignSelf: "flex-end",
    }
}));

const Onboarding = ({ user }) => {
    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState([]);
    
    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleFinish = async () => {
        let reqBody = {steps: [...steps]};
        reqBody.steps.forEach((step) => {
            step.forEach((field) => {
                delete field.label;
                delete field.type;
                delete field.required;
                field.value = formData[field.name]
            })
        });
        
        try {
            const { data, status } = await axios.post("/api/onboarding", reqBody);
            
            if (status === 200) {
                history.push("/");
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        if (!user || !user.id) {
            history.push("/login");
        }
    }, [user, history]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/onboarding");
            setSteps([...data.steps]);

            let newFormData = {}
            data.steps.flat().forEach((step) => {
                if(step.type === "yes-no") {
                    newFormData[step.name] = false
                } else {
                    newFormData[step.name] = ""
                }
            })

            setFormData(newFormData);
        };

        fetchData();
    },[])

    return (
        <Grid container justifyContent="center">
            <Box className={classes.wrapper}>
                <Stepper className={classes.stepper} activeStep={activeStep}>
                    {steps?.map((step,index) => {
                        return (
                            <Step key={index}>
                                <StepLabel>Step {index + 1}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <StepScreen 
                    numberOfSteps={steps.length} 
                    activeStep={activeStep} 
                    step={steps[activeStep]} 
                    handleNext={handleNext} 
                    handleBack={handleBack}
                    handleFinish={handleFinish}
                    formData={formData}
                    setFormData={setFormData}
                />
            </Box>
        </Grid>
    )
};

export default Onboarding;
