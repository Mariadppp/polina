let gameMenu = document.querySelector('#menu');
let game1 = document.querySelector('#game1');
let game2 = document.querySelector('#game2');
let game3 = document.querySelector('#game3');
let canvas = document.querySelector('#canvas');
let canvas2 = document.querySelector('#canvas2');
game1.onclick = () => startGame(1);
game2.onclick = () => startGame(2);
game3.onclick = () => startGame(3);
function startGame(gameNumber) {
    canvas.style.display = 'none';
    canvas2.style.display = 'none';
    gameMenu.style.display = 'none';
    if (gameNumber === 1) {
        canvas.style.display = 'block';
        document.body.style.cursor = 'default';
        loadGame1();
    } else if (gameNumber === 2) {
        canvas2.style.display = 'block';
        loadGame2();
    } else if (gameNumber === 3) {
        loadGame3();
    }
}

function loadGame1() {
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
let screamer = document.querySelector('#screamer');
let score = 0;
const totalCoins = coins.length
audio.loop = true;
let animationId = null;
let gameWon = false;
screamer.style.display = 'none';
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
let homeButton = document.querySelector('#home');
homeButton.onclick = () => exitGame();

function exitGame() {
    gameMenu.style.display = 'flex';
    canvas.style.display = 'none';
    audio.pause();
    music.src = 'assets/noMusic.svg';
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
    screamer.style.display = 'flex';
    screamer.style.zIndex = '1000';
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
                        setTimeout(showScreamer, 100);
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
    if (event.key === 'Escape') {
        exitGame();
    };
};

};

function loadGame2() {
    let cat1 = window.document.querySelector('#cat1');
    let cat2 = window.document.querySelector('#cat2');
    let cat3 = window.document.querySelector('#cat3');
    let canvas2 = window.document.querySelector('#canvas2');
    let targetX = 0;
    let targetY = 0;
    let hand1 = document.querySelector('.hand1');
    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX - hand1.offsetWidth / 2;
        targetY = e.clientY - hand1.offsetHeight / 2;
    });
    document.body.style.cursor = 'none';
    function updatePosition() {
    hand1.style.left = hand1.offsetLeft + (targetX - hand1.offsetLeft) * 0.5 + 'px';
    hand1.style.top = hand1.offsetTop + (targetY - hand1.offsetTop) * 0.5 + 'px';
    requestAnimationFrame(updatePosition);
}
updatePosition();
let homeButton = document.querySelector('#home');
homeButton.onclick = () => exitGame();

function exitGame() {
    gameMenu.style.display = 'flex';
    canvas2.style.display = 'none';
}
document.addEventListener('mousedown', (e) => {
    hand1.src = 'assets/hand2.png';
});
document.addEventListener('mouseup', (e) => {
    hand1.src = 'assets/hand1.png';
});
cat1.onclick = () => {
    let catSound = new Audio('assets/murchit.mp3');
    catSound.play();
};
cat2.onclick = () => {
    let catSound2 = new Audio('assets/meow1.mp3');
    catSound2.play();
};
cat3.onclick = () => {
    let catSound3 = new Audio('assets/meow2.mp3');
    catSound3.play();
};
window.onkeyup = (event) => {
    console.log("event checks")
    if (event.key === 'Escape') {
        exitGame();
    };
};}