let day = localStorage.getItem('day');          //true: daytime worker, false: night worker; this alternates on visiting any location, including revisits.
console.log("Office: " + office + "; Daytime: " + day);
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
let clientImg = ["images/clients/BallKid.png", "images/clients/Exclaim.png", "images/clients/ScabbardClown.png", "images/clients/Cloud.png", "images/clients/Smelly.png", "images/clients/Goose.png", "images/clients/Shotgun.png", "images/clients/Grass.png"];
let customer1 = document.getElementById("Customer1");       //odds
let customer2 = document.getElementById("Customer2");       //evens
let showMe = "";
//one walks out, another walks in. The two queues alternate.
const bell = document.getElementById("Bell");
bell.addEventListener("click", () =>{
    console.log("queue placement on click: " + customers);
    ding.currentTime = 0.1;
    ding.play();
    if(!toFro){
        toFro = true;
        customers --;
        if(customers % 2 == 0){
            sizeWarp = 300;
            growver = false;
            custx = 300;
            custy = 300;
            outtaHere(customer2);
            console.log("queue placement: " + customers);
            setTimeout(() =>{
                sizeWarp = 200;
                growver = false;
                customer1.style.display = "block";
                doorOpen.currentTime = 0;
                doorOpen.play();
                custx = 700;
                custy = 80;
                comeOnIn(customer1);
                if(customers <= 0)
                    customer1.src = clientImg[0];
                else
                    customer1.src = clientImg[customers];
                setTimeout(() =>{
                    customer2.style.display = "none";
                    toFro = false;
                }, 500);
            }, 500);
        }
        else{
            if(customers != 7){      //first customer means nobody is walking out, but I could add a bogey invisible customer -1
                sizeWarp = 300;
                growver = false;
                custx = 300;
                custy = 300;
                outtaHere(customer1);
                console.log("queue placement: " + customers);
                doorOpen.play();
            }
            setTimeout(() =>{
                sizeWarp = 200;
                growver = false;
                customer2.style.display = "block";
                custx = 700;
                custy = 80;
                comeOnIn(customer2);
                if(customers <= 0)
                    customer2.src = clientImg[0];
                else
                customer2.src = clientImg[customers];
                doorSlam.currentTime = 0;
                doorSlam.play();
                setTimeout(() =>{
                    customer1.style.display = "none";
                    toFro = false;
                }, 500);
            }, 500);
        }
        
    }
});
let custx = 0;          //700 represents 70.0%
let custy = 0;          //80 represents 8.0%
let sizeWarp = 200;     //faraway customers are at 20% width by default. 200 here reads as 20.0%
let swPoint = 0;        //decimal holder to bypass float shenanigans
let yPoint = 0;         //SAB but I need two at a time
let growver = false;
function outtaHere(c){
    if(!growver){
        setTimeout(() =>{
            swPoint = custx % 10;
            custx = Math.trunc(custx / 10);
            c.style.left = custx + "." + swPoint + "%";
            custx = (custx * 10) + swPoint;
            custx -= 20; 

            yPoint = custy % 10;
            custy = Math.trunc(custy / 10);
            c.style.top = custy + "." + yPoint + "%";
            custy = (custy * 10) + yPoint;
            custy -= 12;

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
            swPoint = custx % 10;
            custx = Math.trunc(custx / 10);
            c.style.left = custx + "." + swPoint + "%";
            custx = (custx * 10) + swPoint;
            custx -= 19;

            yPoint = custy % 10;
            custy = Math.trunc(custy / 10);
            c.style.top = custy + "." + yPoint + "%";
            custy = (custy * 10) + yPoint;
            custy += 3;

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

///Map

let noMap = document.getElementById("CancelMap");
let wallMap = document.getElementById("Map");
let roadie = false;                                 //mid-[bike animation]
wallMap.addEventListener("click", () =>{
    document.getElementById("WhereGo").style.display = "block";
    noMap.style.display = "block";
    document.getElementById("HomeMap").style.display = "block";
    document.getElementById("LocustMap").style.display = "block";
    document.getElementById("TigerMap").style.display = "block";
    document.getElementById("MushroomMap").style.display = "block";
    document.getElementById("AppraisalMap").style.display = "block";
    document.getElementById("MinesMap").style.display = "block";
    bike.style.display = "block";
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
    bike.style.display = "none";
    x1 = x2;
    y1 = y2;
    navig = 4;
    roadie = false;
});

let legend = {
    0: {x: 5, y: 75},
    1: {x: 5, y: 68},
    2: {x: 30, y: 68},
    3: {x: 40, y: 68},
    4: {x: 40, y: 80},
    5: {x: 54, y: 68},
    6: {x: 45, y: 40},
    7: {x: 40, y: 10},
    8: {x: 32, y: 10},
    9: {x: 10, y: 10},
    10: {x: 10, y: 4},
    11: {x: 53, y: 27},
    12: {x: 66, y: 74},
    13: {x: 75, y: 69},
    14: {x: 60, y: 29},
    15: {x: 65, y: 26},
    16: {x: 59, y: 16},
    17: {x: 80, y: 8},
    18: {x: 80, y: 62},
    19: {x: 85, y: 58},
    20: {x: 90, y: 69},
    21: {x: 80, y: 71},
}

let bike = document.getElementById("BikeMap");
let navig = 4;          //mines: 0; pawn: 4; appraisal: 6; locust: 10; tiger: 17; mushroom: 21;
bike.style.left = legend[4].x + "%";
bike.style.top = legend[4].y + "%";
let x1 = 5;
let y1 = 75;            //where you are (x1,y1) = (left, top)%
let x2 = 5;
let y2 = 75;            //where you're going (x2,y2) = (left, top)%
let inchworm = 0;       //8 beats before resetting to 0 upon reaching the next point.
/*  n = id to be compared against navig (next leg);
    o = current point: [inchworm *(x1 - x2),inchworm *(y1 - y2)];
    p = ultimate destination    */
function mall(n, o, p){
    console.log("mall call. inchworm: "  + inchworm);
    x1 = legend[n].x;
    y1 = legend[n].y;
    x2 = legend[o].x;
    y2 = legend[o].y;
    console.log("Starting at: " + n + " to: " + o);
    setTimeout(() =>{
        bike.style.left = ( (((8 - inchworm) * x1) + ((inchworm) * x2)) /8) + "%";
        bike.style.top = ( (((8 - inchworm) * y1) + ((inchworm) * y2)) /8) + "%";
        if(inchworm < 8)
            inchworm ++;
        else{
            inchworm = 0;
            if(p == 0){
                if(o == 5)
                    o = 3;
                else if(o == 11)
                    o = 6;
                else if(o == 18)
                    o = 15;
                else
                    o --;

                if(n == 5)
                    n = 3;
                else if(n == 11)
                    n = 6;
                else if(n == 18)
                    n = 15;
                else
                    n --;
            }
            else if(p == 4){
                if(o == 5)
                    o = 3;
                else if(o <= 3)
                    o ++;
                else if(o == 8)
                    o = 2;
                else if(o == 11)
                    o = 6;
                else if(o == 18)
                    o = 15;
                else
                    o --;

                if(n == 5)
                    n = 3;
                else if(n <= 3)
                    n ++;
                else if(n == 8)
                    n = 2;
                else if(n == 11)
                    n = 6;
                else if(n == 18)
                    n = 15;
                else
                    n --;
            }
            else if(p == 6){
                if(o == 11)
                    o = 6;
                else if(o == 18)
                    o = 15;
                else if(o == 3)
                    o = 5;
                else if(o == 5)
                    o ++;
                else if(o <= 2)
                    o ++;
                else
                    o --;

                if(n == 11)
                    n = 6;
                else if(n == 18)
                    n = 15;
                else if(n == 3)
                    n = 5;
                else if(n == 5)
                    n ++;
                else if(n <= 2)
                    n ++;
                else
                    n --;
            }
            else if(p == 10){
                if(o == 5)
                    o = 3;
                else if(o == 11)
                    o = 6;
                else if(o == 18)
                    o = 15;
                else if(o >= 5 && o < 10)
                    o ++;
                else if(o == 2)
                    o = 8;
                else if(o < 2)
                    o ++;
                else
                    o --;

                if(n == 5)
                    n = 3;
                else if(n == 11)
                    n = 6;
                else if(n == 18)
                    n = 15;
                else if(n >= 5 && n < 10)
                    n ++;
                else if(n == 2)
                    n = 8;
                else if(n < 2)
                    n ++;
                else
                    n --;
            }
            else if(p == 17){
                if(o == 3)
                    o = 5;
                else if(o == 5)
                    o ++;
                else if(o == 6)
                    o = 11;
                else if(o <= 2)
                    o ++;
                else if(o <= 10)
                    o --;
                else if(o == 18)
                    o = 15;
                else if(o > 18)
                    o --;
                else
                    o ++;

                if(n == 3)
                    n = 5;
                else if(n == 5)
                    n ++;
                else if(n == 6)
                    n = 11;
                else if(n <= 2)
                    n ++;
                else if(n <= 10)
                    n --;
                else if(n == 18)
                    n = 15;
                else if(n > 18)
                    n --;
                else
                    n ++;
            }
            else if(p >= 21){
                if(o == 3)
                    o = 5;
                else if(o == 5)
                    o = 6;
                else if(o == 6)
                    o = 11;
                else if(o <= 2)
                    o ++;
                else if(o <= 10)
                    o --;
                else if(o == 15)
                    o = 18;
                else if(o <= 17 && o > 15)
                    o --;
                else
                    o ++;

                if(n == 3)
                    n = 5;
                else if(n == 5)
                    n = 6;
                else if(n == 6)
                    n = 11;
                else if(n <= 2)
                    n ++;
                else if(n <= 10)
                    n --;
                else if(n == 15)
                    n = 18;
                else if(n <= 17 && n > 15)
                    n --;
                else
                    n ++;
            }
        }
        console.log("Checkpoint from: " + n + " to: " + o);
        if(n != p)
            mall(n, o, p);
        else{
            navig = p;
            console.log("destination reached! Point: " + navig);
            console.log("_________________________");
            roadie = false;
        }
    }, 50);
}
/*  0: Tiger
    1: Locust
    2: Mushroom
    3: Appraisal    */
document.getElementById("TigerMap").addEventListener("click", ()=>{
    if(navig == 17){
        if(localStorage.getItem('day') == true)
            localStorage.setItem('day', false);
        else
            localStorage.setItem('day', true);
        localStorage.setItem('office', 0);
        location.href="./Service.html";
    }
    else if(!roadie){
        roadie = true;
        if(navig == 0)
            mall(navig, navig + 1, 17);
        else if(navig == 6)
            mall(navig, 11, 17);
        else
            mall(navig, navig - 1, 17);
    }
    
});
document.getElementById("LocustMap").addEventListener("click", ()=>{
    if(navig == 10){
        if(localStorage.getItem('day') == true)
            localStorage.setItem('day', false);
        else
            localStorage.setItem('day', true);
        localStorage.setItem('office', 1);
        location.href="./Service.html";
    }
    else if(!roadie){
        roadie = true;
        if(navig == 0)
            mall(navig, navig + 1, 10);
        else if(navig == 6)
            mall(navig, navig + 1, 10);
        else
            mall(navig, navig - 1, 10);
    }
    
});
document.getElementById("MushroomMap").addEventListener("click", ()=>{
    if(navig == 21){
        if(localStorage.getItem('day') == true)
            localStorage.setItem('day', false);
        else
            localStorage.setItem('day', true);
        localStorage.setItem('office', 2);
        location.href="./Service.html";
    }
    else if(!roadie){
        roadie = true;
        if(navig == 0)
            mall(navig, navig + 1, 21);
        else if(navig == 6)
            mall(navig, 11, 21);
        else
            mall(navig, navig - 1, 21);
    }
    
});
document.getElementById("AppraisalMap").addEventListener("click", ()=>{
    if(navig == 6){
        if(localStorage.getItem('day') == true)
            localStorage.setItem('day', false);
        else
            localStorage.setItem('day', true);
        localStorage.setItem('office', 3);
        location.href="./Service.html";
    }
    else if(!roadie){
        roadie = true;
        if(navig == 0)
            mall(navig, navig + 1, 6);
        else
            mall(navig, navig - 1, 6);
    }
});

document.getElementById("HomeMap").addEventListener("click", () =>{
    if(navig == 4){
        if(localStorage.getItem('day') == true)
            localStorage.setItem('day', false);
        else
            localStorage.setItem('day', true);
        location.href="./PawnShop.html";
    }
    else if(!roadie){
        roadie = true;
        if(navig == 0)
            mall(navig, navig + 1, 4);
        else
            mall(navig, navig - 1, 4);
    }
});
document.getElementById("MinesMap").addEventListener("click", () =>{
    if(navig == 0){
        location.href="./DigSite.html";
        if(localStorage.getItem('day') == true)
            localStorage.setItem('day', false);
        else
            localStorage.setItem('day', true);
    }
    else if(!roadie){
        roadie = true;
        mall(navig, navig - 1, 0);
    }
});

let earnings = false;
document.addEventListener("keydown", (e) =>{
    if(e.key == "q"){
        if(!earnings){
            document.getElementById("Contents").style.display = "block";
            document.getElementById("Pouch1").style.display = "block";
            document.getElementById("Pouch2").style.display = "block";
            document.getElementById("Pouch3").style.display = "block";
            document.getElementById("Pouch4").style.display = "block";
            earnings = true;
        }
        else{
            document.getElementById("Contents").style.display = "none";
            document.getElementById("Pouch1").style.display = "none";
            document.getElementById("Pouch2").style.display = "none";
            document.getElementById("Pouch3").style.display = "none";
            document.getElementById("Pouch4").style.display = "none";
            earnings = false;
        }
    }
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

if(localStorage.getItem('day') == null)
    localStorage.setItem('day', true);
console.log("day parity: " + localStorage.getItem('day'));