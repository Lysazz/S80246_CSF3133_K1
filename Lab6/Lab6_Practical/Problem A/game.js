
/* =================================
   Rock, Paper, Scissors Game
   JavaScript Functionality
================================= */

// Variables to store game data
let playerName = "";
let wins = 0;
let losses = 0;
let draws = 0;
let round = 0;
let gameStarted = false;

// Array to store game results
let results = [];

// Array of choices
const choices = ["rock", "paper", "scissors"];

// Start Game Function
function startGame() {

    // Get player's name
    playerName = document.getElementById("playerName").value;

    // Check if name is empty
    if (playerName.trim() === "") {
        alert("Please enter your name.");
        return;
    }

    // Reset previous game data
    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;
    results = [];

    // Update welcome message
    document.getElementById("welcome").innerHTML =
        "Welcome, " + playerName + "!";

    // Display start date and time
    document.getElementById("startTime").innerHTML =
        "Game Started: " + new Date();

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Clear previous history
    document.getElementById("history").innerHTML =
        "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";

    document.getElementById("result").innerHTML =
        "Choose your move!";

    document.getElementById("summary").innerHTML = "";

    // Allow the game to start
    gameStarted = true;
}

// Get Computer Choice Function
function getComputerChoice() {

    // Generate a random number from 0 to 2
    let randomIndex = Math.floor(Math.random() * 3);

    // Return random choice
    return choices[randomIndex];
}

// Play Round Function
function playRound(playerChoice) {

    // Check whether game has started
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    // Get computer choice
    let computerChoice = getComputerChoice();

    // Update images
    document.getElementById("playerImg").src =
        playerChoice + ".png";

    document.getElementById("computerImg").src =
        computerChoice + ".png";

    // Increase round number
    round++;

    // Decide the winner
    let result;

    if (playerChoice === computerChoice) {

        result = "Draw";
        draws++;

    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {

        result = "Win";
        wins++;

    } else {

        result = "Lose";
        losses++;

    }

    // Store result in array
    results.push(result);

    // Display result and change colour
    let resultElement = document.getElementById("result");

    resultElement.innerHTML =
        playerName + " chose " + playerChoice +
        " | Computer chose " + computerChoice +
        " | You " + result + "!";

    if (result === "Win") {
        resultElement.style.color = "green";
    } else if (result === "Lose") {
        resultElement.style.color = "red";
    } else {
        resultElement.style.color = "grey";
    }

    // Update scoreboard
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Add new row to history table
    document.getElementById("history").innerHTML +=
        "<tr>" +
        "<td>" + round + "</td>" +
        "<td>" + playerChoice + "</td>" +
        "<td>" + computerChoice + "</td>" +
        "<td>" + result + "</td>" +
        "</tr>";
}

// Show Summary Function
function showSummary() {

    if (!gameStarted || results.length === 0) {
        alert("Please play at least one round first.");
        return;
    }

    // Count total wins using for loop
    let totalWins = 0;

    for (let i = 0; i < results.length; i++) {

        if (results[i] === "Win") {
            totalWins++;
        }

    }

    // Calculate win percentage
    let percentage = Math.round(
        (totalWins / results.length) * 100
    );

    // Display summary
    document.getElementById("summary").innerHTML =
        "You played " + results.length +
        " rounds and won " + percentage + "%";
}

// Reset Game Function
function resetGame() {

    // Reset all scores
    wins = 0;
    losses = 0;
    draws = 0;
    round = 0;

    // Empty results array
    results = [];

    // Stop the game
    gameStarted = false;

    // Reset scoreboard
    document.getElementById("wins").innerHTML = 0;
    document.getElementById("losses").innerHTML = 0;
    document.getElementById("draws").innerHTML = 0;

    // Clear history table
    document.getElementById("history").innerHTML =
        "<tr><th>Round</th><th>You</th><th>Computer</th><th>Result</th></tr>";

    // Clear result and summary
    document.getElementById("result").innerHTML = "";
    document.getElementById("summary").innerHTML = "";

    // Reset images
    document.getElementById("playerImg").src = "rock.png";
    document.getElementById("computerImg").src = "rock.png";

    // Clear start time
    document.getElementById("startTime").innerHTML = "";

    // Clear welcome message
    document.getElementById("welcome").innerHTML = "";

    // Clear player name
    document.getElementById("playerName").value = "";
}
