// variables
let cnv = document.getElementById("Game");
let ctx = cnv.getContext('2d')

document.addEventListener("keydown", movement)
document.addEventListener("keyup", stopmove)
// epik variables
let GameTime = 0;
let Timer = 240
let GameState = "Menu"
let HealthPak
let HealthArray = []
let HealthTime = 0
// Images
let Background1 = document.getElementById("background")

//  Epic Music, Baby
let TitleMusic = new Audio('Music/TitleSong.mp3');
let StartMusic = new Audio('Music/Start.mp3');
let MidHpMusic = new Audio('Music/MidHP.mp3');
let SemiHpMusic = new Audio('Music/SemiHP.mp3');
let LowHpMusic = new Audio('Music/LowHP1.mp3');
let EndingMusic = new Audio('Music/lose.mp3');
let HitSound = new Audio('Music/Hit.mp3');

let Player1 = {
    x: 25,
    y: 50,
    w: 60,
    h: 140,
    MaxY : 320,
    jump: false,
    Crouching: false,
    moveX: 0,
    moveY: 9.81,
    health: 20,
    JumpCount: 0,
    face: "right",
    State: "free",
    attackBox: {
        w: 80,
        h: 40,
        x: 0,
        y: 0,
        c: 'Yellow'
    },

}

let Player2 = {
    x: 960,
    y: 50,
    w: 60,
    h: 140,
    MaxY : 320,
    jump: false,
    Crouching: false,
    moveX: 0,
    moveY: 9.81,
    health: 20,
    JumpCount: 0,
    face: "left",
    State: "free",
    attackBox: {
        w: 80,
        h: 40,
        x: 0,
        y: 0,
    },
}
// updates game time at 1/1th of a second
setInterval(UpdateTime, 1000)
function UpdateTime() {
    GameTime += 1
    CountDown()
}

// I know you're watching
function CountDown() {
    if ( GameState === "Play") {
        Timer -= 1
    }
}

function reset() {
    GameState = "Play"
    Player1 = {
        x: 25,
        y: 50,
        w: 60,
        h: 140,
        jump: false,
        Crouching: false,
        moveX: 0,
        moveY: 9.81,
        health: 20,
        JumpCount: 0,
        face: "right",
        State: "free",
        attackBox: {
            w: 80,
            h: 40,
            x: 0,
            y: 0,
            c: 'Yellow'
        },
    }

    Player2 = {
        x: 960,
        y: 50,
        w: 60,
        h: 140,
        jump: false,
        Crouching: false,
        moveX: 0,
        moveY: 9.81,
        health: 20,
        JumpCount: 0,
        face: "left",
        State: "free",
        attackBox: {
            w: 80,
            h: 40,
            x: 0,
            y: 0,
        },
    }

    Timer = 240
}

// simulates gravity of da earth which is -9.81 m/s
function Gravity() {
    if ( Player1.y >= Player1.MaxY) {
        Player1.y = Player1.MaxY
    } else if (Player1.y <= 320 && Player1.jump === false) {
        Player1.moveY = 9.81
    }
    if (Player2.y >= Player2.MaxY) {
        Player2.y = Player2.MaxY
    } else if (Player2.y <= 320 && Player2.jump === false) {
        Player2.moveY = 9.81
    }
    if (Player1.y <= 20) {
        Player1.moveY = 9.81
    }
    if (Player2.y <= 20) {
        Player2.moveY = 9.81
    }
}

// Handles the gravity and drawing for health packs so they're not mixed with the player's 
function HealthGrav() { 

    for( let i = 0; i < HealthArray.length; i++ ) {
        if (HealthArray[i].y > 460 || HealthArray[i].y === 450)  {
            HealthArray[i].y = 450
        } else {
            HealthArray[i].y += 9.81
        }
        
    
        ctx.fillStyle = HealthArray[i].c
        ctx.fillRect(HealthArray[i].x, HealthArray[i].y, HealthArray[i].h, HealthArray[i].w)
        PlayerHeal(HealthArray[i].x, HealthArray[i].y, HealthArray[i].h, HealthArray[i].w, i)
    }
}

