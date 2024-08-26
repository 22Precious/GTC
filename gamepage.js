let flagImgDiv = document.querySelector('.flag-img');
let flagImg = document.querySelector('.flag-img img');
let flagOptions = document.querySelector('.flag-options ul');
let flagList = document.querySelectorAll('.flag-options ul li');
let score = document.querySelector('h3 span');
let scoreDiv = document.querySelector('.score');
let correctAns= document.querySelector('.score .right span');
let incorrectAns= document.querySelector('.score .incorrect span');
let totalQuestions=0
let currentIndex=0;
let rightAnswer=0;




function getQuestions(){
    let myRequest= new XMLHttpRequest();
    myRequest.onreadystatechange=function(){
        if(this.readyState === 4 && this.status===200){
            let questions =JSON.parse(this.responseText);
            console.log(questions);
            // Number of Seconds per game
            let duration = 60;
            questions=questions.sort(() =>Math.random()-Math.random()).slice(0,85);
            addQuestionData(questions[currentIndex], duration)

            flagList.forEach(li=>{
              li.addEventListener('click',()=>{
               let rightAnswer = questions[currentIndex].right_answer;
               li.classList.add('active');
               currentIndex++;
               
               setTimeout(()=>{
                checkAnswer(rightAnswer);
               },100)

               setTimeout(()=>{
                flagImg.src="";

                li.classList.remove('active');
                li.classList.remove('success');
                li.classList.remove('wrong');
                
                addQuestionData(questions[currentIndex],duration)
               },300)

               

              })
            })
          }}
    myRequest.open("GET","flag-question.json",true);
    myRequest.send();
}
function showResults(){
        flagOptions.innerHTML='';
        flagImgDiv.innerHTML='';
        scoreDiv.style.display='block';
        correctAns.innerHTML=rightAnswer;
        incorrectAns.innerHTML=totalQuestions-rightAnswer;
}

function startCountdown(duration, display) {
    let timer = duration;
    let countdown = setInterval(function() {
        let seconds = timer; 
        display.innerHTML = seconds;
        if (timer <= 0) { 
            clearInterval(countdown);
            showResults();
        }
     timer--;
    }, 1000); 
}



window.onload=function(){
    getQuestions();
    timeSpan = document.querySelector('.time span');
    scoreDiv.style.display='none';
    duration=10;
    startCountdown(duration, timeSpan);
}



function timeNum(num){
    timeSpan.innerHTML=num;
}

function addQuestionData(obj, count) {
    if (currentIndex < count) {
        flagImg.src = `${obj.img}`;
        console.log(flagImg.src);
        
        flagList.forEach((li, i) => {
            li.id = `answer_${i + 1}`;
            li.dataset.answer = obj['options'][i];
            li.innerHTML = obj['options'][i];
        });
    }
}

function checkAnswer(rAnswer,count){
    let chosenAnswer;
    for (let i=0; i<flagList.length; i++){
        if(flagList[i].classList.contains('active')){
            chosenAnswer=flagList[i].dataset.answer;
            if(rAnswer===chosenAnswer){
                flagList[i].classList.add('success');
                rightAnswer++;
                score.innerHTML=rightAnswer
                totalQuestions++;

            }else{
                flagList[i].classList.add('wrong');
                totalQuestions++;
            }
        }
    }

}



