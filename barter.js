const loans = {
    1: {name: "Loan 1", interest: 0, elapsed: 0, principle: 0},
    2: {name: "Loan 2", interest: 0, elapsed: 0, principle: 0},
    3: {name: "Loan 3", interest: 0, elapsed: 0, principle: 0},
}
const eggs = {
    1: {name: "Deposit 1", interest: 0, elapsed: 0, principle: 0},
    2: {name: "Deposit 2", interest: 0, elapsed: 0, principle: 0},
    3: {name: "Deposit 3", interest: 0, elapsed: 0, principle: 0},
}
const curio = {     //expand this to have more items
    1: {name: "Buoy", age: 0, condition: 0, unique: false, value: 0},
    2: {name: "Bark Shard", age: 0, condition: 0, unique: false, value: 0},
    3: {name: "Glask", age: 0, condition: 0, unique: false, value: 0},
}

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
let showMe = "";
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
            //leave2.play();
            custx = customer2.style.left * 10;
            custy = customer2.style.top * 10;
            outtaHere(customer2);
            console.log("customer2 is departing.");
            customer2.style.left = "70%";
            customer2.style.top = "30%";
            customer2.src = clientImg[customers];
            setTimeout(() =>{
                sizeWarp = 200;
                growver = false;
                console.log("customer1 has appeared.");
                customer1.style.display = "block";
                doorOpen.currentTime = 0;
                doorOpen.play();
                //myTurn1.play();
                custx = customer1.style.left * 10;
                custy = customer1.style.top * 10;
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
                //leave1.play();
                custx = customer1.style.left * 10;
                custy = customer1.style.top * 10;
                outtaHere(customer1);
                console.log("customer1 is departing.");
                customer1.style.left = "70%";
                customer1.style.top = "30%";
                customer1.src = clientImg[customers];
                doorOpen.play();
            }
            setTimeout(() =>{
                sizeWarp = 200;
                growver = false;
                console.log("customer2 has appeared.");
                customer2.style.display = "block";
                //myTurn2.play();
                custx = customer2.style.left * 10;
                custy = customer2.style.top * 10;
                comeOnIn(customer2);
                console.log("customer2 is arriving.");
                doorSlam.currentTime = 0;
                doorSlam.play();
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
let custxOut = 700;        //70 to 50 to 30; 700 represents 70.0%
let custyOut = 80;         //8 to 28 to 8; 80 represents 8.0%
let sizeWarpOut = 200;     //faraway customers are at 20% width by default. 200 here reads as 20.0%
let swPointOut = 0;        //decimal holder to bypass float shenanigans
let yPointOut = 0;         //SAB but I need two at a time
let growver = false;
function outtaHere(c){
    showMe = custx.toString() + " y: " + custy.toString();
    console.log("function call out - x: " + showMe);
    if(!growver){
        setTimeout(() =>{
            swPointOut = custxOut % 10;
            custxOut = Math.trunc(custxOut / 10);
            //c.style.left = custxOut + "." + swPointOut + "%";
            c.innerHTML = "<style=\"left: " + custxOut + "." + swPointOut + "%; top: " + custyOut + "." + yPointOut + "%;\">";
            custxOut = (custxOut * 10) + swPointOut;
            custxOut -= 10; 

            yPointOut = custyOut % 10;
            custyOut = Math.trunc(custyOut / 10);
            //c.style.top = custyOut + "." + yPointOut + "%";
            c.innerHTML = "<style=\"left: " + custxOut + "." + swPointOut + "%; top: " + custyOut + "." + yPointOut + "%;\">";
            custyOut = (custyOut * 10) + yPointOut;
            custy -= 10;

            swPointOut = sizeWarpOut % 10;
            sizeWarpOut = Math.trunc(sizeWarpOut / 10);
            c.style.width = sizeWarpOut + "." + swPointOut + "%";
            sizeWarpOut = (sizeWarpOut * 10) + swPointOut;
            sizeWarpOut -= 5;
            console.log("pre-reset - x: " + custx + " y: " + custy);
            outtaHere(c);
        }), 50;
    }
    if(sizeWarpOut <= 200){
        growver = true;
        sizeWarpOut = 200;
    }
}
let custxIn = 700;        //don't clash
let custyIn = 80;         
let sizeWarpIn = 200;     
let swPointIn = 0;        
let yPointIn = 0;         
function comeOnIn(c){
    showMe = custx.toString() + " y: " + custy.toString();
    console.log("function call in - x: " + showMe);
    if(!growver){
        setTimeout(() =>{
            swPointIn = custxIn % 10;
            custxIn = Math.trunc(custxIn / 10);
            //c.style.left = custxIn + "." + swPointIn + "%";
            c.innerHTML = "<style=\"left: " + custxIn + "." + swPointIn + "%; top: " + custyIn + "." + yPointIn + "%;\">";
            custxIn = (custxIn * 10) + swPointIn;
            custxIn -= 15;

            yPointIn = custyIn % 10;
            custyIn = Math.trunc(custyIn / 10);
            //c.style.top = custyIn + "." + yPointIn + "%";
            c.innerHTML = "<style=\"left: " + custxIn + "." + swPointIn + "%; top: " + custyIn + "." + yPointIn + "%;\">";
            custyIn = (custyIn * 10) + yPointIn;
            custyIn += 10;

            swPointIn = sizeWarpIn % 10;
            sizeWarpIn = Math.trunc(sizeWarpIn / 10);
            c.style.width = sizeWarpIn + "." + swPointIn + "%";
            sizeWarpIn = (sizeWarpIn * 10) + swPointIn;
            sizeWarpIn += 5;
            comeOnIn(c);
        }), 50;
    }
    if(sizeWarpIn >= 300){
        growver = true;
        sizeWarpIn = 300;
    }
}


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

let office = 0;
/*  0: Tiger
    1: Locust
    2: Mushroom
    3: Appraisal    */
document.getElementById("TigerMap").addEventListener("click", ()=>{
    office = 0;
    location.href="./Service.html";
});
document.getElementById("LocustMap").addEventListener("click", ()=>{
    office = 1;
    location.href="./Service.html";
});
document.getElementById("MushroomMap").addEventListener("click", ()=>{
    office = 2;
    location.href="./Service.html";
});
document.getElementById("AppraisalMap").addEventListener("click", ()=>{
    office = 3;
    location.href="./Service.html";
});

//fetch the data on what today is: the field weather, the time of day, the number day since beginning, and whether it is a holiday.
function getLoan(){
    const loan = localStorage.getItem('loan');
    return loan ? JSON.parse(loan) : [];            //returns empty by default to catch an exception
    console.log("got the loan!");
}
function emptyLoan(){
    return{
        name: '',       //which bank
        interest: 0,    //interest on the loan per day
        elapsed: 0,     //how many days interest will have racked up for so far
        principle: 0    //base amount borrowed
    };
}
function getEgg(){
    const egg = localStorage.getItem('egg');
    return egg ? JSON.parse(egg) : [];
    console.log("nest egg secured!")
}
function emptyEgg(){
    return{
        name: '',       //which bank
        interest: 0,    //interest on the deposit per day
        elapsed: 0,     //how many days deposit will have racked up for so far
        principle: 0    //base amount deposited
    };
}

function emptyCurio(){
    return{
        name: '',       //the curio. 
        age: 0,         //higher age yields exponential returns
        condition: 0,   //higher condition yields linear returns
        unique: false,  //unique is a static multiplied amount, but it scales higher for age than for condition
        value: 0        //defaults to a low number (what your inexperienced self ascertains), but appraising it will apply the age and condition and unique modifiers
    };
}