function PlayerHeal(x, y, w, h, index) {

    if (Player1.x < x + w &&
        Player1.x + Player1.w > x &&
        Player1.y < y + h &&
        Player1.h + Player1.y > y
    ) {
        Player1.health += 1
        console.log(`YOU'RE HEALING`)
        HealthArray.splice(index, 1)
    }

    if (Player2.x < x + w &&
        Player2.x + Player2.w > x &&
        Player2.y < y + h &&
        Player2.h + Player2.y > y
    ) {
        Player2.health += 1
        console.log(`YOU'RE HEALING`)
        HealthArray.splice(index, 1)
    }

}

// Makes you counteract the force of gravity which is -9.81 m/s
function Jump(Player) {
    if (Player === 1 && Player1.JumpCount > 2) {
        Player1.moveY = 12
        console.log("YaFalled")
    } else if (Player === 2 && Player2.JumpCount > 2) {
        console.log("YaFalled")
        Player2.moveY = 12
    }
    if (Player === 1 && Player1.JumpCount <= 2) {
        Player1.moveY = -12
        console.log("Yajumped")
    } else if (Player === 2 && Player2.JumpCount <= 2) {
        console.log("Yajumped")
        Player2.moveY = -12
    }
}

// Draws health UI
function DrawUI() {
    // the Random Letters here are just for calculations, because I couldn't be bothered to give em a unique name for each
    let B = 120

    if (Player1.health < 15) {
        let C = Player1.health - 5
        let D = C * 8
        B += D;
    }

    let A = Player1.x - B

    for (n = 0; n < Player1.health; n++) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(A, Player1.y - 20, 10, 10)
        A += 15
    }


    let E = 120

    if (Player2.health < 15) {
        let T = Player2.health - 5
        let G = T * 8
        E += G;
    }

    let T = Player2.x - E

    for (n = 0; n < Player2.health; n++) {
        ctx.fillStyle = "rgb(255, 0, 234)";
        ctx.fillRect(T, Player2.y - 20, 10, 10)
        T += 15
    }

}

MovePlayers = () => {
    Player1.y += Player1.moveY
    Player1.x += Player1.moveX

    Player2.x += Player2.moveX
    Player2.y += Player2.moveY
}

function DrawPlayers() {
    
    if (Player1.Crouching === true) {
        Player1.h = 92
        Player1.MaxY = 390
    } else {
        Player1.h = 140
        Player1.MaxY = 320
    }

    if (Player2.Crouching === true) {
        Player2.h = 92
        Player2.MaxY = 390
    } else {
        Player2.h = 140
        Player2.MaxY = 320
    }

    ctx.fillStyle = 'lime'
    ctx.fillRect(Player1.x, Player1.y, Player1.w, Player1.h)

    ctx.fillStyle = 'Red'
    ctx.fillRect(Player2.x, Player2.y, Player2.w, Player2.h)
}

DrawStuff = () => {
    ctx.clearRect(0, 0, 1264, 480)
    ctx.drawImage(Background1, 0,0)
}

// Handles Players controls with Event Listener
function movement(_event) {

    if (event.code == "ArrowUp" && Player2.JumpCount <= 2) {
        Player2.jump = true
        Jump(2)
    } else if (event.code == "ArrowDown") {
        Player2.Crouching = true
    } else if (event.code == "ArrowLeft") {
        Player2.moveX = -10
        Player2.face = "left"
    } else if (event.code == "ArrowRight") {
        Player2.moveX = 10
        Player2.face = "right"
    }

    if (event.code == "KeyW" && Player1.JumpCount <= 2) {
        Player1.jump = true
        Jump(1)
    } else if (event.code == "KeyS") {
        Player1.Crouching = true
    } else if (event.code == "KeyA") {
        Player1.moveX = -10
        Player1.face = "left"
    } else if (event.code == "KeyD") {
        Player1.moveX = 10
        Player1.face = "right"
    } else if (event.code == "KeyJ" && Player1.State === "attack") {
        Attack(1)
    } else if (event.code == "KeyK" && Player1.State === "attack") {
        HeavyAttack(1)
    } else if (event.code == "KeyL" && Player1.State === "free") {
        Player1.State = "attack"
    } else if (event.code == "KeyL" && Player1.State === "attack") {
        Player1.State = "free"
    }



    if (event.code == "Numpad1" && Player2.State === "attack") {
        Attack(2)
    } else if (event.code == "Numpad2" && Player2.State === "attack") {
        HeavyAttack(2)
    } else if (event.code == "Numpad3" && Player2.State === "attack") {
        Player2.State = "free"
    } else if (event.code == "Numpad3" && Player2.State === "free") {
        Player2.State = "attack"
    } else if (event.code == "Numpad4") {

    } else if (event.code == "Numpad5") {
    }

    if( event.code === "Space" && GameState === "Menu") {
        GameState = "Play"
    } else if ( event.code === "Space" && GameState === "End") {
        reset()
    }
}

