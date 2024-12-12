const questions=[
    {
      question: 'What does CSS stand for?',
      answers: [
        { text:'Cascading Style Sheets',correct:true},
        { text:'Creative Style Sheets',correct:false},
        { text:'Computer Style Sheets',correct:false},
        { text:'Colorful Style Sheets',correct:false},
      ]
    },
    {
        question: 'HTML was first proposed in ___?',
        answers: [
          { text:'1990',correct:true},
          { text:'1995',correct:false},
          { text:'2000',correct:false},
          { text:'1985',correct:false},
        ]
    },
    {
      question: 'HTML full form',
      answers: [
        { text:'Hypertext Markup Language',correct:true},
        { text:'High level Markup Language',correct:false},
        { text:'Hyper time Markup Language',correct:false},
        { text:'None',correct:false},
      ]
    },
    {
      question: 'Which HTML tag is used to define an internal style sheet?',
      answers: [
        { text:'script',correct:false},
        { text:'css',correct:false},
        { text:'style',correct:true},
        { text:'link',correct:false},
      ]
    },
    {
    question: 'Which HTML attribute is used to define inline styles?',
      answers: [
        { text:'style',correct:true},
        { text:'styles',correct:false},
        { text:'class',correct:false},
        { text:'font',correct:false},
      ]
    },
    {
        question: 'How do you insert a comment in a CSS file?',
        answers: [
          { text:'/"this /"is a comment',correct:false},
          { text:'//this is a comment',correct:false},
          { text:'/*this is a comment*/',correct:true},
          { text:'//this is a comment//',correct:false},
        ]
    },
    {
      question: 'Which CSS property is used to change the text color of an element?',
      answers: [
        { text:'fgcolor',correct:false},
        { text:'text-color',correct:false},
        { text:'color',correct:true},
        { text:'All the above',correct:false},
      ]
    },
    {
      question: 'How do you display hyperlinks without an underline?',
      answers: [
        { text:'a{decoration:no-underline;}',correct:false},
        { text:'a{underline:none}',correct:false},
        { text:'a{text-decoration:no-underline;}',correct:false},
        { text:'a{text-decoration:none;}',correct:true},
      ]
    },
    {
    question: 'Which organization defines Web standards?',
      answers: [
        { text:'Apple Inc.',correct:false},
        { text:'World Wide Web Consortium (W3C)',correct:true},
        { text:'Microsoft Corporation',correct:false},
        { text:'Google Inc.',correct:false},
      ]
    },
    {
        question: 'HTML is considered as ______ ?',
        answers: [
          { text:'A programming language',correct:false},
          { text:'A markup language',correct:true},
          { text:'A scripting language',correct:false},
          { text:'A styling language',correct:false},
        ]
    }
  ];

const questionElement = document.getElementById("question");
const answerbtns = document.getElementById("answerbtns");
const nextbtn = document.getElementById("nextbtn");
const timerElement = document.getElementById("timer");
const timelogo=document.getElementById("timelogo");

let currentQuestionIndex = 0;
let score = 0;
let countdown;

var backgroundMusic = new Audio("./assets/Luke-Bergs-Island(chosic.com).mp3");
var winMusic=new Audio("./assets/TunePocket-Hurray-Cheer-Applause-Preview.mp3");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextbtn.innerHTML = "Next";
  backgroundMusic.play();
  showQuestion();
  resetTimer();
  startTimer(10);
}

function startTimer(duration) {
  let timer = duration;
  countdown = setInterval(function () {
    let minutes = parseInt(timer / 60, 10);
    let seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? + minutes : minutes;
    seconds = seconds < 10 ? + seconds : seconds;

    timerElement.textContent = minutes +""+ seconds;

    if (--timer < 0) {
      clearInterval(countdown);
      handleNextBtn(); 
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
}

function showQuestion() {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerbtns.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextbtn.style.display = "none";
  while (answerbtns.firstChild) {
    answerbtns.removeChild(answerbtns.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  selectBtn.style.backgroundColor = "green";
  const isCorrect = selectBtn.dataset.correct === "true";
  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  }
  else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerbtns.children).forEach(button => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextbtn.style.display = "block";
}

let winMessages = ["Congratulations! Keep it up!", "You are a champion!","WOW!! Keep it up"];
let mediumMessages=["Keep practicing", "Well done, keep improving!", "You're on the right track!"];
let lossMessages = ["Nice try! Better luck next time.", "Don't give up, try again!", "Keep learning and growing!"];

const msg = document.getElementById("msg");
function showScore() {
  backgroundMusic.pause();
  resetState();
  questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
  localStorage.setItem("score",score);
  questionElement.style.fontWeight='bold';

  if (score > 8) {
    let randomIndex = Math.floor(Math.random() * winMessages.length);
    msg.style.display = "block";

    timerElement.style.display="none";
    timelogo.style.display="none";
    msg.textContent = winMessages[randomIndex];
    winMusic.play();
  }
  else if(score>5 && score<=8)
  {
    let randomIndex = Math.floor(Math.random() * mediumMessages.length);
    msg.style.display = "block";
    timerElement.style.display="none";
    timelogo.style.display="none";
    msg.textContent = mediumMessages[randomIndex];
  }
  else {
    let randomIndex = Math.floor(Math.random() * lossMessages.length);
    msg.style.display = "block";
    timerElement.style.display="none";
    timelogo.style.display="none";
    msg.textContent = lossMessages[randomIndex];
  }
  nextbtn.innerHTML = "Play Again";
  nextbtn.style.display = "block";
}

function handleNextBtn() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    resetTimer(); 
    startTimer(10);
  }
  else {
    showScore();
  }
}

nextbtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextBtn();
  }
  else {
    startQuiz();
    msg.style.display = "none";
    timerElement.style.display="block";
    timelogo.style.display="inline";
    backgroundMusic.play();
    winMusic.pause();
  }
});

startQuiz();