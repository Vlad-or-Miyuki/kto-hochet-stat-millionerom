import readlineSync from 'readline-sync';

const getName = () => {
  console.log('Welcome to the Super Qustion Games 3000!');

  const name = readlineSync.question('Please write your name here: ');

  console.log(`Hello, ${name}!`);
  return name;
};

export default getName;