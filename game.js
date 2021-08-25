alert(`w and s for left player || up and down for right player`)

const $playerSpeed = 25

$(() => {
    const $timer = $('.timer')
    const $modal = $('.modal').hide()
    const $button = $('.button')
    const $won = $('.wonParagraph')

    // Game timer count down
    var gameTimer =  10// number of seconds to end game
    var interval = setInterval(function() {
        gameTimer--
        // Display 'counter' wherever you want to display it.
        if (gameTimer <= 0) {
            clearInterval(interval)
            $timer.hide(300)
            $modal.show()


            if (Number($rightScore.innerHTML) > Number($leftScore.innerHTML)) {
                $won.html(`Right Player Won!!!!!`)

            } else if (Number($rightScore.innerHTML) === Number($leftScore.innerHTML)) {
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


    const $rightPlayer = document.getElementById('right')
    const $leftPlayer = document.getElementById('left')

    const $gameBall = document.getElementById('ball')

    const $leftScore = document.getElementById('scoreleft')
    const $rightScore = document.getElementById('scoreright')

    const $ogoal = document.getElementById('goal')

    const $windowWidth = window.innerWidth
    const $windowHeight = window.innerHeight

    const key = []


    onkeydown = onkeyup = function(e) {
        e = e || event; // to deal with IE
        key[e.keyCode] = e.type == 'keydown'
        /*insert conditional here*/
    }


    keyPressed = () => {
        

        //if key pressed was up arrow
        if (key[40]) {
            if (numberOfPx($rightPlayer.style.top) + $playerSpeed > $windowHeight - 200)
                $rightPlayer.style.top = $windowHeight - 200 + "px"
            else
                $rightPlayer.style.top = numberOfPx($rightPlayer.style.top) + $playerSpeed + "px"
        }

        //if key pressed was down arrow
        else if (key[38]) {
            if (numberOfPx($rightPlayer.style.top) - $playerSpeed < 0)
                $rightPlayer.style.top = 0 + "px"
            else
                $rightPlayer.style.top = numberOfPx($rightPlayer.style.top) - $playerSpeed + "px"
        }

        //if key pressed was s
        if (key[83]) {
            if (numberOfPx($leftPlayer.style.top) + $playerSpeed > $windowHeight - 200)
                $leftPlayer.style.top = $windowHeight - 200 + "px"
            else
                $leftPlayer.style.top = numberOfPx($leftPlayer.style.top) + $playerSpeed + "px"
        }

        //if key pressed was w
        else if (key[87]) {
            if (numberOfPx($leftPlayer.style.top) - $playerSpeed < 0)
                $leftPlayer.style.top = 0 + "px"
            else
                $leftPlayer.style.top = numberOfPx($leftPlayer.style.top) - $playerSpeed + "px"
        }

        //40 down, 38 up
        //w 87,s 83
    }


    var speedx = 3,
        speedy = 1
    var balltime = 1

    // $gameBall.style.left = $windowWidth / 2 + "px";

    ball = () => {
        $gameBall.style.left = numberOfPx($gameBall.style.left) + speedx + "px"
        $gameBall.style.top = numberOfPx($gameBall.style.top) + speedy + "px"
    }


    moveball = () => {
        ball()

        //remove overflow y
        if ($windowHeight < numberOfPx($gameBall.style.top) + 20 || numberOfPx($gameBall.style.top) < 0) {
            speedy *= -1
        }

        //overflow-x right
        if (numberOfPx($gameBall.style.left) >= $windowWidth - 50) {
            if (numberOfPx($rightPlayer.style.top) <= numberOfPx($gameBall.style.top) + 20 && numberOfPx($rightPlayer.style.top) + 200 >= numberOfPx($gameBall.style.top)) {
                speedx *= -1
            } else if (numberOfPx($gameBall.style.left) >= $windowWidth - 20)
                goal('left')
        }

        //remove overflow x in left ir get the goal in left
        if (numberOfPx($gameBall.style.left) <= 30) {
            if (numberOfPx($leftPlayer.style.top) <= numberOfPx($gameBall.style.top) + 20 && numberOfPx($leftPlayer.style.top) + 200 >= numberOfPx($gameBall.style.top)) {
                speedx *= -1
            } else if (numberOfPx($gameBall.style.left) <= 0)
                goal('right')
        }


        setTimeout(function() {
            moveball()
        }, balltime)
    }


    setInterval(function() {
        keyPressed()
    }, 10)
    moveball()


    goal = (positonBallHit) => {

        $ogoal.style.color = "white"

        setTimeout(function() {
            $ogoal.style.color = "black"
        }, 1000)

        if (positonBallHit == "left")
            $leftScore.innerHTML = Number($leftScore.innerHTML) + 1
        else
            $rightScore.innerHTML = Number($rightScore.innerHTML) + 1


        speedx *= -1
        $gameBall.style.left = $windowWidth / 2 + "px"
    }
})