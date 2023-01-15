let CantPosibilidades = 0;
let hidden1,
    hidden2,
    hidden3,
    hidden4;
let posibildad = 1;
let jugada = 1;
let insertValueUser = [];
let winned = false;




// execute program
export const executeProgram = () => {
    let $youWin = document.getElementById('modal_winned') 
    $youWin.classList.add('none')

    
    game_mode.addEventListener('click', e => {
        const t = e.target,
        d = t.dataset
         if(t.matches('button')){
            CantPosibilidades = d.number;
            let modalOpt = document.getElementById('modal_select_mode') 
            modalOpt.classList.add('none')
            printView();
            openGame();
        }
    })
}

const playAgain = () => {
    let $display = document.querySelector(".display");
    let $youWin = document.getElementById('modal_winned') 
    $youWin.classList.add('none');
    posibildad = 1;
    jugada = 1;
    insertValueUser = [];
    winned = false;
    $display.replaceChildren();
    printView();
    numHiddenGenerator()
    console.log('solucion ' + hidden1, hidden2, hidden3, hidden4)
}

// Print DynamicView
const printView = () =>{
    let $fragment = document.createDocumentFragment();
    let $display = document.querySelector(".display");
    let cont = 1;

for (let i = 0; i < CantPosibilidades; i++) {
    let $pantallaContainer = document.createElement("div");
    let $pantallaContentP = document.createElement("div");
    let $pantallaContentR = document.createElement("div");
    let inserts=[];
    let evals =[];
    let evalCpu1 =[];
    let evalCpu2 =[];
    
    for (let p = 0; p < 4; p++) {
        let $insert = document.createElement('div');
        $insert.classList.add('input-user');
        $insert.setAttribute('id', `pantalla${cont}-color${p+1}`)
        
        inserts.push($insert)
    }
    
    for (let evalue = 0; evalue < 2; evalue++) {
        let $eval = document.createElement('div');
        $eval.classList.add('eval');
        evals.push($eval)
        
    }

    for (let evalcpu1 = 0; evalcpu1 < 2; evalcpu1++) {
        let $eval = document.createElement('div');
        $eval.classList.add('eval-cpu');
        $eval.setAttribute("id",`pantalla${cont}-eval${evalcpu1+1}`);
        evalCpu1.push($eval)
    }
    for (let evalcpu2 = 2; evalcpu2 < 4; evalcpu2++) {
        let $eval = document.createElement('div');
        $eval.classList.add('eval-cpu');
        $eval.setAttribute("id",`pantalla${cont}-eval${evalcpu2+1}`);
        evalCpu2.push($eval)
    }


    $pantallaContainer.classList.add(`pantallas`);
    $pantallaContainer.setAttribute("id",`pantalla${i+1}`);
    $pantallaContentP.classList.add('p');
    $pantallaContentR.classList.add('r')
    

    inserts.forEach((el, i)=>{
        $pantallaContentP.appendChild(el)
    })
    evals.forEach((el,index) =>{
        let evalDiv = el;
        if(index == 0){
            evalCpu1.forEach(el=>{
                evalDiv.appendChild(el);
            })
        }
        if(index == 1){
            evalCpu2.forEach(el=>{
                evalDiv.appendChild(el);
            })
        }
        $pantallaContentR.appendChild(evalDiv)
    })

    $pantallaContainer.appendChild($pantallaContentP)
    $pantallaContainer.appendChild($pantallaContentR)
    $fragment.appendChild($pantallaContainer)
    cont++
};

$display.appendChild($fragment)

}

// initGame
const openGame = () => {
    if(CantPosibilidades > 0){
        numHiddenGenerator()
        console.log('solucion ' + hidden1, hidden2, hidden3, hidden4)
        let $btn = document.getElementById('btn')
        $btn.addEventListener('click', e => {
            
            const t = e.target,
                  d = t.dataset;
                 
            if(posibildad <= CantPosibilidades && !winned){
                if(t.matches('button')){
                    write(d.number, posibildad)
                }
            }
        })
    }
}

//Generar valores ocultos
const numHiddenGenerator = () => {
    hidden1 = parseInt(Math.random() * 6 + 1);
    hidden2 = parseInt(Math.random() * 6 + 1);
    hidden3 = parseInt(Math.random() * 6 + 1);
    hidden4 = parseInt(Math.random() * 6 + 1);
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
        let $youWin = document.getElementById('modal_winned') ;
        let $textWinned =document.querySelector('.text-winned');
        let $title = document.querySelector('#modal_winned .title');
        let $sentimiento = document.querySelector('#modal_winned .sentimiento');
        $sentimiento.setAttribute('src', './assets/crying-sobbing.gif' )
        $title.textContent = ' Uppss!!!'
        $textWinned.textContent = 'Has perdido, no te rindas'
        $youWin.classList.remove('none');
        $youWin.addEventListener('click', e => {
            const t = e.target;
            
            if(t.matches('button')){
                playAgain();
            }
        }) 
    }

    // si gana
    if (e1 == h1 && e2 == h2 && e3 == h3 && e4 == h4) {
        posEvalue1.classList.add('bien');
        posEvalue2.classList.add('bien');
        posEvalue3.classList.add('bien');
        posEvalue4.classList.add('bien');

        let $youWin = document.getElementById('modal_winned');
        let $textWinned =document.querySelector('.text-winned');
        let $title = document.querySelector('#modal_winned .title');
        let $sentimiento = document.querySelector('#modal_winned .sentimiento');
        $sentimiento.setAttribute('src', './assets/hasher-happy-sticker.gif' )
        $title.textContent = ' Bravo!!!'
        $textWinned.textContent = ' Felicidades Has Ganado'
        $youWin.classList.remove('none');

        $youWin.addEventListener('click', e => {
            const t = e.target;
            
            if(t.matches('button')){
                playAgain();
            }
        }) 
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







