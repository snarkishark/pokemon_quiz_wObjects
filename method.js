$(document).ready(function(){
	$("#theQuiz").hide();
	newQuiz = Object.create(Quiz);

	$(".start.tile").on("click",function(e){
		$("#theQuiz").show();
		$("#start").hide();
		newQuiz.showQ(0);
	});
	/*put information in the scoreboard and current question*/
	$(".currentQuestion").text("1");
	$(".totalQuestions").text(questions.length);
});

/*set initial values to 0*/
var correct = 0;
var incorrect = 0;
var current=0;

/*Question set*/
var questions = [
	{
		text: "What is Dragonite's hidden ability?",
		choices: ["Inner Focus","Multiscale","Marvel Scale","Moxie"],
		correctAnswerIndex: 1				
	},
	{
		text:"Which of Eevee's evolutions has the highest Special Defense?",
		choices: ["Flareon","Jolteon","Espeon","Umbreon"],
		correctAnswerIndex:3
	},
	{
		text:"Which of Japan's islands is Hoenn based on?",
		choices: ["Honshu","Shikoku","Hokkaido","Kyushu"],
		correctAnswerIndex:3
	},
	{
		text:"Which Pokemon must be at the back of the part to enter the Sealed Chamber?",
		choices: ["Relicanth","Wailord","Kingdra","Regice"],
		correctAnswerIndex:1,
	},
	{
		text:"Which of the following Pokemon may not be encountered while soaring in the sky?",
		choices: ["Taillow","Murkrow","Pidove","Drifloon"],
		correctAnswerIndex:2
	},
	{
		text:"Castelia City's gym leader specializes in which type?",
		choices:["Bug","Grass","Flying","Electric"],
		correctAnswerIndex:0
	},
	{
		text:"Which of the following Pokemon is only available in Pokemon Gold (and not Silver)?",
		choices:["Mantine","Ledyba","Meowth","Magnemite"],
		correctAnswerIndex:0
	},
	{
		text:"In which generation was record mixing removed?",
		choices:["III","IV","V","VI"],
		correctAnswerIndex:2	
	},
	{
		text:"Who is the only professor in the main series of games to not wear a lab coat in their official art?",
		choices:["Professor Rowan","Professor Juniper","Professor Sycamore","Professor Kukui"],
		correctAnswerIndex:0
	},
	{
		text:"Which route number was never used as a Cycling Road location?",
		choices:["17","110","126","206"],
		correctAnswerIndex:2
	}
];

/*quiz object*/
var Quiz = {
	current:current,
	currentQuestion: current+1,
	question: questions[current],
	/*try to progress through questions using a method*/
	showQ: function(){
		if(current<questions.length){
			$("ul").empty();//clear out last set of questions/answers
			$(".text").text(this.question.text);//set new question-- This is where I am having trouble; it only works once.
			/*populate choices*/
			for (var i =0; i<this.question.choices.length; i++){
				$("ul").append("<li>"+this.question.choices[i]+"</li>");
				$("ul li").addClass("tile");
				if (this.question.correctAnswerIndex == i){
						$("ul li").last().addClass("correctAnswer");//set correct answer
				};
			};
			/*add listener for answers*/
			$("li").on("click",function(e){
				checkAnswer(this);
			});
		}else{
			wait(restart);//restart at end of quiz
		}
	},
	
};
/*checks answers and increments score whether the user was correct or not.
Pauses before progressing to the next question.*/
function checkAnswer(li){
	if ($(li).hasClass("correctAnswer")){
		correct++;
		$(li).addClass("green");
		$(".correct").text(correct);

	}else{
		incorrect++;
		$(li).addClass("red");
		$(".correctAnswer").addClass("green");
		$(".incorrect").text(incorrect);

	}
	/*update where we are in the question set*/
	current+=1;	
	$(".currentQuestion").text(current);
	newQuiz.current = current;
	newQuiz.question = questions[current];	
	wait(newQuiz.showQ);//show next question
	
};
/*add a delay so user can see the right answer*/
function wait(f){
	console.log(f);
	timeoutID = window.setTimeout(f, 1500);
};
/*show score and offer to start a fresh game*/
function restart(){
	$("#start").show();
	$("#theQuiz").hide();
	correct = 0;
	incorrect = 0;
	current=0;
	$("#start h1").text("You got "+correct+" out of "+questions.length+" correct answers!");
	$(".start.tile").text("Play Again?");
}