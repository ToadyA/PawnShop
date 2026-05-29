let squeak = new Audio("audio/squeak.mp3");
const glass = document.getElementById("Barrier");
let open = 0;   //barrier is down, store is closed
glass.addEventListener("click", () =>{
    if(open == 0){
        open = 1;
        squeak.currentTime= 6.5;
        squeak.play();
        setTimeout(() =>{
            glass.src = "images/pawnshop/GlassLift.png";
            setTimeout(() =>{
                glass.src = "images/pawnshop/GlassUp.png";
                open = 2;
                setTimeout(() =>{
                    squeak.currentTime= 10.7;
                }, 400);
            }, 600);
        }, 500);
    }
    else if(open == 2){
        open = 1;
        squeak.currentTime= 6.5;
        squeak.play();
        setTimeout(() =>{
            glass.src = "images/pawnshop/GlassLift.png";
            setTimeout(() =>{
                glass.src = "images/pawnshop/GlassDown.png";
                open = 0;
                setTimeout(() =>{
                    squeak.currentTime= 10.7;
                }, 400);
            }, 600);
        }, 500);
    }
});