var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var score = 0
var isGameStarted = false
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeaader = document.querySelector('#result-header')


$start.addEventListener('click', startGame)
$game.addEventListener('click', handleClickBox)
$gameTime.addEventListener('input', setGameTime)

function handleClickBox(event) {
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        renderBox()
        score++
    }
}

function setGameScore() {
    $result.textContent = score.toString()
}

function startGame(params) {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', 'true')
    
    isGameStarted = true
    $start.classList.add('hide')
    $game.style.backgroundColor = 'white'
    renderBox()
    var interval = setInterval(function (params) {
        var time = parseFloat($time.textContent)
        if (time <= 0) {

            clearInterval(interval)
            endGame()

        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
}

function endGame() {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    $start.classList.remove('hide')
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    $game.classList.remove('hide')
    $timeHeader.classList.add('hide')
    $resultHeaader.classList.remove('hide')

}
function setGameTime() {
    var time = parseInt($gameTime.value)
    $time.textContent = time.toFixed(1)
    $timeHeader.classList.remove('hide')
    $resultHeaader.classList.add('hide')
}

function renderBox(params) {
    $game.innerHTML = ''
    var gameSize = $game.getBoundingClientRect()
    console.log(gameSize)
    var boxSize = getRandom(30, 100)
    var maxTop = gameSize.height - boxSize
    var maxLeft = gameSize.width - boxSize
    var box = document.createElement('div')
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.borderRadius = '50%'
    box.style.backgroundColor = 'rgb('+ getRandom(0, 255)+','+ getRandom(0, 255)+','+getRandom(0,255)+')'
    box.style.cursor = 'pointer'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement('afterbegin', box)

}


function getRandom(min, max) {
    return Math.ceil(Math.random() * (max - min) + min)
}

