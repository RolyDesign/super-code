//DOM AccessElement
const $TemplateViewGame = document.getElementById('view-game').content,
    $modalOpt = document.getElementById('mod_select_mode'),
     $display = document.querySelector(".display"),
     $fragmentDisplay = document.createDocumentFragment(),
     $game_mode = document.getElementById('game_mode'),
     $modAlert = document.getElementById('mod_alert'),
     $youWinModal = document.getElementById('mod_winned'),
     $btnPlayAgain =document.getElementById('game_again'),
     $btnInsertColor = document.getElementById('btn'),
     $btnConfirm =document.getElementById('btn_confirm'),
     $time = document.getElementById('time'),
     $btnsAction = document.querySelector('.btns-action'),
     $score = document.getElementById('score');

let CantPosibilidades = 0;
let hiddens = [];
let intervalTime;
let countSeconds = 1,
    countMinutes = 0,
    countHours = 0;


   
let posibildad = 1;
let jugada = 1;
let insertValueUser = [];

const timeExec = () => {
let seconds,
    minutes,
    hours;
    intervalTime = setInterval(() => {
        //seconds
        if(countSeconds < 10 ){
            seconds = `0${countSeconds}`
            countSeconds++
        }else{
            seconds = countSeconds
            countSeconds++
        }
        if(countSeconds == 61){
            seconds = '00';
            countSeconds = 1;
            countMinutes++
        }
        //minutes
     
        if(countMinutes < 10 ){
            minutes = `0${countMinutes}`
        }else{
            minutes = countMinutes;
        }
        if(countMinutes == 60){
            countHours++
            minutes = '00';
            countMinutes = 0
        }
        //hours
        if(countHours < 10 ){
            hours = `0${countHours}`
        }else{
            hours = countHours;
        }
        $time.textContent = `${hours}:${minutes}:${seconds}`;
        
    }, 1000);
}

// execute program
export const executeProgram = () => {
    if(window.localStorage.getItem('SC-Score') == null){
        window.localStorage.setItem('SC-Score','0');
    }
    numHiddenGenerator();
    $game_mode.addEventListener('click', e => {
        const t = e.target,
        d = t.dataset
         if(t.matches('button')){
            CantPosibilidades = d.number;
            $modalOpt.classList.add('none')
            printViewGame();
        }
    })
   
    $btnPlayAgain.addEventListener('click', e => {
        const t = e.target;
        if(t.matches('button')){
            playAgain();
            
        }
    }) 
    $btnConfirm.addEventListener('click', e => {
        const t = e.target,
        d = t.dataset
         if(t.matches('button')){
            if(d.number == 0){
                playAgain();
                $modAlert.classList.add('none');
            }else{
                $modAlert.classList.add('none');
            }
         }
    })

    $btnsAction.addEventListener('click', e => {
        const t = e.target,
        d = t.dataset;
        if(t.matches('button') || t.matches('i')){
            if(d.number == 1){
                if(insertValueUser.length !== 0){
                    let insertValue = document.getElementById(`pantalla${posibildad}-color${jugada - 1}`)
                    let lastInsert = insertValueUser.pop();
                    insertValue.classList.remove(`btn-${lastInsert}`);
                    jugada--;
                } 
            }else if(d.number == 2){
                $modAlert.classList.remove('none')

            }else{
                if(insertValueUser.length == 4){
                    evalue(insertValueUser[0], insertValueUser[1], insertValueUser[2], insertValueUser[3],hiddens[0], hiddens[1], hiddens[2], hiddens[3] ,posibildad);
                    jugada=1;
                    posibildad++;
                    insertValueUser=[];
                }
                
            }
        }
    })
   
    $btnInsertColor.addEventListener('click', e => {
        const t = e.target,
              d = t.dataset;
        if(posibildad <= CantPosibilidades ){
            if(t.matches('button')){
                if(jugada <= 4){
                    write(d.number, posibildad)
                }
                
            }
        }
    })
}

