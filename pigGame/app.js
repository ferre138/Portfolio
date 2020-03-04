/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score is lost. After that, it's the next player's turn
- The player can choose to 'Hold', which ,eams that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, previousPlayer, gamePlaying, previousRoll, winScore = 100;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number
        var dice = (Math.floor(Math.random()*6))+1;
        
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-'+dice+'.png'
    
        // 3. Update round score if rolled number is not 1
        if(dice !== 1) {
            if(dice === 6 && previousRoll === 6 && activePlayer === previousPlayer) {
                //check double 6 roll
                scores[activePlayer] = 0;
                document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
                nextPlayer();
            }
            else {
                //add score
                roundScore += dice;
                previousRoll = dice;
                previousPlayer = activePlayer;
            }
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
        //add round score to global score
        scores[activePlayer] += roundScore;
    
        //update ui
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        
        //check if player won game
        if(scores[activePlayer] >= winScore) {
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
            document.querySelector('.btn-roll').classList.add('disabled');
            document.querySelector('.btn-hold').classList.add('disabled');
        } else nextPlayer();
    }
    
})

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-info').addEventListener('click', function(){
    document.querySelector('#instructions').style.display = "block";
});
document.querySelector('.close').addEventListener('click', function(){
    document.querySelector('#instructions').style.display = "none";
});
document.querySelector('.btn-score').addEventListener('click', function() {
    var scoreDisplay = document.querySelector('.inputScore').style.display;
    if (scoreDisplay === "flex") {
        document.querySelector('.inputScore').style.display = "none";
    } else document.querySelector('.inputScore').style.display = "flex";
})
document.querySelector('.acceptNewScore').addEventListener('click', function() {
    var scoreInput = document.querySelector('.winScoreInput').value;
    scoreInput > 6 ? winScore = scoreInput : alert("Max score has to be greater than 7");
    init()
    document.querySelector('.inputScore').style.display = "none";
})
document.querySelector('.cancelNewScore').addEventListener('click', function() {
    document.querySelector('.inputScore').style.display = "none";
})

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
        
    document.getElementById('winScore').innerHTML = winScore;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
    document.querySelector('.btn-roll').classList.remove('disabled');
    document.querySelector('.btn-hold').classList.remove('disabled');
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-1.png'
}

function nextPlayer() {
    //next player
    document.getElementById('current-'+activePlayer).textContent = '0';
    document.getElementById('current-'+activePlayer).textContent = '0';
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
}