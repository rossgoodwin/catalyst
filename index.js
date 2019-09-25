
let timeoutControl;

$( window ).on( "load", function(){

$("#loading").fadeOut(2048);

// Random Number Generator
// https://stackoverflow.com/questions/424292/seedable-javascript-random-number-generator

function RNG(seed) {
  // LCG using GCC's constants
  this.m = 0x80000000; // 2**31;
  this.a = 1103515245;
  this.c = 12345;

  this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
}
RNG.prototype.nextInt = function() {
  this.state = (this.a * this.state + this.c) % this.m;
  return this.state;
}
RNG.prototype.nextFloat = function() {
  // returns in range [0,1]
  return this.nextInt() / (this.m - 1);
}
RNG.prototype.nextRange = function(start, end) {
  // returns in range [start, end): including start, excluding end
  // can't modulu nextInt because of weak randomness in lower bits
  var rangeSize = end - start;
  var randomUnder1 = this.nextInt() / this.m;
  return start + Math.floor(randomUnder1 * rangeSize);
}
RNG.prototype.choice = function(array) {
  return array[this.nextRange(0, array.length)];
}

// var randomSeed = Math.ceil(Math.random()*65536);
var rng = new RNG(parseInt(Date.now()));

// End of Random Number Generator


// TTS
// https://github.com/mdn/web-speech-api/blob/master/speak-easy-synthesis/script.js

var synth = window.speechSynthesis;

// var inputForm = document.querySelector('form');
// var inputTxt = document.querySelector('.txt');
// var voiceSelect = document.querySelector('select');

// var pitch = document.querySelector('#pitch');
// var pitchValue = document.querySelector('.pitch-value');
// var rate = document.querySelector('#rate');
// var rateValue = document.querySelector('.rate-value');

// var voices = [];

function populateVoiceList() {
  var voices = synth.getVoices().sort(function (a, b) {
      const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
      if ( aname < bname ) return -1;
      else if ( aname == bname ) return 0;
      else return +1;
  });
  var candidateVoices = voices.filter(function(v){
  	return v.lang.substr(0,2).toLowerCase() === 'en';
  });

  console.log(candidateVoices);

  return rng.choice(candidateVoices);
  // voiceSelect.innerHTML = '';
  // for(i = 0; i < voices.length ; i++) {
  //   var option = document.createElement('option');
  //   option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
  //   if(voices[i].default) {
  //     option.textContent += ' -- DEFAULT';
  //   }

  //   option.setAttribute('data-lang', voices[i].lang);
  //   option.setAttribute('data-name', voices[i].name);
  //   voiceSelect.appendChild(option);
  // }
  // voiceSelect.selectedIndex = selectedIndex;
}

// populateVoiceList();

// if (speechSynthesis.onvoiceschanged !== undefined) {
//   speechSynthesis.onvoiceschanged = populateVoiceList;
// }

function speak(txtToSpeak){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    var utterThis = new SpeechSynthesisUtterance(txtToSpeak);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    // var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
    // for(i = 0; i < voices.length ; i++) {
    //   if(voices[i].name === selectedOption) {
    //     utterThis.voice = voices[i];
    //     break;
    //   }
    // }
    utterThis.voice = populateVoiceList();
    // utterThis.pitch = pitch.value;
    // utterThis.rate = rate.value;
    synth.speak(utterThis);
}

// speak("Testing. Testing. 1. 2. 3. Testing. Testing. 1. 2. 3.")
// End TTS

function randomIntFromInterval(min,max){
    return rng.nextRange(min, max+1);
}

function typeWrite(span, text){
  $('#'+span).addClass('cursor');
  // var text = $('#'+span).text();
  var randInt = 0;
  for (var j = 0; j < text.length; j++) {
    randInt += parseInt(randomIntFromInterval(16,64));
    var typing = window.setTimeout(function(y){
      $('#'+span).append(text.charAt(y));
    },randInt, j);
  };
  window.setTimeout(function(){
    $('#'+span).removeClass('cursor');
  },randInt+2500);
}

let windowWidthPx = window.innerWidth;
let windowHeightPx = window.innerHeight;

let bgImg = document.getElementById('bg');
bgImg.width = windowWidthPx;

let onWindowResize = function(){

	windowWidthPx = window.innerWidth;
	windowHeightPx = window.innerHeight;


	let bgImg = document.getElementById('bg');
	bgImg.width = windowWidthPx;

	$('canvas').css('right', (494*(windowWidthPx/1920))+'px');
	$('canvas').css('top', (172*(windowWidthPx/1920))+'px');

}


onWindowResize();

// $('canvas').css('right', (494*(windowWidthPx/1920))+'px');
// $('canvas').css('top', (175*(windowWidthPx/1920))+'px');
// bgImg.height = windowHeightPx;



// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
String.prototype.toProperCase = function () {
    return this.charAt(0).toUpperCase() + this.substr(1);
};

Array.prototype.shuffle = function () {
  return this.sort(() => rng.nextFloat() - 0.5);
};

let skipTrue = true;


let state = {

	fullScreen: false,

	emojiArr: [
		"👓",
		"📖",
		"🦑",
		"🐠",
		"🐙",
		"🌊",
		"📸",
		"👇",
		"⏬",
		"🤣",
		"📩",
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
		"{{keyWord}}. That's fascinating, {{userName}}. Thanks for letting me know.",
		"{{keyWord}}, how fascinating! {{userName}}: Thank you so much for letting me know that.",
		"Very, very fascinating: {{keyWord}}. Thank you very much for that, {{userName}}."
	],

	genQuestion2Txt: [
		"What is one song that you never understood but would recommend?",
		"What is your favorite word that is simply fake?",
		"What is your favorite cheese distraction?",
		"What would your cat be like?",
		"If you could go back in time, what would your social media post be?",
		"What's a song that everyone should hear in their lifetime?"
	],

	genQuestionTxt: [
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

	picResponseNow: false,

	picResponse: ["Sorry, I think something went wrong."],

	collabTxt: [
		"I think I'd like to collaborate with you, {{userName}}, if you'll let me. Write the beginning of a poem for me, and I'll finish it:"
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

	onWindowResize();

	if ( state.curKey === "thankYouTxt" || state.curKey === "picResponse" || state.curKey === "collabResponse" ) {
		$('#outputDiv').fadeIn();
		// $('#text-input-box').fadeIn();
		$('#goGoGo').focus();
		typeWrite('outputSpan', txt);
		$('#userTxtInputLabel').text("");
		speak(txt);
	}
	else {
		if (state.fullScreen) $('#text-input-box').fadeIn();
		$('#userTxtInputLabel').text(txt);
		speak(txt);
	}

	var c = document.getElementById('myCanvas');
	c.height = 556*(windowWidthPx/1920);

	if (state.fullScreen) {
		c.height = window.innerHeight*2;
	}

	var x=c.getContext('2d');

	let millis_start = Date.now();

	let sentences = nlp(txt).sentences().out("array");

	var u=function(){

		var n = 954*(windowWidthPx/1920);
		c.width = n;

		if (state.fullScreen) {
			n = window.innerWidth;
			c.width = n;
		}

		x.fillStyle = "#96194c"; 
		x.fillRect(0, 0, c.width, c.height);

		for(let i=0;i<16;i++) {

			for(let j=0;j<8;j++) {

				(function(){

					let t = (Date.now() - millis_start) / 1000.0;

					t /= 8;

					var p = Math.cos(i);
					var q = Math.sin(p*j);
					var y = Math.tan(t*q*p);
					x.font = "64px Geomanist";
					var rVal = p*255;
					var gVal = q*255;
					var bVal = q*255;
					x.fillStyle = 'rgba('+rVal+','+gVal+','+bVal+','+((t/32.0+q/256.0)*8)+')';
					x.fillText(sentences[j%sentences.length],n*p*y*p/2+n/2,n*q*y*q/4+n/4,2e3*y*p);					
				})();

				// x.
			}
		}

	}

	var u2 = function() {
		var n = 954*(windowWidthPx/1920);
		c.width = n;

		if (state.fullScreen) {
			n = window.innerWidth;
			c.width = n;
		}

		x.fillStyle = "#96194c"; 
		x.fillRect(0, 0, c.width, c.height);

		for(let p=0;p<512;p++) {
			(function(){

				let t = (Date.now() - millis_start) / 1000.0;
				t /= 32;


				let i=Math.cos(p);
				let j=Math.tan(t/i);
				let k=1/Math.sin(t*i);

				x.font=p%4+'em Geomanist';

				var rVal = i*255;
				var gVal = k*255;
				var bVal = j*255;
				x.fillStyle = 'rgba('+rVal+','+gVal+','+bVal+','+((t/4.0+j/256.0))*32+')';

				x.fillText(sentences[p%sentences.length],n*i/4+n/2,n*j/512+n/4,j*p/i/16);

			})();
		} 
	}

	var u3 = function() {
		var n = window.innerWidth;

		c.width = 954*(windowWidthPx/1920);

		if (state.fullScreen) {
			c.width = window.innerWidth;
		}

		x.fillStyle = "#96194c"; 
		x.fillRect(0, 0, c.width, c.height);

		var e=255;
		var w = function(_){ return [...Array(_).keys()].map(Math.cos) };

		w(512).map(i=>{
			let t = (Date.now() - millis_start) / 1000.0;

			t /= 16;

			x.font='bold '+n%4+'em Geomanist';
			x.strokeStyle='rgba('+(Math.tan(t/i)*e)+','+(e*i)+','+(e-Math.sin(t*i)*e)+')';
			x.strokeText(sentences[parseInt(t)%sentences.length],Math.sin(t*i)*n,i*n,2e3*t/i)
		});
	}

	let dwitterFuncArr = [u, u2, u3];

	let funcChoice = rng.choice(dwitterFuncArr);

	for (let k = 0, p = Promise.resolve(); k < 65535; k++) {
		if (k === 0) {

            $('#loading').fadeOut();

		}

	    p = p.then(_ => new Promise(resolve =>
	        timeoutControl = window.setTimeout(function () {
	            funcChoice();
	            resolve();
	        },16.666)
	    ));
	}

	// p.then(function(){
	// 	return newPromise(resolve => {

	// 	});

		
	//     resolve();
 //    });

}


function randomChoice(arr) {
	return rng.choice(arr);
}

var goFS = document.getElementById("goFS");


let eventLoopArr = [
	"introTxt", "funQuestionTxt",
	"thankYouTxt", "genQuestionTxt", "thankYouTxt",
	"genQuestion2Txt", "thankYouTxt",
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


	if (state.keyWordArr.length > 3) {
		replDict["keyWord"] = (`${state.keyWordArr.pop()}, ${state.keyWordArr.pop()}, & ${state.keyWordArr.pop()}`).toProperCase();
	}
	else if (state.keyWordArr.length > 2) {
		replDict["keyWord"] = (`${state.keyWordArr.pop()} & ${state.keyWordArr.pop()}`).toProperCase();
	}
	else if (state.keyWordArr.length > 1) {
		replDict["keyWord"] = state.keyWordArr.pop().toProperCase();
	}

	let newStr = strToRepl;

	for (let [key, value] of Object.entries(replDict)) {
		newStr = newStr.replace(`{{${key}}}`, value);
	}

	return newStr;
}

function updateState(rawUserInput, poem="") {
	$('#goGoGo').text( state.emojiArr.pop() )

	let userResponseNlp = nlp( rawUserInput );

	console.log(userResponseNlp.out('string'));

	$('#userTxtInput').val("");

	$("#userTxtInput").focus();

	let userResponseNlpNorm = userResponseNlp.normalize( parentheses = true, possessive = true, plurals = true, verbs = true, honorifics = true );

	console.log(userResponseNlpNorm.out('string'));

	let newNouns = userResponseNlpNorm.nouns().out("array");

	console.log(newNouns);

	if (Array.isArray(newNouns) && newNouns.length > 0) {
		state.nouns.push(...newNouns);
		state.keyWordArr.push(...newNouns);
	}

	let newVerbs = userResponseNlpNorm.verbs().toGerund().out("array").map(function(x){ 
		return x.split(' ').pop(); }).filter(function(kw){
			return kw.toLowerCase() != "am" && kw.toLowerCase() != "being" && kw.toLowerCase() != "are";
		});

	console.log(newVerbs);

	if (Array.isArray(newVerbs) && newVerbs.length > 0) {
		state.verbs.push(...newVerbs);
		state.keyWordArr.push(...newVerbs);
	}

	state.keyWordArr.shuffle();

	if (state.curKey === "introTxt") {
		state.userName = userResponseNlpNorm.people().out("string").trim().toProperCase();

		if (!state.userName && Array.isArray(newNouns) && newNouns.length > 0) {
			state.userName = newNouns[newNouns.length-1];
		}

		if (!state.userName) {
			console.log( 'candidate userName:', userResponseNlpNorm.out('string') )
			state.userName = userResponseNlpNorm.out("string").trim().split(' ').pop().toProperCase();
		}
	}

	state.curKey = eventLoopArr.pop();

	if (state.curKey === 'picQuestionTxt' || state.curKey === 'thankYouTxt') {
		$('#text-input-box').hide();
		$('#goGoGo').focus();
	}

	let curTxt = replaceTerms( state[ state.curKey ].shuffle().pop() );
	main( curTxt );
}


let dialog = document.querySelector('dialog');
    // var showDialogButton = document.querySelector('#show-dialog');
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}

dialog.querySelector('.close').addEventListener('click', function() {
	dialog.close();
	$("#userTxtInput").focus();
});


$(':file').on('change', function (){

  $('#loading').fadeIn();

  $.ajax({
    // Your server script to process the upload
    url: 'https://a-i.technology/img',
    type: 'POST',

    // Form data
    data: new FormData($('form')[0]),

    // Tell jQuery not to process data or worry about content-type
    // You *must* include these options!
    cache: false,
    contentType: false,
    processData: false

  }).done(function(data){
  	$('#loading').fadeOut();

  	console.log(data);

  	let poemText = data.poemtext;
  	let firstExpansion = data.expansions[0];

  	state.picResponse = [ poemText ];
  	state.picResponseNow = true;

  	updateState( data.expansions[0] );
  });

});

function buttonCallback() {

	$("#outputSpan").text("");
	$('#outputDiv').fadeOut();

	let userInput = $("#userTxtInput").val().trim();

	if ( state.curKey === 'picQuestionTxt' ) {

		// handle image upload

		$("#imageUpload").click();


	}

	else if (!userInput && state.curKey != "thankYouTxt" && state.curKey != "picResponse" && state.curKey != "collabResponse" && state.curKey != "endTxt" ) {
		// popup type something
		// let dialog = document.querySelector('dialog');
		dialog.showModal();
	}
	else {
		updateState(userInput);
	}

}

$('#goGoGo').text( state.emojiArr.pop() );
$('#goGoGo').click(buttonCallback);

goFS.addEventListener("click", function() {

	// window.setTimeout(function(){
		$('#loading').show();
		$('#'+"fullScreenControl").hide();
		// document.querySelector("html").requestFullscreen();
		$('#'+"text-input-box").fadeIn();
		$("#userTxtInput").focus();
		$('#goGoGo').fadeIn();

		state.fullScreen = true;

		$('canvas').css('position', 'static');

		windowWidthPx = window.innerWidth;
		windowHeightPx = window.innerHeight;

		$('#bg').fadeOut();

		state.curKey = eventLoopArr.pop();
		state.introTxtChoice = randomChoice(state.introTxt);
		main( state.introTxtChoice );
	// }, 1024);

}, false);

main("Hello World.");


$( window ).resize(onWindowResize);


});