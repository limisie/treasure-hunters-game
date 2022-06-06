import paths from '../../assets/paths/imagePaths.js';

const container = document.getElementsByClassName('container')[0];
const textContainer = document.getElementsByClassName('centered')[0];

const img = document.createElement('img');
const scoreText = document.createElement('p');
container.appendChild(img);
textContainer.appendChild(scoreText);


export const gameOver = (score = 0) => {
    img.src = paths.gameOver.path;
    scoreText.innerText = `score: ${score}`;
    container.style.display = 'flex';
};

export const youWon = (score = 0) => {
    img.src = paths.youWon.path;
    scoreText.innerText = `score: ${score}`;
    container.style.display = 'flex';
};
