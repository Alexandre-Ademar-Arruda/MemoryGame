const grid = document.querySelector('.grid');

function criarElemento(tipo,classe,conteudo,atributos={}){
    const elemento = document.createElement(tipo);
    if(classe) elemento.className = classe;
    if(conteudo){
        if(tipo==='input'||tipo==='textarea'){
            elemento.value=conteudo;
        }else{
            elemento.textContent=conteudo;
        }
    }
    for(let atr in atributos){
        elemento.setAttribute(atr,atributos[atr]);
    }
    return elemento;
}

const personagens = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer'
];

let firstCard='';
let secondCard='';

const clearCard = () => {
    firstCard='';
    secondCard='';
    return clearCard;
}
                                        /*
                                        
                                            const revealCard = ({target})=>{
                                                const card = target.closest('.card');
                                                if ( card.classList.contains('reveal-card')) return;
                                                card.classList.add('reveal-card');
                                                if(firstCard  === '' ){
                                                    firstCard = card;
                                                    console.log(firstCard);
                                                } else if(secondCard === '' ){
                                                    secondCard = card;
                                                }
                                            };
                                        */

const checkEndGame=()=> {
    const disabledCard = document.querySelectorAll('disabled-card');
    if(disabledCard.length===20){
        alert('vc venceu!');
    }
}
                
const checkCards = ()=>{
    const firstPerson = firstCard.getAttribute('data-personagem');
    const secondPerson = secondCard.getAttribute('data-personagem');

    if(firstPerson===secondPerson){
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        clearCard();
        checkEndGame();
        alert('show de bola! vc acertou!');
    }else {

        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            clearCard();
        },500);
    }
}
                

        const revealCard = ({target}) => {
            if(target.parentNode.className.includes('reveal-card')) return;
            if (firstCard===''){
                target.parentNode.classList.add('reveal-card');
                firstCard=target.parentNode;
          
            } else if(secondCard===''){
                target.parentNode.classList.add('reveal-card');
                secondCard=target.parentNode;
                checkCards();
     
            }
        }


function criarCard(personagem){
    const card = criarElemento('div','card','',{'data-personagem':personagem});
    const front = criarElemento('div','face front','',{ src:`../images/charges/${personagem}.png`});
    const back = criarElemento('div','face back');

    front.style.backgroundImage = `url('../images/charges/${personagem}.png')`;

    card.append(front,back);

    grid.appendChild(card);

    card.addEventListener('click', revealCard);

    //card.setAttribute('data-personagem', personagem); //para deixar esta linha tenho que retirar o data-personagem la na criação do card 'line 63' no time atual

    return card;
}

const loadGame = () =>{
    const duplicatePersonagens = [...personagens, ...personagens];
    const embaralhadoduplicatePersonagens = duplicatePersonagens.sort(()=>Math.random()-0.5);
    embaralhadoduplicatePersonagens.forEach((personagem) => {
        const card = criarCard(personagem);
        grid.appendChild(card);
    });
}

loadGame();