const playAgain = () => {
    $youWinModal.classList.add('none');
    posibildad = 1;
    jugada = 1;
    insertValueUser = [];
    countSeconds = 1;
    countMinutes = 0;
    countHours = 0;
    for (let i = 0; i < CantPosibilidades; i++) {
        $display.removeChild($display.firstElementChild)
    }
    printViewGame();
    numHiddenGenerator()
}

// Print DynamicView
const printViewGame = () =>{
    for (let i = 0; i < CantPosibilidades; i++) {
        $TemplateViewGame.querySelector('.pantallas').setAttribute('id',`pantalla${i + 1}`);
        $TemplateViewGame.querySelector('h4').textContent = i + 1
        $TemplateViewGame.querySelectorAll('.input-user').forEach((el, index) => {
            el.setAttribute('id',`pantalla${i + 1 }-color${index + 1 }`)
        });

        $TemplateViewGame.querySelectorAll('.eval-cpu').forEach((el,index)=>{
            el.setAttribute('id',`pantalla${i + 1 }-eval${index + 1 }`)
        })
        let $cloneTemplate = document.importNode($TemplateViewGame, true);
        $fragmentDisplay.append($cloneTemplate);
    }
    $display.append($fragmentDisplay);
    $time.textContent = `00:00:00`
    timeExec();
    $score.textContent = window.localStorage.getItem('SC-Score')+"pts";
}

//Generar valores ocultos
const numHiddenGenerator = () => {
    for (let i = 0; i < 4; i++) {
        hiddens[i] = parseInt(Math.random() * 6 + 1);
        
    }
    console.log('solucion ' + hiddens)
}
// insertColors
const write = (number, pos) => {
    let $insertValue = document.getElementById(`pantalla${pos}-color${jugada}`)
    $insertValue.classList.add(`btn-${number}`)
    jugada++
    insertValueUser.push(number)
}

// evalue

