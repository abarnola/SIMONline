const buttonColors = ['green', 'red', 'yellow', 'blue']
var gamePattern = []
var clickPattern = []
var gameStarted = false
var level = 0
var numColors = 4

//Add sounds to each button
$('.btn').on('click', function() {
    let color = $(this).attr('id')

    clickPattern.push(color)
    buttonClickAnimation(color)
    playSound(color)
    checkAnswer(clickPattern.length - 1)
})

$('#play').on('click', function() {
    buttonClickAnimation('play')

    startGame()
    $(this).addClass('hidden')
    $('#level-title').text('Level ' + level)
})

$(document).on('keypress', function() {
    if (!gameStarted){
        startGame()
    }
})

const startGame = () => {
    gamePattern = []
    clickPattern = []
    level = 0
    $('#restart').remove()
    $('#level-title').text('Level ' + level)
    nextInSequence()
}

const nextInSequence = () => {
    let color = buttonColors[Math.floor(Math.random() * numColors)]
    nextButtonAnimation(color)
    playSound(color)
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
        

        $('.container').toggleClass('game-over')
        setTimeout( () => {
            $('.container').toggleClass('game-over')
        }, 100)
        gameOver()
    }
}

const gameOver = () => {
    playSound('wrong')
    $('#level-title').text('You reached level ' + level)

    gamePattern = []
    clickPattern = []
    gameStarted = false

    $('#play').removeClass('hidden').html('Restart')
}

const buttonClickAnimation = (id) => {
    $('#' + id).toggleClass('pressed')

    setTimeout(function () {
        $('#' + id).toggleClass('pressed')
    }, 150)
}

const nextButtonAnimation = (color) => {
    $('#' + color).fadeOut(150).fadeIn(150)
}

const playSound = (filename) => {
    let sound = new Audio('sounds/' + filename + '.mp3')
    sound.play()
}