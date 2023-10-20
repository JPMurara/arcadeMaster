import { useState, useRef, useEffect } from "react";
import Countdown from "react-countdown";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./app_styles.js";
import Quiz from "./Quiz";
import SelectCategory from "./SelectCategory";
import Header from "./Header";
import Footer from "./Footer";
import Scoreboard from "./Scoreboard";

function App() {
    const [categoryId, setCategoryId] = useState(null);
    const [open, setOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [lives, setLives] = useState(5);

    const decrementLives = () => {
        setLives((prevLives) => {
            const updatedLives = prevLives - 1;
            if (updatedLives <= 0) {
                setOpen(true);

                setOpen(true);
                setTimeout(() => {
                    setIsGameOver(true);
                }, 2000); // wait for 1 second or adjust as needed
                return 0;
            }
            return updatedLives;
        });
    };

    //   renderer is used to edit how the Countdown displays the time
    const renderer = ({ seconds }) => {
        let countdownStyles = { color: "white" };
        if (seconds <= 10) {
            countdownStyles = { color: "yellow" };
        }
        if (seconds <= 5) {
            countdownStyles = { color: "red" };
        }
        return <div style={countdownStyles}>{seconds} seconds</div>;
    };

    const [forceRerender, setForceRerender] = useState(false);
    const endTimeRef = useRef(Date.now() + 15000);
    const resetTimer = () => {
        endTimeRef.current = Date.now() + 15000;
        setForceRerender((prev) => !prev);
    };

    //   Countdown library
    const timer = (
        <Countdown
            date={endTimeRef.current}
            onComplete={() => timeUp()}
            renderer={renderer}
        />
    );
    // called when the countdown ends
    const timeUp = () => {
        setOpen(true);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={
                            isGameOver ? (
                                <Scoreboard
                                    score={score}
                                    isGameOver={isGameOver}
                                />
                            ) : !categoryId ? (
                                <SelectCategory
                                    onCategorySelected={setCategoryId}
                                />
                            ) : (
                                <Quiz
                                    categoryId={categoryId}
                                    setOpen={setOpen}
                                    open={open}
                                    score={score}
                                    setScore={setScore}
                                    setIsGameOver={setIsGameOver}
                                    lives={lives}
                                    setLives={setLives}
                                    decrementLives={decrementLives}
                                    timer={timer}
                                    resetTimer={resetTimer}
                                />
                            )
                        }
                    />

                    <Route
                        path="/scoreboard"
                        element={
                            <Scoreboard score={score} isGameOver={isGameOver} />
                        }
                    />
                </Routes>
                <Footer />
            </Router>
        </ThemeProvider>
    );
}

export default App;
