let player = window.document.querySelector('#polina');
let rightPosition = 0;
let topPosition = 0;
let canvas = window.document.querySelector('#canvas');
let full = window.document.querySelector('#full');
let music = window.document.querySelector('#music');
let audio = new Audio('assets/music.mp3');
audio.loop = true;
let animationId = null;
let direction = null;
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
    rightPosition = Math.min(rightPosition + 0.4, 93);
    player.style.left = `${rightPosition}vw`;
};

const moveLeft = () => {
    player.style.transform = "scale(-1,1)";
    rightPosition = Math.max(rightPosition - 0.4, -1);
    player.style.left = `${rightPosition}vw`;
};
const moveUp = () => {
    topPosition = Math.min(topPosition + 0.4, 56);
    player.style.bottom = `${topPosition}vw`;
}
const moveDown = () => {
    topPosition = Math.max(topPosition - 0.4, -1);
    player.style.bottom = `${topPosition}vw`;
}
function gameLoop() {
    if (direction === 'right') {
        moveRight();
    } else if (direction === 'left') {
        moveLeft();
    }
    if (direction === 'up') {
        moveUp();
    }
    if (direction === 'down') {
        moveDown();
    }
    
    animationId = requestAnimationFrame(gameLoop);
}
window.onkeydown = (event) => {
    if (event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В') {
        direction = 'right';
        if (!animationId) {
            gameLoop();
        }
    }
    if (event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф') {
        direction = 'left';
        if (!animationId) {
            gameLoop();
        }
    }
    if (event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц') {
        direction = 'up';
        if (!animationId) {
            gameLoop();
        }
    }
    if (event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
        direction = 'down';
        if (!animationId) {
            gameLoop();
        }
    }
};

window.onkeyup = (event) => {
    console.log("event checks")
    if (
        (direction === 'right' && (event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В')) ||
        (direction === 'left' && (event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф')) ||
        (direction === 'up' && (event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц')) ||
        (direction === 'down' && (event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы'))
    ) {
        direction = null;
        console.log("null direction")
    }
};