$(document).ready(function () {


    var characterHealth = 0;
    var opponentHealth = 0;
    var isEmpty = 0;
    var heroSelected = '';
    var enemySelected = '';
    var characterAttackPower = '';

    // Function to select Hero and Enemy for Combat
    // $('.characterBox').on('click', function () {
    //     if (isEmpty < 1) {
    //         heroSelected = this;
    //         characterHealth = ($(this).attr('hitPoints'));
    //         characterAttackPower = parseInt(($(this).attr('attackPower')));
    //         isEmpty += 1;
    //         $('.remainingOpponents').append($(this).parent('.characterSelection'));
    //         $('.hero').append(this);


    //     } else if (isEmpty == 1 && heroSelected !== this) {
    //         enemySelected = this;
    //         opponentHealth = ($(this).attr('hitPoints'));
    //         $('.enemy').append(this);
    //         isEmpty += 1;
    //     }
    //     console.log(characterHealth);
    //     console.log(opponentHealth);
    //     console.log(characterAttackPower);
    // });
    
    var characterSelectionFunction = function(boxClicked) {
        if (isEmpty < 1) {
            heroSelected = boxClicked;
            characterHealth = ($(boxClicked).attr('hitPoints'));
            characterAttackPower = parseInt(($(boxClicked).attr('attackPower')));
            isEmpty = 1;
            $('.remainingOpponents').append($(boxClicked).parent('.characterSelection'));
            $('.hero').append(boxClicked);


        } else if (isEmpty < 2 && heroSelected !== boxClicked) {
            enemySelected = boxClicked;
            opponentHealth = ($(boxClicked).attr('hitPoints'));
            $('.enemy').append(boxClicked);
            isEmpty = 1;
        }
        console.log(characterHealth);
        console.log(opponentHealth);
        console.log(characterAttackPower);
    };


    $('.characterBox').on('click', function () {
        characterSelectionFunction(this);
    });
        



    $('.execute').on('click', function () {
        if (characterHealth > 0 && opponentHealth > 0) {
            //Set Enemy Attack Power to Currently Selected Enemy every time
            var currentEnemyAttack = $(enemySelected).attr('counterAttackPower');
            //Player gets attack and powerup before opponent counter-attack
            opponentHealth -= characterAttackPower;
            characterAttackPower += characterAttackPower;
            //Only trigger counter-attack if enemy is still alive
            if (opponentHealth > 0) {
                characterHealth -= currentEnemyAttack;
            } else {
                console.log("Enemy dead");
                $('.enemy').empty();
                isEmpty = 1;
                console.log(isEmpty);
                $('.characterBox').on('click', function () {
                    characterSelectionFunction(this);
                });
           }
            //If player is killed from counter-attack, display death message
            if (characterHealth <= 0) {
                console.log("You're daed");
                //If platter was killed 
            } 
            console.log(characterHealth);
            console.log(opponentHealth);
            console.log(characterAttackPower);
        }
    })
});


