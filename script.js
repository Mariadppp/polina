let player = window.document.querySelector('#polina');
let rightPosition = 0;
let topPosition = 0;
let keys = {};
let coins = Array.from(document.querySelectorAll('.coin'));
let canvas = window.document.querySelector('#canvas');
let full = window.document.querySelector('#full');
let music = window.document.querySelector('#music');
let audio = new Audio('assets/music.mp3');
let screamerSound = new Audio('assets/screamerSound.mp3');
let score = 0;
const totalCoins = coins.length
audio.loop = true;
let animationId = null;
let direction = null;
let gameWon = false;
full.onclick = () => {
    if(window.document.fullscreen){
			window.document.exitFullscreen();
		}else{
			canvas.requestFullscreen();
		}
}
music.onclick = () => {
    if(audio.paused) {
        audio.play();
        music.src = 'assets/music.svg';
    } else {
        audio.pause();
        music.src = 'assets/noMusic.svg';
    }
}
const moveRight = () => {
    player.style.transform = "scale(1,1)";
    rightPosition = Math.min(rightPosition + 0.3, 93);
    player.style.left = `${rightPosition}vw`;
};

const moveLeft = () => {
    player.style.transform = "scale(-1,1)";
    rightPosition = Math.max(rightPosition - 0.3, -1);
    player.style.left = `${rightPosition}vw`;
};
const moveUp = () => {
    topPosition = Math.min(topPosition + 0.3, 56);
    player.style.bottom = `${topPosition}vw`;
}
const moveDown = () => {
    topPosition = Math.max(topPosition - 0.3, -1);
    player.style.bottom = `${topPosition}vw`;
}
function playSound() {
    let sound = new Audio('assets/eating.mp3');
    sound.play();
}
function showScreamer() {
    let screamer = document.querySelector('#screamer');
    screamer.style.display = 'flex';
}
function end() {
    screamer.style.display = 'none';
}

function gameLoop() {
    let moving = keys.right || keys.left || keys.up || keys.down;
    if (keys.right) {
        moveRight();
     } else if (keys.left) {
        moveLeft();
     }
     if (keys.up) {
        moveUp();
     } else if (keys.down) {
        moveDown();
     }
    
    animationId = requestAnimationFrame(gameLoop);

    for(let i = coins.length - 1; i >= 0; i--) {
        let coin = coins[i];
        if(!coin.dataset.collected) {
            let playerRect = player.getBoundingClientRect();
            let coinRect = coin.getBoundingClientRect();
            if(playerRect.left < coinRect.right && playerRect.right > coinRect.left && playerRect.top < coinRect.bottom && playerRect.bottom > coinRect.top) {
                coin.dataset.collected = 'true';
                coin.style.opacity = '0';
                playSound();
               
                setTimeout(() => {
                    coin.remove();
                    score++;
                    if(score === totalCoins && !gameWon) {
                        gameWon = true;
                        audio.pause();
                        music.src = 'assets/noMusic.svg';
                        screamerSound.play();
                        setTimeout(showScreamer);
                        setTimeout(end, 5000)
                    }
                }, 300);
            }
        }
    }
}
window.onkeydown = (event) => {
    if (event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В') {
        keys.right = true;
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф') {
        keys.left = true;
    }
    if (event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц') {
        keys.up = true;
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
        keys.down = true;
    }
    if (!animationId) {
        gameLoop();
    }
};

window.onkeyup = (event) => {
    console.log("event checks")
    if (event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В') {
        keys.right = false;
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф') {
        keys.left = false;
    }
    if (event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц') {
        keys.up = false;
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
        keys.down = false;
    }
};