let deck = [];
for (let i = 2; i <= 14; i++) {
  for (let j = 0; j < 4; j++) {
    deck.push(i);
  }
}

function shuffle(array) {
  var copy = [], n = array.length, i;
  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);
    // And move it to the new array.
    copy.push(array.splice(i, 1)[0]);
  }
  return copy;
}

// Battle!
let battle = (playerObj) => {
  let p1 = playerObj.player1;
  let p2 = playerObj.player2;
  console.log('Battle!');
  console.log('Player1 card: ' + p1[0]);
  console.log('Player2 card: ' + p2[0]);
  if (p1[0] > p2[0]) {
    //console.log('a');
    p1.push(p2.splice(0,1)[0]);
    //console.log('b');
    let p1Played = p1.shift();
    //console.log('c');
    p1.push(p1Played);
    //console.log('d');
  } else if (p2[0] > p1[0]) {
    //console.log('e');
    p2.push(p1.splice(0,1)[0]);
    //console.log('f');
    let p2Played = p2.shift();
    //console.log('g');
    p2.push(p2Played);
    //console.log('h');
  }
}

// War!!!!!
let war = (playerObj) => {
  let p1 = playerObj.player1;
  let p2 = playerObj.player2;

  console.log('War!!!');
  console.log('War!!!');
  console.log('War!!!');
  let warCard;
  if ((p1.length >= 5) && (p2.length >= 5)) {
    warCard = 5;
    if (p1[warCard-1] == p2[warCard-1]) {
      warCard += 5;
    }
  } else {
    warCard = Math.min(p1.length, p2.length);
  }
  console.log('WarCard: ' + warCard);
  console.log('Player1  war card: ' + p1[warCard - 1]);
  console.log('Player2  war card: ' + p2[warCard - 1]);

  // Need to build in check if warIndex === 0 (ie one player only has one card left)

  // Check cards
  if (p1[warCard - 1] > p2[warCard - 1]) {

    let p1Updated = playerObj.player1.slice(warCard, p1.length).concat(p1.slice(0, warCard)).concat(p2.slice(0, warCard));
    console.log('P1 Updated: ' + p1Updated);
    playerObj.player1 = p1Updated;
    playerObj.player2 = p2.slice(warCard, p2.length);


/*
    console.log('P1 wins!')
    p1.push(p2.splice(0,warIndex + 1));
    console.log('P1 takes P2 cards, P1: ' + p1)
    let p1Played = p1.splice(0,warIndex + 1);
    p1.push(p1Played);
    console.log('P1 moves P1 cards, P1: ' + p1)
    let p1Updated = p1.flat();
    console.log('P1 Updated length: ' + p1Updated.length);
    p1 = p1Updated;
    console.log('Flatten P1, P1: ' + p1)
*/

    } else if (p2[warCard - 1] > p1[warCard - 1]) {


    let p2Updated = p2.slice(warCard, p2.length).concat(p1.slice(0, warCard)).concat(p2.slice(0, warCard));
    console.log('P2 Updated: ' + p2Updated);
    playerObj.player2 = p2Updated;
    playerObj.player1 = p1.slice(warCard, p1.length);
  }
}

// Play game ___________________________________________________________________

// Turn counter
let turn = 1;

// Shuffle the deck
let shuffledDeck = shuffle(deck);

// Deal cards
const players = {
  player1: shuffledDeck.slice(0, 26),
  player2: shuffledDeck.slice(26, 52)
}

console.log('Player 1: ' + players.player1);
console.log('Player 2: ' + players.player2);
console.log('');

while ((players.player1.length > 0) && (players.player2.length > 0)) {
  console.log('Turn: ' + turn);
  // Compare cards at index 0 of decks. Splice from losing deck and push to winning.
  if (players.player1[0] !== players.player2[0]) {
    battle(players);
  } else {
    war(players);
  }

  turn++;

  console.log('Here\'s where we\'re at: ');
  console.log('Player 1: ' + players.player1);
  console.log('Player 2: ' + players.player2);
  //console.log('Player 1 length: ' + players.player1.length);
  //console.log('Player 2 length: ' + players.player2.length);
  console.log('');

  if (players.player1.length == 0) {
    //console.log('Player 2 wins!');
  } else if (players.player2.length == 0) {
    console.log('Player 1 wins!');
  }
}
