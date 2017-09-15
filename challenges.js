/*
CHALLENGE
Changethe game to follow these rules:

1. A player looses the ENTIRE score when he/she rolls two 6s in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second slice, so take a look at the CSS code for the first one.)
*/


var scores, 
    roundScore, 
    activePlayer, 
    isGameOn, 
    prevScore, 
    prevScore2;

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    prevScore = 0;
    prevScore2 = 0;
    isGameOn = true;

    // Remove the dice image at start
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

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
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.getElementById('dice-1');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        var diceDOM2 = document.getElementById('dice-2');
        diceDOM2.style.display = 'block';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        
        console.log('Dice #1 for Active Play:' + (activePlayer + 1) + ' is ' + dice);
        console.log('Dice #2 for Active Play:' + (activePlayer + 1) + ' is ' + dice2);
        console.log('   ==> PrevScore #1 for Active Play:' + (activePlayer + 1) + ' is ' + prevScore);
        console.log('   ==> PrevScore #2for Active Play:' + (activePlayer + 1) + ' is ' + prevScore);
        
        // Player loses entire roundScore if six is rolled twice
        if ((dice === 6 || dice2 === 6) && (prevScore === 6 || prevScore2 === 6)) {
            console.log('Rolled six twice');
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0' ;
            nextPlayer();
        } else if (dice !== 1 && dice2 !== 1) { // 3. Update the round score if the rolled number that is not a 1
        // Add the score
        roundScore += (dice + dice2);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            console.log('Rolled a one');
            nextPlayer();
        } 
        
        // Record previous score
        prevScore = dice;
        prevScore2 = dice2;
    }
});

// Add Event listener to hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
   if (isGameOn) {
        // Add CURRENT Score to GLOBAL
        scores[activePlayer] += roundScore;
       
       // Get the final score from input
       var inputFinalScore = document.querySelector('.final-score').value;
       var winningScore;
       
        // Update UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Undefined, 0, null, or '' are COERCED to false in JavaScript
        // Anything else is COERCED to true
        if (inputFinalScore) {
           winningScore = inputFinalScore;
        } else {
           winningScore = 100;
        }
       
       console.log('winning Score ' + winningScore);

        // Check if current player is the winner
        if (scores[activePlayer] >= winningScore) {
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
    prevScore = 0;
    
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Remove dice from table
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
};


















































