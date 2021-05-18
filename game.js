"using strict";

(function() {
    // Main  
    window.addEventListener('load', init);

    function init() {
	let deck = createDeck();
	console.log(deck);
	buildBoard();
	let drawPile = id('drawPile');
	let drawCard = document.createElement('img');
	drawCard.id = 'drawCard';
	let topCard = deck.shift();
	drawCard.src = `Cards/card${topCard}.png`;
	drawPile.appendChild(drawCard);
    }

    // Create the deck from the SUIT and RANK arrays.  It also
    // randomizes it.
    function createDeck() {
	const SUIT = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
	const RANK = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	let deck = [];
	
	for (let suit=0; suit<SUIT.length; suit++) {
	    for (let rank=0; rank<RANK.length; rank++) {
		deck.push(SUIT[suit] + RANK[rank]);
	    }
	}

	for (let i=0; i<1000; i++) {
	    // Swap two randomly selected cards.
	    let pos1 = Math.floor(Math.random()*deck.length);
	    let pos2 = Math.floor(Math.random()*deck.length);

	    let temp = deck[pos1];
	    deck[pos1] = deck[pos2];
	    deck[pos2] = temp;
	}
	
	return deck;
    }
    
    // Build the 4x4 game board with "empty" spots.
    function buildBoard() {
	let gameBoard = id("gameBoard");
	for (let r=0; r<4; r++) {
	    let row = document.createElement('div');
	    row.classList.add('row');
	    for (let c=0; c<4; c++) {
		let spot = document.createElement('div');
		spot.id = `spot${r}${c}`;
		
		let card = document.createElement('img');
		// Placeholder for empty.
		card.src = 'Cards/cardBack_blue1.png';
		card.alt = 'empty space';
		spot.appendChild(card);
		
		row.appendChild(spot);
	    }
	    gameBoard.appendChild(row);
	}
    }
    
    /**********************************************************************/
    /* Helper functions. */
    function id(idName) {
	return document.getElementById(idName);
    }
})();
