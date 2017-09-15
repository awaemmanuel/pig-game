/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, isGameOn;
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isGameOn = true;

    // Remove the dice image at start
    document.querySelector('.dice').style.display = 'none';

    // Using GetElementById since it's faster than querySelector
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    // Reset the player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    // Remove the active CSS for winner and active
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

// Iniitalize game
init();

// Add an event listener on the roll dice
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (isGameOn) {
        // 1. Generate a random number between 0 and 6
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        

        // 3. Update the round score if the rolled number that is not a 1
        if (dice !== 1) {
            // Add the score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        } 
        
    }
});

// Add Event listener to hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
   if (isGameOn) {
        // Add CURRENT Score to GLOBAL
        scores[activePlayer] += roundScore;

        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if current player is the winner
        if (scores[activePlayer] >= 100) {
        // Player wins, end game. 
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

        // Remove the active state and dice
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';

        // Change the state variable to false
        isGameOn = false;
        } else {
        // Next Player
        nextPlayer();   
        }
   }
});


// Add an event listener for button new
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Remove dice from table
    document.querySelector('.dice').style.display = 'none';
};

/*
CHALLENGE
Changethe game to follow these rules:

1. A player looses the ENTIRE score when he/she rolls two 6s in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second slice, so take a look at the CSS code for the first one.)
*/

















































