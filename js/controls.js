/*document.addEventListener('keydown', movePlayer)

function movePlayer(event) {

    event.preventDefault()

    const player = game.state.players[playerId]

    const increment = 8 + (player.radius * 0.1)
    const decrement = 8 + (player.radius * 0.1) 

    const acceptedMoves = {

        ArrowUp(player) {
            if (player.y - player.radius - decrement >= 0) {
                player.y -= decrement
            } else {
                player.y = player.radius
            }
        },
        ArrowRight(player) {
            if (player.x + player.radius + increment < screen.width) {
                player.x += increment
            } else {
                player.x = screen.width - player.radius
            }
        },
        ArrowDown(player) {
            if (player.y  + player.radius + increment < screen.height) {
                player.y += increment
            } else {
                player.y = screen.height - player.radius
            }
        },
        ArrowLeft(player) {
            if (player.x - player.radius - decrement >= 0) {
                player.x -= decrement
            } else {
                player.x = player.radius
            }
        }
    }

    const keyPressed = event.key
    const moveFunction = acceptedMoves[keyPressed]

    if (moveFunction) {
        moveFunction(player)
        checkForCollision(player)
    }
}*/

function checkForCollision(player) {

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]

        /*if (player.x > fruit.x - player.radius
            && player.x < fruit.x + player.radius
            && player.y > fruit.y - player.radius
            && player.y < fruit.y + player.radius) {

                game.removeFruit({ fruitId: fruitId})

                if (player.radius < 50) player.radius += 5

                player.points += 1
                break
            }*/

        // DISTANCIA ENTRE DOIS PONTOS TEM QUE SER MENOR QUE A SOMA DOS DOIS RAIOS

        var distance = ((player.x - fruit.x) ** 2) + ((player.y - fruit.y) ** 2)
        
        if (distance < ((fruit.radius + player.radius) ** 2)) {
            game.removeFruit({ fruitId: fruitId})

             if (player.radius < 200)  player.radius += 1

            player.points += 1
        }
    }

}

var keys;

document.addEventListener("keydown", event => {
    keys = (keys || []);

    keys[event.key] = true;

    const player = game.state.players[playerId]

    const increment = 8 + (player.radius * 0.1)
    const decrement = 8 + (player.radius * 0.1) 

    const acceptedMoves = {

        ArrowUp(player) {
            if (player.y - player.radius - decrement >= 0) {
                player.y -= decrement
            } else {
                player.y = player.radius
            }
        },
        ArrowRight(player) {
            if (player.x + player.radius + increment < screen.width) {
                player.x += increment
            } else {
                player.x = screen.width - player.radius
            }
        },
        ArrowDown(player) {
            if (player.y  + player.radius + increment < screen.height) {
                player.y += increment
            } else {
                player.y = screen.height - player.radius
            }
        },
        ArrowLeft(player) {
            if (player.x - player.radius - decrement >= 0) {
                player.x -= decrement
            } else {
                player.x = player.radius
            }
        }
    }

    for (var position = 0; position < Object.keys(keys).length; position++) {
        var keyPressed = Object.keys(keys)[position]

        if (!keys[keyPressed]) continue

        const moveFunction = acceptedMoves[keyPressed]

        if (moveFunction) {
            moveFunction(player)
            checkForCollision(player)
        }
    }

    
}, false);

document.addEventListener("keyup", event => {

    if (typeof keys === 'object' && keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
        stop()
    }

}, false);