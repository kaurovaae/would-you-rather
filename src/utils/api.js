import {
    _getUsers,
    _getQuestions,
    _saveQuestion,
    _saveQuestionAnswer,
    _checkPassword
} from './_DATA';

export function getInitialData() {
    return Promise.all([
        _getUsers(),
        _getQuestions()
    ]).then(([users, questions]) => ({
        users,
        questions
    }))
}

export function saveQuestion(question) {
    return _saveQuestion(question);
}

export function saveQuestionAnswer(info) {
    return _saveQuestionAnswer(info);
}

export function checkPassword(login, password) {
    return _checkPassword(login, password)
}
