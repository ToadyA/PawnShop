if(localStorage.getItem('day') == null)
    localStorage.setItem('day', JSON.stringify(false));
console.log("day parity: " + localStorage.getItem('day'));
if(localStorage.getItem('office') == null)
    localStorage.setItem('office', JSON.stringify(0));
if(localStorage.getItem('curios') == null)
    localStorage.setItem('curios', JSON.stringify([emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio()]));
if(localStorage.getItem('display') == null)
    localStorage.setItem('display', JSON.stringify([emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio()]));
let day = JSON.parse(localStorage.getItem('day'));          //true: daytime worker, false: night worker; this alternates on visiting any location, including revisits.
console.log("Daytime: " + day);

let junk = [JSON.parse(localStorage.getItem('curios'))[0], JSON.parse(localStorage.getItem('curios'))[1], JSON.parse(localStorage.getItem('curios'))[2], JSON.parse(localStorage.getItem('curios'))[3]];
console.log("junk accounting: Slot0: " + junk[0].name + ", " + junk[0].look + ", " + junk[0].worth);
console.log("junk accounting: Slot1: " + junk[1].name + ", " + junk[1].look + ", " + junk[1].worth);
console.log("junk accounting: Slot2: " + junk[2].name + ", " + junk[2].look + ", " + junk[2].worth);
console.log("junk accounting: Slot3: " + junk[3].name + ", " + junk[3].look + ", " + junk[3].worth);

let loot = [JSON.parse(localStorage.getItem('curios'))[0].name, JSON.parse(localStorage.getItem('curios'))[1].name, JSON.parse(localStorage.getItem('curios'))[2].name, JSON.parse(localStorage.getItem('curios'))[3].name];
let appValue = [JSON.parse(localStorage.getItem('curios'))[0].look, JSON.parse(localStorage.getItem('curios'))[1].look, JSON.parse(localStorage.getItem('curios'))[2].look, JSON.parse(localStorage.getItem('curios'))[3].look];
let trueValue = [JSON.parse(localStorage.getItem('curios'))[0].worth, JSON.parse(localStorage.getItem('curios'))[1].worth, JSON.parse(localStorage.getItem('curios'))[2].worth, JSON.parse(localStorage.getItem('curios'))[3].worth];

Pouch1 = document.getElementById("Pouch1");
Pouch2 = document.getElementById("Pouch2");
Pouch3 = document.getElementById("Pouch3");
Pouch4 = document.getElementById("Pouch4");

Pouch4.src = "images/curios/" + loot[0] + ".png";
Pouch3.src = "images/curios/" + loot[1] + ".png";
Pouch2.src = "images/curios/" + loot[2] + ".png";
Pouch1.src = "images/curios/" + loot[3] + ".png";

let display = [JSON.parse(localStorage.getItem('display'))[0], JSON.parse(localStorage.getItem('display'))[1], JSON.parse(localStorage.getItem('display'))[2], JSON.parse(localStorage.getItem('display'))[3], JSON.parse(localStorage.getItem('display'))[4], JSON.parse(localStorage.getItem('display'))[5], JSON.parse(localStorage.getItem('display'))[6], JSON.parse(localStorage.getItem('display'))[7]];

let loans = {
    1: {name: "Loan 1", interest: 0, elapsed: 0, principle: 0},
    2: {name: "Loan 2", interest: 0, elapsed: 0, principle: 0},
    3: {name: "Loan 3", interest: 0, elapsed: 0, principle: 0},
}
let eggs = {
    1: {name: "Deposit 1", interest: 0, elapsed: 0, principle: 0},
    2: {name: "Deposit 2", interest: 0, elapsed: 0, principle: 0},
    3: {name: "Deposit 3", interest: 0, elapsed: 0, principle: 0},
}

let ding = new Audio("audio/ding.mp3");
let doorOpen = new Audio("audio/doorOpen.mp3");
let doorSlam = new Audio("audio/doorSlam.mp3");
let squeak = new Audio("audio/squeak.mp3");

let glass = document.getElementById("Barrier");
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

///Punchcard & FlatBat

let yappyBat = false;
function omnom(){
    if(yappyBat){
        setTimeout(() =>{
            document.getElementById("FlatBat").src = "images/pawnshop/FlatBatYap.png";
            setTimeout(() =>{
                document.getElementById("FlatBat").src = "images/pawnshop/FlatBat.png";
                omnom();
            }, 400);
        }, 400);
    }
}

let batPoint = 0;
document.getElementById("FlatBat").addEventListener("click", () =>{
    if(!yappyBat){
        yappyBat = true;
        document.getElementById("BatYap").style.display = "block";
        document.getElementById("BatYap").innerHTML = "<p>" + batSay[batPoint] + "<p>";
        omnom();
    }
    else{
        yappyBat = false;
        document.getElementById("BatYap").innerHTML = "<p><p>";
        document.getElementById("BatYap").style.display = "none";
        batPoint ++;
        if(batPoint > 4)
            batPoint = 0;
        omnom();
    }
    
});

