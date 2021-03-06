alert(`w and s for left player || up and down for right player`)

const playerSpeed = 25

$(() => {
    const $timer = $('.timer')
    const $modal = $('.modal').hide()
    const $button = $('.button')
    const $won = $('.wonParagraph')

    var gameTimer =  10 // Game count down timer in seconds
    var interval = setInterval(function() {
        gameTimer--
        // Display 'timer' wherever you want to display it.
        if (gameTimer <= 0) {
            clearInterval(interval)
            $modal.show()

            if (Number(rightScore.innerHTML) > Number(leftScore.innerHTML)) {
                $won.html(`Right Player Won!!!!!`)

            } else if (Number(rightScore.innerHTML) === Number(leftScore.innerHTML)) {
                $won.html(`NO Player Won!!!!!!!!`)

            } else {
                $won.html(`Left Player Won!!!!!!`)
            }

            // Reload dom to restart a new game
            $button.click(function() {
                location.reload()
            })

            return
        } else {
            $timer.text(gameTimer)
        }
    }, 1000)

    
    numberOfPx = (urpx) => {
        return Number(urpx.replace("px", ""))
    }


    const rightPlayer = document.getElementById('right')
    const leftPlayer = document.getElementById('left')

    const gameBall = document.getElementById('ball')

    const leftScore = document.getElementById('scoreleft')
    const rightScore = document.getElementById('scoreright')

    const ogoal = document.getElementById('goal')

    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    const key = []


    onkeydown = onkeyup = function(e) {
        e = e || event; // to deal with IE
        key[e.keyCode] = e.type == 'keydown'
        /*insert conditional here*/
    }


    keyPressed = () => {
        //if key pressed was up arrow
        if (key[40]) {
            if (numberOfPx(rightPlayer.style.top) + playerSpeed > windowHeight - 200)
                rightPlayer.style.top = windowHeight - 200 + "px"
            else
                rightPlayer.style.top = numberOfPx(rightPlayer.style.top) + playerSpeed + "px"
        }

        //if key pressed was down arrow
        else if (key[38]) {
            if (numberOfPx(rightPlayer.style.top) - playerSpeed < 0)
                rightPlayer.style.top = 0 + "px"
            else
                rightPlayer.style.top = numberOfPx(rightPlayer.style.top) - playerSpeed + "px"
        }

        //if key pressed was s
        if (key[83]) {
            if (numberOfPx(leftPlayer.style.top) + playerSpeed > windowHeight - 200)
                leftPlayer.style.top = windowHeight - 200 + "px"
            else
                leftPlayer.style.top = numberOfPx(leftPlayer.style.top) + playerSpeed + "px"
        }

        //if key pressed was w
        else if (key[87]) {
            if (numberOfPx(leftPlayer.style.top) - playerSpeed < 0)
                leftPlayer.style.top = 0 + "px"
            else
                leftPlayer.style.top = numberOfPx(leftPlayer.style.top) - playerSpeed + "px"
        }

        //40 down, 38 up
        //w 87,s 83
    }


    var ballSpeedxAxis = 3,
        ballSpeedyAxis = 2
    var ballTravelTime = 1


    ball = () => {
        gameBall.style.left = numberOfPx(gameBall.style.left) + ballSpeedxAxis + "px"
        gameBall.style.top = numberOfPx(gameBall.style.top) + ballSpeedyAxis + "px"
    }


    moveball = () => {
        ball()

        //remove overflow y
        if (windowHeight < numberOfPx(gameBall.style.top) + 20 || numberOfPx(gameBall.style.top) < 0) {
            ballSpeedyAxis *= -1
        }

        //overflow-x right
        if (numberOfPx(gameBall.style.left) >= windowWidth - 50) {
            if (numberOfPx(rightPlayer.style.top) <= numberOfPx(gameBall.style.top) + 20 && numberOfPx(rightPlayer.style.top) + 200 >= numberOfPx(gameBall.style.top)) {
                ballSpeedxAxis *= -1
            } else if (numberOfPx(gameBall.style.left) >= windowWidth - 20)
                goal('left')
        }

        //remove overflow x in left ir get the goal in left
        if (numberOfPx(gameBall.style.left) <= 30) {
            if (numberOfPx(leftPlayer.style.top) <= numberOfPx(gameBall.style.top) + 20 && numberOfPx(leftPlayer.style.top) + 200 >= numberOfPx(gameBall.style.top)) {
                ballSpeedxAxis *= -1
            } else if (numberOfPx(gameBall.style.left) <= 0)
                goal('right')
        }


        setTimeout(function() {
            moveball()
        }, ballTravelTime)
    }


    setInterval(function() {
        keyPressed()
    }, 10)
    moveball()


    goal = (positonBallHit) => {

        ogoal.style.color = "white"

        setTimeout(function() {
            ogoal.style.color = "black"
        }, 1000)

        if (positonBallHit == "left")
            leftScore.innerHTML = Number(leftScore.innerHTML) + 1
        else
            rightScore.innerHTML = Number(rightScore.innerHTML) + 1


        ballSpeedxAxis *= -1
        gameBall.style.left = windowWidth / 2 + "px"
    }
})