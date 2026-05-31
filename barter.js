let ding = new Audio("audio/ding.mp3");
let doorOpen = new Audio("audio/doorOpen.mp3");
let doorSlam = new Audio("audio/doorSlam.mp3");
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
        squeak.currentTime = 6.5;
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

let toFro = false;  //customers are moving in/out, you must wait a little.
let customers = 8;  //number of customers remaining today
let clientImg = ["images/clients/Grass.png", "images/clients/Exclaim.png", "images/clients/ScabbardClown.png", "images/clients/Cloud.png", "images/clients/Smelly.png", "images/clients/Goose.png", "images/clients/Shotgun.png", "images/clients/BallKid.png"];
let customer1 = document.getElementById("Customer1");       //odds
let customer2 = document.getElementById("Customer2");       //evens
//one walks out, another walks in. The two queues alternate.
const bell = document.getElementById("Bell");
bell.addEventListener("click", () =>{
    ding.currentTime = 0.1;
    ding.play();
    if(!toFro && customers >= 0){
        toFro = true;
        customers --;
        if(customers == 0 || customers % 2 == 0){
            sizeWarp = 300;
            growver = false;
            leave2.play();
            outtaHere(customer2);
            console.log("customer2 is departing.");
            customer2.style.left = "70%";
            customer2.style.left = "30%";
            customer2.src = clientImg[customers];
            setTimeout(() =>{
                sizeWarp = 200;
                growver = false;
                console.log("customer1 has appeared.");
                customer1.style.display = "block";
                doorOpen.currentTime = 0;
                doorOpen.play();
                myTurn1.play();
                comeOnIn(customer1);
                console.log("customer1 is arriving.");
                setTimeout(() =>{
                    console.log("customer2 has disappeared.");
                    customer2.style.display = "none";
                    toFro = false;
                    console.log("Ready for another customer!");
                }, 500);
            }, 500);
        }
        else{
            if(customers != 7){      //first customer means nobody is walking out, but I could add a bogey invisible customer -1
                sizeWarp = 300;
                growver = false;
                leave1.play();
                outtaHere(customer1);
                console.log("customer1 is departing.");
                customer1.style.left = "70%";
                customer1.style.left = "30%";
                customer1.src = clientImg[customers];
                doorOpen.play();
            }
            setTimeout(() =>{
                sizeWarp = 200;
                growver = false;
                console.log("customer2 has appeared.");
                customer2.style.display = "block";
                myTurn2.play();
                console.log("customer2 is arriving.");
                doorSlam.currentTime = 0;
                doorSlam.play();
                comeOnIn(customer2);
                setTimeout(() =>{
                    console.log("customer1 has disappeared.");
                    customer1.style.display = "none";
                    toFro = false;
                    console.log("Ready for another customer!");
                }, 500);
            }, 500);
        }
        
    }
});
let sizeWarp = 200;  //faraway customers are at 20% width by default. 200 here reads as 20.0
let swPoint = 0;    //decimal holder to bypass float shenanigans
let growver = false;
function outtaHere(c){
    if(!growver){
        setTimeout(() =>{
            swPoint = sizeWarp % 10;
            sizeWarp = Math.trunc(sizeWarp / 10);
            c.style.width = sizeWarp + "." + swPoint + "%";
            sizeWarp = (sizeWarp * 10) + swPoint;
            sizeWarp -= 5;
            outtaHere(c);
        }), 50;
    }
    if(sizeWarp <= 200){
        growver = true;
        sizeWarp = 200;
    }
        
    
}
function comeOnIn(c){
    if(!growver){
        setTimeout(() =>{
            swPoint = sizeWarp % 10;
            sizeWarp = Math.trunc(sizeWarp / 10);
            c.style.width = sizeWarp + "." + swPoint + "%";
            sizeWarp = (sizeWarp * 10) + swPoint;
            sizeWarp += 5;
            comeOnIn(c);
        }), 50;
    }
    if(sizeWarp >= 300){
        growver = true;
        sizeWarp = 300;
    }
}

//movement animations and mask swapping for customer1 & 2
const goHome1 = new KeyframeEffect(
    customer1, [
        {transform: "translateX(50%) translateY(40%)"},
        {transform: "translateX(15%) translateY(12%)"},
    ], {
        durations: 1000,
    },
);
let leave1 = new Animation(goHome1, document.timeline);
const goHome2 = new KeyframeEffect(
    customer2, [
        {transform: "translateX(50%) translateY(40%)"},
        {transform: "translateX(15%) translateY(12%)"},
    ], {
        durations: 1000,
    },
);
let leave2 = new Animation(goHome2, document.timeline);

const comeIn1 = new KeyframeEffect(
    customer1, [
        {transform: "translateX(70%) translateY(8%)"},
        {transform: "translateX(50%) translateY(40%)"},
    ], {
        durations: 1000,
    },
);
let myTurn1 = new Animation(comeIn1, document.timeline);

const comeIn2 = new KeyframeEffect(
    customer2, [
        {transform: "translateX(70%) translateY(8%)"},
        {transform: "translateX(50%) translateY(40%)"},
    ], {
        durations: 1000,
    },
);
let myTurn2 = new Animation(comeIn2, document.timeline);

let noMap = document.getElementById("CancelMap");
let wallMap = document.getElementById("Map");
wallMap.addEventListener("click", () =>{
    document.getElementById("WhereGo").style.display = "block";
    noMap.style.display = "block";
    document.getElementById("HomeMap").style.display = "block";
    document.getElementById("LocustMap").style.display = "block";
    document.getElementById("TigerMap").style.display = "block";
    document.getElementById("MushroomMap").style.display = "block";
    document.getElementById("AppraisalMap").style.display = "block";
    document.getElementById("MinesMap").style.display = "block";
    document.getElementById("BikeMap").style.display = "block";
});
noMap.addEventListener("click", () =>{
    document.getElementById("WhereGo").style.display = "none";
    noMap.style.display = "none";
    document.getElementById("HomeMap").style.display = "none";
    document.getElementById("LocustMap").style.display = "none";
    document.getElementById("TigerMap").style.display = "none";
    document.getElementById("MushroomMap").style.display = "none";
    document.getElementById("AppraisalMap").style.display = "none";
    document.getElementById("MinesMap").style.display = "none";
    document.getElementById("BikeMap").style.display = "none";
});
