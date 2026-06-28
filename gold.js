
let fg = document.getElementById("Office");
let clerk = document.getElementById("Clerk");
let office = localStorage.getItem('office');    //0: Tiger, 1: Locust, 2: Mushroom, 3: Appraisal
let day = localStorage.getItem('day');          //true: daytime worker, false: night worker; this alternates on visiting the appraisal office particularly.
console.log(office);
let plotPoint = 4;
if(office == 0){
    document.body.style.backgroundColor = "#35453b";
    fg.src = "images/bankers/TigerOffice.png"
    clerk.src = "images/bankers/Tiger.png";
    plotPoint = 17;
}
else if(office == 1){
    document.body.style.backgroundColor = "#35453b";
    clerk.src = "images/bankers/Locust0.png";
    fg.src = "images/bankers/LocustOffice.png"
    plotPoint = 10;
}
else if(office == 2){
    document.body.style.backgroundColor = "#35453b";
    clerk.src = "images/bankers/Mushroom.png";
    fg.src = "images/bankers/LocustOffice.png"
    plotPoint = 21;
}
else{
    document.body.style.backgroundColor = "#35453b";
    fg.src = "images/bankers/LocustOffice.png"
    plotPoint = 6;
    if(day){
        clerk.src = "images/bankers/Shark.png";
        localStorage.setItem('day', false);
    }
    else{
        clerk.src = "images/bankers/Penguin.png";
        localStorage.setItem('day', true);
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
    navig = plotPoint;
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
bike.style.left = legend[plotPoint].x + "%";
bike.style.top = legend[plotPoint].y + "%";

let navig = plotPoint;          //mines: 0; pawn: 4; appraisal: 6; locust: 10; tiger: 17; mushroom: 21;
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
                else if(o == 6)
                    o = 11;
                else if(o < 6)
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
                else if(n == 6)
                    n = 11;
                else if(n < 6)
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
                else if(o == 6)
                    o = 11;
                else if(o < 6)
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
                else if(n == 6)
                    n = 11;
                else if(n < 6)
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
    if(navig == 4)
        location.href="./PawnShop.html";
    else if(!roadie){
        roadie = true;
        if(navig == 0)
            mall(navig, navig + 1, 4);
        else
            mall(navig, navig - 1, 4);
    }
});
document.getElementById("MinesMap").addEventListener("click", () =>{
    if(navig == 0)
        location.href="./DigSite.html";
    else if(!roadie){
        roadie = true;
        mall(navig, navig - 1, 0);
    }
});
