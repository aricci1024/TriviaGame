
//======================= Questions and global variables ==================================


var questions = [{
	text: "What type of rocks from from the crystalization and consolidation of magma?",
	options: ["Sedimentary", "Igneous", "Metamoprphic", "Basalt"],
	answer: 1
    },
    {
	text: "Which of these is not a fault boundry?",
	options: ["Transform", "Convergent", "Ridge", "Divergent"],
	answer: 2
    },
    {
	text: "What law states states that in undeformed stratigraphic sequences, the oldest strata will be at the bottom of the sequence?",
	options: ["Cross-cutting relationships", "Uniformitarianism", "Original Horizontality", "Superposition"],
	answer: 3
    },
    {
	text: "How were the Hawaiian Islands created?",
	options: ["Hot Spot", "Pillow Basalt", "Subduction zone", "Coral reef"],
	answer: 0
    },
    {
	text: "What was the last major supercontinent to form?",
	options: ["Gondwana", "Pangaea", "Pannotia", "Rodinia"],
	answer: 1
}];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var intervalId; 
var answered; 
var userSelect;


//========================== on.click events ==========================================


$("#startBtn").on("click", function(){
	$("#startBtn").hide();
	newGame();
});

$("#startOverBtn").on("click", function(){
	$("#startOverBtn").hide();
	newGame();
});


//========================= starts a new game =============================


function newGame(){
    //resets the user responses and the divs
	$("#game-over").empty();
	$("#correctAnswers").empty();
	$("#incorrectAnswers").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
    unanswered = 0;
    // call the new question function to display a new question and start the game
	newQuestion();
}

//=====================the countdown timer for each question page ====================================


function timer(){
    count = 10;
	$('#show-number').html('<h3>Time Remaining: ' + count + '</h3>');
	//decrement timer
	intervalId = setInterval(decrement, 1000);
}

function decrement(){
	count--;
	$('#show-number').html('<h3>Time Remaining: ' + count + '</h3>');
	if(count === 0){
		clearInterval(intervalId);
		answered = false;
		transitionPage();
	}
}
    

//======================== displays the question ==================================================


function newQuestion(){
    $("#status").empty();
	$("#answerReveal").empty();
	answered = true;
	
	//displays the new question
    $("#question").html("<h2>" + questions[currentQuestion].text + "</h2>");
    
    //displays the answer choices
    for(var i = 0; i < questions[i].options.length; i++){
        //creates a new div
        var choices = $("<div>");
        //adds the option to the div
        choices.text(questions[currentQuestion].options[i]);
        //creates a an attribute to caputre the option
		choices.attr({"data-index": i });
        choices.addClass("thisChoice");
        //append and display answer options
		$("#options").append(choices);
	}
    timer();
    
	//once an answer is clicked, stop the timer and move to the transition page
	$(".thisChoice").on("click",function(){
		userSelect = $(this).data("index");
		clearInterval(intervalId);
		transitionPage();
	});
}


//=========================== after user picks or time runs out changes to the next question=========================================================================


function transitionPage(){
    //clears the question page and the options
	$("#currentQuestion").empty();
	$(".thisChoice").empty();
	$("#question").empty();

    //variables to be used to display the answer as text
	var AnswerText = questions[currentQuestion].options[questions[currentQuestion].answer];
	var AnswerIndex = questions[currentQuestion].answer;
    
    //checks to see correct, incorrect, or unanswered
    //for correct answers, add to correct count and display message
	if((userSelect === AnswerIndex) && (answered === true)){
        correctAnswer++;
        $("#status").html("Correct!!!!");
    //for wrong answers, adds to incorrect count and displays message and correct answer
	} else if((userSelect != AnswerIndex) && (answered === true)){
        incorrectAnswer++;
        $("#status").html("Sorry, wrong answer!");
		$("#answerReveal").html("The correct answer was: " + AnswerText);
    //if time runs out before answer is chosen, add to unanswered and display message and correct answer
    } else{
        unanswered++;
        $("#status").html("You ran out of time!");
		$("#answerReveal").html("The correct answer was: " + AnswerText);
	}
    
    //amount of time that the above info is displayed befored we display the next question
	if(currentQuestion === (questions.length-1)){
		setTimeout(gameOver, 3000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 3000);
	}	
}


//==========================shows how the user did ====================================


function gameOver(){
    //clear div with values from the previous game
	$("#show-number").empty();
	$("#status").empty();
    $("#answerReveal").empty();
    //shows game over text
	$("#game-over").html("Game Over! Check out your results below!");
    //shows the number of correct answers
    $("#correctAnswers").html("Correct Answers: " + correctAnswer);
    //shows the number of incorrect answers
    $("#incorrectAnswers").html("Incorrect Answers: " + incorrectAnswer);
    //shows the number of unanswered questions
    $("#unanswered").html("Unanswered: " + unanswered);
    //button to reset the game
    $("#startOverBtn").addClass("reset");
	$("#startOverBtn").show();
	$("#startOverBtn").html("Click to replay");
}