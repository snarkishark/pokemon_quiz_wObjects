$(document).ready(function(){
	
	$("#theQuiz").hide();
	$(".start.tile").on("click",function(e){
		console.log("should start a new game");
		$("#start").hide();
		newQuiz = Object.create(Quiz);
		showQuestion(questions[0]);		
	});
	
	$(".currentQuestion").text("1");
	$(".totalQuestions").text(questions.length);	
});

var correct = 0;
var incorrect = 0;
var current=0;
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

var Quiz = {
	current:"",
	currentQuestion: current+1,
	question: questions[current],	
};
function showQuestion(question){
	$("#theQuiz").show();
	if(current<questions.length){
			currentQuestion = current+1;
			$(".currentQuestion").text(currentQuestion);
			$("ul").empty();
			$(".text").text(question.text);
			for (var i =0; i<question.choices.length; i++){
				$("ul").append("<li>"+question.choices[i]+"</li>");
				$("ul li").addClass("tile");
				if (question.correctAnswerIndex == i){
					$("ul li").last().addClass("correctAnswer");
			};
		};
		$("li").on("click",function(e){
		checkAnswer(this);
		});
	}else{
		wait(restart);
	}

}
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
	
	current+=1;	
	if (current < (questions.length - 1)){
	$(".currentQuestion").text(current);}

	newQuiz.current = current;
	newQuiz.question = questions[current];	
	// console.log(newQuiz.question);

	wait(showQuestion,newQuiz.question);
};

function wait(f,param){
	timeoutID = window.setTimeout(f, 500, param);
};

function restart(){
	$("#start").show();
	$("#theQuiz").hide();
	correct = 0;
	incorrect = 0;
	current=0;
	$("#start h1").text("You got "+correct+" out of "+questions.length+" correct answers!");
	$(".start.tile").text("Play Again?");
	
}