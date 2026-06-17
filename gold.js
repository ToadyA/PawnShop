
let fg = document.getElementById("Office");
let clerk = document.getElementById("Clerk");
let office = localStorage.getItem('office');    //0: Tiger, 1: Locust, 2: Mushroom, 3: Appraisal
let day = localStorage.getItem('day');          //true: daytime worker, false: night worker; this alternates on visiting the appraisal office particularly.
console.log(office);
if(office == 0){
    document.body.style.backgroundColor = "#35453b";
    fg.src = "images/bankers/TigerOffice.png"
    clerk.src = "images/bankers/Tiger.png";
}
else if(office == 1){
    document.body.style.backgroundColor = "#35453b";
    clerk.src = "images/bankers/Locust0.png";
    fg.src = "images/bankers/LocustOffice.png"
}
else if(office == 2){
    document.body.style.backgroundColor = "#35453b";
    clerk.src = "images/bankers/Mushroom.png";
    fg.src = "images/bankers/LocustOffice.png"
}
else{
    document.body.style.backgroundColor = "#35453b";
    fg.src = "images/bankers/LocustOffice.png"
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

/*  0: Tiger
    1: Locust
    2: Mushroom
    3: Appraisal    */
document.getElementById("TigerMap").addEventListener("click", ()=>{
    localStorage.setItem('office', 0);
    location.href="./Service.html";
});
document.getElementById("LocustMap").addEventListener("click", ()=>{
    localStorage.setItem('office', 1);
    location.href="./Service.html";
});
document.getElementById("MushroomMap").addEventListener("click", ()=>{
    localStorage.setItem('office', 2);
    location.href="./Service.html";
});
document.getElementById("AppraisalMap").addEventListener("click", ()=>{
    localStorage.setItem('office', 3);
    location.href="./Service.html";
});

document.getElementById("HomeMap").addEventListener("click", () =>{
    location.href="./PawnShop.html";
});
document.getElementById("MinesMap").addEventListener("click", () =>{
    location.href="./DigSite.html";
});