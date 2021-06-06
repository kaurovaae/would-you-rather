import {saveQuestion, saveQuestionAnswer} from "../utils/api";
import {showLoading, hideLoading} from "react-redux-loading";
import {saveUser} from '../actions/users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export const handleAddQuestion = (optionOneText, optionTwoText) => {
    return (dispatch, getState) => {
        const {authedUser, users} = getState();

        const user = users[authedUser];
        const userQuestions = user.questions || [];

        dispatch(showLoading());

        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
            .then(tweet => {
                dispatch(addQuestion(tweet));
                dispatch(saveUser({
                    ...user,
                    questions: userQuestions.concat([tweet.id])
                }));
            })
            .then(() => dispatch(hideLoading()))
    }
};

function saveAnswer(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export const handleSaveAnswer = (qid, answer) => {
    return (dispatch, getState) => {
        dispatch(showLoading());

        const {authedUser, users, questions} = getState();

        const user = users[authedUser];
        const question = questions[qid];
        const votes = question[answer].votes || [];

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
            .then(() => {
                dispatch(saveAnswer({
                    ...question,
                    [answer]: {
                        ...question[answer],
                        votes: votes.concat([user.id])
                    }
                }));
                dispatch(saveUser({
                    ...user,
                    answers: {
                        ...user.answers,
                        [qid]: answer
                    }
                }));
            })
            .then(() => dispatch(hideLoading()))
    }
};
