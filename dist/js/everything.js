var CardSuite;
(function (CardSuite) {
    CardSuite[CardSuite["c"] = 0] = "c";
    CardSuite[CardSuite["d"] = 1] = "d";
    CardSuite[CardSuite["h"] = 2] = "h";
    CardSuite[CardSuite["s"] = 3] = "s";
})(CardSuite || (CardSuite = {}));
var winningScoreAndCards = (function () {
    function winningScoreAndCards() {
    }
    return winningScoreAndCards;
}());
var Card = (function () {
    function Card(cardNumber, cardType) {
        this.cardNumber = cardNumber;
        this.cardType = cardType;
    }
    return Card;
}());
var PlayerState;
(function (PlayerState) {
    PlayerState[PlayerState["Check"] = 0] = "Check";
    PlayerState[PlayerState["Call"] = 1] = "Call";
    PlayerState[PlayerState["Raise"] = 2] = "Raise";
    PlayerState[PlayerState["Fold"] = 3] = "Fold";
    PlayerState[PlayerState["Init"] = 4] = "Init";
    PlayerState[PlayerState["AllIn"] = 5] = "AllIn";
    PlayerState[PlayerState["Small"] = 6] = "Small";
    PlayerState[PlayerState["Big"] = 7] = "Big";
})(PlayerState || (PlayerState = {}));
var Player = (function () {
    function Player(id, name) {
        this.currentBet = 0;
        this.id = id;
        this.name = name;
        this.state = PlayerState.Init;
        this.cards = [];
        this.chipsInPocket = 300;
        this.currentBet = 0;
        this.winningCards = [];
        this.winningCategory = "";
        //this.presentInCurrentPot = true;
    }
    Player.prototype.convertPlayerCardArrayToString = function () {
        var cardString = "";
        for (var i = 0; i < this.cards.length; i++) {
            cardString = cardString + this.cards[i].cardNumber + CardSuite[this.cards[i].cardType] + " ";
        }
        return (cardString);
    };
    return Player;
}());
var Pot = (function () {
    function Pot() {
        this.currentPotBetAmount = 0;
        this.totalAmount = 0;
        this.hands = ["Royal Flush", "3 of a Kind", "Straight", "Flush", "4 of a Kind", "1 Pair", "2 Pair", "Straight Flush", "-Invalid-", "High Card", "Full House"];
        this.handRanks = [8, 9, 5, 6, 1, 2, 3, 10, 4, 7, 0];
        this.playersInvolved = [];
        this.playersContributions = [];
    }
    Pot.prototype.addAmountToPot = function (amountToBeAdded) {
        this.totalAmount = this.totalAmount + amountToBeAdded;
    };
    Pot.prototype.subtractAmountFromThePot = function (amountToBeSubtracted) {
        this.totalAmount = this.totalAmount - amountToBeSubtracted;
    };
    Pot.prototype.addPlayerToThePot = function (playerToBeAdded) {
        this.playersInvolved.push(playerToBeAdded);
        this.playersContributions.push(0);
    };
    Pot.prototype.addAllPlayersToThePot = function (playersToBeAdded) {
        for (var i = 0; i < playersToBeAdded.length; i++) {
            this.playersInvolved.push(playersToBeAdded[i]);
            this.playersContributions.push(0);
        }
    };
    Pot.prototype.addContribution = function (currentPlayer, amountContributed) {
        for (var i = 0; i < this.playersInvolved.length; i++) {
            if (this.playersInvolved[i] == currentPlayer) {
                this.playersContributions[i] += amountContributed;
            }
        }
    };
    Pot.prototype.subtractContribution = function (currentPlayer, amountContributed) {
        for (var i = 0; i < this.playersInvolved.length; i++) {
            if (this.playersInvolved[i] == currentPlayer) {
                this.playersContributions[i] -= amountContributed;
            }
        }
    };
    Pot.prototype.checkContribution = function (currentPlayer) {
        for (var i = 0; i < this.playersInvolved.length; i++) {
            if (this.playersInvolved[i] == currentPlayer) {
                return this.playersContributions[i];
            }
        }
    };
    Pot.prototype.removeIfPlayerPresent = function (playerToBeRemoved) {
        for (var i = 0; i < this.playersInvolved.length; i++) {
            if (this.playersInvolved[i] == playerToBeRemoved) {
                this.playersInvolved.splice(i, 1);
                this.playersContributions.splice(i, 1);
            }
        }
    };
    Pot.prototype.getWinners = function (tableAfterMove) {
        var tableCardsString = tableAfterMove.convertTableCardArrayToString();
        var bestRank = -1;
        var winningList = [];
        var winningListCards;
        var winningScoreAndCardsObject;
        var winningCategory = "";
        for (var i = 0; i < this.playersInvolved.length; i++) {
            var theSevenCardString = this.playersInvolved[i].convertPlayerCardArrayToString() + tableCardsString;
            winningScoreAndCardsObject = gameLogic.rankHand(theSevenCardString);
            var currentHandRank = this.handRanks[winningScoreAndCardsObject.index];
            var thisPlayersBestCards = [];
            this.playersInvolved[i].winningCards = this.getCurrentplayersBestCards(theSevenCardString, winningScoreAndCardsObject);
            this.playersInvolved[i].winningCategory = this.hands[this.handRanks[currentHandRank]];
            if (currentHandRank > bestRank) {
                bestRank = currentHandRank;
                winningList = [];
                winningList.push(this.playersInvolved[i]);
                winningListCards = [];
                winningCategory = this.playersInvolved[i].winningCategory;
                winningListCards.push(winningScoreAndCardsObject.wci);
            }
            else if (currentHandRank == bestRank) {
                winningList.push(this.playersInvolved[i]);
                winningListCards.push(winningScoreAndCardsObject.wci);
            }
        }
        if (winningList.length > 1) {
            winningList = gameLogic.resolveEqualHandsConflict(tableAfterMove.openedCards, winningList, winningListCards, winningCategory);
        }
        return winningList;
    };
    Pot.prototype.getCurrentplayersBestCards = function (theSevenCardString, winningScoreAndCardsObject) {
        var currentPlayersAllCards = [];
        var currentPlayersBestCards = [];
        theSevenCardString = theSevenCardString.replace(/\s/g, '');
        for (var j = 0; j < theSevenCardString.length; j++) {
            var currentCardString = "";
            while (theSevenCardString[j] != 'c' && theSevenCardString[j] != 'h' && theSevenCardString[j] != 's' && theSevenCardString[j] != 'd') {
                currentCardString += theSevenCardString[j++];
            }
            currentCardString += theSevenCardString[j];
            currentPlayersAllCards.push(currentCardString);
        }
        for (var j = 0; j < winningScoreAndCardsObject.wci.length; j++) {
            var currentCardString = currentPlayersAllCards[j];
            var currentCardNumber = "";
            var currentCardSuite = void 0;
            currentCardString = currentPlayersAllCards[winningScoreAndCardsObject.wci[j]];
            currentCardNumber = currentCardString.substring(0, currentCardString.length - 1);
            switch (currentCardString.substring(currentCardString.length - 1, currentCardString.length)) {
                case 's':
                    {
                        currentCardSuite = CardSuite.s;
                        break;
                    }
                case 'd':
                    {
                        currentCardSuite = CardSuite.d;
                        break;
                    }
                case 'c':
                    {
                        currentCardSuite = CardSuite.c;
                        break;
                    }
                case 'h':
                    {
                        currentCardSuite = CardSuite.h;
                        break;
                    }
            }
            var currentCard = new Card(currentCardNumber, currentCardSuite);
            currentPlayersBestCards.push(currentCard);
        }
        return currentPlayersBestCards;
    };
    return Pot;
}());
var TableSetup = (function () {
    function TableSetup(noOfPlayers) {
        this.playerList = [];
        this.initialPlayerList = [];
        this.deck = [];
        this.openedCards = [];
        this.closedCards = [];
        this.dealerIndex = noOfPlayers - 1;
        this.currentPlayerIndex = 0;
        this.roundStartIndex = 0;
        this.potArray = [];
        var tempPot = new Pot();
        this.potArray.push(tempPot);
        this.smallBlind = 10;
        this.bigBlind = 20;
        this.currentCallAmount = 0;
        this.winnersOfPreviousHand = [];
        this.playerIndicesRemovedInThisHand = [];
    }
    TableSetup.prototype.addPlayerToTheTable = function (player) {
        this.playerList.push(player);
    };
    TableSetup.prototype.incrementCurrentPlayerIndex = function (stateAfterMove1) {
        while (true) {
            this.currentPlayerIndex++;
            this.currentPlayerIndex %= this.playerList.length;
            if ((this.currentPlayerIndex == this.roundStartIndex) && (this.playerList[this.currentPlayerIndex].state != PlayerState.Init)) {
                //gameLogic.adjustPots(this);
                gameLogic.roundOver(this, stateAfterMove1);
                return;
            }
            else if ((this.playerList[this.currentPlayerIndex].state != PlayerState.Fold) && (this.playerList[this.currentPlayerIndex].state != PlayerState.AllIn)) {
                return;
            }
        }
    };
    TableSetup.prototype.incrementCurrentAndRoundStartIndices = function () {
        this.currentPlayerIndex++;
        this.currentPlayerIndex %= this.playerList.length;
        this.roundStartIndex++;
        this.roundStartIndex %= this.playerList.length;
    };
    TableSetup.prototype.getCurrentPotIndex = function () {
        return (this.potArray.length - 1);
    };
    TableSetup.prototype.addNewPot = function (newPotInitialAmount, playerList) {
        var newPot = new Pot();
        newPot.addAmountToPot(newPotInitialAmount);
        newPot.addAllPlayersToThePot(playerList);
        this.potArray.push(newPot);
    };
    TableSetup.prototype.getCumulativePotAmount = function () {
        var cumulativePotAmount = 0;
        for (var i = 0; i < this.potArray.length; i++) {
            cumulativePotAmount += this.potArray[i].totalAmount;
        }
        return cumulativePotAmount;
    };
    TableSetup.prototype.verifyAndAdjustPots = function () {
        var potToBeVerified = this.potArray[this.potArray.length - 1];
        for (var i = 0; i < potToBeVerified.playersInvolved.length; i++) {
        }
    };
    TableSetup.prototype.awardWinners = function (stateAfterMove1) {
        for (var i = 0; i < this.potArray.length; i++) {
            var winningPlayers = this.potArray[i].getWinners(this);
            this.winnersOfPreviousHand.push(winningPlayers);
            var noOfWinners = winningPlayers.length;
            var potAmountPerPerson = (this.potArray[i].totalAmount / noOfWinners);
            for (var j = 0; j < winningPlayers.length; j++) {
                winningPlayers[j].chipsInPocket += potAmountPerPerson;
            }
        }
        stateAfterMove1.playersAfterHandOver = angular.copy(this.playerList);
        stateAfterMove1.winnersList = angular.copy(this.winnersOfPreviousHand);
    };
    TableSetup.prototype.resetRound = function (stateAfterMove1) {
        for (var i = 0; i < this.playerList.length; i++) {
            this.playerList[i].currentBet = 0;
            if (this.playerList[i].state !== PlayerState.Fold && this.playerList[i].state !== PlayerState.AllIn) {
                this.playerList[i].state = PlayerState.Init;
            }
        }
        this.currentPlayerIndex = (this.dealerIndex + 1) % this.playerList.length;
        while (true) {
            this.roundStartIndex = this.currentPlayerIndex;
            this.currentCallAmount = 0;
            if ((this.currentPlayerIndex == this.dealerIndex) && (this.playerList[this.currentPlayerIndex].state == PlayerState.Fold || this.playerList[this.currentPlayerIndex].state == PlayerState.AllIn)) {
                //gameLogic.adjustPots(this);
                gameLogic.roundOver(this, stateAfterMove1);
                return;
            }
            else if ((this.playerList[this.currentPlayerIndex].state != PlayerState.Fold) && (this.playerList[this.currentPlayerIndex].state != PlayerState.AllIn)) {
                break;
            }
            else {
                this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerList.length;
            }
        }
    };
    TableSetup.prototype.resetHand = function () {
        var indexRevisionCount = 0;
        for (var i = 0; i < this.playerIndicesRemovedInThisHand.length; i++) {
            if (this.playerIndicesRemovedInThisHand[i] <= this.dealerIndex) {
                indexRevisionCount++;
            }
        }
        var newTempIndex = this.dealerIndex - indexRevisionCount;
        if (newTempIndex < 0) {
            this.dealerIndex = newTempIndex + this.playerList.length;
        }
        else {
            this.dealerIndex = newTempIndex;
        }
        this.dealerIndex = (this.dealerIndex + 1) % this.playerList.length;
        this.roundStartIndex = (this.dealerIndex + 1) % this.playerList.length;
        this.currentPlayerIndex = this.roundStartIndex;
        this.currentCallAmount = 0;
        this.potArray = [];
        var tempPot = new Pot();
        tempPot.addAllPlayersToThePot(this.playerList);
        this.potArray.push(tempPot);
        this.openedCards = [];
        this.closedCards = [];
        //this.winnersOfPreviousHand =[];
        for (var i = 0; i < this.playerList.length; i++) {
            this.playerList[i].currentBet = 0;
            this.playerList[i].cards = [];
            this.playerList[i].state = PlayerState.Init;
        }
        this.deck = initializeTableDeck();
        distributeCards(this);
    };
    TableSetup.prototype.removePlayersWithInsufficientChips = function () {
        for (var i = 0; i < this.playerList.length; i++) {
            if (this.playerList[i].chipsInPocket < this.bigBlind) {
                this.playerIndicesRemovedInThisHand.push(i);
            }
        }
        for (var i = 0; i < this.playerList.length; i++) {
            if (this.playerList[i].chipsInPocket < this.bigBlind) {
                this.playerList.splice(i, 1);
                i--;
            }
        }
    };
    TableSetup.prototype.getActivePlayersCount = function () {
        var count = 0;
        for (var i = 0; i < this.playerList.length; i++) {
            count++;
        }
        return count;
    };
    TableSetup.prototype.convertTableCardArrayToString = function () {
        var cardString = "";
        for (var i = 0; i < this.openedCards.length; i++) {
            cardString = cardString + this.openedCards[i].cardNumber + CardSuite[this.openedCards[i].cardType] + " ";
        }
        return (cardString.substring(0, cardString.length - 1));
    };
    return TableSetup;
}());
function initializeTableDeck() {
    var cardDeck = [];
    var suiteNumber = 1;
    //Create the Deck.
    for (var i = 0; i < 52; i++) {
        var num = ((i + 1) % 13 == 0) ? 13 : (i + 1) % 13;
        var numString = "";
        var suite = CardSuite.d;
        if (suiteNumber == 1) {
            suite = CardSuite.c;
        }
        else if (suiteNumber == 2) {
            suite = CardSuite.d;
        }
        else if (suiteNumber == 3) {
            suite = CardSuite.h;
        }
        else {
            suite = CardSuite.s;
        }
        switch (num) {
            case 11:
                {
                    numString = "J";
                    break;
                }
            case 12:
                {
                    numString = "Q";
                    break;
                }
            case 13:
                {
                    numString = "K";
                    break;
                }
            case 1:
                {
                    numString = "A";
                    break;
                }
            default:
                {
                    numString = num.toString();
                    break;
                }
        }
        cardDeck.push(new Card(numString, suite));
        if (num == 13) {
            suiteNumber++;
        }
    }
    //Shuffle the Deck.
    for (var i = cardDeck.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempCard = cardDeck[i];
        cardDeck[i] = cardDeck[j];
        cardDeck[j] = tempCard;
    }
    return cardDeck;
}
function distributeCards(table) {
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < table.playerList.length; j++) {
            table.playerList[j].cards.push(table.deck.pop());
        }
    }
    burnCard(table.deck);
    for (var i = 0; i < 3; i++) {
        table.closedCards.push(table.deck.pop());
    }
    burnCard(table.deck);
    table.closedCards.push(table.deck.pop());
    burnCard(table.deck);
    table.closedCards.push(table.deck.pop());
}
function burnCard(cardDeck) {
    cardDeck.pop();
}
function isGameOver(table) {
    if ((table.playerList.length == 0) || (table.playerList.length == 1)) {
        return true;
    }
    else {
        return false;
    }
}
var gameLogic;
(function (gameLogic) {
    function getInitialTable(playersInfo) {
        var table = new TableSetup(playersInfo.length);
        for (var i = 0; i < playersInfo.length; i++) {
            table.addPlayerToTheTable(new Player(playersInfo[i].playerId, playersInfo[i].displayName));
        }
        // table.addPlayerToTheTable(new Player("adit91","Adit"));
        // table.addPlayerToTheTable(new Player("ridhi91","Ridhi"));
        // table.addPlayerToTheTable(new Player("anto90","Anto"));
        // table.addPlayerToTheTable(new Player("gaurav89","Gaurav"));
        // table.addPlayerToTheTable(new Player("rachita88","Rachita"));
        table.potArray[table.getCurrentPotIndex()].addAllPlayersToThePot(table.playerList);
        table.deck = initializeTableDeck();
        distributeCards(table);
        for (var i = 0; i < table.playerList.length; i++) {
            var currentPlayer = table.playerList[i];
            table.initialPlayerList.push(currentPlayer);
        }
        return table;
    }
    gameLogic.getInitialTable = getInitialTable;
    function getInitialState(playersInfo) {
        return { table: getInitialTable(playersInfo), delta: null, winnersList: [], playersAfterHandOver: [], GameWinner: null };
    }
    gameLogic.getInitialState = getInitialState;
    function createMove(stateBeforeMove, currentPlayer, amountAdded, turnIndexBeforeMove) {
        var stateAfterMove1 = { table: null, delta: null, winnersList: [], playersAfterHandOver: [], GameWinner: null };
        stateAfterMove1.winnersList = [];
        stateAfterMove1.playersAfterHandOver = [];
        if (!stateBeforeMove) {
            var playersInfo = [];
            var player1 = {
                displayName: "Adit",
                playerId: "A",
                avatarImageUrl: null
            };
            var player2 = {
                displayName: "Ridhiman",
                playerId: "R",
                avatarImageUrl: null
            };
            playersInfo.push(player1);
            playersInfo.push(player2);
            stateBeforeMove = getInitialState(playersInfo);
        }
        var lastCardOfTheRound = false;
        var handOver = false;
        var table = stateBeforeMove.table;
        if (isGameOver(table)) {
            throw new Error("Can only make a move if the game is not over! Number of required payers for the game not satisfied");
        }
        var tableAfterMove = angular.copy(table);
        tableAfterMove.winnersOfPreviousHand = [];
        currentPlayer = tableAfterMove.playerList[tableAfterMove.currentPlayerIndex];
        var tempCurrentPlayer = currentPlayer;
        if (tableAfterMove.openedCards.length == 0) {
            if ((tableAfterMove.currentPlayerIndex ==
                ((tableAfterMove.dealerIndex + 1) % tableAfterMove.playerList.length)) &&
                (currentPlayer.state == PlayerState.Init)) {
                tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addAmountToPot(tableAfterMove.smallBlind);
                currentPlayer.chipsInPocket -= tableAfterMove.smallBlind;
                currentPlayer.currentBet = tableAfterMove.smallBlind;
                tableAfterMove.currentCallAmount = tableAfterMove.smallBlind;
                tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addContribution(currentPlayer, tableAfterMove.smallBlind);
                tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].currentPotBetAmount = tableAfterMove.smallBlind;
            }
            else if ((tableAfterMove.currentPlayerIndex ==
                ((tableAfterMove.dealerIndex + 2) % tableAfterMove.playerList.length)) &&
                (currentPlayer.state == PlayerState.Init)) {
                tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addAmountToPot(tableAfterMove.bigBlind);
                currentPlayer.chipsInPocket -= tableAfterMove.bigBlind;
                currentPlayer.currentBet = tableAfterMove.bigBlind;
                tableAfterMove.currentCallAmount = tableAfterMove.bigBlind;
                tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addContribution(currentPlayer, tableAfterMove.bigBlind);
                tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].currentPotBetAmount = tableAfterMove.bigBlind;
            }
        }
        switch (currentPlayer.state) {
            case PlayerState.Fold:
                {
                    var foldCount = 0;
                    var notFoldedPlayer = void 0;
                    for (var i = 0; i < tableAfterMove.playerList.length; i++) {
                        if (tableAfterMove.playerList[i].state == PlayerState.Fold) {
                            foldCount++;
                        }
                        else {
                            notFoldedPlayer = tableAfterMove.playerList[i];
                        }
                    }
                    for (var i = 0; i < tableAfterMove.potArray.length; i++) {
                        tableAfterMove.potArray[i].removeIfPlayerPresent(currentPlayer);
                    }
                    if (foldCount == tableAfterMove.playerList.length - 1) {
                        var stateAfterMove = { delta: null, table: null, winnersList: null, playersAfterHandOver: null, GameWinner: null };
                        tableAfterMove.awardWinners(stateAfterMove);
                        stateAfterMove.playersAfterHandOver = null;
                        tableAfterMove.removePlayersWithInsufficientChips();
                        tableAfterMove.resetHand();
                        handOver = true;
                        lastCardOfTheRound = true;
                        if (tableAfterMove.playerList.length == 0 || tableAfterMove.playerList.length == 1) {
                            console.log("Game Over! Bye Bye! " + tableAfterMove.playerList.length + " Players left!");
                            stateAfterMove.GameWinner = tableAfterMove.playerList[0];
                        }
                        var turnIndexAfterMove_1 = tableAfterMove.currentPlayerIndex;
                        var delta_1 = { currentPlayer: currentPlayer, amountAdded: amountAdded };
                        stateAfterMove.delta = delta_1;
                        stateAfterMove.table = tableAfterMove;
                        var endMatchScores_1;
                        endMatchScores_1 = null;
                        return { endMatchScores: endMatchScores_1, turnIndexAfterMove: turnIndexAfterMove_1, stateAfterMove: stateAfterMove };
                    }
                    break;
                }
            case PlayerState.AllIn:
                {
                    if (currentPlayer.chipsInPocket == 0) {
                        var turnIndexAfterMove_2 = tableAfterMove.currentPlayerIndex;
                        var delta_2 = { currentPlayer: currentPlayer, amountAdded: amountAdded };
                        var stateAfterMove = { delta: delta_2, table: tableAfterMove, winnersList: [], playersAfterHandOver: tableAfterMove.playerList, GameWinner: null };
                        var endMatchScores_2;
                        endMatchScores_2 = null;
                        return { endMatchScores: endMatchScores_2, turnIndexAfterMove: turnIndexAfterMove_2, stateAfterMove: stateAfterMove };
                    }
                    var totalBetAmountByCurrentPlayer = currentPlayer.currentBet + currentPlayer.chipsInPocket;
                    if (totalBetAmountByCurrentPlayer >= tableAfterMove.currentCallAmount) {
                        //console.log("No New Pot Created:");
                        var balance = currentPlayer.chipsInPocket;
                        for (var i = 0; i < tableAfterMove.potArray.length; i++) {
                            var contribution = tableAfterMove.potArray[i].checkContribution(currentPlayer);
                            if (contribution < tableAfterMove.potArray[i].currentPotBetAmount) {
                                var difference = tableAfterMove.potArray[i].currentPotBetAmount - contribution;
                                balance -= difference;
                                tableAfterMove.potArray[i].addAmountToPot(difference);
                                tableAfterMove.potArray[i].addContribution(currentPlayer, difference);
                            }
                        }
                        tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addAmountToPot(balance);
                        tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addContribution(currentPlayer, balance);
                        currentPlayer.chipsInPocket = 0;
                        currentPlayer.currentBet = totalBetAmountByCurrentPlayer;
                        if (totalBetAmountByCurrentPlayer > tableAfterMove.currentCallAmount) {
                            tableAfterMove.roundStartIndex = tableAfterMove.currentPlayerIndex;
                        }
                        tableAfterMove.currentCallAmount = totalBetAmountByCurrentPlayer;
                        tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].currentPotBetAmount += balance;
                    }
                    else if (totalBetAmountByCurrentPlayer < tableAfterMove.currentCallAmount) {
                        //console.log("New Pot Created:");
                        var cumulativeBetTillCurrentPot = 0;
                        var indexOfPotToBeSplit = 0;
                        var totalAmountThisPlayerCanBet = totalBetAmountByCurrentPlayer + tableAfterMove.potArray[indexOfPotToBeSplit].playersContributions[turnIndexBeforeMove];
                        var flag = void 0;
                        for (var i = 0; i < tableAfterMove.potArray.length; i++) {
                            cumulativeBetTillCurrentPot += tableAfterMove.potArray[i].currentPotBetAmount;
                            if (totalBetAmountByCurrentPlayer == cumulativeBetTillCurrentPot) {
                                tableAfterMove.potArray[i].addAmountToPot(currentPlayer.chipsInPocket);
                                tableAfterMove.potArray[i].addContribution(currentPlayer, currentPlayer.chipsInPocket);
                                currentPlayer.chipsInPocket = 0;
                                currentPlayer.currentBet = totalBetAmountByCurrentPlayer;
                                for (var j = (i + 1); j < tableAfterMove.potArray.length; j++) {
                                    tableAfterMove.potArray[j].removeIfPlayerPresent(currentPlayer);
                                }
                                flag = 1;
                                break;
                            }
                            else if (totalBetAmountByCurrentPlayer < cumulativeBetTillCurrentPot) {
                                flag = 2;
                                indexOfPotToBeSplit = i;
                                break;
                            }
                        }
                        if (flag == 1) {
                            break;
                        }
                        var balance = currentPlayer.chipsInPocket;
                        for (var i = 0; i < indexOfPotToBeSplit; i++) {
                            var contribution = tableAfterMove.potArray[i].checkContribution(currentPlayer);
                            if (contribution < tableAfterMove.potArray[i].currentPotBetAmount) {
                                var difference_1 = tableAfterMove.potArray[i].currentPotBetAmount - contribution;
                                balance -= difference_1;
                                tableAfterMove.potArray[i].addAmountToPot(difference_1);
                                tableAfterMove.potArray[i].addContribution(currentPlayer, difference_1);
                            }
                        }
                        var newPotObject = new Pot();
                        var playerListExcludingCurrentPlayer = [];
                        for (var i = 0; i < tableAfterMove.potArray[indexOfPotToBeSplit].playersInvolved.length; i++) {
                            if (tableAfterMove.potArray[indexOfPotToBeSplit].playersInvolved[i] != currentPlayer) {
                                playerListExcludingCurrentPlayer.push(tableAfterMove.potArray[indexOfPotToBeSplit].playersInvolved[i]);
                            }
                        }
                        newPotObject.addAllPlayersToThePot(playerListExcludingCurrentPlayer);
                        var playersInThePotToBeSplit = tableAfterMove.potArray[indexOfPotToBeSplit].playersInvolved;
                        var playersContributionsInThePotToBeSplit = tableAfterMove.potArray[indexOfPotToBeSplit].playersContributions;
                        var newPotObjectBetAmount = 0;
                        for (var i = 0; i < playersContributionsInThePotToBeSplit.length; i++) {
                            if (playersContributionsInThePotToBeSplit[i] > newPotObjectBetAmount) {
                                newPotObjectBetAmount = playersContributionsInThePotToBeSplit[i];
                            }
                        }
                        newPotObject.currentPotBetAmount = newPotObjectBetAmount - totalAmountThisPlayerCanBet;
                        var difference = 0;
                        var newPotInitialAmount = 0;
                        var playersBeingShifted = [];
                        var playersContributionsBeingShifted = [];
                        for (var i = 0; i < playersInThePotToBeSplit.length; i++) {
                            if (playersContributionsInThePotToBeSplit[i] > totalAmountThisPlayerCanBet) {
                                difference = playersContributionsInThePotToBeSplit[i] - totalAmountThisPlayerCanBet;
                                tableAfterMove.potArray[indexOfPotToBeSplit].subtractContribution(playersInThePotToBeSplit[i], difference);
                                newPotInitialAmount += difference;
                                playersBeingShifted.push(playersInThePotToBeSplit[i]);
                                playersContributionsBeingShifted.push(difference);
                            }
                        }
                        tableAfterMove.potArray[indexOfPotToBeSplit].addAmountToPot(balance);
                        tableAfterMove.potArray[indexOfPotToBeSplit].addContribution(currentPlayer, balance);
                        tableAfterMove.potArray[indexOfPotToBeSplit].currentPotBetAmount = totalAmountThisPlayerCanBet;
                        tableAfterMove.potArray[indexOfPotToBeSplit].subtractAmountFromThePot(newPotInitialAmount);
                        newPotObject.addAmountToPot(newPotInitialAmount);
                        for (var i = 0; i < playersBeingShifted.length; i++) {
                            newPotObject.addContribution(playersBeingShifted[i], playersContributionsBeingShifted[i]);
                        }
                        tableAfterMove.potArray.splice(indexOfPotToBeSplit + 1, 0, newPotObject);
                        currentPlayer.chipsInPocket = 0;
                        currentPlayer.currentBet = totalBetAmountByCurrentPlayer;
                    }
                    break;
                }
            case PlayerState.Check:
                {
                    if (tableAfterMove.currentCallAmount > currentPlayer.currentBet) {
                        throw new Error("Can't check. The player has not matched the current table bet amount");
                    }
                    break;
                }
            case PlayerState.Call:
                {
                    var chipsNeededToMatchTheBet = tableAfterMove.currentCallAmount - currentPlayer.currentBet;
                    if (chipsNeededToMatchTheBet == 0) {
                        throw new Error("The player has already matched the current table bet amount");
                    }
                    if (chipsNeededToMatchTheBet > currentPlayer.chipsInPocket) {
                        throw new Error("The player doesn't have enough chips to match the current table bet amount. He can go All In");
                    }
                    for (var i = 0; i < tableAfterMove.potArray.length; i++) {
                        var contribution = tableAfterMove.potArray[i].checkContribution(currentPlayer);
                        if (contribution < tableAfterMove.potArray[i].currentPotBetAmount) {
                            var difference = tableAfterMove.potArray[i].currentPotBetAmount - contribution;
                            tableAfterMove.potArray[i].addAmountToPot(difference);
                            tableAfterMove.potArray[i].addContribution(currentPlayer, difference);
                        }
                    }
                    currentPlayer.chipsInPocket -= chipsNeededToMatchTheBet;
                    currentPlayer.currentBet = tableAfterMove.currentCallAmount;
                    if (currentPlayer.chipsInPocket == 0) {
                        currentPlayer.state = PlayerState.AllIn;
                    }
                    break;
                }
            case PlayerState.Raise:
                {
                    var chipsNeededToMatchTheBet = tableAfterMove.currentCallAmount - currentPlayer.currentBet;
                    var raiseAmount = amountAdded;
                    var totalAmountBeingAdded = chipsNeededToMatchTheBet + raiseAmount;
                    if (totalAmountBeingAdded > currentPlayer.chipsInPocket) {
                        throw new Error("The player doesn't have enough chips to raise the bet. Choose a smaller amount.");
                    }
                    //tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addAmountToPot(totalAmountBeingAdded);
                    var balance = totalAmountBeingAdded;
                    for (var i = 0; i < tableAfterMove.potArray.length; i++) {
                        var contribution = tableAfterMove.potArray[i].checkContribution(currentPlayer);
                        if (contribution < tableAfterMove.potArray[i].currentPotBetAmount) {
                            var difference = tableAfterMove.potArray[i].currentPotBetAmount - contribution;
                            balance -= difference;
                            tableAfterMove.potArray[i].addAmountToPot(difference);
                            tableAfterMove.potArray[i].addContribution(currentPlayer, difference);
                        }
                    }
                    tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addAmountToPot(balance);
                    tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].addContribution(currentPlayer, balance);
                    currentPlayer.chipsInPocket -= totalAmountBeingAdded;
                    currentPlayer.currentBet = currentPlayer.currentBet + totalAmountBeingAdded;
                    tableAfterMove.currentCallAmount = currentPlayer.currentBet;
                    tableAfterMove.roundStartIndex = tableAfterMove.currentPlayerIndex;
                    tableAfterMove.potArray[tableAfterMove.getCurrentPotIndex()].currentPotBetAmount += balance;
                    if (currentPlayer.chipsInPocket == 0) {
                        currentPlayer.state = PlayerState.AllIn;
                    }
                    break;
                }
        }
        var gameOverOrNot = isGameOver(tableAfterMove);
        var turnIndexAfterMove;
        if ((((tableAfterMove.currentPlayerIndex + 1) % tableAfterMove.playerList.length) ==
            tableAfterMove.roundStartIndex) && (currentPlayer.state != PlayerState.Init)) {
            if (tableAfterMove.openedCards.length == 5) {
                handOver = true;
            }
            roundOver(tableAfterMove, stateAfterMove1);
            turnIndexAfterMove = tableAfterMove.currentPlayerIndex;
            lastCardOfTheRound = true;
        }
        if (gameOverOrNot) {
            turnIndexAfterMove = -1;
        }
        else {
            if ((tableAfterMove.openedCards.length == 0) && (handOver == false) && (currentPlayer.state == PlayerState.Init)
                && ((tableAfterMove.currentPlayerIndex == ((tableAfterMove.dealerIndex + 1) % tableAfterMove.playerList.length))
                    || (tableAfterMove.currentPlayerIndex == ((tableAfterMove.dealerIndex + 2) % tableAfterMove.playerList.length)))) {
                tableAfterMove.incrementCurrentAndRoundStartIndices();
                turnIndexAfterMove = tableAfterMove.currentPlayerIndex;
            }
            else {
                if (lastCardOfTheRound == false) {
                    tableAfterMove.incrementCurrentPlayerIndex(stateAfterMove1);
                    turnIndexAfterMove = tableAfterMove.currentPlayerIndex;
                }
            }
            turnIndexAfterMove = tableAfterMove.currentPlayerIndex;
        }
        var delta = { currentPlayer: currentPlayer, amountAdded: amountAdded };
        stateAfterMove1.delta = delta;
        stateAfterMove1.table = tableAfterMove;
        var winner = getWinner(tableAfterMove);
        var endMatchScores;
        if (winner !== null) {
            // Game over.
            turnIndexAfterMove = -1;
            endMatchScores = [];
            for (var j = 0; j < stateAfterMove1.table.initialPlayerList.length; j++) {
                endMatchScores[j] = 0;
                if (stateAfterMove1.table.initialPlayerList[j].id == winner.id) {
                    endMatchScores[j] = 1;
                }
            }
        }
        else {
            // Game continues.
            endMatchScores = null;
        }
        return { endMatchScores: endMatchScores, turnIndexAfterMove: turnIndexAfterMove, stateAfterMove: stateAfterMove1 };
    }
    gameLogic.createMove = createMove;
    function getWinner(tableAfterMove) {
        if (tableAfterMove.playerList.length > 1) {
            return null;
        }
        else {
            for (var i = 0; i < tableAfterMove.initialPlayerList.length; i++) {
                if (tableAfterMove.initialPlayerList[i].id == tableAfterMove.playerList[0].id) {
                    return tableAfterMove.initialPlayerList[i];
                }
            }
        }
    }
    gameLogic.getWinner = getWinner;
    function roundOver(tableAfterMove, stateAfterMove1) {
        adjustPots(tableAfterMove);
        switch (tableAfterMove.openedCards.length) {
            case 0:
                {
                    for (var i = 0; i < 3; i++) {
                        tableAfterMove.openedCards.push(tableAfterMove.closedCards.pop());
                    }
                    console.log("\n1st Round Over! 3 Cards Open");
                    tableAfterMove.verifyAndAdjustPots();
                    tableAfterMove.resetRound(stateAfterMove1);
                    break;
                }
            case 3:
                {
                    tableAfterMove.openedCards.push(tableAfterMove.closedCards.pop());
                    console.log("\n2nd Round Over! 1 Card Open");
                    tableAfterMove.resetRound(stateAfterMove1);
                    break;
                }
            case 4:
                {
                    tableAfterMove.openedCards.push(tableAfterMove.closedCards.pop());
                    console.log("\n3rd Round Over! 1 Card Open");
                    tableAfterMove.resetRound(stateAfterMove1);
                    break;
                }
            case 5: {
                //All the Cards are already open. No bets remaining. Divide the pot; Basically call the Hand Eval Function.
                //tableAfterMove.winners = 
                console.log("\nHand Over");
                tableAfterMove.awardWinners(stateAfterMove1);
                //winnersList = tableAfterMove.winners;
                tableAfterMove.removePlayersWithInsufficientChips();
                tableAfterMove.resetHand();
                if (tableAfterMove.playerList.length == 0 || tableAfterMove.playerList.length == 1) {
                    console.log("Game Over! Bye Bye! " + tableAfterMove.playerList.length + " Players left!");
                    stateAfterMove1.GameWinner = tableAfterMove.playerList[0];
                }
            }
        }
    }
    gameLogic.roundOver = roundOver;
    function adjustPots(tableAfterMove) {
        for (var i = (tableAfterMove.potArray.length - 1); i < tableAfterMove.potArray.length; i++) {
            var currentPot = tableAfterMove.potArray[i];
            var minContribution = currentPot.playersContributions[0];
            var minContributors = [];
            minContributors.push(currentPot.playersInvolved[0]);
            for (var j = 0; j < currentPot.playersInvolved.length; j++) {
                if (currentPot.playersInvolved[j].state == PlayerState.AllIn && currentPot.playersContributions[j] < currentPot.currentPotBetAmount) {
                    if (currentPot.playersContributions[j] < minContribution) {
                        minContribution = currentPot.playersContributions[j];
                        minContributors = [];
                        minContributors.push(currentPot.playersInvolved[j]);
                    }
                    else if (currentPot.playersContributions[j] == minContribution) {
                        minContributors.push(currentPot.playersInvolved[j]);
                    }
                }
            }
            if (minContribution < currentPot.currentPotBetAmount) {
                var newPotObject = new Pot();
                var playerListExcludingMinContributors = [];
                for (var j = 0; j < currentPot.playersInvolved.length; j++) {
                    var isMinimumContributor = false;
                    for (var k = 0; k < minContributors.length; k++) {
                        if (currentPot.playersInvolved[j] == minContributors[k]) {
                            isMinimumContributor = true;
                            break;
                        }
                    }
                    if (isMinimumContributor == false) {
                        playerListExcludingMinContributors.push(currentPot.playersInvolved[j]);
                    }
                }
                var balance = minContribution;
                newPotObject.addAllPlayersToThePot(playerListExcludingMinContributors);
                newPotObject.currentPotBetAmount = currentPot.currentPotBetAmount - balance;
                var playersInThePotToBeSplit = currentPot.playersInvolved;
                var playersContributionsInThePotToBeSplit = currentPot.playersContributions;
                var difference = 0;
                var newPotInitialAmount = 0;
                var playersBeingShifted = [];
                var playersContributionsBeingShifted = [];
                for (var j = 0; j < playersInThePotToBeSplit.length; j++) {
                    if (playersContributionsInThePotToBeSplit[j] > balance) {
                        difference = playersContributionsInThePotToBeSplit[j] - balance;
                        currentPot.subtractContribution(playersInThePotToBeSplit[j], difference);
                        newPotInitialAmount += difference;
                        playersBeingShifted.push(playersInThePotToBeSplit[j]);
                        playersContributionsBeingShifted.push(difference);
                    }
                }
                currentPot.currentPotBetAmount = balance;
                currentPot.subtractAmountFromThePot(newPotInitialAmount);
                newPotObject.addAmountToPot(newPotInitialAmount);
                for (var j = 0; j < playersBeingShifted.length; j++) {
                    newPotObject.addContribution(playersBeingShifted[j], playersContributionsBeingShifted[j]);
                }
                tableAfterMove.potArray.push(newPotObject);
            }
        }
    }
    gameLogic.adjustPots = adjustPots;
    function checkMoveOk(stateTransition) {
        // // We can assume that turnIndexBeforeMove and stateBeforeMove are legal, and we need to verify that the move is OK.
        /**
        let turnIndexBeforeMove = stateTransition.turnIndexBeforeMove;
        let stateBeforeMove: IState = stateTransition.stateBeforeMove;
        let move: IMove = stateTransition.move;
        let deltaValue: TableDelta = stateTransition.move.stateAfterMove.delta;
        let currentPlayer = deltaValue.currentPlayer;
        let amountAdded = deltaValue.amountAdded;
    
        let expectedMove = createMove(stateBeforeMove, currentPlayer, amountAdded, turnIndexBeforeMove);
    
        if(!angular.equals(move.stateAfterMove,expectedMove.stateAfterMove)) {
            console.log("StateAfterMove not same.");
            console.log("Move: ");
            console.log("No Of Pots: " + move.stateAfterMove.delta.currentPlayer);
            
            console.log("Expected Move: ");
            console.log("No Of Pots: " + expectedMove.stateAfterMove.delta.currentPlayer);
            
        }
        
        if (!angular.equals(move, expectedMove)) {
            throw new Error("Expected move=" + angular.toJson(expectedMove, true) + ", but got stateTransition=" + angular.toJson(stateTransition, true))
        }
     */
    }
    gameLogic.checkMoveOk = checkMoveOk;
    function canSmallBlindOrNot(tableAfterMove) {
        if (tableAfterMove.getCumulativePotAmount() == 0) {
            return true;
        }
        else {
            return false;
        }
    }
    gameLogic.canSmallBlindOrNot = canSmallBlindOrNot;
    function canBigBlindOrNot(tableAfterMove) {
        if (tableAfterMove.getCumulativePotAmount() == tableAfterMove.smallBlind) {
            return true;
        }
        else {
            return false;
        }
    }
    gameLogic.canBigBlindOrNot = canBigBlindOrNot;
    function canFoldOrNot(tableAfterMove) {
        if (canSmallBlindOrNot(tableAfterMove) || canBigBlindOrNot(tableAfterMove)) {
            return false;
        }
        else {
            return true;
        }
    }
    gameLogic.canFoldOrNot = canFoldOrNot;
    function canCheckOrNot(tableAfterMove, currentPlayer) {
        if (currentPlayer == null) {
            return false;
        }
        if (canSmallBlindOrNot(tableAfterMove) || canBigBlindOrNot(tableAfterMove)) {
            return false;
        }
        else if (tableAfterMove.currentCallAmount > currentPlayer.currentBet) {
            return false;
        }
        else {
            return true;
        }
    }
    gameLogic.canCheckOrNot = canCheckOrNot;
    function canCallOrNot(tableAfterMove, currentPlayer) {
        if (currentPlayer == null) {
            return false;
        }
        var chipsNeededToMatchTheBet = tableAfterMove.currentCallAmount - currentPlayer.currentBet;
        if (canSmallBlindOrNot(tableAfterMove) || canBigBlindOrNot(tableAfterMove)) {
            return false;
        }
        else if (chipsNeededToMatchTheBet == 0) {
            return false;
        }
        else if (chipsNeededToMatchTheBet > currentPlayer.chipsInPocket) {
            return false;
        }
        else {
            return true;
        }
    }
    gameLogic.canCallOrNot = canCallOrNot;
    function canRaiseOrNot(tableAfterMove, currentPlayer, amountAdded) {
        if (currentPlayer == null) {
            return false;
        }
        var chipsNeededToMatchTheBet = tableAfterMove.currentCallAmount - currentPlayer.currentBet;
        var raiseAmount = amountAdded;
        var totalAmountBeingAdded = chipsNeededToMatchTheBet + raiseAmount;
        if (canSmallBlindOrNot(tableAfterMove) || canBigBlindOrNot(tableAfterMove)) {
            return false;
        }
        else if (totalAmountBeingAdded > currentPlayer.chipsInPocket) {
            return false;
        }
        else {
            return true;
        }
    }
    gameLogic.canRaiseOrNot = canRaiseOrNot;
    function canAllInOrNot(tableAfterMove, currentPlayer) {
        if (currentPlayer == null) {
            return false;
        }
        if (canSmallBlindOrNot(tableAfterMove) || canBigBlindOrNot(tableAfterMove)) {
            return false;
        }
        else {
            return true;
        }
    }
    gameLogic.canAllInOrNot = canAllInOrNot;
    function rankHand(str) {
        //takes a string of per person hands and returns the rank as a number
        var hands = ["Royal Flush", "3 of a Kind", "Straight", "Flush", "4 of a Kind", "1 Pair", "2 Pair", "Straight Flush", "-Invalid-", "High Card", "Full House"];
        var handRanks = [8, 9, 5, 6, 1, 2, 3, 10, 4, 7, 0];
        var index = 10; //index into handRanks
        var winCardIndexes, i;
        var wci = [];
        var cardStr = str.replace(/A/g, "14").replace(/K/g, "13").replace(/Q/g, "12").replace(/J/g, "11").replace(/s|c|h|d/g, ",");
        var cards = cardStr.replace(/\s/g, '').slice(0, -1).split(",").map(Number).filter(Boolean);
        ;
        var suitsAsString = str.match(/s|c|h|d/g);
        var suits = [];
        for (i = 0; i < suitsAsString.length; i++) {
            if (suitsAsString[i] === "s") {
                suits[i] = 1;
            }
            else if (suitsAsString[i] === "c") {
                suits[i] = 8;
            }
            else if (suitsAsString[i] === "h") {
                suits[i] = 32;
            }
            else if (suitsAsString[i] === "d") {
                suits[i] = 64;
            }
        }
        if (cards !== null && suits != null) {
            if (cards.length == suits.length) {
                var e = void 0;
                var o = {};
                var keyCount = 0;
                var j = void 0;
                //o{}n is a map from the card as a string to the occurences of that card,
                // each card should have only one occurance;
                //keycount is used to check if all cards are unique
                for (i = 0; i < cards.length; i++) {
                    e = cards[i] + suitsAsString[i];
                    o[e] = 1;
                }
                for (j in o) {
                    if (o.hasOwnProperty(j)) {
                        keyCount++;
                    }
                }
                if (cards.length >= 5) {
                    //iof cards are unique
                    if (cards.length == suits.length && cards.length == keyCount) {
                        //get the number of possile combinations for the cards, also all possible combionations
                        //example: for 5 cards, the cumber of combinations is 1(for a 5 card set) and the arrangements 0,1,2,3,4
                        var c = getCombinations(5, cards.length);
                        var maxRank = 0, winIndex = 10;
                        for (i = 0; i < c.length; i++) {
                            var cs = [cards[c[i][0]], cards[c[i][1]], cards[c[i][2]], cards[c[i][3]], cards[c[i][4]]];
                            var ss = [suits[c[i][0]], suits[c[i][1]], suits[c[i][2]],
                                suits[c[i][3]], suits[c[i][4]]];
                            index = calcIndex(cs, ss);
                            if (handRanks[index] > maxRank) {
                                maxRank = handRanks[index];
                                winIndex = index;
                                wci = c[i].slice();
                            }
                            else if (handRanks[index] == maxRank) {
                                var score1 = getPokerScore(cs);
                                var score2 = getPokerScore([cards[wci[0]], cards[wci[1]], cards[wci[2]], cards[wci[3]], cards[wci[4]]]);
                                if (score1 > score2) {
                                    wci = c[i].slice();
                                }
                            }
                        }
                        index = winIndex;
                    }
                }
            }
            var winningScoreAndCardsObject = new winningScoreAndCards();
            winningScoreAndCardsObject.index = index;
            winningScoreAndCardsObject.wci = wci;
            return winningScoreAndCardsObject;
        }
    }
    gameLogic.rankHand = rankHand;
    function getPokerScore(cs) {
        var a = cs.slice();
        var d = [];
        var i;
        for (i = 0; i < 5; i++) {
            d[a[i]] = (d[a[i]] >= 1) ? d[a[i]] + 1 : 1;
        }
        a.sort(function (a, b) { return (d[a] < d[b]) ? +1 : (d[a] > d[b]) ? -1 : (b - a); });
        return a[0] << 16 | a[1] << 12 | a[2] << 8 | a[3] << 4 | a[4];
    }
    gameLogic.getPokerScore = getPokerScore;
    function getCombinations(k, n) {
        var result = [], comb = [];
        function next_comb(comb, k, n) {
            var i;
            if (comb.length === 0) {
                for (i = 0; i < k; ++i) {
                    comb[i] = i;
                }
                return true;
            }
            i = k - 1;
            ++comb[i];
            while ((i > 0) && (comb[i] >= n - k + 1 + i)) {
                --i;
                ++comb[i];
            }
            if (comb[0] > n - k) {
                return false;
            } // No more combinations can be generated
            for (i = i + 1; i < k; ++i) {
                comb[i] = comb[i - 1] + 1;
            }
            return true;
        }
        while (next_comb(comb, k, n)) {
            result.push(comb.slice());
        }
        return result;
    }
    gameLogic.getCombinations = getCombinations;
    function calcIndex(cs, ss) {
        var v, i, o, s;
        for (i = -1, v = o = 0; i < 5; i++, o = Math.pow(2, cs[i] * 4)) {
            v += o * ((v / o & 15) + 1);
        }
        if ((v %= 15) != 5) {
            return v - 1;
        }
        else {
            s = 1 << cs[0] | 1 << cs[1] | 1 << cs[2] | 1 << cs[3] | 1 << cs[4];
        }
        v -= ((s / (s & -s) == 31) || (s == 0x403c) ? 3 : 1);
        if (ss[0] == (ss[0] | ss[1] | ss[2] | ss[3] | ss[4])) {
            return v - ((s == 0x7c00) ? -5 : 1);
        }
        else {
            return v;
        }
    }
    function resolveEqualHandsConflict(tableCards, playerWithConflicts, winningCardsList, conflictType) {
        var currentPlayerWinningCards = [];
        var winningPlayersList = [];
        for (var i = 0; i < playerWithConflicts.length; i++) {
            currentPlayerWinningCards[i] = [];
            for (var j = 0; j < winningCardsList[i].length; j++) {
                if (winningCardsList[i][j] < 2) {
                    currentPlayerWinningCards[i].push(playerWithConflicts[i].cards[winningCardsList[i][j]]);
                }
                else {
                    currentPlayerWinningCards[i].push(tableCards[winningCardsList[i][j] - 2]);
                }
            }
        }
        for (var i = 0; i < playerWithConflicts.length; i++) {
            playerWithConflicts[i].winningCategory = conflictType;
        }
        switch (conflictType) {
            case "4 of a Kind":
                {
                    return resolve_4_OfAKind(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "3 of a Kind":
                {
                    return resolve_3_OfAKind(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "1 Pair":
                {
                    return resolve_2_OfAKind(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "Straight Flush":
                {
                    return findHighestCard(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "Straight":
                {
                    return findHighestCard(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "Flush":
                {
                    return resolveHighestCard(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "High Card":
                {
                    return resolveHighestCard(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "Full House":
                {
                    return resolve_3_OfAKind(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "Royal Flush":
                {
                    return playerWithConflicts;
                }
            case "2 Pair":
                {
                    return resolve2Pairs(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList);
                }
            case "-Invalid-": {
                return;
            }
        }
    }
    gameLogic.resolveEqualHandsConflict = resolveEqualHandsConflict;
    function resolve_4_OfAKind(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList) {
        var maxnum = 0;
        var highestKickerCardNumber = 0;
        var playerWithHighestKickerCardNumber;
        for (var i = 0; i < playerWithConflicts.length; i++) {
            var count = 1;
            var highestCurrentPlayerKickerCardNumber = 0;
            var num = "";
            for (var j = 0; j < currentPlayerWinningCards[i].length - 1; j++) {
                for (var k = j + 1; k < currentPlayerWinningCards[i].length; k++) {
                    if (currentPlayerWinningCards[i][j].cardNumber == currentPlayerWinningCards[i][k].cardNumber) {
                        count++;
                    }
                }
                num = currentPlayerWinningCards[i][j].cardNumber;
                if (count == 4) {
                    break;
                }
                else {
                    count = 1;
                }
            }
            count = 0;
            for (var j = 0; j < currentPlayerWinningCards[i].length; j++) {
                count = 1;
                for (var k = 0; k < currentPlayerWinningCards[i].length; k++) {
                    if (currentPlayerWinningCards[i][j].cardNumber == currentPlayerWinningCards[i][k].cardNumber && j != k) {
                        count++;
                    }
                }
                if (count == 1 && getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber) > highestCurrentPlayerKickerCardNumber) {
                    highestCurrentPlayerKickerCardNumber = getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber);
                }
            }
            var numberValue = getCardIntegerValue(num);
            if (numberValue > maxnum) {
                maxnum = numberValue;
                highestKickerCardNumber = highestCurrentPlayerKickerCardNumber;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && highestCurrentPlayerKickerCardNumber > highestKickerCardNumber) {
                highestKickerCardNumber = highestCurrentPlayerKickerCardNumber;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && highestCurrentPlayerKickerCardNumber == highestKickerCardNumber) {
                winningPlayersList.push(playerWithConflicts[i]);
            }
        }
        return winningPlayersList;
    }
    gameLogic.resolve_4_OfAKind = resolve_4_OfAKind;
    function resolve_3_OfAKind(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList) {
        var maxnum = 0;
        var secondHighestKickerCardNumber = 0;
        var highestKickerCardNumber = 0;
        var playerWithHighestKickerCardNumber;
        for (var i = 0; i < playerWithConflicts.length; i++) {
            var count = 1;
            var highestCurrentPlayerKickerCardNumber = 0;
            var secondHighestCurrentPlayerKickerCardNumber = 0;
            var num = "";
            for (var j = 0; j < currentPlayerWinningCards[i].length - 1; j++) {
                for (var k = j + 1; k < currentPlayerWinningCards[i].length; k++) {
                    if (currentPlayerWinningCards[i][j].cardNumber == currentPlayerWinningCards[i][k].cardNumber) {
                        count++;
                    }
                }
                num = currentPlayerWinningCards[i][j].cardNumber;
                if (count == 3) {
                    break;
                }
                else {
                    count = 1;
                }
            }
            count = 0;
            for (var j = 0; j < currentPlayerWinningCards[i].length; j++) {
                count = 1;
                for (var k = 0; k < currentPlayerWinningCards[i].length; k++) {
                    if (currentPlayerWinningCards[i][j].cardNumber == currentPlayerWinningCards[i][k].cardNumber && j != k) {
                        count++;
                    }
                }
                if (count != 3 && getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber) > highestCurrentPlayerKickerCardNumber) {
                    secondHighestCurrentPlayerKickerCardNumber = highestCurrentPlayerKickerCardNumber;
                    highestCurrentPlayerKickerCardNumber = getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber);
                }
                else if (count != 3 && getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber) > highestCurrentPlayerKickerCardNumber) {
                    secondHighestCurrentPlayerKickerCardNumber = getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber);
                }
            }
            var numberValue = getCardIntegerValue(num);
            if (numberValue > maxnum) {
                maxnum = numberValue;
                highestKickerCardNumber = highestCurrentPlayerKickerCardNumber;
                secondHighestCurrentPlayerKickerCardNumber = highestCurrentPlayerKickerCardNumber;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && highestCurrentPlayerKickerCardNumber > highestKickerCardNumber) {
                highestKickerCardNumber = highestCurrentPlayerKickerCardNumber;
                secondHighestKickerCardNumber = secondHighestCurrentPlayerKickerCardNumber;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && highestCurrentPlayerKickerCardNumber == highestKickerCardNumber && secondHighestCurrentPlayerKickerCardNumber > secondHighestKickerCardNumber) {
                secondHighestKickerCardNumber = secondHighestCurrentPlayerKickerCardNumber;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && highestCurrentPlayerKickerCardNumber == highestKickerCardNumber && secondHighestCurrentPlayerKickerCardNumber == secondHighestKickerCardNumber) {
                winningPlayersList.push(playerWithConflicts[i]);
            }
        }
        return winningPlayersList;
    }
    gameLogic.resolve_3_OfAKind = resolve_3_OfAKind;
    function resolve_2_OfAKind(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList) {
        var maxnum = 0;
        var firstMaxGlobal = 0;
        var secondMaxGlobal = 0;
        var thirdMaxGlobal = 0;
        for (var i = 0; i < playerWithConflicts.length; i++) {
            var count = 1;
            var num = "";
            for (var j = 0; j < currentPlayerWinningCards[i].length - 1; j++) {
                for (var k = j + 1; k < currentPlayerWinningCards[i].length; k++) {
                    if (currentPlayerWinningCards[i][j].cardNumber == currentPlayerWinningCards[i][k].cardNumber) {
                        count++;
                    }
                }
                num = currentPlayerWinningCards[i][j].cardNumber;
                if (count == 2) {
                    break;
                }
                else {
                    count = 1;
                }
            }
            var firstMax = 0;
            var secondMax = 0;
            var thirdMax = 0;
            var numberValue = getCardIntegerValue(num);
            for (var j = 0; j < currentPlayerWinningCards[i].length; j++) {
                var currentNumber = getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber);
                if (currentNumber != numberValue) {
                    if (currentNumber > firstMax) {
                        thirdMax = secondMax;
                        secondMax = firstMax;
                        firstMax = currentNumber;
                    }
                    else if (currentNumber > secondMax) {
                        thirdMax = secondMax;
                        secondMax = currentNumber;
                    }
                    else if (currentNumber > thirdMax) {
                        thirdMax = currentNumber;
                    }
                }
            }
            if (numberValue > maxnum) {
                maxnum = numberValue;
                firstMaxGlobal = firstMax;
                secondMaxGlobal = secondMax;
                thirdMaxGlobal = thirdMax;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && firstMax > firstMaxGlobal) {
                firstMaxGlobal = firstMax;
                secondMaxGlobal = secondMax;
                thirdMaxGlobal = thirdMax;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && firstMax == firstMaxGlobal && secondMax > secondMaxGlobal) {
                secondMaxGlobal = secondMax;
                thirdMaxGlobal = thirdMax;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && firstMax == firstMaxGlobal && secondMax == secondMaxGlobal && thirdMax > thirdMaxGlobal) {
                thirdMaxGlobal = thirdMax;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (numberValue == maxnum && firstMax == firstMaxGlobal && secondMax == secondMaxGlobal && thirdMax == thirdMaxGlobal) {
                winningPlayersList.push(playerWithConflicts[i]);
            }
        }
        return winningPlayersList;
    }
    gameLogic.resolve_2_OfAKind = resolve_2_OfAKind;
    function findHighestCard(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList) {
        var maxnum = 0;
        for (var i = 0; i < playerWithConflicts.length; i++) {
            var maxNumber = 0;
            for (var j = 0; j < currentPlayerWinningCards[i].length; j++) {
                var numberValue = getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber);
                if (numberValue > maxNumber) {
                    maxNumber = numberValue;
                }
            }
            if (maxNumber > maxnum) {
                maxnum = maxNumber;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (maxNumber == maxnum) {
                winningPlayersList.push(playerWithConflicts[i]);
            }
        }
        return winningPlayersList;
    }
    gameLogic.findHighestCard = findHighestCard;
    function resolveHighestCard(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList) {
        var winningPlayerWinningCards = [];
        for (var i = 0; i < currentPlayerWinningCards.length; i++) {
            currentPlayerWinningCards[i].sort(sortNumber);
        }
        for (var i = 0; i < 5; i++) {
            var maxIthNumber = 0;
            for (var j = 0; j < playerWithConflicts.length; j++) {
                if (getCardIntegerValue(currentPlayerWinningCards[j][i].cardNumber) > maxIthNumber) {
                    maxIthNumber = getCardIntegerValue(currentPlayerWinningCards[j][i].cardNumber);
                    winningPlayersList = [];
                    winningPlayersList.push(playerWithConflicts[j]);
                    winningPlayerWinningCards = [];
                    winningPlayerWinningCards.push(currentPlayerWinningCards[j]);
                }
                else if (getCardIntegerValue(currentPlayerWinningCards[j][i].cardNumber) == maxIthNumber) {
                    winningPlayersList.push(playerWithConflicts[j]);
                    winningPlayerWinningCards.push(currentPlayerWinningCards[j]);
                }
            }
            if (winningPlayersList.length == 1 || i == 4) {
                return winningPlayersList;
            }
            else {
                playerWithConflicts = winningPlayersList;
                currentPlayerWinningCards = winningPlayerWinningCards;
                winningPlayersList = [];
            }
        }
        return winningPlayersList;
    }
    gameLogic.resolveHighestCard = resolveHighestCard;
    function resolve2Pairs(tableCards, playerWithConflicts, winningCardsList, conflictType, currentPlayerWinningCards, winningPlayersList) {
        var highestPair = 0;
        var secondHighestPair = 0;
        var maxKicker = 0;
        for (var i = 0; i < playerWithConflicts.length; i++) {
            var count = 1;
            var currentPlayerhighestPair = 0;
            var currentPlayerSecondHighestPair = 0;
            var currentPlayerKicker = 0;
            for (var j = 0; j < currentPlayerWinningCards[i].length - 1; j++) {
                for (var k = j + 1; k < currentPlayerWinningCards[i].length; k++) {
                    if (currentPlayerWinningCards[i][j].cardNumber == currentPlayerWinningCards[i][k].cardNumber) {
                        count++;
                    }
                }
                if (count == 2) {
                    var numberValue = getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber);
                    if (numberValue > currentPlayerhighestPair) {
                        currentPlayerSecondHighestPair = currentPlayerhighestPair;
                        currentPlayerhighestPair = numberValue;
                    }
                    else if (numberValue > currentPlayerSecondHighestPair) {
                        currentPlayerSecondHighestPair = numberValue;
                    }
                }
                else {
                    count = 1;
                }
            }
            count = 1;
            for (var j = 0; j < currentPlayerWinningCards[i].length; j++) {
                count = 1;
                for (var k = 0; k < currentPlayerWinningCards[i].length; k++) {
                    if (currentPlayerWinningCards[i][j].cardNumber == currentPlayerWinningCards[i][k].cardNumber && j != k) {
                        count++;
                    }
                }
                if (count == 1) {
                    currentPlayerKicker = getCardIntegerValue(currentPlayerWinningCards[i][j].cardNumber);
                    break;
                }
            }
            if (currentPlayerhighestPair > highestPair) {
                highestPair = currentPlayerhighestPair;
                secondHighestPair = currentPlayerSecondHighestPair;
                maxKicker = currentPlayerKicker;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (currentPlayerhighestPair == highestPair && currentPlayerSecondHighestPair > secondHighestPair) {
                secondHighestPair = currentPlayerSecondHighestPair;
                maxKicker = currentPlayerKicker;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (currentPlayerhighestPair == highestPair && currentPlayerSecondHighestPair == secondHighestPair && currentPlayerKicker > maxKicker) {
                maxKicker = currentPlayerKicker;
                winningPlayersList = [];
                winningPlayersList.push(playerWithConflicts[i]);
            }
            else if (currentPlayerhighestPair == highestPair && currentPlayerSecondHighestPair == secondHighestPair && currentPlayerKicker == maxKicker) {
                winningPlayersList.push(playerWithConflicts[i]);
            }
        }
        return winningPlayersList;
    }
    gameLogic.resolve2Pairs = resolve2Pairs;
    function getCardIntegerValue(cardNumberString) {
        switch (cardNumberString) {
            case "J": return 11;
            case "Q": return 12;
            case "K": return 13;
            case "A": return 14;
            default: return Number(cardNumberString);
        }
    }
    gameLogic.getCardIntegerValue = getCardIntegerValue;
    function sortNumber(a, b) {
        if (getCardIntegerValue(a.cardNumber) > getCardIntegerValue(b.cardNumber)) {
            return -1;
        }
        else if (getCardIntegerValue(a.cardNumber) < getCardIntegerValue(b.cardNumber)) {
            return 1;
        }
        else {
            return 0;
        }
    }
    gameLogic.sortNumber = sortNumber;
    function forSimpleTestHtml() {
    }
    gameLogic.forSimpleTestHtml = forSimpleTestHtml;
})(gameLogic || (gameLogic = {}));
//# sourceMappingURL=gameLogic.js.map
;
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
;
//# sourceMappingURL=aiService.js.map