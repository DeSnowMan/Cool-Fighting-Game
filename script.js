// variables
let cnv = document.getElementById("Game");
let ctx = cnv.getContext('2d')

document.addEventListener("keydown", movement)
document.addEventListener("keyup", stopmove)

let Player1 = {
    x: 25,
    y: 50,
    jump: false,
    Crouching: false,
    moveX: 0,
    health: 10,
}

let Player2 = {
    x: 960,
    y: 50,
    jump: false,
    Crouching: false,
    moveX: 0,
    health: 10,
}

function Gravity() {
    if (Player1.y >= 320) {
        Player1.y = 320
    }
    
    if (Player1.jump === true) {
        Jump(1)
    } else {
        Player1.y += 4
    }
    if (Player2.y >= 320) {
        Player2.y = 320
    }
    
    if (Player2.jump === true) {

    } else {
        Player2.y += 4
    }
    
}

// Makes you counteract the force of gravity which is -9.81 m/s
function Jump(Player) {
    if (Player === 1) {
        Player1.y + 80
        
        
    } else {
        console.log("Yajumped")
        Player2.y + 80
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

    if (Player1.health < 5) {
        let T = Player1.health - 5
        let G = T * 8
        E += G;
    }

    let T = Player2.x - E

    for (n = 0; n < Player1.health; n++) {
        ctx.fillStyle = "rgb(255, 0, 234)";
        ctx.fillRect(T, Player2.y - 20, 10, 10)
        T += 15
    }

}

MovePlayers = () =>  {
    Player1.x += Player1.moveX
    Player2.x += Player2.moveX
}

function DrawPlayers() {
    let P1height = 140
    
    ctx.fillStyle = 'lime'
    ctx.fillRect(Player1.x, Player1.y, 60, P1height)
    
    ctx.fillStyle = 'Red'
    ctx.fillRect(Player2.x, Player2.y, 60, P1height)
}

DrawStuff = () => {
    ctx.clearRect(0,0, 1264, 480)
}

// Handles Players controls with Event Listener
function movement(_event) {
    console.log(event.code)
    if (event.code == "ArrowUp") {
        Player2.jump = true
        Jump(2)
    } else if (event.code == "ArrowDown") {
        Player2.Crouching = true
    } else if (event.code == "ArrowLeft") {
        Player2.moveX = -10
    } else if (event.code == "ArrowRight") {
        Player2.moveX = 10
    }

    if (event.code == "KeyW") {
        Player1.jump = true
        Jump(1)
    } else if (event.code == "KeyS") {
        Player1.Crouching = true
    } else if (event.code == "KeyA") {
        Player1.moveX = -10
    } else if (event.code == "KeyD") {
        Player1.moveX = 10
    }

    if (event.code == "Numpad1") {
       
    } else if (event.code == "Numpad2") {
       
    } else if (event.code == "Numpad3") {
       
    } else if (event.code == "Numpad4") {
       
    }   else if (event.code == "Numpad5") {
       
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
    DrawStuff()
    DrawUI()
    MovePlayers()
    DrawPlayers()
    Gravity()
    requestAnimationFrame(Game)
}