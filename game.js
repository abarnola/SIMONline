const buttonColors = ['green', 'red', 'yellow', 'blue']
var gamePattern = []
var clickPattern = []
var gameStarted = false
var level = 0

//Add sounds to each button
$('.btn').on('click', function() {
    let color = $(this).attr('id')

    clickPattern.push(color)
    buttonClickAnimation(color)
    playButtonSound(color)
    checkAnswer(clickPattern.length - 1)
})

$(document).on('keypress', function() {
    if (!gameStarted){
        gamePattern = []
        clickPattern = []
        $('#restart').remove()
        nextInSequence()
        gameStarted = true
        $('#level-title').text('Level ' + level)
    }
})

const nextInSequence = () => {
    let color = buttonColors[Math.floor(Math.random() * 4)]
    nextButtonAnimation(color)
    playButtonSound(color)
    gamePattern.push(color)
    
    level++
    $('#level-title').text('Level ' + level)
}

const checkAnswer = (current) => {
    if (gamePattern[current] === clickPattern[current]) {
        if (gamePattern.length === clickPattern.length) {
            setTimeout( () => {
                nextInSequence()
                clickPattern = []
            }, 1000)
        }
    }
    else if (level > 0) {
        let wrongSound = new Audio('sounds/wrong.mp3')
        wrongSound.play()

        $('.container').toggleClass('game-over')
        setTimeout( () => {
            $('.container').toggleClass('game-over')
        }, 100)
        gameOver()
    }
}
const gameOver = () => {
    $('#level-title').text('You reached level ' + level)
    gamePattern = []
    level = 0
    clickPattern = []
    gameStarted = false

    $('.container').after('<h2 id="restart">Press Any Key to Restart</h2>')
}

const buttonClickAnimation = (color) => {
    $('#' + color).toggleClass('pressed')

    setTimeout(function () {
        $('#' + color).toggleClass('pressed')
    }, 150)
}

const nextButtonAnimation = (color) => {
    $('#' + color).fadeOut(150).fadeIn(150)
}

const playButtonSound = (color) => {
    let buttonSound = new Audio('sounds/' + color + '.mp3')
    buttonSound.play()
}

