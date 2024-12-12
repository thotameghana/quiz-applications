const playbtn=document.getElementById("playbtn");
const instructionbtn=document.getElementById("instructionbtn");

playbtn.addEventListener("click",function(){
  window.location.href="game.html";
})

instructionbtn.addEventListener("click",function(){
  window.location.href="./instructions.html";

})

function startGame() {
  window.location.href="quiz.html";
  const name = document.getElementById('name').value;
  const nickname = document.getElementById('nickname').value;

  const player = {
      name: name,
      nickname: nickname
  };

  localStorage.setItem('player', JSON.stringify(player));
}