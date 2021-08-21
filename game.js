alert(`w and s for left player || up and down for right player`)

const playerSpeed = 25;

$(() => {

    numberOfPx = (urpx) => {
        return Number(urpx.replace("px", ""))
    }

    const $rightPlayer = document.getElementById('right');
    const $leftPlayer = document.getElementById('left');
    const $gameBall = document.getElementById('ball');

    const $leftScore = document.getElementById('scoreleft');
    const $rightScore = document.getElementById('scoreright');
    const $ogoal = document.getElementById('goal');

    const $windowWidth = window.innerWidth;
    const $windowHeight = window.innerHeight;

    const map = []; // Or you could call it "key"
    onkeydown = onkeyup = function(e) {
        e = e || event; // to deal with IE
        map[e.keyCode] = e.type == 'keydown';
        /*insert conditional here*/
    }



    keyPressed = () => {
        //if key was up arrow
        if (map[40]) {
            if (numberOfPx($rightPlayer.style.top) + playerSpeed > $windowHeight - 200)
                $rightPlayer.style.top = $windowHeight - 200 + "px";
            else
                $rightPlayer.style.top = numberOfPx($rightPlayer.style.top) + playerSpeed + "px";
        }//if key was down arrow
        else if (map[38]) {
            if (numberOfPx($rightPlayer.style.top) - playerSpeed < 0)
                $rightPlayer.style.top = 0 + "px";
            else
                $rightPlayer.style.top = numberOfPx($rightPlayer.style.top) - playerSpeed + "px";
        }


    //if key was s
    if (map[83]) {
        if (numberOfPx($leftPlayer.style.top) + playerSpeed > $windowHeight - 200)
            $leftPlayer.style.top = $windowHeight - 200 + "px";
        else
            $leftPlayer.style.top = numberOfPx($leftPlayer.style.top) + playerSpeed + "px";
    }

    //if key was w
    else if (map[87]) {
        if (numberOfPx($leftPlayer.style.top) - playerSpeed < 0)
            $leftPlayer.style.top = 0 + "px";
        else
            $leftPlayer.style.top = numberOfPx($leftPlayer.style.top) - playerSpeed + "px";
    }

    //40 down, 38 up
    //w 87,s 83
}


var speedx = 3,
    speedy = 1;
var balltime = 1;
$gameBall.style.left = $windowWidth / 2 + "px";

ball = () => {
    $gameBall.style.left = numberOfPx($gameBall.style.left) + speedx + "px";
    $gameBall.style.top = numberOfPx($gameBall.style.top) + speedy + "px";
}




moveball = () => {
    ball();

    //remove overflow y
    if ($windowHeight < numberOfPx($gameBall.style.top) + 20 || numberOfPx($gameBall.style.top) < 0) {
        speedy *= -1;
    }

    //overflow-x right
    if (numberOfPx($gameBall.style.left) >= $windowWidth - 50) {
        if (numberOfPx($rightPlayer.style.top) <= numberOfPx($gameBall.style.top) + 20 && numberOfPx($rightPlayer.style.top) + 200 >= numberOfPx($gameBall.style.top)) {
            speedx *= -1;
        } else if (numberOfPx($gameBall.style.left) >= $windowWidth - 20)
            goal('left');
    }




    //remove overflow x in left ir get the goal in left
    if (numberOfPx($gameBall.style.left) <= 30) {
        if (numberOfPx($leftPlayer.style.top) <= numberOfPx($gameBall.style.top) + 20 && numberOfPx($leftPlayer.style.top) + 200 >= numberOfPx($gameBall.style.top)) {
            speedx *= -1;
        } else if (numberOfPx($gameBall.style.left) <= 0)
            goal('right');
    }



    setTimeout(function() {
        moveball()
    }, balltime);
}




setInterval(function() {
    keyPressed();
}, 10);
moveball();

goal = (pos) => {

    $ogoal.style.color = "white";

    setTimeout(function() {
        $ogoal.style.color = "black"
    }, 1000);

    if (pos == "left")
        $leftScore.innerHTML = Number($leftScore.innerHTML) + 1;
    else
        $rightScore.innerHTML = Number($rightScore.innerHTML) + 1;


    speedx *= -1;
    $gameBall.style.left = $windowWidth / 2 + "px";

}
})