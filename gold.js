
let fg = document.getElementById("Office");
let clerk = document.getElementById("Clerk");
import { office } from './barter.js';   //0: Tiger, 1: Locust, 2: Mushroom, 3: Appraisal
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
    if(day)
        clerk.src = "images/bankers/Shark.png";
    else
        clerk.src = "images/bankers/Penguin.png";
}
