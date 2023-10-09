/* eslint-disable react/prop-types */
import { useState } from "react";
import { boxQuizBackground } from "./quiz_styles";
import { Box, Typography, List, ListItemButton } from "@mui/material";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIndex, setAnswerIndex] = useState(null); //When someone click on the answer, we can track the index
    const [answer, setAnswer] = useState(null); //Set answer to true if its the right one
    const [feedback, setFeedback] = useState(null);
    const [disabledList, setDisabledList] = useState(false);

    const { question, choices, correctAnswer } = questions[currentQuestion];

    //Move to next question
    const nextQuestion = () => {
        if (!questions[currentQuestion]) {
            setCurrentQuestion(currentQuestion + 1);
            //Set to default state
            setAnswerIndex(null);
            setAnswer(null);
            setFeedback(null);
            setDisabledList(false);
        } else {
            console.log("else");
        }
    };

    const onAnswerClick = (choice, index) => {
        setAnswerIndex(index);

        if (choice === correctAnswer) {
            setFeedback("You got it right!");
            setAnswer(true);
            //Need to disable the other inputs
            setDisabledList(true);

            setTimeout(() => {
                nextQuestion();
            }, 1000);
        } else {
            setFeedback("Wrong answer!");
            setAnswer(false);
            setDisabledList(true);
            //When user select the answer, go to the next question
            setTimeout(() => {
                nextQuestion();
            }, 1000);
        }
        // when time expires, check if answer is correct or wrong -> go to next question
    };

    return (
        //Box container = div with styles using sx
        <Box sx={boxQuizBackground}>
            <Typography //Display the position of the question
                component="span"
                color="white"
                className="active-question-no"
            >
                {currentQuestion + 1}
            </Typography>
            <Typography //Display the total question
                component="span"
                color="white"
                className="total-question"
            >
                /{questions.length}
            </Typography>

            <Typography color="white" variant="h6">
                {question}
            </Typography>

            <List>
                {choices.map((choice, index) => (
                    <ListItemButton
                        onClick={() => onAnswerClick(choice, index)}
                        key={choice}
                        disabled={disabledList}
                        sx={{
                            backgroundColor:
                                answerIndex === index
                                    ? "secondary.main"
                                    : "transparent",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "primary.light",
                            },
                        }}
                    >
                        {choice}
                    </ListItemButton>
                ))}
            </List>

            <Typography
                variant="h6"
                sx={{ color: answer === false ? "red" : "green" }}
            >
                {feedback}
            </Typography>
        </Box>
    );
};

export default Quiz;
