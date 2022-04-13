
var userName = prompt('Digite seu nick')

var game = createGame()

var screen = document.querySelector('canvas')
var brushTool = screen.getContext('2d')

// Tela
brushTool.fillStyle = '#18181b'
brushTool.fillRect(0, 0, 800, 600)

var playerId = userName + Math.round(Math.random() * 1000000)

game.addPlayer( { playerId: playerId, name: userName })
game.start()

// Renderizador
renderGame()

function renderGame() {
    // Tela
    brushTool.fillStyle = '#18181b'
    brushTool.fillRect(0, 0, 800, 600)

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]

        // Fruta
        brushTool.fillStyle = '#2A8200'
        brushTool.beginPath()
        brushTool.arc(fruit.x, fruit.y, fruit.radius, 0, 2 * 3.14)
        brushTool.fill()
    }

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]

        // Jogador
        brushTool.fillStyle = '#9438FF'
        brushTool.beginPath()
        brushTool.arc(player.x, player.y, player.radius, 0, 2 * 3.14)
        brushTool.fill()
    }

    renderTable()

    requestAnimationFrame(renderGame)
}

function renderTable() {
    var table = document.querySelector('#players-table')
    table.innerHTML = ""

    var list = {}
    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]

        list[player.name] = player.points
    }

    keysSorted = Object.keys(list).sort((a, b) => {
        return list[a] - list[b] 
    })


    var counter = 0;
    for (const name in list) {
        counter++;

        if (counter > 10) break

        var playerTr = buildPlayerTr(name, list[name])

        table.appendChild(playerTr)
    }

}

function buildPlayerTr(name, points) {

    var playerTr = document.createElement('tr')
    playerTr.classList.add('players')

    var nameTd = buildTd(name, "info-name")
    var pointsTd = buildTd(points, "info-points")

    playerTr.appendChild(nameTd)
    playerTr.appendChild(pointsTd)

    return playerTr
}

function buildTd(value, tdClass) {

    var td = document.createElement('td')
    td.textContent = value
    td.classList.add(tdClass)

    return td
}