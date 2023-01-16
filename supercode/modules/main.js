let CantPosibilidades = 0;
let hidden1,
    hidden2,
    hidden3,
    hidden4;
let posibildad = 1;
let jugada = 1;
let insertValueUser = [];
let winned = false;

const $TemplateViewGame = document.getElementById('view-game').content,
     $display = document.querySelector(".display"),
     $fragmentDisplay = document.createDocumentFragment(),
     $game_mode = document.getElementById('game_mode'),
     $youWinModal = document.getElementById('modal_winned'),
     $undo = document.querySelector('.undo'),
     $btnInsertColor = document.getElementById('btn');





// execute program
export const executeProgram = () => {
    numHiddenGenerator();

    $game_mode.addEventListener('click', e => {
        const t = e.target,
        d = t.dataset
         if(t.matches('button')){
            CantPosibilidades = d.number;
            let modalOpt = document.getElementById('modal_select_mode') 
            modalOpt.classList.add('none')
            printViewGame();
        }
    })
   
    $youWinModal.addEventListener('click', e => {
        const t = e.target;
        if(t.matches('button')){
            playAgain();
        }
    }) 
    $undo.addEventListener('click', () =>{
        if(insertValueUser.length !== 0){
            let insertValue = document.getElementById(`pantalla${posibildad}-color${jugada - 1}`)
            let lastInsert = insertValueUser.pop();
            insertValue.classList.remove(`btn-${lastInsert}`);
            jugada--;
        } 
    })
   
    $btnInsertColor.addEventListener('click', e => {
        const t = e.target,
              d = t.dataset;
        if(posibildad <= CantPosibilidades && !winned){
            if(t.matches('button')){
                write(d.number, posibildad)
                
            }
        }
    })
}
    
        
      

const playAgain = () => {
    $youWinModal.classList.add('none');
    posibildad = 1;
    jugada = 1;
    insertValueUser = [];
    winned = false;
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
        $TemplateViewGame.querySelector('h2').textContent = i + 1
        $TemplateViewGame.querySelectorAll('.input-user').forEach((el, index) => {
            el.setAttribute('id',`pantalla${i + 1 }-color${index + 1 }`)
        });

        $TemplateViewGame.querySelectorAll('.eval-cpu').forEach((el,index)=>{
            el.setAttribute('id',`pantalla${i + 1 }-eval${index + 1 }`)
        })
        let $cloneTemplate = document.importNode($TemplateViewGame, true);
        $fragmentDisplay.append($cloneTemplate);
    }
    console.log($fragmentDisplay.content)
    $display.append($fragmentDisplay)

}

//Generar valores ocultos
const numHiddenGenerator = () => {
    hidden1 = parseInt(Math.random() * 6 + 1);
    hidden2 = parseInt(Math.random() * 6 + 1);
    hidden3 = parseInt(Math.random() * 6 + 1);
    hidden4 = parseInt(Math.random() * 6 + 1);
    console.log('solucion ' + hidden1, hidden2, hidden3, hidden4)
}
// insertColors
const write = (number, pos) => {
    
    let insertValue = document.getElementById(`pantalla${pos}-color${jugada}`)
    insertValue.classList.add(`btn-${number}`)
    jugada++
    insertValueUser.push(number)
    
    if (insertValueUser.length == 4) {
        evalue(insertValueUser[0], insertValueUser[1], insertValueUser[2], insertValueUser[3], hidden1,hidden2, hidden3, hidden4,pos);
            jugada=1;
            posibildad++;
            insertValueUser=[];
    }
}

// evalue

function evalue(e1, e2, e3, e4, h1, h2, h3, h4,pos) {
    let posEvalue1 = document.getElementById(`pantalla${pos}-eval1`);
    let posEvalue2 = document.getElementById(`pantalla${pos}-eval2`);
    let posEvalue3 = document.getElementById(`pantalla${pos}-eval3`);
    let posEvalue4 = document.getElementById(`pantalla${pos}-eval4`);
    let resBien = 0;
    let resReg = 0;
 
    //si pierde
    if(posibildad == CantPosibilidades && !winned){
      
        let $textWinned =document.querySelector('.text-winned');
        let $title = document.querySelector('#modal_winned .title');
        let $sentimiento = document.querySelector('#modal_winned .sentimiento');
        $sentimiento.setAttribute('src', './assets/crying-sobbing.gif' )
        $title.textContent = ' Uppss!!!'
        $textWinned.textContent = 'Has perdido, no te rindas'
        $youWinModal.classList.remove('none');
       
    }

    // si gana
    if (e1 == h1 && e2 == h2 && e3 == h3 && e4 == h4) {
        posEvalue1.classList.add('bien');
        posEvalue2.classList.add('bien');
        posEvalue3.classList.add('bien');
        posEvalue4.classList.add('bien');
        let $textWinned =document.querySelector('.text-winned');
        let $title = document.querySelector('#modal_winned .title');
        let $sentimiento = document.querySelector('#modal_winned .sentimiento');
        $sentimiento.setAttribute('src', './assets/hasher-happy-sticker.gif' )
        $title.textContent = ' Bravo!!!'
        $textWinned.textContent = ' Felicidades Has Ganado'
        $youWinModal.classList.remove('none');
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