function RenderAttacks( ) {

    if (Player1.State === "attack") {
        if (Player1.face === "right") {
            Player1.attackBox.x = Player1.x + 40
        } else {
            Player1.attackBox.x = Player1.x - 60
        }

        Player1.attackBox.y = Player1.y + 20
        ctx.fillStyle = 'Yellow'
        ctx.fillRect(Player1.attackBox.x, Player1.attackBox.y, Player1.attackBox.w, Player1.attackBox.h)
    }

    if (Player2.State === "attack") {
        if (Player2.face === "right") {
            Player2.attackBox.x = Player2.x + 40
        } else {
            Player2.attackBox.x = Player2.x - 60
        }

        Player2.attackBox.y = Player2.y + 20
        ctx.fillStyle = 'Cyan'
        ctx.fillRect(Player2.attackBox.x, Player2.attackBox.y, Player2.attackBox.w, Player2.attackBox.h)


    }

}

function Wraparound() {
    if (Player1.x < -60) {
        Player1.x = 1264
    } else if (Player1.x > 1324) {
        Player1.x = -40
    }
    if (Player2.x < -60) {
        Player2.x = 1264
    } else if (Player2.x > 1324) {
        Player2.x = -40
    }
}

// Handles Players Attack function
function Attack(Player) {

    if (Player === 1 && Player1.State === "attack") {
        Player1.attackBox.h = 40

        if (Player1.attackBox.x < Player2.x + Player2.w &&
            Player1.attackBox.x + Player1.attackBox.w > Player2.x &&
            Player1.attackBox.y < Player2.y + Player2.h &&
            Player1.attackBox.h + Player1.attackBox.y > Player2.y && Player === 1
        ) {
            Player2.health -= 2
            Player1.attackBox.c = "red"
            console.log(`YOU'RE HURTING HIM`)

            if (Player1.face === "left") {
                Player2.moveX += -24
            } else {
                Player2.moveX += 24
            }
            HitSound.play()
        }
    }

    if (Player === 2 && Player2.State === "attack") {
        Player2.attackBox.h = 40
        if (Player2.attackBox.x < Player1.x + Player1.w &&
            Player2.attackBox.x + Player2.attackBox.w > Player1.x &&
            Player2.attackBox.y < Player1.y + Player1.h &&
            Player2.attackBox.h + Player2.attackBox.y > Player1.y
        ) {
            Player1.health -= 2
            Player2.attackBox.c = "red"
            console.log(`YOU'RE HURTING HIM`)

            if (Player2.face === "left") {
                Player1.moveX += -12
            } else {
                Player1.moveX += 12
            }
            HitSound.play()
        }
    }
}

// Same as last one but with Bigger Attacks 
function HeavyAttack(Player) {

    if (Player === 1 && Player1.State === "attack") {
        Player1.attackBox.h = 80

        if (Player1.attackBox.x < Player2.x + Player2.w &&
            Player1.attackBox.x + Player1.attackBox.w > Player2.x &&
            Player1.attackBox.y < Player2.y + Player2.h &&
            Player1.attackBox.h + Player1.attackBox.y > Player2.y && Player === 1
        ) {
            Player2.health -= 1
            Player1.attackBox.c = "red"
            console.log(`YOU'RE HURTING HIM`)

            if (Player1.face === "left") {
                Player2.moveX += -48
            } else {
                Player2.moveX += 48
            }
            HitSound.play()
        }
    }

    if (Player === 2 && Player2.State === "attack") {
        Player2.attackBox.h = 80
        if (Player2.attackBox.x < Player1.x + Player1.w &&
            Player2.attackBox.x + Player2.attackBox.w > Player1.x &&
            Player2.attackBox.y < Player1.y + Player1.h &&
            Player2.attackBox.h + Player2.attackBox.y > Player1.y
        ) {
            Player1.health -= 1
            Player2.attackBox.c = "red"
            console.log(`YOU'RE HURTING HIM`)

            if (Player2.face === "left") {
                Player1.moveX += -48
            } else {
                Player1.moveX += 48
            }
            HitSound.play()
        }
    }
}

