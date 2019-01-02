$(document).ready(function () {

    
    var characterHealth = 0;
    var opponentHealth = 0;
    var isEmpty = 0;
    var heroSelected = '';
    var enemySelected = '';
    var characterAttackPower = '';

    // Function to select Hero and Enemy for Combat
    $('.characterBox').on('click', function () {
        if (isEmpty < 1) {
            heroSelected = this;
            characterHealth = ($(this).attr('hitPoints'));
            characterAttackPower = parseInt(($(this).attr('attackPower')));
            isEmpty += 1;
            $('.remainingOpponents').append($(this).parent('.characterSelection'));
            $('.hero').append(this);


        } else if (isEmpty == 1 && heroSelected !== this) {
            enemySelected = this;
            opponentHealth = ($(this).attr('hitPoints'));
            $('.enemy').append(this);
            isEmpty += 1;
        }
        console.log(characterHealth);
        console.log(opponentHealth);
        console.log(characterAttackPower);
    });


   
    $('.execute').on('click', function () {
        if(characterHealth > 0) {
        var currentEnemyAttack = $(enemySelected).attr('counterAttackPower');
        opponentHealth -= characterAttackPower;
        characterHealth -= currentEnemyAttack;
        characterAttackPower += characterAttackPower;
        console.log(characterHealth);
        console.log(opponentHealth);
        console.log(characterAttackPower);
        }
    })
});


