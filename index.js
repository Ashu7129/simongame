var colorBox = ["green","red","yellow","blue"];

var gamePattern = [];
var userPattern = [];

var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
    
});




$(".btn").click(function(){
    playAnimate(this.id);
    userPattern.push(this.id);
    checkSequence(userPattern.length);
    

});



function nextSequence(){
    var pickaBox = colorBox[Math.floor(Math.random()*4)];
    gamePattern.push(pickaBox);
    userPattern = [];
    level++;
    $("#level-title").html("Level "+ level);
    playAnimate(pickaBox);

}

function checkSequence(current){
    if(userPattern[current-1]==gamePattern[current-1]){
        if(userPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over !, Press any key to restart");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 300);
        startOver();  
        
    }
}

function playAnimate(box){
    var audio = new Audio("sounds/"+box+".mp3");
    audio.play();
    $("#"+ box).fadeIn(100).fadeOut(100).fadeIn(100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}