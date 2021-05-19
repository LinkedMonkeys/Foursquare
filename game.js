"using strict";

(function() {
    let deck;
    let board = [];
    
    // Main
    window.addEventListener('load', init);

    // Event handler for window.onLoad.  Performs all of the game setup.
    function init() {
	initDeck();
	console.log(deck);
	buildBoard();
	newDrawCard();
    }

    // Put a new card from the 'deck' onto the top of the draw pile.
    function newDrawCard() {
	let drawPile = id('drawPile');
	let drawCard = document.createElement('img');
	drawCard.id = 'drawCard';
	let topCard = deck.shift();
	drawCard.src = `Cards/card${topCard}.png`;
	drawPile.appendChild(drawCard);
    }
    
    // Create the deck from the SUIT and RANK arrays.  It also
    // randomizes it.
    function initDeck() {
	const SUIT = ['Clubs', 'Diamonds', 'Hearts', 'Spades'];
	const RANK = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
	deck = [];
	
	for (suit of SUIT) {
	    for (rank of RANK) {
		deck.push(suit + rank);
	    }
	}
	shuffle(deck);
    }

    // Shuffles the deck by interchanging randomly selected cards.  I
    // *think* this should be fairly randomly shuffled.
    function shuffle(deck) {
	// Shuffle
	for (let i=0; i<1000; i++) {
	    // Swap two randomly selected cards.
	    let pos1 = Math.floor(Math.random()*deck.length);
	    let pos2 = Math.floor(Math.random()*deck.length);

	    // Swap the selected cards.
	    [deck[pos1], deck[pos2]] = [deck[pos2], deck[pos1]];
	}

    }

    // EventListener for placing a card.
    function spotClick() {
	let clickRow = getRow(this.id);
	let clickCol = getCol(this.id);

	if (board[clickRow][clickCol].length < 4) {
	    // Move the image from drawCard to 'this'.
	    let oldDrawCard = id('drawCard');
	    this.appendChild(oldDrawCard);
	    oldDrawCard.id = '';

	    oldDrawCard.classList.add(
		`card${board[clickRow][clickCol].length}`);
	    
	    // Board data structure maintainance.
	    board[clickRow][clickCol].push(oldDrawCard);

	    this.classList.remove('emptySpot');
	    this.classList.add('spot')

	    if (deck.length > 0) {
		// Create a new drawCard.
		newDrawCard();
	    } else {
		removeEventHandlers();
		
		// Clear the drawPile.
		id('drawPile').classList.add('emptySpot');
	    }
	}
    }
    
    // Sweeps through the array of spots removing all EventListeners.
    function removeEventHandlers() {
	let spots = qsa('.spot');
	let emptySpots = qsa('.emptySpot');

	for (s of spots) {
	    s.removeEventListener('click', spotClick);
	}

	for (s of emptySpots) {
	    s.removeEventListener('click', spotClick);
	}
    }
    
    // Build the 4x4 game board with "empty" spots.
    function buildBoard() {
	let gameBoard = id("gameBoard");
	for (let r=0; r<4; r++) {
	    let row = document.createElement('div');
	    row.classList.add('row');
	    let boardRow = [];
	    for (let c=0; c<4; c++) {
		let spot = document.createElement('div');
		spot.id = `spot${r}${c}`;
		spot.classList.add('emptySpot');
		
		spot.addEventListener('click', spotClick);
		
		row.appendChild(spot);
		boardRow.push([]);
	    }
	    board.push(boardRow);
	    gameBoard.appendChild(row);
	}
    }

    // Gets the row index from a spot's id.
    function getRow(id) {
	return /spot(\d)\d/.exec(id)[1];
    }

    // Gets the column index from a spot's id.
    function getCol(id) {
	return /spot\d(\d)/.exec(id)[1];
    }

    // Flips the card in the specified spot.
    function flipCard(row, col) {
	let cardImage = id('spot00').children[0];
	if (cardImage) {
	    cardImage.src = 'Cards/cardBack_blue1.png';
	}
    }
    
    /**********************************************************************/
    /* Helper functions. */
    function id(idName) {
	return document.getElementById(idName);
    }

    function qsa(selector) {
	return document.querySelectorAll(selector);
    }
})();