function freePlayer(player) {
    if (player === 1) {
        Player1.State = "free"
    } else {
        Player2.State = "free"
    }
}

function stopmove() {
    if (event.code == "ArrowDown") {
        Player2.Crouching = false
    } else if (event.code == "ArrowLeft") {
        Player2.moveX = 0
    } else if (event.code == "ArrowRight") {
        Player2.moveX = 0
    }

    if (event.code == "KeyS") {
        Player1.Crouching = false
    } else if (event.code == "KeyA") {
        Player1.moveX = 0
    } else if (event.code == "KeyD") {
        Player1.moveX = 0
    }
}

function drawTimer() {
    ctx.fillStyle = "red"
    ctx.fillRect (560, 0, 60 ,60)
    ctx.fillStyle = "yellow"
    ctx.font = "20px Georgia";
    ctx.fillText (Timer, 570, 30)

}


function GameStatesHandler() {
    if (GameState === "Play") {
        DrawGame()
        TitleMusic.pause()
    } else if (GameState === "Menu") {
        DrawMenu()
        TitleMusic.play()
    } else if (GameState === "End") {
        DrawDeath()
    }
}

function DrawDeath() {
    LowHpMusic.pause()
    SemiHpMusic.pause()
    MidHpMusic.pause()
    StartMusic.pause()    

    ctx.font = "80px Georgia";

    if (Player1.health > 0) { 
        ctx.fillStyle = 'lime'
        ctx.fillText (`Player 1 Wins!`, 10, 80)
    } else if (Player2.health > 0) {
        ctx.fillStyle = 'red'
        ctx.fillText (`Player 2 Wins!`, 10, 80)
    } else {
        ctx.fillStyle = 'white'
        ctx.fillText (`No One Wins!`, 10, 80)
    }

    EndingMusic.play()
    ctx.fillStyle = 'white'
    ctx.font = "20px Georgia";
    ctx.fillText (`Press Space To restart`, 500, 420)
}

function DrawMenu() {

}

function CheckDeath() {
    if (Timer <= 0) {
        GameState = "End"
    } else if (Player1.health <= 0 || Player2.health <= 0) {
        GameState = "End"
        console.log("Dead")
    }
}

function DrawMenu() {
    ctx.font = "80px Georgia";
    ctx.fillStyle = 'white'
    ctx.fillText (`epic Fighting Game`, 290, 80)
    ctx.font = "20px Georgia";
    ctx.fillText (`Press Space To start`, 500, 420)
}

function Music() {
    if (Player1.health <= 5 || Player2.health <= 5 ) {
        SemiHpMusic.pause()
        LowHpMusic.play()
    } else if (Player1.health <= 10 || Player2.health <= 10) {
        MidHpMusic.pause()
        SemiHpMusic.play()
    } else if (Player1.health <= 15 || Player2.health <= 15) {
        StartMusic.pause()
        MidHpMusic.play()
    } else {
        StartMusic.play()
    }

}

function spawnHealth() {
    HealthPak = {
        x: 20,
        y: 20,
        w: 20,
        h: 20,
        c: '',
    }

    HealthPak.x = RanDec (20, 1245)
    HealthPak.c = rRGB()
    return HealthArray.push(HealthPak)
}

function healthInterval() {
    if (GameTime >= HealthTime + 8) {
        console.log("HealthSpawned")
        HealthTime = GameTime
        spawnHealth()
    }
}

// returns a random number
function RanDec(low, high) {
    return Math.random() * (high - low) + low
}
// Returns a random integer between a low and high number
function RanInt(low, high) {
    return Math.floor(RanDec(low, high));
}

// returns a random colour
function rRGB() {
    return `rgb(${RanInt(0,255)}, ${RanInt(0,255)}, ${RanInt(0,255)})`
}

// Calls alnmost all the functions that were made before this point
function DrawGame() {
    DrawStuff()
    DrawUI()
    MovePlayers()
    DrawPlayers()
    Gravity()
    HealthGrav()
    healthInterval()
    Wraparound()
    RenderAttacks()
    drawTimer()
    CheckDeath()
    Music()
}

// animation stuff
requestAnimationFrame(Game)
function Game() {
    GameStatesHandler()
    requestAnimationFrame(Game)
}