let exploded = localStorage.getItem("exploded") || "false";
let finalMessage = localStorage.getItem("finalMessage") || "false";
let firstMessage = localStorage.getItem("firstMessage") || "false";

const happinessAndABomb = document.getElementById("happinessAndABomb");
const bomb = document.getElementById("pixelBomb");
const guilt = document.getElementById("guilt");
const tombstone = document.getElementById("tombstone");
const bombExplosionSFX = document.getElementById("bombExplosionSFX");
const bombExplosion = document.getElementById("bombExplosion");
const evilPersonDetected = document.getElementById("evilPersonDetected");

// set the page properties for evil persons only
document.addEventListener("DOMContentLoaded", function() {
    if (exploded === "true") {
        let refreshCount = localStorage.getItem("refreshCount");

        /*
        // 5sec reset timer for testing
        setTimeout(function() {
            localStorage.setItem("exploded", "false");
            localStorage.setItem("finalMessage", "false");
            localStorage.setItem("firstMessage", "false");
            location.reload();
        }, 5000);
        */

        // tombstone fade in only on first visit
        if (firstMessage === "true") { 
            tombstone.style.transition = "none";
        } else {
            tombstone.style.transition = "opacity 3s ease-in-out";
        }

        guilt.style.visibility = "visible";
        guilt.style.opacity = "1";
        tombstone.style.visibility = "visible";
        tombstone.style.opacity = "1";
        happinessAndABomb.style.visibility = "hidden";

        if (refreshCount === null) {
            refreshCount = 0;
        }
        refreshCount++;
        localStorage.setItem("refreshCount", refreshCount);

        // change title cuz my poor cat is gone
        document.title = "What used to be my cat";

        // guilt tripping
        switch (refreshCount) {
            case 1:
                guilt.textContent = "You killed him...";
                localStorage.setItem("firstMessage", "true");
                break;
            case 2:
                guilt.textContent = "He's gone...";
                break;
            case 3:
                guilt.textContent = "He's never coming back...";
                break;
            case 4:
                guilt.textContent = "You can keep refreshing but it won't bring him back...";
                break;
            case 5:
                guilt.textContent = "I miss him so much...";
                break;
            case 6:
                guilt.textContent = "Why would you do that...";
                break;
            default:
                guilt.textContent = "I hate you :(";
                if (finalMessage === "false") { 
                    localStorage.setItem("finalMessage", "true");
                } else {
                    guilt.style.transition = "none";
                }
                break;
        }
    } else {
        happinessAndABomb.style.visibility = "visible";
        bomb.style.visibility = "visible";
    }
});

(function oneko() {
    const nekoEl = document.createElement("div");
    let nekoPosX = 32;
    let nekoPosY = 32;
    let mousePosX = 0;
    let mousePosY = 0;
    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation = null;
    let idleAnimationFrame = 0;
    const nekoSpeed = 10;
    const spriteSets = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratch: [
            [-5, 0],
            [-6, 0],
            [-7, 0],
        ],
        tired: [[-3, -2]],
        sleeping: [
            [-2, 0],
            [-2, -1],
        ],
        N: [
            [-1, -2],
            [-1, -3],
        ],
        NE: [
            [0, -2],
            [0, -3],
        ],
        E: [
            [-3, 0],
            [-3, -1],
        ],
        SE: [
            [-5, -1],
            [-5, -2],
        ],
        S: [
            [-6, -3],
            [-7, -2],
        ],
        SW: [
            [-5, -3],
            [-6, -1],
        ],
        W: [
            [-4, -2],
            [-4, -3],
        ],
        NW: [
            [-1, 0],
            [-1, -1],
        ],
    };

    function create() {
        if (exploded === "true") {
            return;
        }
        nekoEl.id = "oneko";
        nekoEl.style.width = "32px";
        nekoEl.style.height = "32px";
        nekoEl.style.scale = "2";
        nekoEl.style.position = "fixed";
        nekoEl.style.backgroundImage = "url('./media/oneko.gif')";
        nekoEl.style.imageRendering = "pixelated";

        // put the cat in the middle of the screen
        nekoPosX = window.innerWidth / 2;
        nekoPosY = window.innerHeight / 2;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;

        document.body.appendChild(nekoEl);

        document.onmousemove = (event) => {
            mousePosX = event.clientX;
            mousePosY = event.clientY;
        };

        window.onekoInterval = setInterval(frame, 100);
    }

    // self explanatory but comment to be nice :)
    function checkCollision() {
        const bombRect = bomb.getBoundingClientRect();
        const nekoRect = nekoEl.getBoundingClientRect();
    
        // Offsets to change the distance between life and death for the cat
        const xOffset = 10;
        const yOffset = 10;
    
        if (
            bombRect.left < (nekoRect.right - xOffset) &&
            bombRect.right > (nekoRect.left + xOffset) &&
            bombRect.top < (nekoRect.bottom - yOffset) &&
            bombRect.bottom > (nekoRect.top + yOffset)
        ) {
            explode();
        }
    }
    
    // self explanatory but rip cat
    function explode() {
        clearInterval(window.onekoInterval);
        bombExplosionSFX.play();
        
        bombExplosion.style.visibility = "visible";
        setTimeout(() => {
            bombExplosion.style.visibility = "hidden";
        }, 1500);
    
        bomb.style.visibility = "hidden";
        nekoEl.style.visibility = "hidden";
        happinessAndABomb.style.visibility = "hidden";
    
        evilPersonDetected.style.visibility = "visible";
        setTimeout(() => {
            evilPersonDetected.style.opacity = "1";
        }, 2500);
        
        localStorage.setItem("exploded", "true");
        localStorage.setItem("refreshCount", "0");
        document.title = "Oh no...";
    }
    

    function setSprite(name, frame) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${
            sprite[1] * 32
        }px`;
    }

    function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
    }

    function idle() {
        idleTime += 1;

        // every ~ 20 seconds
        if (
            idleTime > 10 &&
            Math.floor(Math.random() * 200) == 0 &&
            idleAnimation == null
        ) {
            idleAnimation = ["sleeping", "scratch"][
                Math.floor(Math.random() * 2)
            ];
        }

        switch (idleAnimation) {
            case "sleeping":
                if (idleAnimationFrame < 8) {
                    setSprite("tired", 0);
                    break;
                }
                setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                if (idleAnimationFrame > 192) {
                    resetIdleAnimation();
                }
                break;
            case "scratch":
                setSprite("scratch", idleAnimationFrame);
                if (idleAnimationFrame > 9) {
                    resetIdleAnimation();
                }
                break;
            default:
                setSprite("idle", 0);
                return;
        }
        idleAnimationFrame += 1;
    }

    function frame() {
        frameCount += 1;
        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        if (distance < nekoSpeed || distance < 48) {
            idle();
            return;
        }

        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
            setSprite("alert", 0);
            // count down after being alerted before moving
            idleTime = Math.min(idleTime, 7);
            idleTime -= 1;
            return;
        }

        direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        checkCollision();
    }

    create();
})();
