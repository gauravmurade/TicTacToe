// round of checks
// small blind has folded? We checking who start the round of betting in the same game
// only 2 players remain
// a player has left the table. small blind getting set correctly?
describe("In Poker", function () {
    var OK = true;
    var ILLEGAL = false;
    var P1_TURN = 0;
    var P2_TURN = 1;
    var P3_TURN = 2;
    var P4_TURN = 3;
    var P5_TURN = 4;
    var NO_ONE_TURN = -1;
    var NO_ONE_WINS = null;
    var P1_WIN_SCORES = [1, 0, 0, 0, 0];
    var P2_WIN_SCORES = [0, 1, 0, 0, 0];
    var P3_WIN_SCORES = [0, 0, 1, 0, 0];
    var P4_WIN_SCORES = [0, 0, 0, 1, 0];
    var P5_WIN_SCORES = [0, 0, 0, 0, 1];
    function expectMove(isOk, turnIndexBeforeMove, tableBeforeMove, currentPlayer, amountAdded, tableAfterMove, turnIndexAfterMove, endMatchScores, lastTurnOfTheHand, playersAfterHandOver, winnersList, gameWinner) {
        var stateTransition = {
            turnIndexBeforeMove: turnIndexBeforeMove,
            stateBeforeMove: tableBeforeMove ? { table: tableBeforeMove, delta: null, winnersList: [], playersAfterHandOver: [], GameWinner: null } : null,
            move: {
                endMatchScores: endMatchScores,
                turnIndexAfterMove: turnIndexAfterMove,
                stateAfterMove: {
                    delta: { currentPlayer: currentPlayer, amountAdded: amountAdded },
                    table: tableAfterMove,
                    winnersList: winnersList,
                    playersAfterHandOver: playersAfterHandOver,
                    GameWinner: gameWinner
                }
            },
            numberOfPlayers: 2,
        };
        if (lastTurnOfTheHand) {
            stateTransition.move.stateAfterMove.delta.currentPlayer.state = PlayerState.Init;
        }
        if (isOk) {
            gameLogic.checkMoveOk(stateTransition);
        }
        else {
            //We expect an exception to be thrown :)
            var didThrowException = false;
            try {
                gameLogic.checkMoveOk(stateTransition);
            }
            catch (e) {
                didThrowException = true;
            }
            if (!didThrowException) {
                throw new Error("We expect an illegal move, but checkMoveOk didn't throw any exception!");
            }
        }
    }
    /** Test 1 */
    it("player 1 small blind move from initial state is legal", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 300;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 300;
        player2.currentBet = 0;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 0;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 0;
        pot.playersContributions = [0, 0];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 0;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 10;
        tableAfterMove.dealerIndex = 1;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 290;
        player3.state = PlayerState.Init;
        player3.currentBet = 10;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.chipsInPocket = 300;
        player4.state = PlayerState.Init;
        player4.currentBet = 0;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 10;
        pot2.playersContributions = [10, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 10;
        tableAfterMove.potArray.push(pot2);
        expectMove(OK, P1_TURN, tableBeforeMove, player3, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, false, [], [], null);
    });
    /** Test 2 */
    it("player 2 big blind move from initial state is legal", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 290;
        player1.currentBet = 10;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 300;
        player2.currentBet = 0;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 10;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 1;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 10;
        pot.playersContributions = [10, 0];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 10;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 20;
        tableAfterMove.dealerIndex = 1;
        tableAfterMove.currentPlayerIndex = 0;
        tableAfterMove.roundStartIndex = 0;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 290;
        player3.state = PlayerState.Init;
        player3.currentBet = 10;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.chipsInPocket = 280;
        player4.state = PlayerState.Init;
        player4.currentBet = 20;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 20;
        pot2.playersContributions = [10, 20];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 30;
        tableAfterMove.potArray.push(pot2);
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P1_TURN, NO_ONE_WINS, false, [], [], null);
    });
    /** Test 3 */
    it("player 2 Call from initial state is legal", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Call;
        player1.chipsInPocket = 290;
        player1.currentBet = 10;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 20;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 0;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [10, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 30;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 20;
        tableAfterMove.dealerIndex = 1;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 0;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 280;
        player3.state = PlayerState.Call;
        player3.currentBet = 20;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.chipsInPocket = 280;
        player4.state = PlayerState.Init;
        player4.currentBet = 20;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var listOfPlayers = [];
        listOfPlayers.push(player3);
        listOfPlayers.push(player4);
        tableAfterMove.addNewPot(40, listOfPlayers);
        tableAfterMove.potArray[0].currentPotBetAmount = 20;
        tableAfterMove.potArray[0].playersContributions = [20, 20];
        tableAfterMove.potArray[0].totalAmount = 40;
        expectMove(OK, P1_TURN, tableBeforeMove, player3, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, false, [], [], null);
    });
    /** Test 4 */
    it("player 2 Check from initial state is legal", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Call;
        player1.chipsInPocket = 280;
        player1.currentBet = 20;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 20;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 1;
        tableAfterMove.currentPlayerIndex = 0;
        tableAfterMove.roundStartIndex = 0;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 280;
        player3.state = PlayerState.Init;
        player3.currentBet = 0;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.chipsInPocket = 280;
        player4.state = PlayerState.Init;
        player4.currentBet = 0;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 20;
        pot2.playersContributions = [20, 20];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 40;
        tableAfterMove.potArray.push(pot2);
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P1_TURN, NO_ONE_WINS, false, [], [], null);
    });
    /**Test 5 */
    it("3 Cards opened, Player 1 raised", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Raise;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 0;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 40;
        tableAfterMove.dealerIndex = 1;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 0;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 240;
        player3.state = PlayerState.Raise;
        player3.currentBet = 40;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.chipsInPocket = 280;
        player4.state = PlayerState.Init;
        player4.currentBet = 0;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 60;
        pot2.playersContributions = [60, 20];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 80;
        tableAfterMove.potArray.push(pot2);
        expectMove(OK, P1_TURN, tableBeforeMove, player3, 40, tableAfterMove, P2_TURN, NO_ONE_WINS, false, [], [], null);
    });
    /** Test 6 */
    it("3 Cards opened, Player 1 raised, player 2 goes All In; He satisfies the minimum bet", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Raise;
        player1.chipsInPocket = 240;
        player1.currentBet = 40;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.AllIn;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 40;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 40;
        pot.playersContributions = [60, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 80;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 280;
        tableAfterMove.dealerIndex = 1;
        tableAfterMove.currentPlayerIndex = 0;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 240;
        player3.state = PlayerState.Raise;
        player3.currentBet = 40;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.chipsInPocket = 0;
        player4.state = PlayerState.AllIn;
        player4.currentBet = 280;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 300;
        pot2.playersContributions = [60, 300];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 360;
        tableAfterMove.potArray.push(pot2);
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 40, tableAfterMove, P1_TURN, NO_ONE_WINS, false, [], [], null);
    });
    /** Test 7 */
    it("3 Cards opened, Player 1 raised, player 2 goes All In; He doesn't satisfy the minimum bet; New Pot Created!", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Raise;
        player1.chipsInPocket = 240;
        player1.currentBet = 40;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.AllIn;
        player2.chipsInPocket = 30;
        player2.currentBet = 0;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 40;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 40;
        pot.playersContributions = [60, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 80;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 1;
        tableAfterMove.currentPlayerIndex = 0;
        tableAfterMove.roundStartIndex = 0;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.openedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 240;
        player3.state = PlayerState.Init;
        player3.currentBet = 0;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.chipsInPocket = 0;
        player4.state = PlayerState.AllIn;
        player4.currentBet = 0;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 50;
        pot2.playersContributions = [50, 50];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 100;
        tableAfterMove.potArray.push(pot2);
        var pot3 = new Pot();
        pot3.currentPotBetAmount = 10;
        pot3.addPlayerToThePot(player3);
        pot3.removeIfPlayerPresent(player3);
        pot3.playersContributions = [10];
        pot3.playersInvolved.push(player3);
        pot3.totalAmount = 10;
        tableAfterMove.potArray.push(pot3);
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 40, tableAfterMove, P1_TURN, NO_ONE_WINS, false, [], [], null);
    });
    /** Test 8 */
    it("Small Blind; Big Blind; Fold", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Fold;
        player1.chipsInPocket = 290;
        player1.currentBet = 10;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 20;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 0;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [10, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 30;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 290;
        player3.state = PlayerState.Init;
        player3.currentBet = 0;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCategory = "-Invalid-";
        player4.chipsInPocket = 310;
        player4.state = PlayerState.Init;
        player4.currentBet = 0;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player4);
        player5.currentBet = 20;
        var allWinners = [[player5]];
        tableAfterMove.winnersOfPreviousHand = [[player4]];
        expectMove(OK, P1_TURN, tableBeforeMove, player3, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, false, null, allWinners, null);
    });
    /** Test 9 */
    it("Small Blind; Big Blind; AllIn; AllIn", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.AllIn;
        player1.chipsInPocket = 0;
        player1.currentBet = 200;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.AllIn;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 200;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 200;
        pot.playersContributions = [200, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 220;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("K", CardSuite.s), new Card("J", CardSuite.s), new Card("6", CardSuite.s), new Card("7", CardSuite.s), new Card("8", CardSuite.s)];
        player3.winningCategory = "Flush";
        player3.chipsInPocket = 400;
        player3.state = PlayerState.Init;
        player3.currentBet = 0;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("Q", CardSuite.s), new Card("10", CardSuite.s), new Card("6", CardSuite.s), new Card("7", CardSuite.s), new Card("8", CardSuite.s)];
        player4.winningCategory = "Flush";
        player4.chipsInPocket = 100;
        player4.state = PlayerState.Init;
        player4.currentBet = 0;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.AllIn;
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.AllIn;
        var allWinners = [[player5], [player6]];
        tableAfterMove.winnersOfPreviousHand = [[player3], [player4]];
        expectMove(OK, P1_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, false, [player5, player6], allWinners, null);
    });
    /** Test 10 */
    it("Resolve 4 of A Kind", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("K", CardSuite.c));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("J", CardSuite.s));
        player2.cards.push(new Card("J", CardSuite.c));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("K", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("K", CardSuite.s), new Card("K", CardSuite.c), new Card("K", CardSuite.d), new Card("K", CardSuite.h), new Card("J", CardSuite.d)];
        player3.winningCategory = "4 of a Kind";
        player3.chipsInPocket = 320;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("J", CardSuite.s), new Card("J", CardSuite.c), new Card("K", CardSuite.d), new Card("J", CardSuite.d), new Card("J", CardSuite.h)];
        player4.winningCategory = "4 of a Kind";
        player4.chipsInPocket = 280;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("K", CardSuite.s), new Card("K", CardSuite.c)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("J", CardSuite.s), new Card("J", CardSuite.c)];
        var allWinners = [[player5]];
        tableAfterMove.winnersOfPreviousHand = [[player3]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /** Test 11 */
    it("Resolve 3 of A Kind", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("9", CardSuite.c));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("K", CardSuite.c));
        player2.cards.push(new Card("9", CardSuite.d));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("K", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("A", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("Q", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("K", CardSuite.s), new Card("K", CardSuite.d), new Card("K", CardSuite.h), new Card("A", CardSuite.h), new Card("Q", CardSuite.s)];
        player3.winningCategory = "3 of a Kind";
        player3.chipsInPocket = 300;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("K", CardSuite.c), new Card("K", CardSuite.d), new Card("K", CardSuite.h), new Card("A", CardSuite.h), new Card("Q", CardSuite.s)];
        player4.winningCategory = "3 of a Kind";
        player4.chipsInPocket = 300;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("K", CardSuite.s), new Card("9", CardSuite.c)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("K", CardSuite.c), new Card("9", CardSuite.d)];
        var allWinners = [[player5, player6]];
        tableAfterMove.winnersOfPreviousHand = [[player3, player4]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /** Test 12 */
    it("Resolve Full House", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("10", CardSuite.c));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("K", CardSuite.c));
        player2.cards.push(new Card("9", CardSuite.c));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("K", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("K", CardSuite.s), new Card("K", CardSuite.d), new Card("K", CardSuite.h), new Card("J", CardSuite.d), new Card("J", CardSuite.h)];
        player3.winningCategory = "Full House";
        player3.chipsInPocket = 300;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("K", CardSuite.c), new Card("K", CardSuite.d), new Card("K", CardSuite.h), new Card("J", CardSuite.d), new Card("J", CardSuite.h)];
        player4.winningCategory = "Full House";
        player4.chipsInPocket = 300;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("K", CardSuite.s), new Card("10", CardSuite.c)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("K", CardSuite.c), new Card("9", CardSuite.c)];
        var allWinners = [[player5, player6]];
        tableAfterMove.winnersOfPreviousHand = [[player3, player4]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /**Test 13 */
    it("Resolve 2 Of A Kind", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("4", CardSuite.c));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("K", CardSuite.c));
        player2.cards.push(new Card("5", CardSuite.c));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("A", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("9", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("K", CardSuite.s), new Card("K", CardSuite.d), new Card("A", CardSuite.h), new Card("J", CardSuite.d), new Card("9", CardSuite.h)];
        player3.winningCategory = "1 Pair";
        player3.chipsInPocket = 300;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("K", CardSuite.c), new Card("K", CardSuite.d), new Card("A", CardSuite.h), new Card("J", CardSuite.d), new Card("9", CardSuite.h)];
        player4.winningCategory = "1 Pair";
        player4.chipsInPocket = 300;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("K", CardSuite.s), new Card("4", CardSuite.c)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("K", CardSuite.c), new Card("5", CardSuite.c)];
        var allWinners = [[player5, player6]];
        tableAfterMove.winnersOfPreviousHand = [[player3, player4]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /**Test 14 */
    it("Resolve Straight with a Winner", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("9", CardSuite.c));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("9", CardSuite.s));
        player2.cards.push(new Card("5", CardSuite.c));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("8", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("10", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("Q", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("3", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("K", CardSuite.s), new Card("9", CardSuite.c), new Card("10", CardSuite.h), new Card("J", CardSuite.d), new Card("Q", CardSuite.h)];
        player3.winningCategory = "Straight";
        player3.chipsInPocket = 320;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("9", CardSuite.s), new Card("8", CardSuite.d), new Card("10", CardSuite.h), new Card("J", CardSuite.d), new Card("Q", CardSuite.h)];
        player4.winningCategory = "Straight";
        player4.chipsInPocket = 280;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("K", CardSuite.s), new Card("9", CardSuite.c)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("9", CardSuite.s), new Card("5", CardSuite.c)];
        var allWinners = [[player5]];
        tableAfterMove.winnersOfPreviousHand = [[player3]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /**Test 15 */
    it("Resolve Straight with a tie", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("A", CardSuite.s));
        player1.cards.push(new Card("9", CardSuite.c));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("9", CardSuite.s));
        player2.cards.push(new Card("5", CardSuite.c));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("8", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("10", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("Q", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("3", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("9", CardSuite.c), new Card("8", CardSuite.d), new Card("10", CardSuite.h), new Card("J", CardSuite.d), new Card("Q", CardSuite.h)];
        player3.winningCategory = "Straight";
        player3.chipsInPocket = 300;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("9", CardSuite.s), new Card("8", CardSuite.d), new Card("10", CardSuite.h), new Card("J", CardSuite.d), new Card("Q", CardSuite.h)];
        player4.winningCategory = "Straight";
        player4.chipsInPocket = 300;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("A", CardSuite.s), new Card("9", CardSuite.c)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("9", CardSuite.s), new Card("5", CardSuite.c)];
        var allWinners = [[player5, player6]];
        tableAfterMove.winnersOfPreviousHand = [[player3, player4]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /**Test 16 */
    it("Resolve 2 Pair", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("10", CardSuite.c));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("K", CardSuite.c));
        player2.cards.push(new Card("9", CardSuite.c));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("A", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("K", CardSuite.s), new Card("K", CardSuite.d), new Card("A", CardSuite.h), new Card("J", CardSuite.d), new Card("J", CardSuite.h)];
        player3.winningCategory = "2 Pair";
        player3.chipsInPocket = 300;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("K", CardSuite.c), new Card("K", CardSuite.d), new Card("A", CardSuite.h), new Card("J", CardSuite.d), new Card("J", CardSuite.h)];
        player4.winningCategory = "2 Pair";
        player4.chipsInPocket = 300;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("K", CardSuite.s), new Card("10", CardSuite.c)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("K", CardSuite.c), new Card("9", CardSuite.c)];
        var allWinners = [[player5, player6]];
        tableAfterMove.winnersOfPreviousHand = [[player3, player4]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /**Test 17*/
    it("Can Small Blind?", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 300;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 300;
        player2.currentBet = 0;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var table = new TableSetup(2);
        table.smallBlind = 10;
        table.bigBlind = 20;
        table.currentCallAmount = 0;
        table.dealerIndex = 0;
        table.currentPlayerIndex = 0;
        table.roundStartIndex = 0;
        table.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            table.deck.pop();
        }
        table.closedCards = [];
        table.openedCards = [];
        table.openedCards.push(new Card("8", CardSuite.s));
        table.openedCards.push(new Card("7", CardSuite.s));
        table.openedCards.push(new Card("6", CardSuite.s));
        table.openedCards.push(new Card("4", CardSuite.s));
        table.openedCards.push(new Card("2", CardSuite.s));
        table.playerIndicesRemovedInThisHand = [];
        table.addPlayerToTheTable(player1);
        table.addPlayerToTheTable(player2);
        table.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 0;
        pot.playersContributions = [0, 0];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 0;
        table.potArray.push(pot);
        if (!gameLogic.canSmallBlindOrNot(table)) {
            throw "The Current user has to play Small Blind!";
        }
        pot.playersContributions = [10, 0];
        pot.totalAmount = 10;
        if (gameLogic.canSmallBlindOrNot(table)) {
            throw "The Current user has to play Small Blind!";
        }
    });
    /**Test 18*/
    it("Can Big Blind?", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 290;
        player1.currentBet = 10;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 300;
        player2.currentBet = 0;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var table = new TableSetup(2);
        table.smallBlind = 10;
        table.bigBlind = 20;
        table.currentCallAmount = 0;
        table.dealerIndex = 0;
        table.currentPlayerIndex = 1;
        table.roundStartIndex = 1;
        table.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            table.deck.pop();
        }
        table.closedCards = [];
        table.openedCards = [];
        table.openedCards.push(new Card("8", CardSuite.s));
        table.openedCards.push(new Card("7", CardSuite.s));
        table.openedCards.push(new Card("6", CardSuite.s));
        table.openedCards.push(new Card("4", CardSuite.s));
        table.openedCards.push(new Card("2", CardSuite.s));
        table.playerIndicesRemovedInThisHand = [];
        table.addPlayerToTheTable(player1);
        table.addPlayerToTheTable(player2);
        table.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 10;
        pot.playersContributions = [10, 0];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 10;
        table.potArray.push(pot);
        if (!gameLogic.canBigBlindOrNot(table)) {
            throw "The Current user has to play Big Blind!";
        }
        pot.playersContributions = [0, 0];
        pot.totalAmount = 0;
        if (gameLogic.canBigBlindOrNot(table)) {
            throw "The Current user has to play Small Blind!";
        }
    });
    /**Test 19*/
    it("Can Fold?", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 280;
        player1.currentBet = 20;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var table = new TableSetup(2);
        table.smallBlind = 10;
        table.bigBlind = 20;
        table.currentCallAmount = 0;
        table.dealerIndex = 0;
        table.currentPlayerIndex = 1;
        table.roundStartIndex = 1;
        table.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            table.deck.pop();
        }
        table.closedCards = [];
        table.openedCards = [];
        table.openedCards.push(new Card("8", CardSuite.s));
        table.openedCards.push(new Card("7", CardSuite.s));
        table.openedCards.push(new Card("6", CardSuite.s));
        table.openedCards.push(new Card("4", CardSuite.s));
        table.openedCards.push(new Card("2", CardSuite.s));
        table.playerIndicesRemovedInThisHand = [];
        table.addPlayerToTheTable(player1);
        table.addPlayerToTheTable(player2);
        table.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        table.potArray.push(pot);
        if (!gameLogic.canFoldOrNot(table)) {
            throw "The Current user can Fold!";
        }
        pot.playersContributions = [0, 0];
        pot.totalAmount = 0;
        if (gameLogic.canFoldOrNot(table)) {
            throw "The Current user has to play Small Blind!";
        }
        pot.playersContributions = [10, 0];
        pot.totalAmount = 10;
        if (gameLogic.canFoldOrNot(table)) {
            throw "The Current user has to play Big Blind!";
        }
    });
    /**Test 20*/
    it("Can Check?", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 280;
        player1.currentBet = 20;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var table = new TableSetup(2);
        table.smallBlind = 10;
        table.bigBlind = 20;
        table.currentCallAmount = 20;
        table.dealerIndex = 0;
        table.currentPlayerIndex = 1;
        table.roundStartIndex = 1;
        table.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            table.deck.pop();
        }
        table.closedCards = [];
        table.openedCards = [];
        table.openedCards.push(new Card("8", CardSuite.s));
        table.openedCards.push(new Card("7", CardSuite.s));
        table.openedCards.push(new Card("6", CardSuite.s));
        table.openedCards.push(new Card("4", CardSuite.s));
        table.openedCards.push(new Card("2", CardSuite.s));
        table.playerIndicesRemovedInThisHand = [];
        table.addPlayerToTheTable(player1);
        table.addPlayerToTheTable(player2);
        table.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        table.potArray.push(pot);
        if (!gameLogic.canCheckOrNot(table, player1)) {
            throw "The Current user can Check!";
        }
        if (gameLogic.canCheckOrNot(table, null)) {
            throw "The Current user can Check!";
        }
        pot.playersContributions = [0, 0];
        pot.totalAmount = 0;
        if (gameLogic.canCheckOrNot(table, player1)) {
            throw "The Current user has to play Small Blind!";
        }
        pot.playersContributions = [30, 20];
        pot.totalAmount = 50;
        table.currentCallAmount = 30;
        if (gameLogic.canCheckOrNot(table, player2)) {
            throw "The Current user has not matched the bet yet!";
        }
    });
    /**Test 21*/
    it("Can Call?", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 290;
        player1.currentBet = 10;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var table = new TableSetup(2);
        table.smallBlind = 10;
        table.bigBlind = 20;
        table.currentCallAmount = 20;
        table.dealerIndex = 0;
        table.currentPlayerIndex = 0;
        table.roundStartIndex = 0;
        table.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            table.deck.pop();
        }
        table.closedCards = [];
        table.openedCards = [];
        table.openedCards.push(new Card("8", CardSuite.s));
        table.openedCards.push(new Card("7", CardSuite.s));
        table.openedCards.push(new Card("6", CardSuite.s));
        table.openedCards.push(new Card("4", CardSuite.s));
        table.openedCards.push(new Card("2", CardSuite.s));
        table.playerIndicesRemovedInThisHand = [];
        table.addPlayerToTheTable(player1);
        table.addPlayerToTheTable(player2);
        table.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [10, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 30;
        table.potArray.push(pot);
        if (!gameLogic.canCallOrNot(table, player1)) {
            throw "The Current user can Call!";
        }
        if (gameLogic.canCallOrNot(table, null)) {
            throw "The Current user can Check!";
        }
        pot.playersContributions = [0, 0];
        pot.totalAmount = 0;
        if (gameLogic.canCallOrNot(table, player1)) {
            throw "The Current user has to play Small Blind!";
        }
        pot.playersContributions = [20, 20];
        pot.totalAmount = 40;
        table.currentCallAmount = 20;
        player1.chipsInPocket = 20;
        player1.currentBet = 20;
        if (gameLogic.canCallOrNot(table, player1)) {
            throw "The Current user has already matched the bet!";
        }
        table.currentCallAmount = 50;
        player1.currentBet = 20;
        player1.chipsInPocket = 20;
        if (gameLogic.canCallOrNot(table, player1)) {
            throw "The Current user doesn't have enough chips to match the bet!";
        }
    });
    /**Test 22*/
    it("Can Raise?", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 290;
        player1.currentBet = 10;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var table = new TableSetup(2);
        table.smallBlind = 10;
        table.bigBlind = 20;
        table.currentCallAmount = 20;
        table.dealerIndex = 0;
        table.currentPlayerIndex = 0;
        table.roundStartIndex = 0;
        table.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            table.deck.pop();
        }
        table.closedCards = [];
        table.openedCards = [];
        table.openedCards.push(new Card("8", CardSuite.s));
        table.openedCards.push(new Card("7", CardSuite.s));
        table.openedCards.push(new Card("6", CardSuite.s));
        table.openedCards.push(new Card("4", CardSuite.s));
        table.openedCards.push(new Card("2", CardSuite.s));
        table.playerIndicesRemovedInThisHand = [];
        table.addPlayerToTheTable(player1);
        table.addPlayerToTheTable(player2);
        table.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [10, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 30;
        table.potArray.push(pot);
        if (!gameLogic.canRaiseOrNot(table, player1, 40)) {
            throw "The Current user can Call!";
        }
        if (gameLogic.canRaiseOrNot(table, null, 0)) {
            throw "The Current user can Check!";
        }
        pot.playersContributions = [0, 0];
        pot.totalAmount = 0;
        if (gameLogic.canRaiseOrNot(table, player1, 30)) {
            throw "The Current user has to play Small Blind!";
        }
        pot.playersContributions = [20, 20];
        pot.totalAmount = 40;
        table.currentCallAmount = 20;
        player1.chipsInPocket = 20;
        player1.currentBet = 20;
        if (gameLogic.canRaiseOrNot(table, player1, 70)) {
            throw "The Current user has already matched the bet!";
        }
    });
    /**Test 23*/
    it("Can All In?", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Init;
        player1.chipsInPocket = 290;
        player1.currentBet = 10;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var table = new TableSetup(2);
        table.smallBlind = 10;
        table.bigBlind = 20;
        table.currentCallAmount = 20;
        table.dealerIndex = 0;
        table.currentPlayerIndex = 0;
        table.roundStartIndex = 0;
        table.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            table.deck.pop();
        }
        table.closedCards = [];
        table.openedCards = [];
        table.openedCards.push(new Card("8", CardSuite.s));
        table.openedCards.push(new Card("7", CardSuite.s));
        table.openedCards.push(new Card("6", CardSuite.s));
        table.openedCards.push(new Card("4", CardSuite.s));
        table.openedCards.push(new Card("2", CardSuite.s));
        table.playerIndicesRemovedInThisHand = [];
        table.addPlayerToTheTable(player1);
        table.addPlayerToTheTable(player2);
        table.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [10, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 30;
        table.potArray.push(pot);
        if (!gameLogic.canAllInOrNot(table, player1)) {
            throw "The Current user can Call!";
        }
        if (gameLogic.canAllInOrNot(table, null)) {
            throw "The Current user can Check!";
        }
        pot.playersContributions = [0, 0];
        pot.totalAmount = 0;
        if (gameLogic.canAllInOrNot(table, player1)) {
            throw "The Current user has to play Small Blind!";
        }
    });
    /**Test 24 */
    it("Resolve High Card", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("K", CardSuite.c));
        player1.cards.push(new Card("10", CardSuite.c));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("K", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("3", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("5", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("7", CardSuite.d));
        tableBeforeMove.openedCards.push(new Card("8", CardSuite.h));
        tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("K", CardSuite.c), new Card("10", CardSuite.c), new Card("5", CardSuite.h), new Card("7", CardSuite.d), new Card("8", CardSuite.h)];
        player3.winningCategory = "High Card";
        player3.chipsInPocket = 300;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("K", CardSuite.s), new Card("10", CardSuite.s), new Card("5", CardSuite.h), new Card("7", CardSuite.d), new Card("8", CardSuite.h)];
        player4.winningCategory = "High Card";
        player4.chipsInPocket = 300;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("K", CardSuite.c), new Card("10", CardSuite.c)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("K", CardSuite.s), new Card("10", CardSuite.s)];
        var allWinners = [[player5, player6]];
        tableAfterMove.winnersOfPreviousHand = [[player3, player4]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /**Test 25 */
    it("Resolve Straight Flush", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Check;
        player1.chipsInPocket = 280;
        player1.currentBet = 0;
        player1.cards.push(new Card("9", CardSuite.s));
        player1.cards.push(new Card("10", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Check;
        player2.chipsInPocket = 280;
        player2.currentBet = 0;
        player2.cards.push(new Card("4", CardSuite.s));
        player2.cards.push(new Card("5", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 0;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 1;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.openedCards.push(new Card("J", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [20, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 40;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 1;
        tableAfterMove.roundStartIndex = 1;
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.openedCards = [];
        tableAfterMove.playerIndicesRemovedInThisHand = [];
        var player3 = new Player("adit91", "Adit");
        player3.winningCards = [new Card("9", CardSuite.s), new Card("10", CardSuite.s), new Card("7", CardSuite.s), new Card("8", CardSuite.s), new Card("J", CardSuite.s)];
        player3.winningCategory = "Straight Flush";
        player3.chipsInPocket = 320;
        player3.state = PlayerState.Init;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCards = [new Card("4", CardSuite.s), new Card("5", CardSuite.s), new Card("6", CardSuite.s), new Card("7", CardSuite.s), new Card("8", CardSuite.s)];
        player4.winningCategory = "Straight Flush";
        player4.chipsInPocket = 280;
        player4.state = PlayerState.Init;
        player4.cards = [];
        player4.cards.push(new Card("Q", CardSuite.s));
        player4.cards.push(new Card("10", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0, 0];
        pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player3);
        player5.currentBet = 0;
        player5.state = PlayerState.Check;
        player5.cards = [new Card("9", CardSuite.s), new Card("10", CardSuite.s)];
        var player6 = angular.copy(player4);
        player6.currentBet = 0;
        player6.state = PlayerState.Check;
        player6.cards = [new Card("4", CardSuite.s), new Card("5", CardSuite.s)];
        var allWinners = [[player5]];
        tableAfterMove.winnersOfPreviousHand = [[player3]];
        expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, [player5, player6], allWinners, null);
    });
    /**Test 26*/
    it("Miscellaneous Unit Tests", function () {
        if (gameLogic.sortNumber(new Card("5", CardSuite.c), new Card("5", CardSuite.d)) != 0) {
            throw "The numbers should be equal";
        }
    });
    /** Test 27 */
    it("Small Blind; Big Blind; Fold; 1 Player Left", function () {
        var player1 = new Player("adit91", "Adit");
        player1.state = PlayerState.Fold;
        player1.chipsInPocket = 10;
        player1.currentBet = 10;
        player1.cards.push(new Card("K", CardSuite.s));
        player1.cards.push(new Card("J", CardSuite.s));
        var player2 = new Player("ridhi91", "Ridhi");
        player2.state = PlayerState.Init;
        player2.chipsInPocket = 280;
        player2.currentBet = 20;
        player2.cards.push(new Card("Q", CardSuite.s));
        player2.cards.push(new Card("10", CardSuite.s));
        var tableBeforeMove = new TableSetup(2);
        tableBeforeMove.smallBlind = 10;
        tableBeforeMove.bigBlind = 20;
        tableBeforeMove.currentCallAmount = 20;
        tableBeforeMove.dealerIndex = 1;
        tableBeforeMove.currentPlayerIndex = 0;
        tableBeforeMove.roundStartIndex = 0;
        tableBeforeMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableBeforeMove.deck.pop();
        }
        tableBeforeMove.closedCards = [];
        tableBeforeMove.openedCards = [];
        tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
        tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
        tableBeforeMove.playerIndicesRemovedInThisHand = [];
        tableBeforeMove.addPlayerToTheTable(player1);
        tableBeforeMove.addPlayerToTheTable(player2);
        tableBeforeMove.potArray = [];
        var pot = new Pot();
        pot.currentPotBetAmount = 20;
        pot.playersContributions = [10, 20];
        pot.playersInvolved.push(player1);
        pot.playersInvolved.push(player2);
        pot.totalAmount = 30;
        tableBeforeMove.potArray.push(pot);
        var tableAfterMove = new TableSetup(2);
        tableAfterMove.smallBlind = 10;
        tableAfterMove.bigBlind = 20;
        tableAfterMove.currentCallAmount = 0;
        tableAfterMove.dealerIndex = 0;
        tableAfterMove.currentPlayerIndex = 0;
        tableAfterMove.roundStartIndex = 0;
        tableAfterMove.closedCards.push(new Card("10", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("9", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
        tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
        tableAfterMove.deck = initializeTableDeck();
        for (var i = 0; i < 12; i++) {
            tableAfterMove.deck.pop();
        }
        tableAfterMove.deck.push(new Card("2", CardSuite.s));
        tableAfterMove.deck.push(new Card("3", CardSuite.s));
        tableAfterMove.playerIndicesRemovedInThisHand = [0];
        var player3 = new Player("adit91", "Adit");
        player3.chipsInPocket = 10;
        player3.state = PlayerState.Fold;
        player3.currentBet = 10;
        player3.cards = [];
        player3.cards.push(new Card("K", CardSuite.s));
        player3.cards.push(new Card("J", CardSuite.s));
        //tableAfterMove.addPlayerToTheTable(player3);
        var player4 = new Player("ridhi91", "Ridhi");
        player4.winningCategory = "-Invalid-";
        player4.chipsInPocket = 310;
        player4.state = PlayerState.Init;
        player4.currentBet = 0;
        player4.cards = [];
        player4.cards.push(new Card("K", CardSuite.s));
        player4.cards.push(new Card("Q", CardSuite.s));
        tableAfterMove.addPlayerToTheTable(player4);
        tableAfterMove.potArray = [];
        var pot2 = new Pot();
        pot2.currentPotBetAmount = 0;
        pot2.playersContributions = [0];
        //pot2.playersInvolved.push(player3);
        pot2.playersInvolved.push(player4);
        pot2.totalAmount = 0;
        tableAfterMove.potArray.push(pot2);
        var player5 = angular.copy(player4);
        player5.cards = [];
        player5.cards.push(new Card("Q", CardSuite.s));
        player5.cards.push(new Card("10", CardSuite.s));
        player5.currentBet = 20;
        var allWinners = [[player5]];
        tableAfterMove.winnersOfPreviousHand = [[player4]];
        expectMove(OK, P1_TURN, tableBeforeMove, player3, 0, tableAfterMove, P1_TURN, NO_ONE_WINS, false, null, allWinners, player4);
    });
});
//# sourceMappingURL=gameLogic_test.js.map