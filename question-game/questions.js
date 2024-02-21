import readlineSync from 'readline-sync';
import getName from '../src/cli.js';
import questionsBank from '../src/bank.js';

getName();

const randomIndex = Math.floor(Math.random() * questionsBank.length);

const playQuiz = () => {
    const randomQuestion = questionsBank[randomIndex];
    console.log(randomQuestion.question);
    
    if (Array.isArray(randomQuestion.answer)) {
        console.log('Возможные варианты ответов:');
        randomQuestion.answer.forEach((ans, index) => {
            console.log(`${index + 1}. ${ans}`);
        });
    }


    const userAnswers = readlineSync.question('Ваши ответы (через запятую без пробелов): ').split(',');

let correctCount = 0

    for (;correctCount < questionsBank[randomIndex].correctAnswers.length;) {
        if (userAnswers[correctCount] !== questionsBank[randomIndex].correctAnswers[correctCount]) {
            console.log(`Неправильно. Правильные ответы: ${randomQuestion.correctAnswers.join(', ')}`);
            break;
        } else if (userAnswers[correctCount] === questionsBank[randomIndex].correctAnswers[correctCount]) {
            correctCount += 1;
        }
    }
    if (correctCount === questionsBank[randomIndex].correctAnswers.length) {
        console.log('Правильно!')
    }
};

playQuiz();

