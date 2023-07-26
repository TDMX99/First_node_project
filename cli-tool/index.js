#!/usr/bin/env node
import chalk from "chalk";
import gradient from "gradient-string";
import inquirer from "inquirer";
import chalkAnimation from 'chalk-animation';
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log("Hello world");

let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow(
        'Who Wants To Be A Javascript Millionaire?\n'
    );

    await sleep();
    rainbowTitle.stop();

    console.log(`
    ${chalk.bgBlue('HOW TO PLAY')}
    I am a process on your computer.
    If you get nay question wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right...
    `)

}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'what is your name?',
        default() {
            return 'Player';
        }
    });

    playerName = answers.player_name;
}

async function question1() {
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'How many Infinity Stones are there?\n',
        choices: [
            '3',
            '5',
            '7',
            '6',
        ]
    });

    return handleAnswer(answers.question_1 == '6');
}

async function question2() {
    const answers = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'What is the name of Thor’s hammer?\n',
        choices: [
            'Vanir',
            'Aesir',
            'Mjolnir',
            'Norn',

        ]
    });

    return handleAnswer(answers.question_2 == 'Mjolnir');
}

async function question3() {
    const answers = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'What is Captain America’s shield made of?\n',
        choices: [
            'Adamantium',
            'Vibranium',
            'Promethium',
            'Carbonadium',
        ]
    });

    return handleAnswer(answers.question_3 == 'Vibranium');
}

async function question4() {
    const answers = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'What is the alien race Loki sends to invade Earth in The Avengers?\n',
        choices: [
            'The Skrulls',
            'The Chitauri',
            'The Kree',
            'The Flerkens',
        ]
    });

    return handleAnswer(answers.question_4 == 'The Chitauri');
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}. That's a legit answer` });
    } else {
        spinner.error({ text: ` 💀💀💀 Game over, you lose ${playerName}!` });
        process.exit(1);
    }
}

function winner() {
    console.clear();
    const msg = `Congrats , ${playerName} !\n $ 1 , 0 0 0 , 0 0 0 `;
    figlet(msg, (err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await winner();


