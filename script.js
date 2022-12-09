// variables
let cnv = document.getElementById("Game");
let ctx = cnv.getContext('2d')

document.addEventListener("keydown", movement)
document.addEventListener("keyup", stopmove)

let GameTime = 0;
let Player1 = {
    x: 25,
    y: 50,
    w: 60,
    h: 140,
    jump: false,
    Crouching: false,
    moveX: 0,
    moveY: 9.81,
    health: 10,
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
    jump: false,
    Crouching: false,
    moveX: 0,
    moveY: 9.81,
    health: 10,
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

setInterval(UpdateTime, 125)
function UpdateTime () {
    GameTime+= 1
}

// simulates gravity of da earth which is -9.81 m/s
function Gravity() {
    if (Player1.y >= 320) {
        Player1.y = 320
    } else if (Player1.y <= 320 && Player1.jump === false) {
        Player1.moveY = 9.81
    }
    if (Player2.y >= 320 ) {
        Player2.y = 320
    } else if (Player2.y <= 320 && Player2.jump === false ) {
        Player2.moveY = 9.81
    }
    if (Player1.y <= 20 ) {
        Player1.moveY = 9.81
    }
    if (Player2.y <= 20 ) {
        Player2.moveY = 9.81
    }
}

// Makes you counteract the force of gravity which is -9.81 m/s
function Jump(Player) {
    if (Player === 1 && Player1.JumpCount > 2) {
        Player1.moveY = 12
        console.log("YaFalled")
    } else if ( Player === 2 && Player2.JumpCount > 2) {
        console.log("YaFalled")
        Player2.moveY = 12
    }
    if (Player === 1 && Player1.JumpCount <= 2) {
        Player1.moveY = -12
        console.log("Yajumped")
    } else if ( Player === 2 && Player2.JumpCount <= 2) {
        console.log("Yajumped")
        Player2.moveY = -12
    }
}

// Draws health UI
function DrawUI() {
    // the Random Letters here are just for calculations, because I couldn't be bothered to give em a unique name for each
    let B = 8

    if (Player1.health < 5) {
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

    
    let E = 8

    if (Player2.health < 5) {
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

MovePlayers = () =>  {
    Player1.y += Player1.moveY
    Player1.x += Player1.moveX
    
    Player2.x += Player2.moveX
    Player2.y += Player2.moveY
}

function DrawPlayers() {
    let P1height = 140
    
    ctx.fillStyle = 'lime'
    ctx.fillRect(Player1.x, Player1.y, Player1.w, Player1.h)
    
    ctx.fillStyle = 'Red'
    ctx.fillRect(Player2.x, Player2.y, Player2.w, Player2.h)
}

DrawStuff = () => {
    ctx.clearRect(0,0, 1264, 480)
}

// Handles Players controls with Event Listener
function movement(_event) {
    
    if (event.code == "ArrowUp" && Player2.JumpCount <= 2) {
        Player2.jump = true
        Jump(2)
    } else if (event.code == "ArrowDown") {
        Player2.Crouching = true
    } else if (event.code == "ArrowLeft" && Player2.State === "free") {
        Player2.moveX = -10
        Player2.face = "left"
    } else if (event.code == "ArrowRight" && Player2.State === "free") {
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
    } else if ( event.code == "KeyJ" && Player1.State === "attack") {
        Attack(1)
    } else if (event.code == "KeyK" && Player1.State === "attack") {
        HeavyAttack(1)
    } else if ( event.code == "KeyL" && Player1.State === "free") {
        Player1.State = "attack"
    } else if (event.code == "KeyK" && Player1.State === "attack") {
       Player1.State = "free" 
    }
    
    
    
    if (event.code == "Numpad1" && Player2.State === "attack") {
        Attack(2)
    } else if (event.code == "Numpad2" && Player2.State === "attack") {
        HeavyAttack(2)
    } else if (event.code == "Numpad3" && Player2.State === "attack") {
        Player2.State = "free"
    } else if ( event.code == "Numpad3" && Player2.State === "free") {
        Player2.State = "attack"
    } else if (event.code == "Numpad4") {
       
    }   else if (event.code == "Numpad5") {
    }
}

function RenderAttacks() {
    if (Player1.face === "right") {
        Player1.attackBox.x = Player1.x + 40
    } else {
        Player1.attackBox.x = Player1.x - 60
    }
    
    Player1.attackBox.y = Player1.y + 20
    ctx.fillStyle = 'Yellow'
    ctx.fillRect(Player1.attackBox.x, Player1.attackBox.y, Player1.attackBox.w, Player1.attackBox.h)

    if (Player2.face === "right") {
        Player2.attackBox.x = Player2.x + 40
    } else {
        Player2.attackBox.x = Player2.x - 60
    }
    
    Player2.attackBox.y = Player2.y + 20
    ctx.fillStyle = 'Cyan'
    ctx.fillRect(Player2.attackBox.x, Player2.attackBox.y, Player2.attackBox.w, Player2.attackBox.h)
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


function Attack(Player) {
    
    if (Player === 1 && Player1.State === "attack") {
        Player1.attackBox.h = 40
        
        if ( Player1.attackBox.x < Player2.x + Player2.w &&
            Player1.attackBox.x + Player1.attackBox.w > Player2.x &&
            Player1.attackBox.y < Player2.y + Player2.h &&
            Player1.attackBox.h + Player1.attackBox.y > Player2.y && Player === 1
           ) {
           Player2.health-= 1
           Player1.attackBox.c = "red"
           console.log(`YOU'RE HURTING HIM`)
       
           if (Player1.face === "left") {
               Player2.moveX += -24
           } else {
               Player2.moveX += 24
           }
        }
        setTimeout(() => {
            Player1.State = "free"
        }, 100)
    }

    if ( Player === 2 && Player2.State === "attack") {
        Player2.attackBox.h = 40
        if ( Player2.attackBox.x < Player1.x + Player1.w &&
            Player2.attackBox.x + Player2.attackBox.w > Player1.x &&
            Player2.attackBox.y < Player1.y + Player1.h &&
            Player2.attackBox.h + Player2.attackBox.y > Player1.y
           ) {
           Player1.health-= 1
           Player2.attackBox.c = "red"
           console.log(`YOU'RE HURTING HIM`)
        
           if (Player2.face === "left") {
               Player1.moveX += -12
           } else {
               Player1.moveX += 12
           }
        }
        setTimeout(() => {
            Player2.State = "free"
        }, 100)
    }
}

function HeavyAttack(Player) {
    
    if (Player === 1 && Player1.State === "attack") {
        Player1.attackBox.h = 80
        
        if ( Player1.attackBox.x < Player2.x + Player2.w &&
            Player1.attackBox.x + Player1.attackBox.w > Player2.x &&
            Player1.attackBox.y < Player2.y + Player2.h &&
            Player1.attackBox.h + Player1.attackBox.y > Player2.y && Player === 1
           ) {
           Player2.health-= 1
           Player1.attackBox.c = "red"
           console.log(`YOU'RE HURTING HIM`)
       
           if (Player1.face === "left") {
               Player2.moveX += -24
           } else {
               Player2.moveX += 24
           }
        }
        setTimeout(() => {
            Player1.State = "free"
        }, 100)
    }

    if ( Player === 2 && Player2.State === "attack") {
        Player2.State = "Attack"
        Player2.attackBox.h = 80
        if ( Player2.attackBox.x < Player1.x + Player1.w &&
            Player2.attackBox.x + Player2.attackBox.w > Player1.x &&
            Player2.attackBox.y < Player1.y + Player1.h &&
            Player2.attackBox.h + Player2.attackBox.y > Player1.y
           ) {
           Player1.health-= 1
           Player2.attackBox.c = "red"
           console.log(`YOU'RE HURTING HIM`)
        
           if (Player2.face === "left") {
               Player1.moveX += -80
           } else {
               Player1.moveX += 80
           }
        }
        setTimeout(() => {
            Player2.State = "free"
        }, 100)
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

// animation stuff
requestAnimationFrame(Game)
function Game() {
    console.log(GameTime)
    DrawStuff()
    DrawUI()
    MovePlayers()
    DrawPlayers()
    Gravity()
    Wraparound()
    RenderAttacks()
    requestAnimationFrame(Game)
}