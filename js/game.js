function createGame() {

    const state = {
        players: {},
        fruits: {},
    }

    function start() {
        setInterval(spawnFruit, 1)
    }

    function addPlayer(command) {
        const playerId = command.playerId
        const name = 'name' in command ? command.name : "Indefinido"
        const x = 'x' in command ? command.x : Math.floor(Math.random() * screen.width)
        const y = 'y' in command ? command.y : Math.floor(Math.random() * screen.height)
    
        state.players[playerId] = {
            name: name,
            radius: 15,
            points: 0,
            x: x,
            y: y
        }

    }

    function removePlayer(command) {
        const playerId = command.playerId
    
        delete state.players[playerId]
    }

    function spawnFruit() {
        const fruitId = Math.random() * 10000000
        const x = Math.floor(Math.random() * screen.width)
        const y = Math.floor(Math.random() * screen.height)
    
        state.fruits[fruitId] = {
            radius: 15,
            x: x,
            y: y
        }
    }

    function removeFruit(command) {
        const fruitId = command.fruitId

        delete state.fruits[fruitId]
    }

    return {
        state,
        start,
        addPlayer,
        removePlayer,
        spawnFruit,
        removeFruit
    }
    
}