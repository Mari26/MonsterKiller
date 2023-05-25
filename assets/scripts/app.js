const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE= 14;
const STRONG_ATTACK_VALUE= 17;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK= 'STRONG_ATTACK';

const enteredValue = prompt('maxlife for you and monster','100');

let chosenMaxLife = parseInt(enteredValue);
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife = 100;
};



let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife =true;


adjustHealthBars(chosenMaxLife);

function reset(){
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
};

function endRound(){
const initialPlayerHealth = currentPlayerHealth;  
const playerDamage = dealPlayerDamage (MONSTER_ATTACK_VALUE);
currentPlayerHealth -= playerDamage;

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
}else if(currentPlayerHealth <= 0 && currentMonsterHealth > 0 ){
    alert ('you lost');
    reset();
}else if (currentPlayerHealth <= 0 && currentMonsterHealth <=0){
    alert('you have a draw');
    reset();
}
}

function attackMonster(mode){
    let maxDamage;
    if(mode === MODE_ATTACK){
        maxDamage = ATTACK_VALUE;
    }else if (mode === MODE_STRONG_ATTACK){
        maxDamage = STRONG_ATTACK_VALUE; 
    }
const damage = dealMonsterDamage(maxDamage);
currentMonsterHealth -= damage;
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
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    endRound();

}



attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);