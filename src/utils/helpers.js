export function formatQuestion(question, author, authedUser) {
    const {id, optionOne, optionTwo, timestamp} = question;
    const {name, avatarURL, answers} = author;

    return {
        id,
        timestamp,
        optionOne,
        optionTwo,
        authorName: name,
        authorAvatar: avatarURL,
        userAnswer: answers[authedUser]
    }
}
