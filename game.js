var playerSpeed = 15;

function nfp(urpx) {
    return Number(urpx.replace("px", ""))
}

var rightPlayer = document.getElementById('right');
var leftPlayer = document.getElementById('left');
var b = document.getElementById('ball');

var leftScore = document.getElementById('scoreleft');
var rightScore = document.getElementById('scoreright');
var ogoal = document.getElementById('goal');

var w = window.innerWidth;
var h = window.innerHeight;

var map = []; // Or you could call it "key"
onkeydown = onkeyup = function(e) {
    e = e || event; // to deal with IE
    map[e.keyCode] = e.type == 'keydown';
    /*insert conditional here*/
}



function keydown() {
    //if key was up arrow
    if (map[40]) {
        if (nfp(rightPlayer.style.top) + playerSpeed > h - 200)
            rightPlayer.style.top = h - 200 + "px";
        else
            rightPlayer.style.top = nfp(rightPlayer.style.top) + playerSpeed + "px";
    }



    //if key was down arrow
    else if (map[38]) {
        if (nfp(rightPlayer.style.top) - playerSpeed < 0)
            rightPlayer.style.top = 0 + "px";
        else
            rightPlayer.style.top = nfp(rightPlayer.style.top) - playerSpeed + "px";
    }


    //if key was s
    if (map[83]) {
        if (nfp(leftPlayer.style.top) + playerSpeed > h - 200)
            leftPlayer.style.top = h - 200 + "px";
        else
            leftPlayer.style.top = nfp(leftPlayer.style.top) + playerSpeed + "px";
    }

    //if key was w
    else if (map[87]) {
        if (nfp(leftPlayer.style.top) - playerSpeed < 0)
            leftPlayer.style.top = 0 + "px";
        else
            leftPlayer.style.top = nfp(leftPlayer.style.top) - playerSpeed + "px";
    }

    //40 down, 38 up
    //w 87,s 83
}


var speedx = 3,
    speedy = 1;
var balltime = 1;
b.style.left = w / 2 + "px";

function ball() {
    b.style.left = nfp(b.style.left) + speedx + "px";
    b.style.top = nfp(b.style.top) + speedy + "px";
}




function moveball() {
    ball();

    //remove overflow y
    if (h < nfp(b.style.top) + 20 || nfp(b.style.top) < 0) {
        speedy *= -1;
    }

    //overflow-x right
    if (nfp(b.style.left) >= w - 50) {
        if (nfp(rightPlayer.style.top) <= nfp(b.style.top) + 20 && nfp(rightPlayer.style.top) + 200 >= nfp(b.style.top)) {
            speedx *= -1;
        } else if (nfp(b.style.left) >= w - 20)
            goal('left');
    }




    //remove overflow x in left ir get the goal in left
    if (nfp(b.style.left) <= 30) {
        if (nfp(leftPlayer.style.top) <= nfp(b.style.top) + 20 && nfp(leftPlayer.style.top) + 200 >= nfp(b.style.top)) {
            speedx *= -1;
        } else if (nfp(b.style.left) <= 0)
            goal('right');
    }



    setTimeout(function() {
        moveball()
    }, balltime);
}




setInterval(function() {
    keydown();
}, 10);
moveball();

function goal(pos) {

    ogoal.style.color = "white";

    setTimeout(function() {
        ogoal.style.color = "black"
    }, 1000);

    if (pos == "left")
        leftScore.innerHTML = Number(leftScore.innerHTML) + 1;
    else
        rightScore.innerHTML = Number(rightScore.innerHTML) + 1;


    speedx *= -1;
    b.style.left = w / 2 + "px";


}
