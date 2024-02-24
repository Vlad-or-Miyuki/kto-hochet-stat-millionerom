import readlineSync from 'readline-sync';

const getName = () => {
  console.log('Добро пожаловать в супер игру "3000 впоросов!"');

  const name = readlineSync.question('Пожалуйста напишите своё имя: ');

  console.log(`Приветствуем, ${name}!`);
  
  return name;
};

export default getName;