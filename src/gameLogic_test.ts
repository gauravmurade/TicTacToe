// // round of checks
// // small blind has folded? We checking who start the round of betting in the same game
// // only 2 players remain
// // a player has left the table. small blind getting set correctly?
// 
// 
// describe("In Poker", function() {
//   let OK = true;
//   let ILLEGAL = false; 
//   let P1_TURN = 0;
//   let P2_TURN = 1;
//   let P3_TURN = 2;
//   let P4_TURN = 3;
//   let P5_TURN = 4;
//   let NO_ONE_TURN = -1;
//   let NO_ONE_WINS: number[] = null;
//   let P1_WIN_SCORES = [1, 0, 0, 0, 0];
//   let P2_WIN_SCORES = [0, 1, 0, 0, 0];
//   let P3_WIN_SCORES = [0, 0, 1, 0, 0];
//   let P4_WIN_SCORES = [0, 0, 0, 1, 0];
//   let P5_WIN_SCORES = [0, 0, 0, 0, 1];
// 
//   function expectMove(
//       isOk: boolean,
//       turnIndexBeforeMove: number,
//       tableBeforeMove: Table,
//       currentPlayer : Player,
//       amountAdded : number,
//       tableAfterMove: Table,
//       turnIndexAfterMove: number,
//       endMatchScores: number[],
//       lastTurnOfTheHand: boolean,
//       winnersList: Player[]): void {
//     
//     
//     let stateTransition: IStateTransition = {
//       turnIndexBeforeMove: turnIndexBeforeMove,
//       stateBeforeMove: tableBeforeMove ? {table: tableBeforeMove, delta: null, winnersList: []} : null,
//       move: {
//         endMatchScores: endMatchScores,
//         turnIndexAfterMove: turnIndexAfterMove,
//         stateAfterMove: { 
//             delta: {currentPlayer: currentPlayer, amountAdded: amountAdded},
//             table: tableAfterMove,
//             winnersList: winnersList
//         }
//       },
//     };
//     
//     if(lastTurnOfTheHand) {
//         stateTransition.move.stateAfterMove.delta.currentPlayer.state = PlayerState.Init;
//     }
//     
//     if (isOk) {
//         gameLogic.checkMoveOk(stateTransition);
//     } 
//     else {
//         // We expect an exception to be thrown :)
//         let didThrowException = false;
//         try {
//             gameLogic.checkMoveOk(stateTransition);
//         } catch (e) {
//             didThrowException = true;
//         }
//         if (!didThrowException) {
//             throw new Error("We expect an illegal move, but checkMoveOk didn't throw any exception!")
//         }
//     }
// }
// 
// /** Test 1 */
//     it("player 1 small blind move from initial state is legal", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Init;
//         player1.chipsInPocket = 300;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Init;
//         player2.chipsInPocket = 300;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 0;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         
//         let pot = new Pot();
//         pot.currentPotBetAmount = 0;
//         pot.playersContributions = [0,0];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 0;
//     
//         tableBeforeMove.potArray.push(pot);
//         
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 10;
//         tableAfterMove.dealerIndex = 1;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 290;
//         player3.state = PlayerState.Init;
//         player3.currentBet = 10;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 300;
//         player4.state = PlayerState.Init;
//         player4.currentBet = 0;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 10;
//         pot2.playersContributions = [10,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 10;
//         tableAfterMove.potArray.push(pot2);
//         
//         expectMove(OK, P1_TURN, tableBeforeMove, player3, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, false, []);
//     });
//     
// /** Test 2 */    
//     it("player 2 big blind move from initial state is legal", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Init;
//         player1.chipsInPocket = 290;
//         player1.currentBet = 10;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Init;
//         player2.chipsInPocket = 300;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 10;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 1;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 10;
//         pot.playersContributions = [10,0];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 10;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//     
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 20;
//         tableAfterMove.dealerIndex = 1;
//         tableAfterMove.currentPlayerIndex = 0;
//         tableAfterMove.roundStartIndex = 0;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 290;
//         player3.state = PlayerState.Init;
//         player3.currentBet = 10;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 280;
//         player4.state = PlayerState.Init;
//         player4.currentBet = 20;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 20;
//         pot2.playersContributions = [10,20];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 30;
//         tableAfterMove.potArray.push(pot2);
//         
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P1_TURN, NO_ONE_WINS, false, []);
//     });
// 
// /** Test 3 */
//     it("player 2 Call from initial state is legal", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Call;
//         player1.chipsInPocket = 290;
//         player1.currentBet = 10;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Init;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 20;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 20;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 0;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [10,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 30;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//     
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 20;
//         tableAfterMove.dealerIndex = 1;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 0;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 280;
//         player3.state = PlayerState.Call;
//         player3.currentBet = 20;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 280;
//         player4.state = PlayerState.Init;
//         player4.currentBet = 20;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let listOfPlayers: Player[] = [];
//         listOfPlayers.push(player3);
//         listOfPlayers.push(player4); 
//         tableAfterMove.addNewPot(40, listOfPlayers);
//         tableAfterMove.potArray[0].currentPotBetAmount = 20;
//         tableAfterMove.potArray[0].playersContributions = [20,20];
//         tableAfterMove.potArray[0].totalAmount = 40;
//         
//         expectMove(OK, P1_TURN, tableBeforeMove, player3, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, false, []);
//     });
// 
// /** Test 4 */    
//     it("player 2 Check from initial state is legal", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Call;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 20;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 20;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 20;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 1;
//         tableAfterMove.currentPlayerIndex = 0;
//         tableAfterMove.roundStartIndex = 0;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("2", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("6", CardSuite.s));
//         
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 280;
//         player3.state = PlayerState.Init;
//         player3.currentBet = 0;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 280;
//         player4.state = PlayerState.Init;
//         player4.currentBet = 0;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 20;
//         pot2.playersContributions = [20,20];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 40;
//         tableAfterMove.potArray.push(pot2);
//         
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P1_TURN, NO_ONE_WINS, false, []);
//     });
// 
// /**Test 5 */
//     it("3 Cards opened, Player 1 raised", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Raise;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Init;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 0;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("6", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//     
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 40;
//         tableAfterMove.dealerIndex = 1;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 0;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("2", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("6", CardSuite.s));
// 
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 240;
//         player3.state = PlayerState.Raise;
//         player3.currentBet = 40;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 280;
//         player4.state = PlayerState.Init;
//         player4.currentBet = 0;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 60;
//         pot2.playersContributions = [60,20];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 80;
//         tableAfterMove.potArray.push(pot2);
//         
//         expectMove(OK, P1_TURN, tableBeforeMove, player3, 40, tableAfterMove, P2_TURN, NO_ONE_WINS, false, []);
//     });
// 
// /** Test 6 */    
//     it("3 Cards opened, Player 1 raised, player 2 goes All In; He satisfies the minimum bet", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Raise;
//         player1.chipsInPocket = 240;
//         player1.currentBet = 40;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.AllIn;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 40;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("6", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 40;
//         pot.playersContributions = [60,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 80;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//     
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 280;
//         tableAfterMove.dealerIndex = 1;
//         tableAfterMove.currentPlayerIndex = 0;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("2", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("6", CardSuite.s));
// 
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 240;
//         player3.state = PlayerState.Raise;
//         player3.currentBet = 40;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 0;
//         player4.state = PlayerState.AllIn;
//         player4.currentBet = 280;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 300;
//         pot2.playersContributions = [60,300];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 360;
//         tableAfterMove.potArray.push(pot2);
//         
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 40, tableAfterMove, P1_TURN, NO_ONE_WINS, false, []);
//     });
//     
// /** Test 7 */    
//     it("3 Cards opened, Player 1 raised, player 2 goes All In; He doesn't satisfy the minimum bet; New Pot Created!", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Raise;
//         player1.chipsInPocket = 240;
//         player1.currentBet = 40;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.AllIn;
//         player2.chipsInPocket = 30;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 40;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("6", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 40;
//         pot.playersContributions = [60,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 80;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//     
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 1;
//         tableAfterMove.currentPlayerIndex = 0;
//         tableAfterMove.roundStartIndex = 0;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("2", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.openedCards.push(new Card("7", CardSuite.s));
//             
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 240;
//         player3.state = PlayerState.Init;
//         player3.currentBet = 0;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 0;
//         player4.state = PlayerState.AllIn;
//         player4.currentBet = 0;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 50;
//         pot2.playersContributions = [50,50];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 100;
//         tableAfterMove.potArray.push(pot2);
//         
//         let pot3 = new Pot();
//         pot3.currentPotBetAmount = 10;
//         pot3.addPlayerToThePot(player3);
//         pot3.removeIfPlayerPresent(player3);
//         pot3.playersContributions = [10];
//         pot3.playersInvolved.push(player3);
//         pot3.totalAmount = 10;
//         tableAfterMove.potArray.push(pot3);
//         
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 40, tableAfterMove, P1_TURN, NO_ONE_WINS, false, []);
//     });
// 
// /** Test 8 */    
//         it("Small Blind; Big Blind; Fold", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Fold;
//         player1.chipsInPocket = 290;
//         player1.currentBet = 10;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Init;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 20;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 20;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 0;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [10,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 30;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//     
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//    
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
// 
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 290;
//         player3.state = PlayerState.Init;
//         player3.currentBet = 0;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 310;
//         player4.state = PlayerState.Init;
//         player4.currentBet = 0;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//         
//         let winningList: Player[] = [];
//         winningList.push(player3);
//         
//         expectMove(OK, P1_TURN, tableBeforeMove, player3, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, false, winningList);
//     });
//     
// /** Test 9 */    
// it("Small Blind; Big Blind; AllIn; AllIn", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.AllIn;
//         player1.chipsInPocket = 0;
//         player1.currentBet = 200;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.AllIn;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 20;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 200;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//         
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.closedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("6", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 200;
//         pot.playersContributions = [200,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 220;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//    
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
// 
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 400;
//         player3.state = PlayerState.Init;
//         player3.currentBet = 0;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 100;
//         player4.state = PlayerState.Init;
//         player4.currentBet = 0;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//         
//         //let winningList: Player[] = [];
//         //winningList.push(player3);
//         
//         expectMove(OK, P1_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, false, []);
//     });
// 
// /** Test 10 */    
//     it("Resolve 4 of A Kind", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Check;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("K", CardSuite.c));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("J", CardSuite.s));
//         player2.cards.push(new Card("J", CardSuite.c));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//     
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("K", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 320;
//         player3.state = PlayerState.Init;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 280;
//         player4.state = PlayerState.Init;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//     
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, []);
//     });
// 
// /** Test 11 */    
//     it("Resolve 3 of A Kind", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Check;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("9", CardSuite.c));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("K", CardSuite.c));
//         player2.cards.push(new Card("9", CardSuite.c));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//     
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("K", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("A", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("Q", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 300;
//         player3.state = PlayerState.Init;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 300;
//         player4.state = PlayerState.Init;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//     
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, []);
//     });
//     
// /** Test 12 */    
//     it("Resolve Flush", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Check;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("10", CardSuite.c));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("K", CardSuite.c));
//         player2.cards.push(new Card("9", CardSuite.c));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//     
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("K", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 300;
//         player3.state = PlayerState.Init;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 300;
//         player4.state = PlayerState.Init;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//     
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, []);
//     });
// 
// /**Test 13 */    
//     it("Resolve 2 Of A Kind", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Check;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("4", CardSuite.c));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("K", CardSuite.c));
//         player2.cards.push(new Card("5", CardSuite.c));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//     
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("A", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("9", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("8", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 300;
//         player3.state = PlayerState.Init;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 300;
//         player4.state = PlayerState.Init;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//     
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, []);
//     });
// 
// /**Test 15 */    
//     it("Resolve Straight with a Winner", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Check;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("9", CardSuite.c));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("9", CardSuite.s));
//         player2.cards.push(new Card("5", CardSuite.c));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//     
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.openedCards.push(new Card("8", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("10", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("Q", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("3", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 320;
//         player3.state = PlayerState.Init;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 280;
//         player4.state = PlayerState.Init;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//     
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, []);
//     });
//         
// /**Test 16 */    
//     it("Resolve Straight with a tie", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Check;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("A", CardSuite.s));
//         player1.cards.push(new Card("9", CardSuite.c));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("9", CardSuite.s));
//         player2.cards.push(new Card("5", CardSuite.c));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//     
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.openedCards.push(new Card("8", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("10", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("Q", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("3", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 300;
//         player3.state = PlayerState.Init;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 300;
//         player4.state = PlayerState.Init;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//     
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, []);
//     });    
//         
// /**Test 17 */    
//     it("Resolve 2 Pairs", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Check;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("10", CardSuite.c));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("K", CardSuite.c));
//         player2.cards.push(new Card("9", CardSuite.c));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//     
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.openedCards.push(new Card("K", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("A", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.d));
//         tableBeforeMove.openedCards.push(new Card("J", CardSuite.h));
//         tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 300;
//         player3.state = PlayerState.Init;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 300;
//         player4.state = PlayerState.Init;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//     
//         expectMove(OK, P2_TURN, tableBeforeMove, player4, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, []);
//     });
//         
// //   it("player 1 call move from initial state is illegal", function() {
// //   });
// 
// //   it("player 1 raise move from initial state is illegal", function() {
// //   });
// 
// //   it("player 1 fold move from initial state is illegal", function() {
// //   });
// 
// //   it("player 1 check move from initial state is illegal", function() {
// //   });
// 
// //   it("player 1 non small blind move from initial state is illegal", function() {
// //   });
// 
// //   it("player 3 move out of turn before player 2 move is illegal", function() {
// //   });
// 
// //   it("player 2 call move in round 1 is illegal", function() {
// //   });
// 
// //   it("player 2 raise move in round 1 is illegal", function() {
// //   });
// 
// //   it("player 2 fold move in round 1 is illegal", function() {
// //   });
// 
// //   it("player 2 check move in round 1 is illegal", function() {
// //   });
// 
// //   it("player 2 non large blind move in round 1 is illegal", function() {
// //   });
// 
// //   it("player 2 large blind move in round 1 is legal", function() {
// //   });
// 
// //   it("player 3 call move in round 1 is legal", function() {
// //   });
// 
// //   it("player 3 raise move in round 1 is legal", function() {
// //   });
// 
// //   it("player 3 fold move in round 1 is legal", function() {
// //   });
// 
// //   it("player 3 check move in round 1 is illegal", function() {
// //   });
// 
// //   it("player 3 playing less than currentCallAmount in round 1 is illegal", function() {
// //   });
// 
// //   it("player 4 call move in round 1 is legal", function() {
// //   });
// 
// //   it("player 5 call move in round 1 is legal", function() {
// //   });
// 
// //   it("player 1 call move in round 1 is legal -> Check for end of Round 1", function() {
// //   });
// 
// //   it("player 2 move out of turn before player 1 move in round 2 is illegal", function() {
// //   });
// 
// //   it("player 1 playing less than currentCallAmount in round 2 is illegal", function() {
// //   });
// 
// //   it("player 1 call move in round 2 is illegal", function() {
// //   });
// 
// //   it("player 1 raise move in round 2 is legal", function() {
// //   });
// 
// //   it("player 1 fold move in round 2 is legal", function() {
// //   });
// 
// //   it("player 1 check move in round 2 is legal", function() {
// //   });
// 
// //   it("Check for end of Round 2", function() {
// //   });
// 
// //   it("Check for end of Round 3", function() {
// //   });
// 
// //   it("Everybody but 1 person folds there hand", function() {
// //   });
// 
//     it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Royal Flush", function() {
// 
//         let player1 = new Player("adit91","Adit");
//         player1.state = PlayerState.Check;
//         player1.chipsInPocket = 280;
//         player1.currentBet = 0;
//         player1.cards.push(new Card("K", CardSuite.s));
//         player1.cards.push(new Card("J", CardSuite.s));
// 
//         let player2 = new Player("ridhi91","Ridhi");
//         player2.state = PlayerState.Check;
//         player2.chipsInPocket = 280;
//         player2.currentBet = 0;
//         player2.cards.push(new Card("Q", CardSuite.s));
//         player2.cards.push(new Card("10", CardSuite.s));
// 
//         let tableBeforeMove = new TableSetup(2);
//         tableBeforeMove.smallBlind = 10;
//         tableBeforeMove.bigBlind = 20;
//         tableBeforeMove.currentCallAmount = 0;
//         tableBeforeMove.dealerIndex = 1;
//         tableBeforeMove.currentPlayerIndex = 1;
//         tableBeforeMove.roundStartIndex = 0;
//         
//         tableBeforeMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableBeforeMove.deck.pop();
//         }
//     
//         tableBeforeMove.closedCards = [];
//         tableBeforeMove.openedCards = [];
//         tableBeforeMove.openedCards.push(new Card("8", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("7", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("6", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("4", CardSuite.s));
//         tableBeforeMove.openedCards.push(new Card("2", CardSuite.s));
//     
//         tableBeforeMove.playerIndicesRemovedInThisHand = [];
//         tableBeforeMove.addPlayerToTheTable(player1);
//         tableBeforeMove.addPlayerToTheTable(player2);
//     
//         tableBeforeMove.potArray = [];
//         let pot = new Pot();
//         pot.currentPotBetAmount = 20;
//         pot.playersContributions = [20,20];
//         pot.playersInvolved.push(player1);
//         pot.playersInvolved.push(player2);
//         pot.totalAmount = 40;
//     
//         tableBeforeMove.potArray.push(pot);
//     
//         let tableAfterMove = new TableSetup(2);
//         tableAfterMove.smallBlind = 10;
//         tableAfterMove.bigBlind = 20;
//         tableAfterMove.currentCallAmount = 0;
//         tableAfterMove.dealerIndex = 0;
//         tableAfterMove.currentPlayerIndex = 1;
//         tableAfterMove.roundStartIndex = 1;
//         tableAfterMove.winners = [];
//     
//         tableAfterMove.closedCards.push(new Card("8", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("7", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("6", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("4", CardSuite.s));
//         tableAfterMove.closedCards.push(new Card("2", CardSuite.s));
//     
//         tableAfterMove.deck = initializeTableDeck();
//     
//         for(let i : number = 0; i<12; i++) {
//             tableAfterMove.deck.pop();
//         }    
//         
//         tableAfterMove.openedCards = [];
//         tableAfterMove.playerIndicesRemovedInThisHand = [];
//     
//         let player3 = new Player("adit91","Adit");
//         player3.chipsInPocket = 320;
//         player3.state = PlayerState.Init;
//         player3.cards = [];
//         player3.cards.push(new Card("K", CardSuite.s));
//         player3.cards.push(new Card("J", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player3);
//     
//         let player4 = new Player("ridhi91","Ridhi");
//         player4.chipsInPocket = 280;
//         player4.state = PlayerState.Init;
//         player4.cards = [];
//         player4.cards.push(new Card("Q", CardSuite.s));
//         player4.cards.push(new Card("10", CardSuite.s));
//         tableAfterMove.addPlayerToTheTable(player4);
//     
//         tableAfterMove.potArray = [];
//         let pot2 = new Pot();
//         pot2.currentPotBetAmount = 0;
//         pot2.playersContributions = [0,0];
//         pot2.playersInvolved.push(player3);
//         pot2.playersInvolved.push(player4);
//         pot2.totalAmount = 0;
//         tableAfterMove.potArray.push(pot2);
//     
//         expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, P2_TURN, NO_ONE_WINS, true, []);
//     });
// 
// //   // Only possible when the Royal Flush is on the table
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Royal Flush", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("2", CardSuite.c));
// //     player1.cards.push(new Card("2", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("3", CardSuite.c));
// //     player2.cards.push(new Card("3", CardSuite.d));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("4", CardSuite.c));
// //     player3.cards.push(new Card("4", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("5", CardSuite.c));
// //     player4.cards.push(new Card("5", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("6", CardSuite.c));
// //     player5.cards.push(new Card("6", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("A", CardSuite.c);
// //     let card2 = new Card("K", CardSuite.c);
// //     let card3 = new Card("Q", CardSuite.c);
// //     let card4 = new Card("J", CardSuite.c);
// //     let card5 = new Card("10", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Straight Flush", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("8", CardSuite.c));
// //     player1.cards.push(new Card("9", CardSuite.c));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("3", CardSuite.c));
// //     player2.cards.push(new Card("3", CardSuite.d));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("4", CardSuite.c));
// //     player3.cards.push(new Card("4", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("5", CardSuite.c));
// //     player4.cards.push(new Card("5", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("6", CardSuite.c));
// //     player5.cards.push(new Card("6", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("Q", CardSuite.c);
// //     let card2 = new Card("J", CardSuite.c);
// //     let card3 = new Card("10", CardSuite.c);
// //     let card4 = new Card("3", CardSuite.s);
// //     let card5 = new Card("4", CardSuite.h);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Straight Flush with different high cards", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("J", CardSuite.c));
// //     player1.cards.push(new Card("Q", CardSuite.c));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("6", CardSuite.c));
// //     player2.cards.push(new Card("7", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("4", CardSuite.s));
// //     player3.cards.push(new Card("4", CardSuite.h));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("5", CardSuite.s));
// //     player4.cards.push(new Card("5", CardSuite.h));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("6", CardSuite.s));
// //     player5.cards.push(new Card("6", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("10", CardSuite.c);
// //     let card2 = new Card("9", CardSuite.c);
// //     let card3 = new Card("8", CardSuite.c);
// //     let card4 = new Card("7", CardSuite.s);
// //     let card5 = new Card("8", CardSuite.h);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   // Only possible when the Straight Flush is on the table
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Straight Flush with same high cards", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100; 
// //     player1.cards.push(new Card("2", CardSuite.s));
// //     player1.cards.push(new Card("2", CardSuite.h));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("3", CardSuite.s));
// //     player2.cards.push(new Card("3", CardSuite.h));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("4", CardSuite.s));
// //     player3.cards.push(new Card("4", CardSuite.h));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("5", CardSuite.s));
// //     player4.cards.push(new Card("5", CardSuite.h));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("6", CardSuite.s));
// //     player5.cards.push(new Card("6", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("10", CardSuite.c);
// //     let card2 = new Card("9", CardSuite.c);
// //     let card3 = new Card("8", CardSuite.c);
// //     let card4 = new Card("7", CardSuite.c);
// //     let card5 = new Card("6", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is 4 of a Kind", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("J", CardSuite.d));
// //     player1.cards.push(new Card("Q", CardSuite.c));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("3", CardSuite.s));
// //     player2.cards.push(new Card("3", CardSuite.h));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("4", CardSuite.s));
// //     player3.cards.push(new Card("4", CardSuite.h));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("5", CardSuite.s));
// //     player4.cards.push(new Card("5", CardSuite.h));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("6", CardSuite.s));
// //     player5.cards.push(new Card("6", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("J", CardSuite.c);
// //     let card2 = new Card("J", CardSuite.s);
// //     let card3 = new Card("J", CardSuite.h);
// //     let card4 = new Card("7", CardSuite.s);
// //     let card5 = new Card("8", CardSuite.h);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 4 of a Kind where the 'set of 4' are different", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("J", CardSuite.c));
// //     player1.cards.push(new Card("J", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.c));
// //     player2.cards.push(new Card("Q", CardSuite.d));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("4", CardSuite.s));
// //     player3.cards.push(new Card("4", CardSuite.h));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("5", CardSuite.s));
// //     player4.cards.push(new Card("5", CardSuite.h));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("6", CardSuite.s));
// //     player5.cards.push(new Card("6", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("J", CardSuite.s);
// //     let card2 = new Card("J", CardSuite.h);
// //     let card3 = new Card("Q", CardSuite.s);
// //     let card4 = new Card("Q", CardSuite.h);
// //     let card5 = new Card("8", CardSuite.h);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   // Only possible when the 4 of a Kind is on the table
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 4 of a Kind where the 'set of 4' are same and kicker Card is different", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("K", CardSuite.s));
// //     player1.cards.push(new Card("Q", CardSuite.h));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.s));
// //     player2.cards.push(new Card("10", CardSuite.h));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("4", CardSuite.s));
// //     player3.cards.push(new Card("4", CardSuite.h));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("5", CardSuite.s));
// //     player4.cards.push(new Card("5", CardSuite.h));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("6", CardSuite.s));
// //     player5.cards.push(new Card("6", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("J", CardSuite.c);
// //     let card2 = new Card("J", CardSuite.d);
// //     let card3 = new Card("J", CardSuite.s);
// //     let card4 = new Card("J", CardSuite.h);
// //     let card5 = new Card("8", CardSuite.h);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   // Only possible when the 4 of a Kind is on the table
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 4 of a Kind where the 'set of 4' are same and kicker Card is also same", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("2", CardSuite.s));
// //     player1.cards.push(new Card("2", CardSuite.h));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("3", CardSuite.s));
// //     player2.cards.push(new Card("3", CardSuite.h));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("4", CardSuite.s));
// //     player3.cards.push(new Card("4", CardSuite.h));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("5", CardSuite.s));
// //     player4.cards.push(new Card("5", CardSuite.h));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("6", CardSuite.s));
// //     player5.cards.push(new Card("6", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("J", CardSuite.c);
// //     let card2 = new Card("J", CardSuite.d);
// //     let card3 = new Card("J", CardSuite.s);
// //     let card4 = new Card("J", CardSuite.h);
// //     let card5 = new Card("A", CardSuite.h);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Full House", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("4", CardSuite.h));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("5", CardSuite.s));
// //     player2.cards.push(new Card("7", CardSuite.h));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.s));
// //     player3.cards.push(new Card("8", CardSuite.h));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.s));
// //     player4.cards.push(new Card("9", CardSuite.h));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.s));
// //     player5.cards.push(new Card("10", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("3", CardSuite.c);
// //     let card2 = new Card("3", CardSuite.d);
// //     let card3 = new Card("4", CardSuite.s);
// //     let card4 = new Card("2", CardSuite.c);
// //     let card5 = new Card("8", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Full House where the 'set of 3' are different", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("4", CardSuite.h));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("5", CardSuite.s));
// //     player2.cards.push(new Card("4", CardSuite.s));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("3", CardSuite.c);
// //     let card2 = new Card("3", CardSuite.d);
// //     let card3 = new Card("5", CardSuite.c);
// //     let card4 = new Card("5", CardSuite.d);
// //     let card5 = new Card("4", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   // Only possible when the 4 of a Kind is on the table
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Full House where the 'set of 3' are same and 'set of 2' are different", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("4", CardSuite.h));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("3", CardSuite.h));
// //     player2.cards.push(new Card("5", CardSuite.s));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("3", CardSuite.c);
// //     let card2 = new Card("3", CardSuite.d);
// //     let card3 = new Card("4", CardSuite.c);
// //     let card4 = new Card("5", CardSuite.d);
// //     let card5 = new Card("2", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   // Only possible when the 4 of a Kind is on the table
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Full House where the 'set of 3' and 'set of 2' are same", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("5", CardSuite.h));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("3", CardSuite.h));
// //     player2.cards.push(new Card("5", CardSuite.s));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("3", CardSuite.c);
// //     let card2 = new Card("3", CardSuite.d);
// //     let card3 = new Card("5", CardSuite.c);
// //     let card4 = new Card("J", CardSuite.d);
// //     let card5 = new Card("2", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Flush", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("5", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("5", CardSuite.c));
// //     player2.cards.push(new Card("7", CardSuite.d));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("7", CardSuite.s);
// //     let card2 = new Card("9", CardSuite.s);
// //     let card3 = new Card("J", CardSuite.s);
// //     let card4 = new Card("J", CardSuite.d);
// //     let card5 = new Card("2", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush with different high cards", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("5", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("4", CardSuite.s));
// //     player2.cards.push(new Card("J", CardSuite.s));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("7", CardSuite.s);
// //     let card2 = new Card("9", CardSuite.s);
// //     let card3 = new Card("10", CardSuite.s);
// //     let card4 = new Card("J", CardSuite.d);
// //     let card5 = new Card("2", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush where highest unique card is 2nd highest card", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("5", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("4", CardSuite.s));
// //     player2.cards.push(new Card("10", CardSuite.s));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("7", CardSuite.s);
// //     let card2 = new Card("9", CardSuite.s);
// //     let card3 = new Card("Q", CardSuite.s);
// //     let card4 = new Card("J", CardSuite.d);
// //     let card5 = new Card("2", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush where highest unique card is 3rd highest card", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("8", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("4", CardSuite.s));
// //     player2.cards.push(new Card("6", CardSuite.s));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("7", CardSuite.s);
// //     let card2 = new Card("10", CardSuite.s);
// //     let card3 = new Card("Q", CardSuite.s);
// //     let card4 = new Card("J", CardSuite.d);
// //     let card5 = new Card("2", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush where highest unique card is 4th highest card", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("7", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("4", CardSuite.s));
// //     player2.cards.push(new Card("6", CardSuite.s));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("8", CardSuite.s);
// //     let card2 = new Card("10", CardSuite.s);
// //     let card3 = new Card("Q", CardSuite.s);
// //     let card4 = new Card("J", CardSuite.d);
// //     let card5 = new Card("2", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush where highest unique card is 5th highest card", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.s));
// //     player1.cards.push(new Card("7", CardSuite.h));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("2", CardSuite.s));
// //     player2.cards.push(new Card("6", CardSuite.h));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("6", CardSuite.s);
// //     let card2 = new Card("8", CardSuite.s);
// //     let card3 = new Card("10", CardSuite.s);
// //     let card4 = new Card("Q", CardSuite.s);
// //     let card5 = new Card("2", CardSuite.c);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Flush with exactly the same hand", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("4", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("5", CardSuite.c));
// //     player2.cards.push(new Card("7", CardSuite.d));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("6", CardSuite.c));
// //     player3.cards.push(new Card("8", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("7", CardSuite.c));
// //     player4.cards.push(new Card("9", CardSuite.d));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.c));
// //     player5.cards.push(new Card("10", CardSuite.d));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("4", CardSuite.s);
// //     let card2 = new Card("6", CardSuite.s);
// //     let card3 = new Card("8", CardSuite.s);
// //     let card4 = new Card("10", CardSuite.s);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is Straight", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.c));
// //     player1.cards.push(new Card("4", CardSuite.c));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("8", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("8", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("8", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("8", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.s);
// //     let card2 = new Card("6", CardSuite.c);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("10", CardSuite.h);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Straight with different high cards", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.c));
// //     player1.cards.push(new Card("4", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("4", CardSuite.s));
// //     player2.cards.push(new Card("8", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.s);
// //     let card2 = new Card("6", CardSuite.c);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("10", CardSuite.h);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of Straight with same high cards", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("3", CardSuite.c));
// //     player1.cards.push(new Card("4", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("3", CardSuite.s));
// //     player2.cards.push(new Card("4", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.s);
// //     let card2 = new Card("6", CardSuite.c);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("10", CardSuite.h);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is 3 of a Kind", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("Q", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("9", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.s);
// //     let card2 = new Card("6", CardSuite.c);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("10", CardSuite.h);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 3 of a Kind where the 'set of 3' are different", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("Q", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("J", CardSuite.d));
// //     player2.cards.push(new Card("J", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.s);
// //     let card2 = new Card("6", CardSuite.c);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("J", CardSuite.h);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   // Only possible when the 4 of a Kind is on the table
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 3 of a Kind where the 'set of 3' are same and highest kickers are different", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("2", CardSuite.c));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.s));
// //     player2.cards.push(new Card("9", CardSuite.d));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.s);
// //     let card2 = new Card("6", CardSuite.c);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("Q", CardSuite.h);
// //     let card5 = new Card("Q", CardSuite.d);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   // Only possible when the 4 of a Kind is on the table
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 3 of a Kind where the 'set of 3' and highest kickers are same but 2nd highest kicker are different", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("2", CardSuite.c));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.s));
// //     player2.cards.push(new Card("6", CardSuite.d));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.s);
// //     let card2 = new Card("3", CardSuite.c);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("Q", CardSuite.h);
// //     let card5 = new Card("Q", CardSuite.d);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 3 of a Kind where the 'set of 3', highest kickers and 2nd highest kickers are same", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("2", CardSuite.c));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.s));
// //     player2.cards.push(new Card("3", CardSuite.d));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.s);
// //     let card2 = new Card("6", CardSuite.c);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("Q", CardSuite.h);
// //     let card5 = new Card("Q", CardSuite.d);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is 2 Pair", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("9", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("6", CardSuite.h);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.d);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 2 Pair with different highest pairs", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("J", CardSuite.d));
// //     player2.cards.push(new Card("6", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("6", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("7", CardSuite.d);
// //     let card4 = new Card("J", CardSuite.s);
// //     let card5 = new Card("Q", CardSuite.h);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 2 Pair with same highest pairs but different 2nd highest pairs", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.d));
// //     player2.cards.push(new Card("5", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.d);
// //     let card2 = new Card("6", CardSuite.h);
// //     let card3 = new Card("K", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 2 Pair with same highest pairs and 2nd highest pairs but different kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.d));
// //     player2.cards.push(new Card("8", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("5", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("10", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 2 Pair with same highest pairs, 2nd highest pairs and kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.d));
// //     player2.cards.push(new Card("8", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("10", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is 1 Pair", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("9", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("5", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with different pairs", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("J", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("J", CardSuite.c);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("5", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with same pairs but different highest kicker", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("K", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("6", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("5", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with same pairs and highest kickers but different 2nd highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("10", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("6", CardSuite.h);
// //     let card3 = new Card("5", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with same pairs, highest kickers and 2nd highest kickers but different 3rd highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("6", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("5", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of 1 Pair with same pairs, highest kickers, 2nd highest kickers and 3rd highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("Q", CardSuite.c));
// //     player1.cards.push(new Card("5", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("Q", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("6", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Winning Hand is High Card", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("A", CardSuite.c));
// //     player1.cards.push(new Card("5", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("9", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("6", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("Q", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with different highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check; 
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("A", CardSuite.c));
// //     player1.cards.push(new Card("K", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("A", CardSuite.d));
// //     player2.cards.push(new Card("2", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("J", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("6", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("7", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers but different 2nd highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("A", CardSuite.c));
// //     player1.cards.push(new Card("Q", CardSuite.s));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("A", CardSuite.d));
// //     player2.cards.push(new Card("J", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("10", CardSuite.h);
// //     let card3 = new Card("6", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("7", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers, 2nd highest kickers but different 3rd highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("A", CardSuite.c));
// //     player1.cards.push(new Card("8", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("A", CardSuite.d));
// //     player2.cards.push(new Card("5", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("J", CardSuite.h);
// //     let card3 = new Card("6", CardSuite.d);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("7", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers, 2nd highest kickers and 3rd highest kickers but different 4th highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("A", CardSuite.c));
// //     player1.cards.push(new Card("8", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("A", CardSuite.d));
// //     player2.cards.push(new Card("5", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("Q", CardSuite.h);
// //     let card3 = new Card("10", CardSuite.s);
// //     let card4 = new Card("3", CardSuite.c);
// //     let card5 = new Card("7", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers, 2nd highest kickers, 3rd highest kickers and 4th highest kickers but different 5th highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("A", CardSuite.c));
// //     player1.cards.push(new Card("8", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("A", CardSuite.d));
// //     player2.cards.push(new Card("5", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("Q", CardSuite.h);
// //     let card3 = new Card("10", CardSuite.s);
// //     let card4 = new Card("7", CardSuite.c);
// //     let card5 = new Card("3", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// //   it("Check for end of Round 4 -> Check for Winner -> Conflict of High Card with same highest kickers, 2nd highest kickers, 3rd highest kickers, 4th highest kickers and 5th highest kickers", function() {
// //     let player1 = new Player("adit91","Adit");
// //     player1.state = PlayerState.Check;
// //     player1.chipsInPocket = 400;
// //     player1.currentBet = 100;
// //     player1.cards.push(new Card("A", CardSuite.c));
// //     player1.cards.push(new Card("8", CardSuite.d));
// 
// //     let player2 = new Player("ridhi91","Ridhi");
// //     player2.state = PlayerState.Check;
// //     player2.chipsInPocket = 400;
// //     player2.currentBet = 100;
// //     player2.cards.push(new Card("A", CardSuite.d));
// //     player2.cards.push(new Card("8", CardSuite.c));
// 
// //     let player3 = new Player("anto90","Anto");
// //     player3.state = PlayerState.Fold;
// //     player3.chipsInPocket = 500;
// //     player3.currentBet = 0;
// //     player3.cards.push(new Card("9", CardSuite.c));
// //     player3.cards.push(new Card("2", CardSuite.d));
// 
// //     let player4 = new Player("gaurav89", "Gaurav");
// //     player4.state = PlayerState.Fold;
// //     player4.chipsInPocket = 500;
// //     player4.currentBet = 0;
// //     player4.cards.push(new Card("9", CardSuite.h));
// //     player4.cards.push(new Card("2", CardSuite.s));
// 
// //     let player5 = new Player("rachita88","Rachita");
// //     player5.state = PlayerState.Fold;
// //     player5.chipsInPocket = 500;
// //     player5.currentBet = 0;
// //     player5.cards.push(new Card("9", CardSuite.s));
// //     player5.cards.push(new Card("2", CardSuite.h));
// 
// //     let tableBeforeMove = new TableSetup();
// //     tableBeforeMove.addPlayerToTheTable(player1);
// //     tableBeforeMove.addPlayerToTheTable(player2);
// //     tableBeforeMove.addPlayerToTheTable(player3);
// //     tableBeforeMove.addPlayerToTheTable(player4);
// //     tableBeforeMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableBeforeMove.deck = null;
// //     let card1 = new Card("K", CardSuite.d);
// //     let card2 = new Card("Q", CardSuite.h);
// //     let card3 = new Card("10", CardSuite.s);
// //     let card4 = new Card("7", CardSuite.c);
// //     let card5 = new Card("3", CardSuite.s);
// //     tableBeforeMove.closedCards = [];
// //     tableBeforeMove.openedCards.push(card1);
// //     tableBeforeMove.openedCards.push(card2);
// //     tableBeforeMove.openedCards.push(card3);
// //     tableBeforeMove.openedCards.push(card4);
// //     tableBeforeMove.openedCards.push(card5);
// 
// //     tableBeforeMove.dealerIndex = 0;
// //     tableBeforeMove.currentPlayerIndex = 2;
// //     tableBeforeMove.roundStartIndex = 1;
// 
// //     let pot = new Pot();
// //     pot.totalAmount = 200;
// //     tableBeforeMove.pot = pot;
// 
// //     tableBeforeMove.smallBlind = 10;
// //     tableBeforeMove.bigBlind = 20;
// //     tableBeforeMove.currentCallAmount = 0;
// 
// //     let tableAfterMove = new TableSetup();
// //     tableAfterMove.addPlayerToTheTable(player1);
// //     tableAfterMove.addPlayerToTheTable(player2);
// //     tableAfterMove.addPlayerToTheTable(player3);
// //     tableAfterMove.addPlayerToTheTable(player4);
// //     tableAfterMove.addPlayerToTheTable(player5);
// 
// //     // Handle the random shit
// //     tableAfterMove.deck = null;
// //     tableAfterMove.closedCards = [];
// //     tableAfterMove.openedCards.push(card1);
// //     tableAfterMove.openedCards.push(card2);
// //     tableAfterMove.openedCards.push(card3);
// //     tableAfterMove.openedCards.push(card4);
// //     tableAfterMove.openedCards.push(card5);
// 
// //     tableAfterMove.dealerIndex = 0;
// //     tableAfterMove.currentPlayerIndex = 1;
// //     tableAfterMove.roundStartIndex = 1;
// 
// //     tableAfterMove.pot = pot;
// 
// //     tableAfterMove.smallBlind = 10;
// //     tableAfterMove.bigBlind = 20;
// //     tableAfterMove.currentCallAmount = 0;
// //     expectMove(OK, P2_TURN, tableBeforeMove, player2, 0, tableAfterMove, NO_ONE_TURN, P1_WIN_SCORES);
// //   });
// 
// });