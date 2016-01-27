'use strict';

const readline = require('readline');
const gcd = require('gcd');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askForIntegers() {
  rl.question('Which are the integers?\n', printGCD);
}

function printGCD(input) {
  const integers = input.split(' ')
    .map((str) => {
      return parseInt(str, 10);
    });

  if (integers.length !== 2) {
    rl.write('Input cannot be parsed!');
    return askForIntegers();
  }

  rl.write(`GCD is: ${gcd(integers[0], integers[1])}\n\n`);
  return askForIntegers();
}

askForIntegers();
