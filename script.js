const cards = document.querySelectorAll('.memory-card');
const listInfo = document.querySelectorAll('.info-game li')
const buttonRestart = document.querySelector('.info-game button')

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){ 
    buttonRestart.removeAttribute('hidden',true)

   //quando a variavel lockBoard for verdadeira, ele para de executar a função nessa linha, evitando que o usuario clique e vire mais cartas
   if(lockBoard) return;
   if(this === firstCard) return;

   this.classList.add('flip')
   
   //verifica se não tem nenhuma carta virada
   if(!hasFlippedCard){
       hasFlippedCard = true;
       firstCard = this;
       return;
   }

   //se não parou no if, ou seja, já tem uma carta virada então aqui será a segunda carta
   secondCard = this;

   //chama a função que verifica se as 2 cartas são iguais
   checkForMath();

   
}

function checkForMath() {
    if(firstCard.dataset.framework === secondCard.dataset.framework){
        disableCards();
        return;
    }
    //se as 2 cartas viradas nao forem iguais, chama a função para remover a class flip
    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    
    lineThroughInfo();

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    //será executado apos 1segundo e meio removendo a class flip(ou seja, as cartas virarão para a posição inicial)
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },1500);
}

//destructuring assignment
function resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard,secondCard]= [null,null];
}

function shuffle(){
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 6);
        card.style.order = randomPosition;
    });   
  
}

//Immediately Invoked Function Expression (IIFE)
(()=>{ shuffle() })();

cards.forEach(card => card.addEventListener('click',flipCard));

function lineThroughInfo(){

    for(li of listInfo) {
        if(firstCard.dataset.framework === li.dataset.framework){
            li.classList.add("phrasalverb")
            return;
        }
    }
}

function restart(){
    lockBoard = true;
    buttonRestart.setAttribute('hidden',true)
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click',flipCard)        
    })

    listInfo.forEach(li => {
        li.classList.remove("phrasalverb")
    })
    
    setTimeout(() => {
        resetBoard();
        shuffle();
    },800);   
}