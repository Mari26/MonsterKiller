const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE= 14;
const STRONG_ATTACK_VALUE= 17;
const HEAL_VALUE = 20;
const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK= 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK ='MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER ='GAME_OVER';
const enteredValue = prompt('maxlife for you and monster','100');

let chosenMaxLife = parseInt(enteredValue);
let battlelog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife = 100;
};


let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife =true;

adjustHealthBars(chosenMaxLife);

function writeTolog(ev , val ,monsterHealth, PlayerHealth){
    let logEntry;
  if (ev === LOG_EVENT_PLAYER_ATTACK){
   logEntry = {
    event : ev,
    value : val,
    target : 'MONSTER',
    finalMonsterHealth : monsterHealth,
    finalPlayerHealth :  PlayerHealth,
   };
  
  }else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK){
    logEntry = {
        event : ev,
        value : val,
        target : 'MONSTER',
        finalMonsterHealth : monsterHealth,
        finalPlayerHealth :  PlayerHealth,
       };
     
  }else if (ev === LOG_EVENT_MONSTER_ATTACK){
    logEntry = {
        event : ev,
        value : val,
        target : 'PLAYER',
        finalMonsterHealth : monsterHealth,
        finalPlayerHealth :  PlayerHealth,
       };
     
  }else if (ev === LOG_EVENT_PLAYER_HEAL){
    logEntry = {
        event : ev,
        value : val,
        target : 'PLAYER',
        finalMonsterHealth : monsterHealth,
        finalPlayerHealth :  PlayerHealth,
       };
  }else if (ev === LOG_EVENT_GAME_OVER){
    logEntry = {
        event : ev,
        value : val,
        finalMonsterHealth : monsterHealth,
        finalPlayerHealth :  PlayerHealth,
       };
}
battlelog.push(logEntry);
};

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
};

function endRound(){
const initialPlayerHealth = currentPlayerHealth;  
const playerDamage = dealPlayerDamage (MONSTER_ATTACK_VALUE);
currentPlayerHealth -= playerDamage;
writeTolog(LOG_EVENT_MONSTER_ATTACK ,playerDamage,currentMonsterHealth ,currentPlayerHealth );
if(currentPlayerHealth <= 0 && hasBonusLife){
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('thanks bonus,you are alive');
}
if(currentMonsterHealth <= 0 && currentPlayerHealth > 0){
    alert('you won bro');
    reset();
    writeTolog(LOG_EVENT_GAME_OVER,
        'player won',
        currentMonsterHealth ,
        currentPlayerHealth );

}else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0 ){
    alert ('you lost');
    reset();
    writeTolog(LOG_EVENT_GAME_OVER,
        'monster won',
        currentMonsterHealth ,
        currentPlayerHealth );
}else if (currentPlayerHealth <= 0 && currentMonsterHealth <=0){
    alert('you have a draw');
    reset();
    writeTolog(LOG_EVENT_GAME_OVER,
        'a draw',
        currentMonsterHealth ,
        currentPlayerHealth );
}
}

function attackMonster(mode){
    let maxDamage;
    let logEvent;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    }else if (mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE; 
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
const damage = dealMonsterDamage(maxDamage);
currentMonsterHealth -= damage;
writeTolog(logEvent,
    damage,
    currentMonsterHealth ,
    currentPlayerHealth );
endRound();

}

function attackHandler(){
    attackMonster(MODE_ATTACK);
};

function strongAttackHandler(){
  attackMonster(MODE_STRONG_ATTACK);
};

function healPlayerHandler(){
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert('blablu');
        healValue = chosenMaxLife - currentPlayerHealth;
    }else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeTolog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth ,
        currentPlayerHealth );

    endRound();

}

function printLogHandler() {
    console.log(battlelog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);