function evalue(e1, e2, e3, e4, h1, h2, h3, h4,pos) {
    let posEvalue1 = document.getElementById(`pantalla${pos}-eval1`);
    let posEvalue2 = document.getElementById(`pantalla${pos}-eval2`);
    let posEvalue3 = document.getElementById(`pantalla${pos}-eval3`);
    let posEvalue4 = document.getElementById(`pantalla${pos}-eval4`);
    let resBien = 0;
    let resReg = 0;
 
    //si pierde then
    if(posibildad == CantPosibilidades){
      
        $youWinModal.querySelector('.text-winned').textContent = 'Has perdido, no te rindas';
        $youWinModal.querySelector('.title').textContent = ' Uppss!!!';
        $youWinModal.querySelector('.sentimiento').setAttribute('src', './assets/crying-sobbing.gif' );
        $youWinModal.querySelector('button').textContent= 'Volver a jugar';
        $youWinModal.classList.remove('none');
        clearInterval(intervalTime);
        
    }

    // si gana then
    if (e1 == h1 && e2 == h2 && e3 == h3 && e4 == h4) {
        posEvalue1.classList.add('bien');
        posEvalue2.classList.add('bien');
        posEvalue3.classList.add('bien');
        posEvalue4.classList.add('bien');
        $youWinModal.querySelector('.text-winned').textContent = ' Felicidades Has Ganado';
        $youWinModal.querySelector('.title').textContent = ' Bravo!!!';
        $youWinModal.querySelector('.sentimiento').setAttribute('src', './assets/hasher-happy-sticker.gif' );
        $youWinModal.querySelector('button').textContent= 'Volver a jugar';
        $youWinModal.classList.remove('none');
        clearInterval(intervalTime);
        CalcScore(posibildad)
    }

    //eval bien 
    if (e1 == h1) {
        resBien++
        e1 = 0;
        h1 = 7;
    }
    if (e2 == h2) {
        resBien++
        e2 = 0;
        h2 = 7;
    }
    if (e3 == h3) {
        resBien++
        e3 = 0;
        h3 = 7;
    }
    if (e4 == h4) {
        resBien++
        e4 = 0;
        h4 = 7;
    }

    //primera posi eval reg
    if (e1 == h2) {
        resReg++
        e1 = 0;
        h2 = 7;
    }

    if (e1 == h3) {
        resReg++
        e1 = 0;
        h3 = 7;
    }

    if (e1 == h4) {
        resReg++
        e1 = 0;
        h4 = 7;
    }

    //segunda posi eval reg

    if (e2 == h1) {
        resReg++
        e2 = 0;
        h1 = 7;
    }

    if (e2 == h3) {
        resReg++
        e2 = 0;
        h3 = 7;
    }

    if (e2 == h4) {
        resReg++
        e2 = 0;
        h4 = 7;
    }

    //tercera posi eval reg

    if (e3 == h1) {
        resReg++
        e3 = 0;
        h1 = 7;
    }

    if (e3 == h2) {
        resReg++
        e3 = 0;
        h2 = 7;
    }

    if (e3 == h4) {
        resReg++
        e3 = 0;
        h4 = 7;
    }

    //cuarta  posi eval reg
    if (e4 == h1) {
        resReg++
        e4 = 0;
        h1 = 7;
    }

    if (e4 == h2) {
        resReg++
        e4 = 0;
        h2 = 7;
    }

    if (e4 == h3) {
        resReg++
        e4 = 0;
        h3 = 7;
    }
    

    // print eval

  if(resReg == 0 && resBien == 1){

     posEvalue1.classList.add('bien')

  }else if(resReg == 0 && resBien == 2){

    posEvalue1.classList.add('bien')
    posEvalue2.classList.add('bien')

  }else if(resReg == 0 && resBien == 3){

    posEvalue1.classList.add('bien')
    posEvalue2.classList.add('bien')
    posEvalue3.classList.add('bien')

  }else if(resReg == 1 && resBien == 0){

    posEvalue1.classList.add('regular')

  }else if(resReg == 2 && resBien == 0){

    posEvalue1.classList.add('regular')
    posEvalue2.classList.add('regular')

  }else if(resReg == 3 && resBien == 0){

    posEvalue1.classList.add('regular')
    posEvalue2.classList.add('regular')
    posEvalue3.classList.add('regular')

  }else if(resReg == 4){

    posEvalue1.classList.add('regular')
    posEvalue2.classList.add('regular')
    posEvalue3.classList.add('regular')
    posEvalue4.classList.add('regular')
   

  }else if(resReg == 1 && resBien == 1){

    posEvalue1.classList.add('regular')
    posEvalue2.classList.add('bien')
   

  }else if(resReg == 1 && resBien == 2){

    posEvalue1.classList.add('regular')
    posEvalue2.classList.add('bien')
    posEvalue3.classList.add('bien')
   

  }else if(resReg == 2 && resBien == 1){

    posEvalue1.classList.add('regular')
    posEvalue2.classList.add('regular')
    posEvalue3.classList.add('bien')
   

  }else if(resReg == 2 && resBien == 2){

    posEvalue1.classList.add('regular')
    posEvalue2.classList.add('regular')
    posEvalue3.classList.add('bien')
    posEvalue4.classList.add('bien')
   

  }else if(resReg == 3 && resBien == 1){

    posEvalue1.classList.add('regular')
    posEvalue2.classList.add('regular')
    posEvalue3.classList.add('regular')
    posEvalue4.classList.add('bien')
  }
};


const CalcScore = (pos) => {
    let score;
    if(CantPosibilidades == 8 ){
        score = (400 / CantPosibilidades) * (CantPosibilidades - pos) + (400 / CantPosibilidades)  + parseInt(window.localStorage.getItem('SC-Score')) ;
    }else if(CantPosibilidades == 7){
        score = (500 / CantPosibilidades) * (CantPosibilidades - pos) + (500 / CantPosibilidades)  + parseInt(window.localStorage.getItem('SC-Score')) ;
    }else{
        score = (600 / CantPosibilidades) * (CantPosibilidades - pos) + (600 / CantPosibilidades)  + parseInt(window.localStorage.getItem('SC-Score')) ;
    }
    window.localStorage.setItem('SC-Score',`${Math.floor(score)}`)
    
}









