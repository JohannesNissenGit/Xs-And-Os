/*
*VARIABLES, ARRAYS, STORAGE
*/
let fields = [];

let currentshape = 'cross';

let winner;

let gameover = false;


/*
*FUNCTIONS
*/


/*
*fillshape: adds current player's choice to array fields
*/
function fillshape(id) {

    if (!fields[id] && !gameover) { //check if fields[id] contains element already and if gameover is false
        if (currentshape == 'cross') {
            currentshape = 'circle';
            document.getElementById('player-2').classList.remove('player-inactive');
            document.getElementById('player-1').classList.add('player-inactive');
        }
        else {
            currentshape = 'cross';
            document.getElementById('player-1').classList.remove('player-inactive');
            document.getElementById('player-2').classList.add('player-inactive');
        }

        fields[id] = currentshape;
        console.log(fields);
        draw();
        checkforwinner();
    }
}

/*
*draw: displays player icons on playing field
*/
function draw() {
    for (let i = 0; i < fields.length; i++) {
        if (fields[i] == 'circle') {
            document.getElementById('circle-' + i).classList.remove('d-none');
        }
        if (fields[i] == 'cross') {
            document.getElementById('cross-' + i).classList.remove('d-none');
        }
    }
}


/*
*checkfunctions: checks if somebody meets a winning condition of the game 
*/
function checkforwinner() {

    //checks for winning condition see below
    horizontalcheck();
    verticalcheck();
    diagonalcheck()

    //what to do if somebody wins (winner contains something)
    if (winner) {
        playerwins();
    }

}

/*
*checks for winning condition in all directions
*/
function horizontalcheck() {
    if (fields[0] == fields[1] && fields[1] == fields[2] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-1').style.transform = 'scaleX(1.0)';
    }

    if (fields[3] == fields[4] && fields[4] == fields[5] && fields[3]) {
        winner = fields[3];
        document.getElementById('line-2').style.transform = 'scaleX(1.0)';
    }
    if (fields[6] == fields[7] && fields[7] == fields[8] && fields[6]) {
        winner = fields[6];
        document.getElementById('line-3').style.transform = 'scaleX(1.0)';
    }
}

function verticalcheck() {
    if (fields[0] == fields[3] && fields[3] == fields[6] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-4').style.transform = ' rotate(90deg) scaleX(1.0)';
    }

    if (fields[1] == fields[4] && fields[4] == fields[7] && fields[1]) {
        winner = fields[1];
        document.getElementById('line-5').style.transform = 'rotate(90deg) scaleX(1.0)';
    }

    if (fields[2] == fields[5] && fields[5] == fields[8] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-6').style.transform = 'rotate(90deg) scaleX(1.0)';
    }

}

function diagonalcheck() {
    if (fields[0] == fields[4] && fields[4] == fields[8] && fields[0]) {
        winner = fields[0];
        document.getElementById('line-7').style.transform = 'rotate(45deg) scaleX(1.0)';
    }

    if (fields[2] == fields[4] && fields[4] == fields[6] && fields[2]) {
        winner = fields[2];
        document.getElementById('line-8').style.transform = 'rotate(-45deg) scaleX(1.0)';
    }
}

/*
*playerwins(): what to do if somebody meets winning condition
*/

function playerwins() {
    let winnername;
    gameover = true;
    if (winner == 'circle') {
        winnername = 'Player 1';
    }
    else {
        winnername = 'Player 2';
    }
    setTimeout(function () {
        document.getElementById('message-winner').innerHTML = winnername + ' won!';
        document.getElementById('gameover').classList.remove('d-none');
        console.log('The winner is', winner);
        document.getElementById('gameover').classList.add('endscreen-opacity');

    }, 350);
}

function resetgame() {
    winner = null;
    gameover = false;
    fields = [];
    currentshape = 'cross';

    document.getElementById('gameover').classList.add('d-none');

    resetlines();
    resetsymbol('circle-');
    resetsymbol('cross-');
}

function resetlines() {
    for (let i = 1; i < 8; i++) {
        let line = 'line-' + i;
        //document.getElementById(line).classList.add('d-none');
        document.getElementById(line).style.transform = 'scaleX(0.0)';
    }
}

function resetsymbol(symbol) {
    for (let i = 0; i < 9; i++) {
        let currentsymbol = symbol + i;
        document.getElementById(currentsymbol).classList.add('d-none');
    }

}