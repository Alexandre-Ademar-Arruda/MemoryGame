const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.span-player');
const timer = document.querySelector('.timer');

const persons = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy'
];

const criarElemento =(tipo,classe,conteudo,atributos={})=>{
    const el = document.createElement(tipo);
    if(classe) el.className=classe;
    if(conteudo){
        if(tipo==='input'||tipo==='textarea'){
            el.value=conteudo;
        }else{
            el.textContent=conteudo;
        }
    }
    for(let atr in atributos){
        if(atr==='style'){
            Object.assign(el.style,atributos[atr]);
        }else{
            el.setAttribute(atr,atributos[atr]);
        }
    }
    return el;
}

let firstCard='';
let secondCard='';
let correto=0;

const checkEndGame = ()=>{
    //const desabilitados = document.querySelectorAll('.disabled-card');
    if(correto ===persons.length)
    setTimeout(()=>{
            clearInterval(this.loop);
            alert(`Parabens ${spanPlayer.innerHTML} voce venceu em ${timer.innerHTML} segundos.`);
    },1000)
}

const limpaCard = () =>{
    firstCard='';
    secondCard='';
    return limpaCard;
}

const disabledCard =()=>{
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
}

const checkCard = () =>{
    const alfaPerson = firstCard.getAttribute('data-person');
    const betaPerson = secondCard.getAttribute('data-person');

    if(alfaPerson===betaPerson){
        alert('Malandrinhooo!!! Ce certou miseraviii!!!');
        correto++;
        disabledCard();
        limpaCard();
        checkEndGame();
    }else {
        alert('Voce errou!');
        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            limpaCard();
        },800);
    }

}
const revealCard = ({ target }) => {
    const card = target.closest('.card');      // acha o .card mais próximo
    if (!card) return;                         // clique fora? sai
    if (card.classList.contains('reveal-card')) return; // já virado? sai

    if (firstCard === '') {
        card.classList.add('reveal-card');
        firstCard = card;
    } else if (secondCard === '') {
        card.classList.add('reveal-card');
        secondCard = card;
        checkCard();
    }
};


const criarCard = (person) => {
    const card = criarElemento('div','card','',{'data-person':person});
    const front = criarElemento('div','face front','',{style:{backgroundImage :`url(../images/charges/${person}.png)`}});
    const back = criarElemento('div','face back');
    card.append(front,back);
    card.addEventListener('click',revealCard);
    
    return card;
}

const loadGame = ()=>{
    const personagensDuplicados = [...persons, ...persons]
    const suffledArray = personagensDuplicados.sort(() => Math.random()-0.5);
    suffledArray.forEach((person)=> {
        const card = criarCard(person);
        grid.appendChild(card);
    });
}

const startTimer = (() =>{
    this.loop=setInterval(()=>{
        const currentTime = Number (timer.innerHTML);
        timer.innerHTML = currentTime+1;
    },1000);
});

window.onload = () => {

    const playerName = localStorage.getItem('player');
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame();
}