let batSay = [
    "This here card-puncher is my office. Just stick your card in and I'll chomp it once for you. Two chomps is a full day's work.",
    "Customers want to buy your Curios. Just press a key 1-8 corresponding with the Slot you want to sell, starting from the lower-left and moving clockwise.",
    "Customers will resonate more with certain Curios. Try stirring up some conversation with them and sleuth it out.",
    "My active working hours are from 8:30 A.M. to 9:15 A.M., and then from 5 P.M. to Midnight. It's a dreadful split-shift every day.",
    "Employees don't punch their cards these days, so I have to punch them in post so that corporate doesn't throw a fit. Don't worry about it, I'll be okay."
];

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
                else if(o == 8)
                    o = 2;
                else if(o == 18)
                    o = 15;
                else
                    o --;

                if(n == 5)
                    n = 3;
                else if(n == 11)
                    n = 6;
                else if(n == 8)
                    n = 2;
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
        if(day)
            localStorage.setItem('day', JSON.stringify(false));
        else
            localStorage.setItem('day', JSON.stringify(true));
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
        if(day)
            localStorage.setItem('day', JSON.stringify(false));
        else
            localStorage.setItem('day', JSON.stringify(true));
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
        if(day)
            localStorage.setItem('day', JSON.stringify(false));
        else
            localStorage.setItem('day', JSON.stringify(true));
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
        if(day)
            localStorage.setItem('day', JSON.stringify(false));
        else
            localStorage.setItem('day', JSON.stringify(true));
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
        if(day)
            localStorage.setItem('day', JSON.stringify(false));
        else
            localStorage.setItem('day', JSON.stringify(true));
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
        if(day)
            localStorage.setItem('day', JSON.stringify(false));
        else
            localStorage.setItem('day', JSON.stringify(true));
    }
    else if(!roadie){
        roadie = true;
        mall(navig, navig - 1, 0);
    }
});

///Pouch

let earnings = false;
document.addEventListener("keydown", (e) =>{
    if(e.key == "q"){
        if(!earnings){
            document.getElementById("Contents").style.display = "block";
            Pouch1.style.display = "block";
            Pouch2.style.display = "block";
            Pouch3.style.display = "block";
            Pouch4.style.display = "block";
            earnings = true;
        }
        else{
            document.getElementById("Contents").style.display = "none";
            Pouch1.style.display = "none";
            Pouch2.style.display = "none";
            Pouch3.style.display = "none";
            Pouch4.style.display = "none";
            earnings = false;
        }
    }
});
document.getElementById("Sack").addEventListener("click", () =>{
    if(!earnings){
        document.getElementById("Contents").style.display = "block";
        Pouch1.style.display = "block";
        Pouch2.style.display = "block";
        Pouch3.style.display = "block";
        Pouch4.style.display = "block";
        earnings = true;
    }
    else{
        document.getElementById("Contents").style.display = "none";
        Pouch1.style.display = "none";
        Pouch2.style.display = "none";
        Pouch3.style.display = "none";
        Pouch4.style.display = "none";
        earnings = false;
    }
});

///Slots

let curfew = [0, 0, 0, 0, 0, 0, 0, 0];    //keeping track of the last swapped node 0, 1, 2, 3 for each Slot.
let bufferArray = [emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio(), emptyCurio()];   //buffer to move between junk and Slots.
document.getElementById("Slot1").addEventListener("click", () =>{
    if(junk[curfew[0]].name == "Slot"){
        curfew[0] ++;
        if(curfew[0] > 3)
            curfew[0] = 0;
    }
    else{       //move the stuff from junk[] into display[] and vice-versa, using the bufferArray[].
        bufferArray[0].name = display[0].name;
        bufferArray[0].look = display[0].look;
        bufferArray[0].worth = display[0].worth;
        display[0].name = junk[curfew[0]].name;
        display[0].look = junk[curfew[0]].look;
        display[0].worth = junk[curfew[0]].worth;
        junk[curfew[0]].name = bufferArray[0].name;
        junk[curfew[0]].look = bufferArray[0].look;
        junk[curfew[0]].worth = bufferArray[0].worth;

        Pouch4.src = "images/curios/" + junk[0].name + ".png";
        Pouch3.src = "images/curios/" + junk[1].name + ".png";
        Pouch2.src = "images/curios/" + junk[2].name + ".png";
        Pouch1.src = "images/curios/" + junk[3].name + ".png";
        document.getElementById("Slot1").src = "images/curios/" + display[0].name + ".png";

        localStorage.setItem('curios', JSON.stringify(junk));
        localStorage.setItem('display', JSON.stringify(display));
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
        name: "Slot",       //the curio.
        look: 0,
        worth: 0
    };
}
