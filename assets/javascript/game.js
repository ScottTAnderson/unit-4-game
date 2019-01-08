$(document).ready(function () {
    //Clone of play area (dynamic html) so a reset to original setup can be done
    var characterReset = $('.characterArea').clone();
    //Main game javascript (executed on document.ready and after pushing 'reset' button)
    var gameStart = function () {
        //Hide reset button until game over
        $('.resetButton').hide();
        //Ensure game area matches original HTML from document load
        $('.characterArea').replaceWith(characterReset.clone());
        //Sound effect variables. 
        var scream = new Audio('assets/sounds/wilhelmscream.mp3');
        var saberonhero = new Audio('assets/sounds/lightsaberonhero.mp3');
        var saberonenemy = new Audio('assets/sounds/lightsaberonenemy.mp3');
        var lose = new Audio('assets/sounds/lose.mp3');
        var saber = [
            new Audio('assets/sounds/saberclash1.wav'),
            new Audio('assets/sounds/saberclash2.wav'),
            new Audio('assets/sounds/saberclash3.wav'),
            new Audio('assets/sounds/saberclash4.wav'),
            new Audio('assets/sounds/saberclash6.wav'),
            new Audio('assets/sounds/saberclash7.wav'),
            new Audio('assets/sounds/saberclash8.wav'),
            new Audio('assets/sounds/saberclash9.wav'),
            new Audio('assets/sounds/saberclash10.wav'),
            new Audio('assets/sounds/saberclash11.wav'),
            new Audio('assets/sounds/saberclash12.wav'),
            new Audio('assets/sounds/saberclash13.wav'),
        ];
        //Function variables/trackers
        var characterHealth = 0;
        var opponentHealth = 0;
        var heroEmpty = 0;
        var enemyEmpty = 0;
        var totalBattles = 0;
        var battleEffect = 0;
        var heroSelected = '';
        var enemySelected = '';
        var characterAttackPower = '';
        var currentCharacterAttackPower;
        //Character select before combat begins and when an enemy is killed
        var characterSelectionFunction = function (boxClicked) {
            if (heroEmpty < 1) {
                heroSelected = boxClicked;
                characterHealth = ($(boxClicked).attr('hitPoints'));
                characterAttackPower = parseInt(($(boxClicked).attr('attackPower')));
                currentCharacterAttackPower = characterAttackPower;
                heroEmpty = 1;
                $('.remainingOpponents').append($(boxClicked).parent('.characterSelection'));
                $('.hero').append(boxClicked);
                $(heroSelected).find('.characterHealth').text(characterHealth);
                saberonhero.play();
            } else if (enemyEmpty < 1 && heroSelected !== boxClicked) {
                enemySelected = boxClicked;
                opponentHealth = ($(boxClicked).attr('hitPoints'));
                $('.enemy').append(boxClicked);
                enemyEmpty = 1;
                saberonenemy.play();
                $(enemySelected).find('.characterHealth').text(opponentHealth);
            }
        };
        //Attack logic everytime "execute" is clicked
        var resolveAttack = function () {
            //Set Enemy Attack Power to Currently Selected Enemy
            var currentEnemyAttack = $(enemySelected).attr('counterAttackPower');
            if (enemyEmpty == 0) {
                //Check to see if there is an enemy to face
                $('.damageReport').html('<h3>There is no enemy to face!</h3>');
            } else if (characterHealth > 0 && opponentHealth > 0) {
                //Player gets attack and powerup before opponent counter-attack
                opponentHealth -= currentCharacterAttackPower;
                $('.damageReport').html('<h3>You attacked for ' + currentCharacterAttackPower + ' damage!</h3>');
                currentCharacterAttackPower = characterAttackPower + currentCharacterAttackPower;
                $(enemySelected).find('.characterHealth').text(opponentHealth);
                //Only trigger counter-attack if enemy is still alive
                if (opponentHealth > 0) {
                    battleSound();
                    $('.damageReport').append('<h3>You were attacked for ' + currentEnemyAttack + ' damage!<h3>');
                    characterHealth -= currentEnemyAttack;
                    $(heroSelected).find('.characterHealth').text(characterHealth);
                } else {
                    $('.enemy').empty();
                    scream.play();
                    totalBattles++;
                    enemyEmpty = 0;
                    $('.characterBox').on('click', function () {
                        characterSelectionFunction(this);
                    });
                }
                //If player is killed from counter-attack, display death message shows reset button
                if (characterHealth <= 0) {
                    $('.hero').empty();
                    setTimeout(function () {
                        lose.play();
                    }, 2000);
                    $('.resetButton').show();
                    $('.damageReport').html('<h3>You lost!<h3>');
                    totalBattles = 0;

                }
            }
            //Shows win dialogue and shows reset button
            if (totalBattles == 3) {
                $('.resetButton').show();
                $('.damageReport').html('<h3>You won!</h3>');
                totalBattles = 0;

            }
        };
        //Picks a random sound effect from the saber object so audio isn't too repetative
        var battleSound = function () {
            battleEffect = Math.floor(Math.random() * 12);
            saber[battleEffect].play();
        }

        $('.characterBox').on('click', function () {
            characterSelectionFunction(this);
        });

        $('.execute').on('click', function () {
            console.log(totalBattles);
            resolveAttack();
        });

        $('.resetButton').on('click', function () {
            gameStart();
            $('.resetButton').hide();
        })
    };
    gameStart();
});


