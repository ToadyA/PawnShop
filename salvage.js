let day = localStorage.getItem('day');          //true: daytime worker, false: night worker; this alternates on visiting the appraisal office particularly.
captain = document.getElementById("Operator");
if(day)
    captain.src = "images/mines/Bellows.png";
else
    captain.src = "images/mines/Warthog.png";

/*  There are rules to determine what layers are possible next. We default to 3 layers of water plus 1 layer of rock.
Once no layers are water anymore, non-rock layers become much more likely. This is overridden if you hit a Bunker.
A Bunker layer will flip parity and make loot extemely likely. Hitting another Bunker layer flips it back.
Even within a Bunker, rock is possible to get for a layer. Loot valuability is higher for every non-rock layer included in your slice.
If you hit two rock layers in a row and you are not in a Bunker, you have a high chance of hitting a Fossil.
Fossils' value rises exponentially with more Fossils included in the slice, but their condition becomes awful if any non-rock layers are paired in too.
If you manage getting four rock layers in one, you are guaranteed to get one bonus pity Relic in addition to your low-value rocks.
Volcanic rock guarantees high value for anything found next, so long as volcanic rock is within the slice.
                    base    bnkr    fosl    volc    vcfs
0: water            2%      4%      2%      0%      0%
1: rock             53%     8%      18%     13%     8%
2: loot             5%      63%     5%      40%     30%
21: fossil          16%     0%      45%     15%     30%
85: volcanic rock   8%      0%      15%     12%     12%
5: bunker           16%     25%     15%     20%     20%
*/
let syringe = [0,0,0,0];
let bunker = false;
function nextLayer(a, b, c, d){
    //pop the top layer, then roll for the next layer and push the result up from the bottom.
    const e = 0;
    const f = Math.random(0, 1) * 100;
    if(bunker){                             //bunker is active
        if(f <= 4)
            e = 0;
        else if(f <= 12)
            e = 1;
        else if(f <= 75)
            e = 2;
        else
            e = 5;
    }
    else{
        if(a + b + c + d >= 85){
            if((a + b + c + d) % 85 >= 21){  //fossil and volcanic rock
                if(f <= 8)
                    e = 1;
                else if(f <= 38)
                    e = 2;
                else if(f <= 68)
                    e = 21;
                else if(f <= 80)
                    e = 85;
                else
                    e = 5;
            }
            else{                           //volcanic rock within syringe
                if(f <= 13)
                    e = 1;
                else if(f <= 53)
                    e = 2;
                else if(f <= 68)
                    e = 21;
                else if(f <= 80)
                    e = 85;
                else
                    e = 5;
            }
        }
        else if(a + b + c + d >= 21){       //fossil within syringe
            if(f <= 2)
                e = 0;
            else if(f <= 20)
                e = 1;
            else if(f <= 25)
                e = 2;
            else if(f <= 70)
                e = 21;
            else if(f <= 85)
                e = 85;
            else
                e = 5;
        }
        else{                               //base: water and/or rocks
            if(f <= 2)
                e = 0;
            else if(f <= 55)
                e = 1;
            else if(f <= 60)
                e = 2;
            else if(f <= 76)
                e = 21;
            else if(f <= 84)
                e = 85;
            else
                e = 5;
        }
    }
    if(e == 5){
        if(bunker)
            bunker = false;
        else
            bunker = true;
    }

    return e;
}

function valuation(){
    //determine the value of the finds based on the syringe contents.
    ;
}

let deep = 0;
console.log("deep: " + deep);
crank = document.getElementById("Crank");
crank.addEventListener("click", () =>{
    deep ++;
    if(deep % 3 == 1)
        crank.style.top = '44%';
    else if(deep % 3 == 2)
        crank.style.top = '40%';
    else
        crank.style.top = '35.5%';
    crank.style.cursor = 'pointer';
    console.log("deep: " + deep);
});

let talk = 0;        //1 = talking, 2 = cooldown, 0 = available to talk.
captain.addEventListener("click", ()=>{
    if(talk == 0){
        if(day)
            bellowTalky();
        else
            hogTalky();
        talk = 1;
    }
    else{
        talk = 2;
        setTimeout(() =>{
            talk = 0;
            if(day)
                captain.src = "images/mines/Bellows.png";
            else
                captain.src = "images/mines/Warthog.png";
        }, 100);
    }
    
});
function bellowTalky(){
    captain.src = "images/mines/BellowsChange.png";
        setTimeout(() =>{
            captain.src = "images/mines/BellowsFlip.png";
            setTimeout(() =>{
                captain.src = "images/mines/BellowsBack.png";
                setTimeout(() =>{
                    captain.src = "images/mines/BellowsFlip.png";
                    setTimeout(() =>{
                        if(talk)
                            bellowTalky();
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
}
function hogTalky(){
    captain.src = "images/mines/WarthogLeft.png";
        setTimeout(() =>{
            captain.src = "images/mines/Warthog.png";
            setTimeout(() =>{
                captain.src = "images/mines/WarthogRight.png";
                setTimeout(() =>{
                    captain.src = "images/mines/Warthog.png";
                    setTimeout(() =>{
                        if(talk)
                            bellowTalky();
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
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
