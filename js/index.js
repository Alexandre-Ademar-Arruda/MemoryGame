const login__input = document.querySelector('.login-input');
const login__button = document.querySelector('.login-button');
const login__form = document.querySelector('.login-form');



const validar__nome = (e)=>{
    if(e.target.value.length>2){
        login__button.removeAttribute('disabled');
    }else{
        login__button.setAttribute('disabled','');
    }
}
const handleSubmit=(e)=>{
    e.preventDefault();
    localStorage.setItem('player',login__input.value);
    window.location = './pages/game.html';
}

login__input.addEventListener('input',validar__nome);
login__form.addEventListener('submit',handleSubmit);