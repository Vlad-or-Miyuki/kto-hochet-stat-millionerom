import readlineSync from 'readline-sync';
import getName from '../src/cli.js';
import questionsBank from '../src/bank.js';
import fs from 'fs'

const name = getName()

console.log(`На данный момент в банке всего ${questionsBank.length - 1} вопросов.`)

let countQuestions = readlineSync.question('Напишите то кол-во вопросов, на которое хотите ответить: ');

while ((String(Number(countQuestions)) === 'NaN') || (questionsBank.length < Number(countQuestions)) || (Number(countQuestions) < 1)) {
    if (String(Number(countQuestions)) === 'NaN') {
        countQuestions = readlineSync.question('Это явно не число, давай по-нормальному: ')
    } else if (questionsBank.length < Number(countQuestions)) {
        countQuestions = readlineSync.question('Ну и как я должен выдать вопросов больше чем есть в банке? Ты головой то думай: ')
    } else if (Number(countQuestions) < 1) {
        countQuestions = readlineSync.question('Зачем ты вообще пришёл играть если не собираешься отвечать на вопросы? Гений: ')
    } else {
        countQuestions = readlineSync.question('Сорян бро, какая-то ошибочка, давай по новой: ')
    }
}

console.log('Вписывать ответы нужно в правильном регистре (так же как и в вариантах выбора) и через запятую без пробелов (если вы считаете что правильных ответов несколько).')
console.log('Так же ответы нужно вписывать в порядке возрастания, как вам предложено в списке выбора ответов.')
console.log('----------------------------------------------------------------------------')

let countForCircleQuestions = 0
let correctCount = 0
let deathZone = 0
let attempt = 0
let win = 0
let lose = 0

const player = {}

const playQuiz = () => {

    while (countForCircleQuestions < countQuestions) {

        const randomIndex = Math.floor(Math.random() * questionsBank.length);
        const randomQuestion = questionsBank[randomIndex];
        console.log(randomQuestion.question);
        console.log('Возможные варианты ответов:');

        randomQuestion.answer.forEach((ans, index) => {
            console.log(`${index + 1}. ${ans}`);
        });

        const userAnswers = readlineSync.question('Ваши ответы: ').split(',');

        for (;correctCount < questionsBank[randomIndex].correctAnswers.length;) {
            if (userAnswers[correctCount] !== questionsBank[randomIndex].correctAnswers[correctCount]) {
                console.log(`Неправильно. Правильные ответы: ${randomQuestion.correctAnswers.join(', ')}`);
                deathZone += 1
                break;
            } else if (userAnswers[correctCount] === questionsBank[randomIndex].correctAnswers[correctCount]) {
                correctCount += 1;
            }
        }

        if (correctCount === questionsBank[randomIndex].correctAnswers.length) {
            console.log('Правильно!')
            console.log('----------------------------------------------------------------------------')
            correctCount = 0
            countForCircleQuestions += 1
        }
        if (deathZone === 1) {
            break
        }
    }

    if (deathZone === 1) {
        console.log('Вы проиграли!')
        lose += 1
        attempt += 1
        deathZone = 0
    } else {
        win += 1
        attempt += 1
        console.log('Поздравляем вы выйграли!')
    }

    player.userName = name
    player.wins = win
    player.loses = lose
    player.attempts = attempt
    
    const addPlayer = (player) => {
        try {
            let players = [];
    
            if (fs.existsSync('src/players.json')) {
                const fileContent = fs.readFileSync('src/players.json', 'utf-8');
    
                if (fileContent.trim() !== '') {
                    players = JSON.parse(fileContent);
                }
            }
    
            const existingPlayer = players.find((p) => p.userName === player.userName);
    
            if (existingPlayer) {
                existingPlayer.wins += player.wins;
                existingPlayer.loses += player.loses;
                existingPlayer.attempts += player.attempts;
            } else {
                players.push(player);
            }
    
            fs.writeFileSync('src/players.json', JSON.stringify(players));
            console.log('Игрок успешно добавлен или обновлен.');
        } catch (error) {
            console.error('Произошла ошибка при чтении/записи файла:', error);
        }
    };
    addPlayer(player)    
};

lose = 0
attempt = 0
win = 0

playQuiz();

export default player