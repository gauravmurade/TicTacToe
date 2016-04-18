// round of checks
// small blind has folded? We checking who start the round of betting in the same game
// only 2 players remain
// a player has left the table. small blind getting set correctly?


describe("In Poker", function() {
  let OK = true;
  let ILLEGAL = false;
  let P1_TURN = 0;
  let P2_TURN = 1;
  let P3_TURN = 2;
  let P4_TURN = 3;
  let P5_TURN = 4;
  let NO_ONE_TURN = -1;
  let NO_ONE_WINS: number[] = null;
  let P1_WIN_SCORES = [1, 0, 0, 0, 0];
  let P2_WIN_SCORES = [0, 1, 0, 0, 0];
  let P3_WIN_SCORES = [0, 0, 1, 0, 0];
  let P4_WIN_SCORES = [0, 0, 0, 1, 0];
  let P5_WIN_SCORES = [0, 0, 0, 0, 1];

  function expectMove(
      isOk: boolean,
      turnIndexBeforeMove: number,
      tableBeforeMove: Table,
      currentPlayer : Player,
      amountAdded : number,
      tableAfterMove: Table,
      turnIndexAfterMove: number,
      endMatchScores: number[]): void {
    let stateTransition: IStateTransition = {
      turnIndexBeforeMove: turnIndexBeforeMove,
      stateBeforeMove: tableBeforeMove ? {table: tableBeforeMove, delta: null} : null,
      move: {
        turnIndexAfterMove: turnIndexAfterMove,
        endMatchScores: endMatchScores,
        stateAfterMove: {table: tableAfterMove, 
            delta: {currentPlayer: currentPlayer, amountAdded: amountAdded}}
      },
      numberOfPlayers: null
    };
    if (isOk) {
      gameLogic.checkMoveOk(stateTransition);
    } else {
      // We expect an exception to be thrown :)
      let didThrowException = false;
      try {
        gameLogic.checkMoveOk(stateTransition);
      } catch (e) {
        didThrowException = true;
      }
      if (!didThrowException) {
        throw new Error("We expect an illegal move, but checkMoveOk didn't throw any exception!")
      }
    }
  }

/*

  it("player 1 small blind move from initial state is legal", function() {

    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Small;
    player1.chipsInPocket = 490;
    player1.currentBet = 0;
    player1.cards.push(new Card("2", CardSuite.c));
    player1.cards.push(new Card("2", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Init;
    player2.chipsInPocket = 500;
    player2.currentBet = 0;
    player2.cards.push(new Card("3", CardSuite.c));
    player2.cards.push(new Card("3", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Init;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.c));
    player3.cards.push(new Card("4", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Init;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.c));
    player4.cards.push(new Card("5", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Init;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.c));
    player5.cards.push(new Card("6", CardSuite.d));

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    let card1 = new Card("2", CardSuite.h);
    let card2 = new Card("2", CardSuite.s);
    let card3 = new Card("3", CardSuite.h);
    let card4 = new Card("3", CardSuite.s);
    let card5 = new Card("4", CardSuite.h);
    tableAfterMove.openedCards = [];
    tableAfterMove.closedCards.push(card1);
    tableAfterMove.closedCards.push(card2);
    tableAfterMove.closedCards.push(card3);
    tableAfterMove.closedCards.push(card4);
    tableAfterMove.closedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 10;
    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 10;
    expectMove(OK, P1_TURN, null, player1, 10, tableAfterMove, P2_TURN, NO_ONE_WINS);
  });

  it("player 1 call move from initial state is illegal", function() {
  });

  it("player 1 raise move from initial state is illegal", function() {
  });

  it("player 1 fold move from initial state is illegal", function() {
  });

  it("player 1 check move from initial state is illegal", function() {
  });

  it("player 1 non small blind move from initial state is illegal", function() {
  });

  it("player 3 move out of turn before player 2 move is illegal", function() {
  });

  it("player 2 call move in round 1 is illegal", function() {
  });

  it("player 2 raise move in round 1 is illegal", function() {
  });

  it("player 2 fold move in round 1 is illegal", function() {
  });

  it("player 2 check move in round 1 is illegal", function() {
  });

  it("player 2 non large blind move in round 1 is illegal", function() {
  });

  it("player 2 large blind move in round 1 is legal", function() {
  });

  it("player 3 call move in round 1 is legal", function() {
  });

  it("player 3 raise move in round 1 is legal", function() {
  });

  it("player 3 fold move in round 1 is legal", function() {
  });

  it("player 3 check move in round 1 is illegal", function() {
  });

  it("player 3 playing less than currentCallAmount in round 1 is illegal", function() {
  });

  it("player 4 call move in round 1 is legal", function() {
  });

  it("player 5 call move in round 1 is legal", function() {
  });

  it("player 1 call move in round 1 is legal -> Check for end of Round 1", function() {
  });

  it("player 2 move out of turn before player 1 move in round 2 is illegal", function() {
  });

  it("player 1 playing less than currentCallAmount in round 2 is illegal", function() {
  });

  it("player 1 call move in round 2 is illegal", function() {
  });

  it("player 1 raise move in round 2 is legal", function() {
  });

  it("player 1 fold move in round 2 is legal", function() {
  });

  it("player 1 check move in round 2 is legal", function() {
  });

  it("Check for end of Round 2", function() {
  });

  it("Check for end of Round 3", function() {
  });

  it("Everybody but 1 person folds there hand", function() {
  });
*/
  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Royal Flush", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 280;
    player1.currentBet = 0;
    player1.cards.push(new Card("A", CardSuite.c));
    player1.cards.push(new Card("K", CardSuite.c));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Init;
    player2.chipsInPocket = 280;
    player2.currentBet = 0;
    player2.cards.push(new Card("3", CardSuite.c));
    player2.cards.push(new Card("3", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.cards.push(new Card("4", CardSuite.c));
    player3.cards.push(new Card("4", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.cards.push(new Card("5", CardSuite.c));
    player4.cards.push(new Card("5", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.cards.push(new Card("6", CardSuite.c));
    player5.cards.push(new Card("6", CardSuite.d));

    let tableBeforeMove = new TableSetup(5);
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.closedCards = [];
    tableBeforeMove.currentCallAmount = 0;
    tableBeforeMove.currentPlayerIndex = 1;
    tableBeforeMove.dealerIndex = 4;
    tableBeforeMove.deck = null;
    let card1 = new Card("Q", CardSuite.c);
    let card2 = new Card("J", CardSuite.c);
    let card3 = new Card("10", CardSuite.c);
    let card4 = new Card("3", CardSuite.s);
    let card5 = new Card("4", CardSuite.h); 
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);
    tableBeforeMove.playerIndicesRemovedInThisHand = [];
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);
    let pot = new Pot();
    pot.currentPotBetAmount = 20;
    pot.playersContributions = [20,20];
    pot.playersInvolved.push(player1);
    pot.playersInvolved.push(player2);
    pot.totalAmount = 40;
    tableBeforeMove.potArray.push(pot);
    tableBeforeMove.roundStartIndex = 0;
    tableBeforeMove.smallBlind = 10;

    let tableAfterMove = new TableSetup(5);
    tableAfterMove.bigBlind = 20;
    card1 = new Card("2", CardSuite.s);
    card2 = new Card("A", CardSuite.s);
    card3 = new Card("K", CardSuite.h);
    card4 = new Card("J", CardSuite.h);
    card5 = new Card("9", CardSuite.h);
    tableBeforeMove.closedCards.push(card1);
    tableAfterMove.closedCards.push(card2);
    tableAfterMove.closedCards.push(card3);
    tableAfterMove.closedCards.push(card4);
    tableAfterMove.closedCards.push(card5);
    tableAfterMove.currentCallAmount = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.dealerIndex = 0;
    tableAfterMove.deck = initializeTableDeck();
    for(let i : number = 0; i<18; i++) {
        tableAfterMove.deck.pop();
    }    
    tableAfterMove.openedCards = [];
    tableAfterMove.playerIndicesRemovedInThisHand = [];
    player1.chipsInPocket = 320
    player1.state = PlayerState.Init
    player1.cards = []
    player1.cards.push(new Card("K", CardSuite.s));
    player1.cards.push(new Card("8", CardSuite.s));
    player2.state = PlayerState.Init
    player2.cards = []
    player2.cards.push(new Card("Q", CardSuite.s));
    player2.cards.push(new Card("7", CardSuite.s));
    player3.state = PlayerState.Init
    player3.cards = []
    player3.cards.push(new Card("J", CardSuite.s));
    player3.cards.push(new Card("6", CardSuite.s));
    player4.state = PlayerState.Init
    player4.cards = []
    player4.cards.push(new Card("10", CardSuite.s));
    player4.cards.push(new Card("5", CardSuite.s));
    player5.state = PlayerState.Init
    player5.cards = []
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("4", CardSuite.s));
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);
    pot = new Pot();
    pot.currentPotBetAmount = 0;
    pot.playersContributions = [0,0,0,0,0];
    pot.playersInvolved.push(player1);
    pot.playersInvolved.push(player2);
    pot.playersInvolved.push(player3);
    pot.playersInvolved.push(player4);
    pot.playersInvolved.push(player5);
    pot.totalAmount = 0;
    tableAfterMove.potArray.push(pot);
    tableAfterMove.roundStartIndex = 1;
    tableAfterMove.smallBlind = 10;

    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, P2_TURN, NO_ONE_WINS);
  });
/*

  // Only possible when the Royal Flush is on the table
  it("Check for end of Round 4 -> Check for Winner -> Conflict of Royal Flush", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("2", CardSuite.c));
    player1.cards.push(new Card("2", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("3", CardSuite.c));
    player2.cards.push(new Card("3", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.c));
    player3.cards.push(new Card("4", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.c));
    player4.cards.push(new Card("5", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.c));
    player5.cards.push(new Card("6", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("A", CardSuite.c);
    let card2 = new Card("K", CardSuite.c);
    let card3 = new Card("Q", CardSuite.c);
    let card4 = new Card("J", CardSuite.c);
    let card5 = new Card("10", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Straight Flush", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("8", CardSuite.c));
    player1.cards.push(new Card("9", CardSuite.c));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("3", CardSuite.c));
    player2.cards.push(new Card("3", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.c));
    player3.cards.push(new Card("4", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.c));
    player4.cards.push(new Card("5", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.c));
    player5.cards.push(new Card("6", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("Q", CardSuite.c);
    let card2 = new Card("J", CardSuite.c);
    let card3 = new Card("10", CardSuite.c);
    let card4 = new Card("3", CardSuite.s);
    let card5 = new Card("4", CardSuite.h);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Straight Flush with different high cards", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("J", CardSuite.c));
    player1.cards.push(new Card("Q", CardSuite.c));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("6", CardSuite.c));
    player2.cards.push(new Card("7", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.s));
    player3.cards.push(new Card("4", CardSuite.h));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.s));
    player4.cards.push(new Card("5", CardSuite.h));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.s));
    player5.cards.push(new Card("6", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("10", CardSuite.c);
    let card2 = new Card("9", CardSuite.c);
    let card3 = new Card("8", CardSuite.c);
    let card4 = new Card("7", CardSuite.s);
    let card5 = new Card("8", CardSuite.h);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  // Only possible when the Straight Flush is on the table
  it("Check for end of Round 4 -> Check for Winner -> Conflict of Straight Flush with same high cards", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("2", CardSuite.s));
    player1.cards.push(new Card("2", CardSuite.h));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("3", CardSuite.s));
    player2.cards.push(new Card("3", CardSuite.h));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.s));
    player3.cards.push(new Card("4", CardSuite.h));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.s));
    player4.cards.push(new Card("5", CardSuite.h));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.s));
    player5.cards.push(new Card("6", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("10", CardSuite.c);
    let card2 = new Card("9", CardSuite.c);
    let card3 = new Card("8", CardSuite.c);
    let card4 = new Card("7", CardSuite.c);
    let card5 = new Card("6", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is 4 of a Kind", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("J", CardSuite.d));
    player1.cards.push(new Card("Q", CardSuite.c));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("3", CardSuite.s));
    player2.cards.push(new Card("3", CardSuite.h));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.s));
    player3.cards.push(new Card("4", CardSuite.h));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.s));
    player4.cards.push(new Card("5", CardSuite.h));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.s));
    player5.cards.push(new Card("6", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("J", CardSuite.c);
    let card2 = new Card("J", CardSuite.s);
    let card3 = new Card("J", CardSuite.h);
    let card4 = new Card("7", CardSuite.s);
    let card5 = new Card("8", CardSuite.h);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 4 of a Kind where the 'set of 4' are different", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("J", CardSuite.c));
    player1.cards.push(new Card("J", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.c));
    player2.cards.push(new Card("Q", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.s));
    player3.cards.push(new Card("4", CardSuite.h));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.s));
    player4.cards.push(new Card("5", CardSuite.h));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.s));
    player5.cards.push(new Card("6", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("J", CardSuite.s);
    let card2 = new Card("J", CardSuite.h);
    let card3 = new Card("Q", CardSuite.s);
    let card4 = new Card("Q", CardSuite.h);
    let card5 = new Card("8", CardSuite.h);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  // Only possible when the 4 of a Kind is on the table
  it("Check for end of Round 4 -> Check for Winner -> Conflict of 4 of a Kind where the 'set of 4' are same and kicker Card is different", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("K", CardSuite.s));
    player1.cards.push(new Card("Q", CardSuite.h));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.s));
    player2.cards.push(new Card("10", CardSuite.h));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.s));
    player3.cards.push(new Card("4", CardSuite.h));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.s));
    player4.cards.push(new Card("5", CardSuite.h));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.s));
    player5.cards.push(new Card("6", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("J", CardSuite.c);
    let card2 = new Card("J", CardSuite.d);
    let card3 = new Card("J", CardSuite.s);
    let card4 = new Card("J", CardSuite.h);
    let card5 = new Card("8", CardSuite.h);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  // Only possible when the 4 of a Kind is on the table
  it("Check for end of Round 4 -> Check for Winner -> Conflict of 4 of a Kind where the 'set of 4' are same and kicker Card is also same", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("2", CardSuite.s));
    player1.cards.push(new Card("2", CardSuite.h));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("3", CardSuite.s));
    player2.cards.push(new Card("3", CardSuite.h));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("4", CardSuite.s));
    player3.cards.push(new Card("4", CardSuite.h));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("5", CardSuite.s));
    player4.cards.push(new Card("5", CardSuite.h));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("6", CardSuite.s));
    player5.cards.push(new Card("6", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("J", CardSuite.c);
    let card2 = new Card("J", CardSuite.d);
    let card3 = new Card("J", CardSuite.s);
    let card4 = new Card("J", CardSuite.h);
    let card5 = new Card("A", CardSuite.h);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Full House", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("4", CardSuite.h));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("5", CardSuite.s));
    player2.cards.push(new Card("7", CardSuite.h));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.s));
    player3.cards.push(new Card("8", CardSuite.h));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.s));
    player4.cards.push(new Card("9", CardSuite.h));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.s));
    player5.cards.push(new Card("10", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("3", CardSuite.c);
    let card2 = new Card("3", CardSuite.d);
    let card3 = new Card("4", CardSuite.s);
    let card4 = new Card("2", CardSuite.c);
    let card5 = new Card("8", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Full House where the 'set of 3' are different", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("4", CardSuite.h));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("5", CardSuite.s));
    player2.cards.push(new Card("4", CardSuite.s));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("3", CardSuite.c);
    let card2 = new Card("3", CardSuite.d);
    let card3 = new Card("5", CardSuite.c);
    let card4 = new Card("5", CardSuite.d);
    let card5 = new Card("4", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  // Only possible when the 4 of a Kind is on the table
  it("Check for end of Round 4 -> Check for Winner -> Conflict of Full House where the 'set of 3' are same and 'set of 2' are different", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("4", CardSuite.h));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("3", CardSuite.h));
    player2.cards.push(new Card("5", CardSuite.s));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("3", CardSuite.c);
    let card2 = new Card("3", CardSuite.d);
    let card3 = new Card("4", CardSuite.c);
    let card4 = new Card("5", CardSuite.d);
    let card5 = new Card("2", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  // Only possible when the 4 of a Kind is on the table
  it("Check for end of Round 4 -> Check for Winner -> Conflict of Full House where the 'set of 3' and 'set of 2' are same", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("5", CardSuite.h));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("3", CardSuite.h));
    player2.cards.push(new Card("5", CardSuite.s));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("3", CardSuite.c);
    let card2 = new Card("3", CardSuite.d);
    let card3 = new Card("5", CardSuite.c);
    let card4 = new Card("J", CardSuite.d);
    let card5 = new Card("2", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Flush", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("5", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("5", CardSuite.c));
    player2.cards.push(new Card("7", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("7", CardSuite.s);
    let card2 = new Card("9", CardSuite.s);
    let card3 = new Card("J", CardSuite.s);
    let card4 = new Card("J", CardSuite.d);
    let card5 = new Card("2", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush with different high cards", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("5", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("4", CardSuite.s));
    player2.cards.push(new Card("J", CardSuite.s));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("7", CardSuite.s);
    let card2 = new Card("9", CardSuite.s);
    let card3 = new Card("10", CardSuite.s);
    let card4 = new Card("J", CardSuite.d);
    let card5 = new Card("2", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush where highest unique card is 2nd highest card", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("5", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("4", CardSuite.s));
    player2.cards.push(new Card("10", CardSuite.s));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("7", CardSuite.s);
    let card2 = new Card("9", CardSuite.s);
    let card3 = new Card("Q", CardSuite.s);
    let card4 = new Card("J", CardSuite.d);
    let card5 = new Card("2", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush where highest unique card is 3rd highest card", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("8", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("4", CardSuite.s));
    player2.cards.push(new Card("6", CardSuite.s));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("7", CardSuite.s);
    let card2 = new Card("10", CardSuite.s);
    let card3 = new Card("Q", CardSuite.s);
    let card4 = new Card("J", CardSuite.d);
    let card5 = new Card("2", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush where highest unique card is 4th highest card", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("7", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("4", CardSuite.s));
    player2.cards.push(new Card("6", CardSuite.s));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("8", CardSuite.s);
    let card2 = new Card("10", CardSuite.s);
    let card3 = new Card("Q", CardSuite.s);
    let card4 = new Card("J", CardSuite.d);
    let card5 = new Card("2", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush where highest unique card is 5th highest card", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.s));
    player1.cards.push(new Card("7", CardSuite.h));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("2", CardSuite.s));
    player2.cards.push(new Card("6", CardSuite.h));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("6", CardSuite.s);
    let card2 = new Card("8", CardSuite.s);
    let card3 = new Card("10", CardSuite.s);
    let card4 = new Card("Q", CardSuite.s);
    let card5 = new Card("2", CardSuite.c);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush with exactly the same hand", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("4", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("5", CardSuite.c));
    player2.cards.push(new Card("7", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("6", CardSuite.c));
    player3.cards.push(new Card("8", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("7", CardSuite.c));
    player4.cards.push(new Card("9", CardSuite.d));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.c));
    player5.cards.push(new Card("10", CardSuite.d));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("4", CardSuite.s);
    let card2 = new Card("6", CardSuite.s);
    let card3 = new Card("8", CardSuite.s);
    let card4 = new Card("10", CardSuite.s);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Straight", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.c));
    player1.cards.push(new Card("4", CardSuite.c));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("8", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("8", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("8", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("8", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.s);
    let card2 = new Card("6", CardSuite.c);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("10", CardSuite.h);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Straight with different high cards", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.c));
    player1.cards.push(new Card("4", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("4", CardSuite.s));
    player2.cards.push(new Card("8", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.s);
    let card2 = new Card("6", CardSuite.c);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("10", CardSuite.h);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of Straight with same high cards", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("3", CardSuite.c));
    player1.cards.push(new Card("4", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("3", CardSuite.s));
    player2.cards.push(new Card("4", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.s);
    let card2 = new Card("6", CardSuite.c);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("10", CardSuite.h);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is 3 of a Kind", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("Q", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("9", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.s);
    let card2 = new Card("6", CardSuite.c);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("10", CardSuite.h);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 3 of a Kind where the 'set of 3' are different", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("Q", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("J", CardSuite.d));
    player2.cards.push(new Card("J", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.s);
    let card2 = new Card("6", CardSuite.c);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("J", CardSuite.h);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  // Only possible when the 4 of a Kind is on the table
  it("Check for end of Round 4 -> Check for Winner -> Conflict of 3 of a Kind where the 'set of 3' are same and highest kickers are different", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("2", CardSuite.c));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.s));
    player2.cards.push(new Card("9", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.s);
    let card2 = new Card("6", CardSuite.c);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("Q", CardSuite.h);
    let card5 = new Card("Q", CardSuite.d);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  // Only possible when the 4 of a Kind is on the table
  it("Check for end of Round 4 -> Check for Winner -> Conflict of 3 of a Kind where the 'set of 3' and highest kickers are same but 2nd highest kicker are different", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("2", CardSuite.c));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.s));
    player2.cards.push(new Card("6", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.s);
    let card2 = new Card("3", CardSuite.c);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("Q", CardSuite.h);
    let card5 = new Card("Q", CardSuite.d);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 3 of a Kind where the 'set of 3', highest kickers and 2nd highest kickers are same", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("2", CardSuite.c));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.s));
    player2.cards.push(new Card("3", CardSuite.d));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.s);
    let card2 = new Card("6", CardSuite.c);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("Q", CardSuite.h);
    let card5 = new Card("Q", CardSuite.d);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is 2 Pair", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("9", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("6", CardSuite.h);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.d);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 2 Pair with different highest pairs", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("J", CardSuite.d));
    player2.cards.push(new Card("6", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("6", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("7", CardSuite.d);
    let card4 = new Card("J", CardSuite.s);
    let card5 = new Card("Q", CardSuite.h);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 2 Pair with same highest pairs but different 2nd highest pairs", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.d));
    player2.cards.push(new Card("5", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.d);
    let card2 = new Card("6", CardSuite.h);
    let card3 = new Card("K", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 2 Pair with same highest pairs and 2nd highest pairs but different kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.d));
    player2.cards.push(new Card("8", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("5", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("10", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 2 Pair with same highest pairs, 2nd highest pairs and kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.d));
    player2.cards.push(new Card("8", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("10", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is 1 Pair", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("9", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("5", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with different pairs", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("J", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("J", CardSuite.c);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("5", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with same pairs but different highest kicker", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("K", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("6", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("5", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with same pairs and highest kickers but different 2nd highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("10", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("6", CardSuite.h);
    let card3 = new Card("5", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with same pairs, highest kickers and 2nd highest kickers but different 3rd highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("6", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("5", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with same pairs, highest kickers, 2nd highest kickers and 3rd highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("Q", CardSuite.c));
    player1.cards.push(new Card("5", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("Q", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("6", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Winning Hand is High Card", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("A", CardSuite.c));
    player1.cards.push(new Card("5", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("9", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("6", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("Q", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with different highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("A", CardSuite.c));
    player1.cards.push(new Card("K", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("A", CardSuite.d));
    player2.cards.push(new Card("2", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("J", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("6", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("7", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers but different 2nd highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("A", CardSuite.c));
    player1.cards.push(new Card("Q", CardSuite.s));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("A", CardSuite.d));
    player2.cards.push(new Card("J", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("10", CardSuite.h);
    let card3 = new Card("6", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("7", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers, 2nd highest kickers but different 3rd highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("A", CardSuite.c));
    player1.cards.push(new Card("8", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("A", CardSuite.d));
    player2.cards.push(new Card("5", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("J", CardSuite.h);
    let card3 = new Card("6", CardSuite.d);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("7", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers, 2nd highest kickers and 3rd highest kickers but different 4th highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("A", CardSuite.c));
    player1.cards.push(new Card("8", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("A", CardSuite.d));
    player2.cards.push(new Card("5", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("Q", CardSuite.h);
    let card3 = new Card("10", CardSuite.s);
    let card4 = new Card("3", CardSuite.c);
    let card5 = new Card("7", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers, 2nd highest kickers, 3rd highest kickers and 4th highest kickers but different 5th highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("A", CardSuite.c));
    player1.cards.push(new Card("8", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("A", CardSuite.d));
    player2.cards.push(new Card("5", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("Q", CardSuite.h);
    let card3 = new Card("10", CardSuite.s);
    let card4 = new Card("7", CardSuite.c);
    let card5 = new Card("3", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers, 2nd highest kickers, 3rd highest kickers, 4th highest kickers and 5th highest kickers", function() {
    let player1 = new Player("adit91","Adit");
    player1.state = PlayerState.Check;
    player1.chipsInPocket = 400;
    player1.currentBet = 100;
    player1.cards.push(new Card("A", CardSuite.c));
    player1.cards.push(new Card("8", CardSuite.d));

    let player2 = new Player("ridhi91","Ridhi");
    player2.state = PlayerState.Check;
    player2.chipsInPocket = 400;
    player2.currentBet = 100;
    player2.cards.push(new Card("A", CardSuite.d));
    player2.cards.push(new Card("8", CardSuite.c));

    let player3 = new Player("anto90","Anto");
    player3.state = PlayerState.Fold;
    player3.chipsInPocket = 500;
    player3.currentBet = 0;
    player3.cards.push(new Card("9", CardSuite.c));
    player3.cards.push(new Card("2", CardSuite.d));

    let player4 = new Player("gaurav89", "Gaurav");
    player4.state = PlayerState.Fold;
    player4.chipsInPocket = 500;
    player4.currentBet = 0;
    player4.cards.push(new Card("9", CardSuite.h));
    player4.cards.push(new Card("2", CardSuite.s));

    let player5 = new Player("rachita88","Rachita");
    player5.state = PlayerState.Fold;
    player5.chipsInPocket = 500;
    player5.currentBet = 0;
    player5.cards.push(new Card("9", CardSuite.s));
    player5.cards.push(new Card("2", CardSuite.h));

    let tableBeforeMove = new TableSetup();
    tableBeforeMove.addPlayerToTheTable(player1);
    tableBeforeMove.addPlayerToTheTable(player2);
    tableBeforeMove.addPlayerToTheTable(player3);
    tableBeforeMove.addPlayerToTheTable(player4);
    tableBeforeMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableBeforeMove.deck = null;
    let card1 = new Card("K", CardSuite.d);
    let card2 = new Card("Q", CardSuite.h);
    let card3 = new Card("10", CardSuite.s);
    let card4 = new Card("7", CardSuite.c);
    let card5 = new Card("3", CardSuite.s);
    tableBeforeMove.closedCards = [];
    tableBeforeMove.openedCards.push(card1);
    tableBeforeMove.openedCards.push(card2);
    tableBeforeMove.openedCards.push(card3);
    tableBeforeMove.openedCards.push(card4);
    tableBeforeMove.openedCards.push(card5);

    tableBeforeMove.dealerIndex = 0;
    tableBeforeMove.currentPlayerIndex = 2;
    tableBeforeMove.roundStartIndex = 1;

    let pot = new Pot();
    pot.totalAmount = 200;
    tableBeforeMove.pot = pot;

    tableBeforeMove.smallBlind = 10;
    tableBeforeMove.bigBlind = 20;
    tableBeforeMove.currentCallAmount = 0;

    let tableAfterMove = new TableSetup();
    tableAfterMove.addPlayerToTheTable(player1);
    tableAfterMove.addPlayerToTheTable(player2);
    tableAfterMove.addPlayerToTheTable(player3);
    tableAfterMove.addPlayerToTheTable(player4);
    tableAfterMove.addPlayerToTheTable(player5);

    // Handle the random shit
    tableAfterMove.deck = null;
    tableAfterMove.closedCards = [];
    tableAfterMove.openedCards.push(card1);
    tableAfterMove.openedCards.push(card2);
    tableAfterMove.openedCards.push(card3);
    tableAfterMove.openedCards.push(card4);
    tableAfterMove.openedCards.push(card5);

    tableAfterMove.dealerIndex = 0;
    tableAfterMove.currentPlayerIndex = 1;
    tableAfterMove.roundStartIndex = 1;

    tableAfterMove.pot = pot;

    tableAfterMove.smallBlind = 10;
    tableAfterMove.bigBlind = 20;
    tableAfterMove.currentCallAmount = 0;
    expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
  });

  it("placing X in 0x0 from initial state but setting the turn to yourself is illegal", function() {
    expectMove(ILLEGAL, X_TURN, null, 0, 0,
      [['X', '', ''],
       ['', '', ''],
       ['', '', '']], X_TURN, NO_ONE_WINS);
  });

  it("placing X in 0x0 from initial state and winning is illegal", function() {
    expectMove(ILLEGAL, X_TURN, null, 0, 0,
      [['X', '', ''],
       ['', '', ''],
       ['', '', '']], NO_ONE_TURN, X_WIN_SCORES);
  });

  it("placing X in 0x0 from initial state and setting the wrong board is illegal", function() {
    expectMove(ILLEGAL, X_TURN, null, 0, 0,
      [['X', 'X', ''],
       ['', '', ''],
       ['', '', '']], O_TURN, NO_ONE_WINS);
  });

  it("placing O in 0x1 after X placed X in 0x0 is legal", function() {
    expectMove(OK, O_TURN,
      [['X', '', ''],
       ['', '', ''],
       ['', '', '']], 0, 1,
      [['X', 'O', ''],
       ['', '', ''],
       ['', '', '']], X_TURN, NO_ONE_WINS);
  });

  it("placing an O in a non-empty position is illegal", function() {
    expectMove(ILLEGAL, O_TURN,
      [['X', '', ''],
       ['', '', ''],
       ['', '', '']], 0, 0,
      [['O', '', ''],
       ['', '', ''],
       ['', '', '']], X_TURN, NO_ONE_WINS);
  });

  it("cannot move after the game is over", function() {
    expectMove(ILLEGAL, O_TURN,
      [['X', 'O', ''],
       ['X', 'O', ''],
       ['X', '', '']], 2, 1,
      [['X', 'O', ''],
       ['X', 'O', ''],
       ['X', 'O', '']], X_TURN, NO_ONE_WINS);
  });

  it("placing O in 2x1 is legal", function() {
    expectMove(OK, O_TURN,
      [['O', 'X', ''],
       ['X', 'O', ''],
       ['X', '', '']], 2, 1,
      [['O', 'X', ''],
       ['X', 'O', ''],
       ['X', 'O', '']], X_TURN, NO_ONE_WINS);
  });

  it("X wins by placing X in 2x0 is legal", function() {
    expectMove(OK, X_TURN,
      [['X', 'O', ''],
       ['X', 'O', ''],
       ['', '', '']], 2, 0,
      [['X', 'O', ''],
       ['X', 'O', ''],
       ['X', '', '']], NO_ONE_TURN, X_WIN_SCORES);
  });

  it("O wins by placing O in 1x1 is legal", function() {
    expectMove(OK, O_TURN,
      [['X', 'X', 'O'],
       ['X', '', ''],
       ['O', '', '']], 1, 1,
      [['X', 'X', 'O'],
       ['X', 'O', ''],
       ['O', '', '']], NO_ONE_TURN, O_WIN_SCORES);
  });

  it("the game ties when there are no more empty cells", function() {
    expectMove(OK, X_TURN,
      [['X', 'O', 'X'],
       ['X', 'O', 'O'],
       ['O', 'X', '']], 2, 2,
      [['X', 'O', 'X'],
       ['X', 'O', 'O'],
       ['O', 'X', 'X']], NO_ONE_TURN, TIE_SCORES);
  });

  it("move without board is illegal", function() {
    expectMove(ILLEGAL, X_TURN,
      [['X', 'O', 'X'],
       ['X', 'O', 'O'],
       ['O', 'X', '']], 2, 2,
      null, NO_ONE_TURN, TIE_SCORES);
  });

  it("placing X outside the board (in 0x3) is illegal", function() {
    expectMove(ILLEGAL, X_TURN,
      [['', '', ''],
       ['', '', ''],
       ['', '', '']], 0, 3,
      [['', '', '', 'X'],
       ['', '', ''],
       ['', '', '']], O_TURN, NO_ONE_WINS);
  });
*/
});