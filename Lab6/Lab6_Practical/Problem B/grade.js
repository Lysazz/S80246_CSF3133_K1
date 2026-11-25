
/*
ERROR IDENTIFICATION - PROBLEM B

Error 1 (grade.html, Line 9):
Missing "return" in onsubmit="checkMark()".
Correct: onsubmit="return checkMark()".

Error 2 (grade.html, Line 17):
Function name showtable() does not match showTable().
Correct: onclick="showTable()".

Error 3 (grade.html, Line 19):
Incorrect JavaScript filename "grades.js".
Correct: "grade.js".

Error 4 (grade.js, Line 5):
Assignment operator (=) used instead of comparison.
Correct: name.trim() === "".

Error 5 (grade.js, Line 9):
Incorrect function name isNan().
Correct: isNaN().

Error 6 (grade.js, Line 14):
Logical AND (&&) used instead of OR (||).
Correct: mark < 0 || mark > 100.

Error 7 (grade.js, Line 28):
Incorrect method getElementByID().
Correct: getElementById().

Error 8 (grade.js, Line 30):
Incorrect CSS property style.colour.
Correct: style.color.

Error 9 (grade.js, Line 31):
Returning true submits and reloads the page.
Correct: return false.

Error 10 (grade.js, Line 38):
Loop starts at i = 1, skipping grade A.
Correct: start at i = 0.

Error 11 (grade.js, Line 42):
Incorrect property innerHtml.
Correct: innerHTML.

Additional improvements:
- Validate empty mark.
- Validate non-numeric mark.
- Display different colours for grades.
- Generate a random mark.
- Display date and time.
*/

// Check Mark Function
function checkMark() {

    // Get form input values
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Validate empty name
    if (name.trim() === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Validate empty mark
    if (mark.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Validate non-numeric mark
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark into a number
    mark = Number(mark);

    // Validate mark range
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine student grade
    let grade;

    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Display grade result
    document.getElementById("result").innerHTML =
        name + " got grade " + grade;

    // Change result colour based on grade
    if (grade === "A" || grade === "B") {
        document.getElementById("result").style.color = "green";
    } else if (grade === "C") {
        document.getElementById("result").style.color = "orange";
    } else {
        document.getElementById("result").style.color = "red";
    }

    // Display date and time
    document.getElementById("checkTime").innerHTML =
        "Checked on: " + new Date();

    // Prevent form from refreshing the page
    return false;
}

// Show Grade Table Function
function showTable() {

    // Arrays for grades and mark ranges
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Create table header
    let tableHTML =
        "<table>" +
        "<tr><th>Grade</th><th>Mark Range</th></tr>";

    // Display all grades using for loop
    for (let i = 0; i < grades.length; i++) {

        tableHTML +=
            "<tr><td>" + grades[i] + "</td>" +
            "<td>" + ranges[i] + "</td></tr>";
    }

    // Close table
    tableHTML += "</table>";

    // Display grade table
    document.getElementById("tableContainer").innerHTML =
        tableHTML;
}

// Random Mark Function
function randomMark() {

    // Generate random whole number from 0 to 100
    let randomNumber = Math.floor(Math.random() * 101);

    // Display random mark in input field
    document.getElementById("mark").value = randomNumber;
}
