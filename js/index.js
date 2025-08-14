
const login_form = document.querySelector('.login_form');
const login_input = document.querySelector('.login_input');
const login_button = document.querySelector('.login_button');


const vldrNpt = ({target}) => { target.value.length > 2 ? login_button.removeAttribute('disabled') :  login_button.setAttribute('disabled',''); }
login_input.addEventListener('input',vldrNpt);
                                                                        /* 
                                                                            const validarInput = (e) =>{
                                                                                if (e.target.value.length > 2){
                                                                                    login_button.removeAttribute('disabled');
                                                                                }else{
                                                                                    login_button.setAttribute('disabled','');
                                                                                }
                                                                            }
                                                                            login_input.addEventListener('input',validarInput);
                                                                        */

const handleSubmit = (e) =>{
    e.preventDefault();
    localStorage.setItem('jogador',login_input.value) ;
    window.location.href='./pages/game.html';
}
login_form.addEventListener('submit',handleSubmit);

