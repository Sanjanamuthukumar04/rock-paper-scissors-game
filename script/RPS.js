
let score=JSON.parse(localStorage.getItem('score')) || {
    wins:0,
    losses:0,
    ties:0
};

updateScoreElement();

let isAutoPlaying=false;
let intervalID;

function autoPlay(){
    if(!isAutoPlaying){
        intervalID=setInterval(function(){
        const playerMove=pickCompMove();
        playGame(playerMove);
        }, 1000);
        isAutoPlaying=true;
        document.querySelector(".auto-play-button").innerHTML='Stop Play';
    } else{
        clearInterval(intervalID);
        isAutoPlaying=false;
        document.querySelector(".auto-play-button").innerHTML='Auto Play';
        }
}

function playGame(playerMove){
    const comp_move=pickCompMove();
    let result='';
    if (playerMove==='rock'){
        if(comp_move==='rock'){
            result='tie';
        }
        else if(comp_move==='paper'){
            result='you lose';
        }
        else if(comp_move==='scissors'){
            result='you win';
        }
    } 
    else if(playerMove==='paper'){
        if(comp_move==='rock'){
            result='you win';
        }
        else if(comp_move==='paper'){
            result='tie';
        }
        else if(comp_move==='scissors'){
            result='you lose';
        }
    } 
    else if (playerMove==='scissors'){
        if(comp_move==='rock'){
            result='you lose';
        }
        else if(comp_move==='paper'){
            result='you win';
        }
        else if(comp_move==='scissors'){
            result='tie';
        }
    }
    
    if(result==="you win"){
        score.wins++;
    }
    else if(result==="you lose"){
        score.losses++;
    }
    else if(result==='tie'){
        score.ties++;
    }

    localStorage.setItem('score',JSON.stringify(score)); 

    updateScoreElement();
    

    document.querySelector('.js-result').innerHTML=result;
    document.querySelector('.js-moves').innerHTML=`you <img src="pics/${playerMove}.png" class="move-icon"><img src="pics/${comp_move}.png" class="move-icon">computer`;
    
}

function updateScoreElement(){
    document.querySelector('.js-score')
        .innerHTML=`Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}
function pickCompMove(){
    const random_no=Math.random();
    if (random_no>=0 && random_no<1/3){
        comp_move='rock';
    }
    else if (random_no>=1/3 && random_no<2/3){
        comp_move='paper';
    }
    else if (random_no>=2/3 && random_no<=1){
        comp_move='scissors';
    }
    console.log(comp_move);
    return comp_move;
}
