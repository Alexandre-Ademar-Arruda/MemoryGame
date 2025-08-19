const grid = document.querySelector('.grid');

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
            alert('Parabens voce encontrou todos os pares.');
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
const revealCard = ({target})=>{
    if(target.parentNode.className.includes('reveal-card'))
        return;
    if(firstCard===''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }else if (secondCard ===''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
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

loadGame();