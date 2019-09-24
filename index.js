
let timeoutControl;

$( window ).on( "load", function(){

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.shuffle = function () {
  return this.sort(() => Math.random() - 0.5);
};

let skipTrue = true;


let state = {

	emojiArr: [
		"👓",
		"📖",
		"🦑",
		"🐠",
		"🐙",
		"🌊",
		"📩",
		"👇",
		"⏬",
		"🤣",
		"📸",
		"😀",
		"💯",
		"🔥"

	],

	introTxt: [
		"Hey, you’re not Raya! Name yourself, please.",
		"Oh, hello there. I don’t think we’ve met. What is your name?",
		"Wait, what? Where am I? Who are you?",
		"Ooh, a new friend! Nice to meet you. What should I call you?",
		"Hi there. You’re new. What's your name?",
		"Who’s there? Oh, hello. Who is there?",
		"Hi, you must be a friend of Raya’s. What is your name?",
		"Yay, a new friend! What should I call you?",
		"Let’s go on an adventure! But first, tell me your name:",
		"Hey, I’ve never seen you before. What's your name?",
		"What’s your name?",
		"Greetings. Great to meet you. What was your name again?"
	],

	userName: "Raya",

	nouns: [],

	verbs: [],

	keyWordArr: [],

	funQuestionTxt: [
		"{{userName}}: Where is your favorite place you’ve visited?",
		"What did you want to be when you were a kid, {{userName}}?",
		"{{userName}}, where do you live?",
		"What place have you always wanted to visit, {{userName}}?",
		"Hey {{userName}}, if you were an animal what would it be?",
		"Hey {{userName}}, if you had a super power what would it be?"
	],

	thankYouTxt: [
		"{{keyWord}}? Interesting, {{userName}}.",
		"{{keyWord}}! Thanks for sharing that, {{userName}}.",
		"{{keyWord}}... Thank you so much for sharing that, {{userName}}.",
		"{{keyWord}}. That's fascinating. Thanks so much for letting me know.",
		"{{keyWord}}, how fascinating! {{userName}}: Thank you so much for letting me know that.",
		"Very, very fascinating: {{keyWord}}. Thank you very much for that, {{userName}}."
	],

	genQuestionTxt: [
		"What is one song that you never understood but would recommend?",
		"What is your favorite word that is simply fake?",
		"What is your favorite cheese distraction?",
		"What would your cat be like?",
		"If you could go back in time, what would your social media post be?",
		"What's a song that everyone should hear in their lifetime?",
		"What is your favorite memory of whistling and why?",
		"What is the most money you ever saw on the internet?",
		"What is the most amazing way you've made $1?",
		"What are the biggest stereotypes about computers?",
		"What did you actually think of the world?",
		"What did you think you were doing on the internet but turned out not to be?"
	],

	picQuestionTxt: [
		"{{userName}}: Show me a picture of something cool. I need some inspiration.",
		"Show me what you look like, {{userName}}!",
		"{{userName}}, will you show me a picture of your favorite thing in the place you're in?"
	],

	picResponse: ["Sorry, I think something went wrong."],

	collabTxt: [
		"I think I'd like to collaborate with you, {{userName}}, if you'll let me. Write the beginning of a story for me, and I'll finish it:"
	],

	collabResponse: ["Sorry, I'm quite sure something is wrong now. Please try again later!"],

	endTxt: [
		"Oh, I think I hear Raya! Just a moment. Let's talk again soon."
	],


};


var displayButtons = function(nButtons, symbolNameArray){
	for (let i=0; i<nButtons; i++) {
		$('body').append()
	}
}


var main = function(txt) {
	window.clearTimeout(timeoutControl);

	$('#userTxtInputLabel').text(txt);

	var c = document.getElementById('myCanvas');
	c.height=1080;
	var x=c.getContext('2d');

	let millis_start = Date.now();

	let sentences = nlp(txt).sentences().out("array");

	var u=function(){




		// millis_start = t;
		// main

		var n = 2e3;
		c.width=1920;

		// var canvas = document.getElementById("canvas");
		// var ctx = canvas.getContext("2d");
		x.fillStyle = "#96194c"; 
		x.fillRect(0, 0, c.width, c.height);

		for(let i=0;i<32;i++) {

			for(let j=0;j<16;j++) {


				// let t = function(){ return Date.now() - millis_start; } ;
				(function(){


				// var blackText = true;
				// if (Math.random() > 0.5){
				// 	blackText = false;
				// }

				// var substringChunkLen = 16;
				// var substringStart = substringChunkLen*i;
				// var substringEnd = substringStart+substringChunkLen;

				let t = (Date.now() - millis_start) / 1000.0;

				var p = Math.cos(i);
				var q = Math.sin(p*j);
				var y = Math.tan(t*q*p);
				x.font = "64px Lora";
				var rVal = p*255;
				var gVal = q*255;
				var bVal = q*255;
				x.fillStyle = 'rgba('+rVal+','+gVal+','+bVal+','+(t/32.0+q/256.0)+')';
				x.fillText(sentences[j%sentences.length],n*p*y*p/2+n/2,n*q*y*q/4+n/4,2e3*y*p);					
			})();

				// x.
			}
		}

	}

	for (let k = 0, p = Promise.resolve(); k < 65535; k++) {
	    p = p.then(_ => new Promise(resolve =>
	        timeoutControl = window.setTimeout(function () {
	            // u(k);
	            u();
	            resolve();
	        },16.666)
	    ));
	}

}


function randomChoice(arr) {
	return arr[Math.floor(Math.random()*arr.length)]
}

var goFS = document.getElementById("goFS");


let eventLoopArr = [
	"introTxt", "funQuestionTxt",
	"thankYouTxt", "genQuestionTxt", "thankYouTxt",
	"picQuestionTxt", "picResponse", "thankYouTxt",
	"collabTxt", "collabResponse", "thankYouTxt",
	"endTxt"
].reverse();

let ifTrueSkip = function() {

	if (state.curKey === "thankYouTxt") {
		if (state.keyWordArr.length === 0) {
			return true;
		}
		else {
			return false;
		}
	}

	if (state.curKey === "endTxt") {
		return "END";
	}

	else { return false };
}

let replaceTerms = function(strToRepl) {

	replDict = {
		"userName": state.userName
	}

	if (state.keyWordArr.length > 1) {
		replDict["keyWord"] = state.keyWordArr.pop().toProperCase();
	}

	else if (state.keyWordArr.length > 2) {
		replDict["keyWord"] = (`${state.keyWordArr.pop()} & ${state.keyWordArr.pop()}`).toProperCase();
	}

	else if (state.keyWordArr.length > 3) {
		replDict["keyWord"] = (`${state.keyWordArr.pop()}, ${state.keyWordArr.pop()}, & ${state.keyWordArr.pop()}`).toProperCase();
	}

	let newStr = strToRepl;

	for (let [key, value] of Object.entries(replDict)) {
		newStr = newStr.replace(`{{${key}}}`, value);
	}

	return newStr;
}

function updateState() {
	$('#goGoGo').text( state.emojiArr.pop() )

	let userResponseNlp = nlp( $("#userTxtInput").val() );

	console.log(userResponseNlp.out('string'));

	$('#userTxtInput').val("");

	let userResponseNlpNorm = userResponseNlp.normalize( parentheses = true, possessive = true, plurals = true, verbs = true, honorifics = true );

	console.log(userResponseNlpNorm.out('string'));

	let newNouns = userResponseNlpNorm.nouns().out("array");

	if (Array.isArray(newNouns) && newNouns.length > 0) {
		state.nouns.push(...newNouns);
		state.keyWordArr.push(...newNouns);
	}

	let newVerbs = userResponseNlpNorm.verbs().toGerund().out("array").map(function(x){ return x.split(' ').pop(); });

	if (Array.isArray(newVerbs) && newVerbs.length > 0) {
		state.verbs.push(...newVerbs);
		state.keyWordArr.push(...newVerbs);
	}

	state.keyWordArr.shuffle();

	if (state.curKey === "introTxt") {
		state.userName = userResponseNlp.people().out("string").trim().toProperCase();

		if (!state.userName && Array.isArray(newNouns) && newNouns.length > 0) {
			state.userName = newNouns[newNouns.length-1];
		}

		if (!state.userName) {
			console.log( 'candidate userName:', userResponseNlpNorm.out('string') )
			state.userName = userResponseNlpNorm.out("string").trim().split(' ').pop().toProperCase();
		}

		if (!state.userName) {
			state.userName = "Error";
		}
	}

	state.curKey = eventLoopArr.pop();	
	let curTxt = replaceTerms( state[ state.curKey ].pop() );
	main( curTxt );
}

function buttonCallback() {
	
	updateState();

	// if (ifTrueSkip()) {
	// 	updateState();
	// }

	// while ( ifTrueSkip() ) {
	// 	updateState();
	// }


	// let skipTrue = ifTrueSkip();

	// if (!skipTrue) {
	// 	updateState();
	// }

	// skipTrue = ifTrueSkip();

	// while (skipTrue) {

	// 	updateState();

	// 	console.log(state);

	// 	skipTrue = ifTrueSkip();

	// }

	// if (skipTrue === "END") {

	// 	// TODO END
	// 	// end();

	// 	return;

	// }


}

$('#goGoGo').text( state.emojiArr.pop() );
$('#goGoGo').click(buttonCallback);

goFS.addEventListener("click", function() {
  
	$('#'+"fullScreenControl").hide();
	document.body.requestFullscreen();
	$('#'+"text-input-box").fadeIn();
	$('#goGoGo').fadeIn();

	state.curKey = eventLoopArr.pop();
	state.introTxtChoice = randomChoice(state.introTxt);
	main( state.introTxtChoice );

}, false);

main("Hello World.");


});