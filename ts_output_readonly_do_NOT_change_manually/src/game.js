;
var game;
(function (game) {
    // I export all variables to make it easy to debug in the browser by
    // simply typing in the console:
    // game.state
    game.animationEnded = false;
    game.canMakeMove = false;
    game.isComputerTurn = false;
    game.move = null;
    game.state = null;
    game.isHelpModalShown = false;
    //the flags to show buttons or not
    // let shouldShowSmallBlind = true;
    // let shouldShowBigBlind =false;
    // let shouldShowAllIn = false;
    // let shouldShowRaise =false;
    // let shouldShowCall =false;
    // let shouldShowCheck=false;
    //used to animate the opening of cards on the table
    //updated each time cellClicked is called, but before the move is sent  
    game.oldOpenCardsSize = 0;
    var yourPlayerCards_card1;
    var yourPlayerCards_card2;
    function init() {
        translate.setTranslations(getTranslations());
        translate.setLanguage('en');
        log.log("Translation of 'RULES_OF_TICTACTOE' is " + translate('RULES_OF_TICTACTOE'));
        resizeGameAreaService.setWidthToHeight(1);
        moveService.setGame({
            minNumberOfPlayers: 2,
            maxNumberOfPlayers: 2,
            checkMoveOk: gameLogic.checkMoveOk,
            updateUI: updateUI
        });
        // See http://www.sitepoint.com/css3-animation-javascript-event-handlers/
        document.addEventListener("animationend", animationEndedCallback, false); // standard
        document.addEventListener("webkitAnimationEnd", animationEndedCallback, false); // WebKit
        document.addEventListener("oanimationend", animationEndedCallback, false); // Opera
        setTimeout(animationEndedCallback, 1000); // Just in case animationEnded is not fired by some browser.
        var w = window;
        if (w["HTMLInspector"]) {
            setInterval(function () {
                w["HTMLInspector"].inspect({
                    excludeRules: ["unused-classes", "script-placement"],
                });
            }, 3000);
        }
    }
    game.init = init;
    function getTranslations() {
        return {
            RULES_OF_TICTACTOE: {
                en: "Rules of Texas HoldEm Poker",
                iw: "חוקי המשחק",
            },
            RULES_SLIDE1: {
                en: "Every player (2-5) is dealt two cards face down – these are called your 'hole cards'. Then there is a round of betting where you can Check, Bet or Fold. This stage of the game is known as pre-flop",
                iw: "אתה והיריב מסמנים איקס או עיגול כל תור",
            },
            RULES_SLIDE2: {
                en: "When all the betting has finished three shared cards are dealt face up in the middle of the table. This is called the flop.",
                iw: "הראשון שמסמן שורה, עמודה או אלכסון מנצח",
            },
            RULES_SLIDE3: {
                en: "After this there is another round of betting, then a fourth shared card – called the turn – is dealt.",
                iw: "הראשון שמסמן שורה, עמודה או אלכסון מנצח",
            },
            RULES_SLIDE4: {
                en: "There is another round of betting then a final shared card – called the river – and a final round of betting.",
                iw: "הראשון שמסמן שורה, עמודה או אלכסון מנצח",
            },
            RULES_SLIDE5: {
                en: "Your best Texas Holdem hands will be made by using your hole cards and the five cards in the middle to make the best possible five card poker hand.",
                iw: "הראשון שמסמן שורה, עמודה או אלכסון מנצח",
            },
            RULES_SLIDE6: {
                en: "Not sure what the best Texas Holdem poker hands are? You can visit the poker hand rankings page for more information!",
                iw: "הראשון שמסמן שורה, עמודה או אלכסון מנצח",
            },
            RULES_SLIDE7: {
                en: "There are two ways a hand can end. One is when the players in a hand turn over their hole cards and the player with the best hand wins. This is known as a showdown. The other is that someone will bet enough that everyone else folds. This is how most hands end in Texas Hold'em and that's the magic of the game – you don't always need the best hand to win.",
                iw: "הראשון שמסמן שורה, עמודה או אלכסון מנצח",
            },
            CLOSE: {
                en: "Close",
                iw: "סגור",
            },
        };
    }
    function animationEndedCallback() {
        if (game.animationEnded)
            return;
        $rootScope.$apply(function () {
            log.info("Animation ended");
            game.animationEnded = true;
            sendComputerMove();
        });
    }
    function sendComputerMove() {
        if (!game.isComputerTurn) {
            return;
        }
        // remove these comments once ai service is ready
        // isComputerTurn = false; // to make sure the computer can only move once.
        // moveService.makeMove(aiService.findComputerMove(move));
    }
    function updateUI(params) {
        log.info("Game got updateUI:", params);
        game.animationEnded = false;
        game.move = params.move;
        game.state = game.move.stateAfterMove;
        if (!game.state) {
            console.log("getInitialState() call. Should happen twice including the fake!");
            game.state = gameLogic.getInitialState(params.playersInfo);
        }
        else {
            // Adding code to recreate instances and regain access to instance methods lost during data transfer over network
            // Careful consideration to maintain references to players!
            // Beware : This code block is trippy. Enter at your own risk.
            // ******************************************************************************************** //
            var tempTable = new TableSetup(params.playersInfo.length);
            var tempPlayerList = [];
            var tempInitialPlayerList = [];
            var tempPotArray = [];
            var tempWinnersOfPreviousHand = [];
            for (var i = 0; i < params.move.stateAfterMove.table.playerList.length; i++) {
                var newPlayer = new Player(params.move.stateAfterMove.table.playerList[i].id, params.move.stateAfterMove.table.playerList[i].name);
                newPlayer.state = params.move.stateAfterMove.table.playerList[i].state;
                newPlayer.chipsInPocket = params.move.stateAfterMove.table.playerList[i].chipsInPocket;
                newPlayer.currentBet = params.move.stateAfterMove.table.playerList[i].currentBet;
                newPlayer.cards = params.move.stateAfterMove.table.playerList[i].cards;
                newPlayer.winningCards = params.move.stateAfterMove.table.playerList[i].winningCards;
                newPlayer.winningCategory = params.move.stateAfterMove.table.playerList[i].winningCategory;
                tempPlayerList.push(newPlayer);
            }
            for (var j = 0; j < params.move.stateAfterMove.table.initialPlayerList.length; j++) {
                for (var k = 0; k < tempPlayerList.length; k++) {
                    if (params.move.stateAfterMove.table.initialPlayerList[j].id == tempPlayerList[k].id) {
                        tempInitialPlayerList.push(tempPlayerList[k]);
                        break;
                    }
                }
            }
            for (var i = 0; params.move.stateAfterMove.table.potArray && (i < params.move.stateAfterMove.table.potArray.length); i++) {
                var newPot = new Pot();
                newPot.hands = params.move.stateAfterMove.table.potArray[i].hands;
                newPot.handRanks = params.move.stateAfterMove.table.potArray[i].handRanks;
                newPot.currentPotBetAmount = params.move.stateAfterMove.table.potArray[i].currentPotBetAmount;
                newPot.totalAmount = params.move.stateAfterMove.table.potArray[i].totalAmount;
                var tempPlayersInvolved = [];
                for (var j = 0; params.move.stateAfterMove.table.potArray[i].playersInvolved && (j < params.move.stateAfterMove.table.potArray[i].playersInvolved.length); j++) {
                    for (var k = 0; k < tempPlayerList.length; k++) {
                        if (params.move.stateAfterMove.table.potArray[i].playersInvolved[j].id == tempPlayerList[k].id) {
                            tempPlayersInvolved.push(tempPlayerList[k]);
                            break;
                        }
                    }
                }
                newPot.playersInvolved = tempPlayersInvolved;
                newPot.playersContributions = params.move.stateAfterMove.table.potArray[i].playersContributions;
                tempPotArray.push(newPot);
            }
            for (var i = 0; params.move.stateAfterMove.table.winnersOfPreviousHand && (i < params.move.stateAfterMove.table.winnersOfPreviousHand.length); i++) {
                var tempWinnerOfPreviousHand = [];
                for (var j = 0; params.move.stateAfterMove.table.winnersOfPreviousHand[i] && (j < params.move.stateAfterMove.table.winnersOfPreviousHand[i].length); j++) {
                    for (var k = 0; k < tempPlayerList.length; k++) {
                        if (params.move.stateAfterMove.table.winnersOfPreviousHand[i][j].id == tempPlayerList[k].id) {
                            tempWinnerOfPreviousHand.push(tempPlayerList[k]);
                            break;
                        }
                    }
                }
                tempWinnersOfPreviousHand.push(tempWinnerOfPreviousHand);
            }
            tempTable.playerList = tempPlayerList;
            tempTable.initialPlayerList = tempInitialPlayerList;
            tempTable.deck = params.move.stateAfterMove.table.deck;
            tempTable.openedCards = params.move.stateAfterMove.table.openedCards;
            tempTable.closedCards = params.move.stateAfterMove.table.closedCards;
            tempTable.dealerIndex = params.move.stateAfterMove.table.dealerIndex;
            tempTable.currentPlayerIndex = params.move.stateAfterMove.table.currentPlayerIndex;
            tempTable.roundStartIndex = params.move.stateAfterMove.table.roundStartIndex;
            tempTable.potArray = tempPotArray;
            tempTable.smallBlind = params.move.stateAfterMove.table.smallBlind;
            tempTable.bigBlind = params.move.stateAfterMove.table.bigBlind;
            tempTable.currentCallAmount = params.move.stateAfterMove.table.currentCallAmount;
            tempTable.playerIndicesRemovedInThisHand = params.move.stateAfterMove.table.playerIndicesRemovedInThisHand;
            tempTable.winnersOfPreviousHand = tempWinnersOfPreviousHand;
            params.move.stateAfterMove.table = tempTable;
            for (var k = 0; k < tempPlayerList.length; k++) {
                if (tempPlayerList[k].id == params.move.stateAfterMove.delta.currentPlayer.id) {
                    params.move.stateAfterMove.delta.currentPlayer = tempPlayerList[k];
                    break;
                }
            }
            var tempWinnersList = [];
            for (var i = 0; params.move.stateAfterMove.winnersList && (i < params.move.stateAfterMove.winnersList.length); i++) {
                var tempWinnerList = [];
                for (var j = 0; params.move.stateAfterMove.winnersList[i] && (j < params.move.stateAfterMove.winnersList[i].length); j++) {
                    for (var k = 0; k < tempPlayerList.length; k++) {
                        if (params.move.stateAfterMove.winnersList[i][j].id == tempPlayerList[k].id) {
                            tempWinnerList.push(tempPlayerList[k]);
                            break;
                        }
                    }
                }
                tempWinnersList.push(tempWinnerList);
            }
            params.move.stateAfterMove.winnersList = tempWinnersList;
            var tempPlayersAfterHandOver = [];
            for (var i = 0; params.move.stateAfterMove.playersAfterHandOver && (i < params.move.stateAfterMove.playersAfterHandOver.length); i++) {
                for (var j = 0; j < tempPlayerList.length; j++) {
                    if (params.move.stateAfterMove.playersAfterHandOver[i].id == tempPlayerList[j].id) {
                        tempPlayersAfterHandOver.push(tempPlayerList[j]);
                        break;
                    }
                }
            }
            params.move.stateAfterMove.playersAfterHandOver = tempPlayersAfterHandOver;
            game.move = params.move;
            game.state = game.move.stateAfterMove;
        }
        game.canMakeMove = game.move.turnIndexAfterMove >= 0 &&
            params.yourPlayerIndex === game.move.turnIndexAfterMove; // it's my turn
        console.log("canMakeMove: " + game.canMakeMove + " params.yourPlayerIndex: " + params.yourPlayerIndex + "move.turnIndexAfterMove: " + game.move.turnIndexAfterMove
            + " \nSTATE:");
        console.log(game.state);
        /****** Logic for updating UI to reflect cards of the current player******/
        //check that player hasnt folded yet and yourPlayerIndex is valid(fake updateUI sets it to -2)
        if ((params.yourPlayerIndex >= 0) && (game.state.table.playerList[params.yourPlayerIndex].state !== 3)) {
            game.temp_yourPlayerIndex = params.yourPlayerIndex;
            yourPlayerCards_card1 = game.state.table.playerList[params.yourPlayerIndex].cards[0];
            yourPlayerCards_card2 = game.state.table.playerList[params.yourPlayerIndex].cards[1];
            game.class_yourPlayerCards_card1 = getCardClass(yourPlayerCards_card1);
            game.class_yourPlayerCards_card2 = getCardClass(yourPlayerCards_card2);
        }
        if (game.state.winnersList.length < 0) {
            game.openedCardsList = game.state.table.openedCards;
        }
        /*************************************************************************/
        // Is it the computer's turn?
        game.isComputerTurn = game.canMakeMove &&
            params.playersInfo[params.yourPlayerIndex].playerId === '';
        if (game.isComputerTurn) {
            // To make sure the player won't click something and send a move instead of the computer sending a move.
            game.canMakeMove = false;
            // We calculate the AI move only after the animation finishes,
            // because if we call aiService now
            // then the animation will be paused until the javascript finishes.
            if (!game.state.delta) {
                // This is the first move in the match, so
                // there is not going to be an animation, so
                // call sendComputerMove() now (can happen in ?onlyAIs mode)
                sendComputerMove();
            }
        }
        console.log("state at end of updateUI", game.state);
    }
    function cellClicked(action, amountRaised) {
        log.info("Clicked on button:", action, " amountRaised: ", amountRaised);
        if (window.location.search === '?throwException') {
            throw new Error("Throwing the error because URL has '?throwException'");
        }
        if (!game.canMakeMove) {
            console.log(" cannot make move, " + game.move.turnIndexAfterMove + " should play");
            return;
        }
        try {
            console.log("cellClicked STATE BEFORE MAKE MOVE: ", game.state);
            //update the closedCards size
            game.oldOpenCardsSize = game.state.table.openedCards.length;
            game.state.table.playerList[game.temp_yourPlayerIndex].state = getPlayerStateBasedOnAction(action);
            var nextMove = gameLogic.createMove(game.state, null, amountRaised, game.move.turnIndexAfterMove);
            console.log("cellClicked STATE AFTER MAKE MOVE: ");
            console.log(nextMove);
            game.canMakeMove = false; // to prevent making another move
            moveService.makeMove(nextMove);
        }
        catch (e) {
            log.info("Illegal Move", action);
            console.log(e);
        }
    }
    game.cellClicked = cellClicked;
    /*
      export function shouldShowImage(row: number, col: number): boolean {
        let cell = state.board[row][col];
        return cell !== "";
      }
      export function isPieceX(row: number, col: number): boolean {
        return state.board[row][col] === 'X';
      }
      export function isPieceO(row: number, col: number): boolean {
        return state.board[row][col] === 'O';
      }*/
    //  export function shouldSlowlyAppear(row: number, col: number): boolean {
    //    return !animationEnded &&
    //        state.delta &&
    //        state.delta.row === row && state.delta.col === col;
    //  }
    /****** */
    function getPlayerStateBasedOnAction(action) {
        switch (action) {
            case "Raise": return PlayerState.Raise;
            case "Fold": return PlayerState.Fold;
            case "Call": return PlayerState.Call;
            case "AllIn": return PlayerState.AllIn;
            case "Check": return PlayerState.Check;
            case "Small": return PlayerState.Init;
            case "Big": return PlayerState.Init;
            default: throw new Error("getPlayerStateBasedOnAction: Illegal PlayertState");
        }
    }
    game.getPlayerStateBasedOnAction = getPlayerStateBasedOnAction;
    function getPlayerStateByIndex(index) {
        var playerState = PlayerState[game.state.table.playerList[index].state];
        return playerState;
    }
    game.getPlayerStateByIndex = getPlayerStateByIndex;
    function raised() {
        var amount = document.getElementById('raiseAmount').value;
        if (amount === '') {
            amount = '0';
        }
        if (amount == '0') {
            return;
        }
        game.cellClicked("Raise", +amount);
        return;
    }
    game.raised = raised;
    /*
     *returns the class of the card, check to see if index lies in
     *closed card range, if not simply returns "card".
     */
    function getCardClass(card) {
        var cardClass = "card";
        //    if((state === null) || (index >= (game.state.table.closedCards.length -1))) {
        //        return cardClass;
        //    }else{
        return cardClass += " " + getCardSuite(card) + " " + getCardRank(card);
        //    }
    }
    game.getCardClass = getCardClass;
    function getCardSuite(card) {
        //    if((state === null )|| (index >= state.table.closedCards.length)){
        //        throw new Error("getCardSuite: No Card with that index");
        //    }
        switch (card.cardType) {
            case 0: return "clubs";
            case 1: return "diamonds";
            case 2: return "hearts";
            case 3: return "spades";
            default: return " ";
        }
    }
    game.getCardSuite = getCardSuite;
    function getCardRank(card) {
        //    if((state === null )|| (index >= state.table.closedCards.length)){
        //        throw new Error("getCardRank: No Card with that index");
        //    }
        switch (card.cardNumber) {
            case "K": return "rank13";
            case "Q": return "rank12";
            case "J": return "rank11";
            case "10": return "rank10";
            case "9": return "rank9";
            case "8": return "rank8";
            case "7": return "rank7";
            case "6": return "rank6";
            case "5": return "rank5";
            case "4": return "rank4";
            case "3": return "rank3";
            case "2": return "rank2";
            case "A": return "rank1";
            default: return " ";
        }
    }
    game.getCardRank = getCardRank;
    function shouldShowButton(action) {
        switch (action) {
            case "Raise": return gameLogic.canRaiseOrNot(game.state.table, game.state.table.playerList[game.temp_yourPlayerIndex], 0); //for now returning true, check function again
            case "Fold": return gameLogic.canFoldOrNot(game.state.table);
            case "Call": return gameLogic.canCallOrNot(game.state.table, game.state.table.playerList[game.temp_yourPlayerIndex]);
            case "AllIn": return gameLogic.canAllInOrNot(game.state.table, game.state.table.playerList[game.temp_yourPlayerIndex]);
            case "Check": return gameLogic.canCheckOrNot(game.state.table, game.state.table.playerList[game.temp_yourPlayerIndex]);
            case "Small": return gameLogic.canSmallBlindOrNot(game.state.table);
            case "Big": return gameLogic.canBigBlindOrNot(game.state.table);
            default: return true;
        }
    }
    game.shouldShowButton = shouldShowButton;
    // export function getNumber(size: number) : Array<number>[]{
    //   return new Array(size);
    // }
    function getSmallCardDisplayValue(card) {
        var displayValue;
        displayValue = card.cardNumber;
        switch (card.cardType) {
            case 0: return displayValue + "&clubs;";
            case 1: return displayValue + "&diams;";
            case 2: return displayValue + "&hearts;";
            case 3: return displayValue + "&spades;";
            default: return " ";
        }
    }
    game.getSmallCardDisplayValue = getSmallCardDisplayValue;
    function getSmallCardClass(card) {
        switch (card.cardType) {
            case 0: return "smallCard smallClubs";
            case 1: return "smallCard smallDiamonds";
            case 2: return "smallCard smallHearts";
            case 3: return "smallCard smallSpades";
            default: return " ";
        }
    }
    game.getSmallCardClass = getSmallCardClass;
    /***************************/
    function clickedOnModal(evt) {
        if (evt.target === evt.currentTarget) {
            evt.preventDefault();
            evt.stopPropagation();
            game.isHelpModalShown = false;
        }
        return true;
    }
    game.clickedOnModal = clickedOnModal;
})(game || (game = {}));
angular.module('myApp', ['ngTouch', 'ui.bootstrap', 'gameServices'])
    .run(function () {
    $rootScope['game'] = game;
    game.init();
});
angular.module('myApp')
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);
//# sourceMappingURL=game.js.map