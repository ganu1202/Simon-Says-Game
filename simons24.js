let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;

let btns=['yellow','red','purple','green'];

//1) pressing any key on document that will start the game,so
document.addEventListener('keypress',function(){
    if(started==false){             //to make sure that thing inside the if block will execue only when start is false
        console.log('Game started');
        started=true;

        levelUp()           //we will call as game will start
    }
    
});

let h2=document.querySelector('h2');        //for updating h2 we are accessing it.


function gameFlash(btn){
    btn.classList.add('flash');             //btn bg-color will change for 1sec 
    setTimeout(function(){
        btn.classList.remove('flash');      //turned back same bg-color
    },250);
};


function userFlash(btn){
    btn.classList.add('userFlash');             //btn bg-color will change for 1sec 
    setTimeout(function(){
        btn.classList.remove('userFlash');      //turned back same bg-color
    },250);
};



//2)In step-2 random button will flash and we will move to level-1 and heading will get update to current level.
function levelUp(){         //we will call this function as game will start 
    userSeq=[];
    level++;                //as game starts level will increment to 1
    h2.innerText=`Level ${level}`;

    //random btn choose
    let randIdx=Math.floor(Math.random()*3);        //to get random inther btw 0 and 3.
    let randColor=btns[randIdx];                    //accessing btn color using the indx.
    let randBtn=document.querySelector(`.${randColor}`);        //accessing btn using the class 
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
    //the button is flashing many times , firstly when user presses a key then when user presses any button so on.... (for this flash we will create a function)
    gameFlash(randBtn);
};


function checkAns(idx){
    //at each level new color is generated, to track the level 
    console.log("current level:",level);    //current level value is = size of gameSeq and userSeq
    
    // let idx=level-1;                     //fixed index
    // console.log(userSeq[idx]);
    // console.log(gameSeq[idx])


    if (userSeq[idx]==gameSeq[idx]){        // for middle color
        // console.log('same value');
        if(userSeq.length==gameSeq.length){     //if user presses btn for last color
            setTimeout(levelUp,1000);           //we can't see if same color flashes 2 times so we set timeout
        }
        
    }
    else{
            // h2.innerText=`Game over! Press any key to start`;
            h2.innerHTML=`Game over! Your score was <b>${level}</b> <br> Press any key to start`;
            document.querySelector('body').style.backgroundColor='red';
            setTimeout(function(){
                document.querySelector('body').style.backgroundColor='white';
            },150);
            reset();
    }
}   

//3)adding event listeners for btn press-
function btnPress(){
    // console.log('btn was pressed');
    // console.log(this)       //access which btn was pressed;
    let btn=this;               //the btn which we pressed.
    userFlash(btn);              //it should flash we user presses a button


    userColor=btn.getAttribute("id");              //accessing the color  using  id of of respective btns
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);


}




let allbtns=document.querySelectorAll('.btn');
for(btn of allbtns){
    btn.addEventListener('click',btnPress);

}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}

//4) adding random colors generated in gameSeq , this is done in levelUp function
    // ->adding the color of btn that user has pressed to userSeq


    //if game_seq=[yellow,purple,green,red]
    //user seq=yellow,purple,green
    // if it is checking middle one the -> no need to do anything ,wait for user to press next btn->check 
    //if it is checking the last one then -> level up -> game dhould genearte new color
    //as levelup occurs user must click buttons from first color so we need to reset the userSeq
    //as game will complete , we should set start to false so for that we will create a function called reset()


//printing score
//when game completes bg to red for seconds
//tracking highest score H.W

