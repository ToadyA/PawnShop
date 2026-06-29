document.body.style.backgroundColor = "#599aac";
let day = localStorage.getItem('day');          //true: daytime worker, false: night worker; this alternates on visiting any location, including revisits.
console.log("Daytime: " + day);
captain = document.getElementById("Operator");
if(day){
    console.log("Sun alert!");
    captain.src = "images/mines/Bellows.png";
}
else{
    console.log("Sun alertn't.");
    captain.src = "images/mines/Warthog.png";
}
console.log("This file has been updated and changed!");
let busy = false;       //pressing 's' or 'w' while busy will have no effect!

/*  There are rules to determine what layers are possible next. We default to 3 layers of water plus 1 layer of rock.
Once no layers are water anymore, non-rock layers become much more likely. This is overridden if you hit a Bunker.
A Bunker layer will flip parity and make loot extemely likely. Hitting another Bunker layer flips it back.
Even within a Bunker, rock is possible to get for a layer. Loot valuability is higher for every non-rock layer included in your slice.
If you hit rock and you are not in a Bunker, you have a high chance of hitting a Fossil next.
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
let loot = ["", "", "", ""];
let appValue = [0, 0, 0, 0];
let trueValue = [0, 0, 0, 0];
let bunker = false;
function nextLayer(a, b, c, d){
    //pop the top layer, then roll for the next layer and push the result up from the bottom.
    console.log("nextLayer() called.");
    let e = 0;
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
    console.log("return value is: " + e);
    return e;
}

let layer0 = document.getElementById("Layer0");     //the next layer, not yet encountered
let layer1 = document.getElementById("Layer1");
let layer2 = document.getElementById("Layer2");
let layer3 = document.getElementById("Layer3");
let layer4 = document.getElementById("Layer4");
let layer5 = document.getElementById("Layer5");     //a layer which has been passed, now purely accessory
let colors = ["#306d58", "#444c43", "#506b0f", "#41572d", "#25332d", "#171a19"];
    /*
    #306d58     water           0
    #444c43     rock            1
    #506b0f     loot            2
    #41572d     fossil          21
    #25332d     volcanic rock   85
    #171a19     bunker          5
    */
function boreDown(a, b, c, d){
    busy = true;
    console.log("bore call! s0: " + syringe[0] + ", s1: " + syringe[1] + ", s2: " + syringe[2] + ", s3: " + syringe[3] + ".");
    let bevel = 0;        //the next layer
    if(deep <= 3){
        for(i = 3; i >= 0; i --){
            if(i <= deep)
                syringe[i] = 1;
            else
                syringe[i] = 0;
            console.log("syringe contents at " + i + ": " + syringe[i]);
        }
        layer0.style.backgroundColor = "#444c43";             //bottom layer (invisible, squashed)
        layer1.style.backgroundColor = colors[syringe[0]];      //bottommost visible layer
        layer2.style.backgroundColor = colors[syringe[1]];
        layer3.style.backgroundColor = colors[syringe[2]];
        layer4.style.backgroundColor = colors[syringe[3]];
        layer5.style.backgroundColor = "#306d58";             //topmost layer
    }
    else{
        for(i = 4; i >= 0; i --){
            if(syringe[i] == 3)
                syringe[i] = 21;
            else if(syringe[i] == 4)
                syringe[i] = 85;
        }
        bevel = nextLayer(a, b, c, d);
        layer5.style.backgroundColor = colors[syringe[3]]       //topmost layer
        n = syringe[3];
        for(i = 4; i >= 1; i --){
            syringe[i] = syringe[i - 1];
            if(syringe[i] == 21)
                syringe[i] = 3;
            else if(syringe[i] == 85)
                syringe[i] = 4;
            console.log("syringe assignment #" + i + ": " + syringe[i]);
        }
        if(bevel == 21)
            bevel = 3;
        else if(bevel == 85)
            bevel = 4;
        syringe[0] = bevel;
        layer0.style.backgroundColor = colors[bevel];           //bottom layer (invisible, squashed)
        layer1.style.backgroundColor = colors[syringe[0]];      //bottommost visible layer
        layer2.style.backgroundColor = colors[syringe[1]];
        layer3.style.backgroundColor = colors[syringe[2]];
        layer4.style.backgroundColor = colors[syringe[3]];
    }
    for(i = 4; i >= 0; i --){
        if(syringe[i] == 3)
            syringe[i] = 21;
        else if(syringe[i] == 4)
            syringe[i] = 85;
    }
    console.log("bore all done! s0: " + syringe[0] + ", s1: " + syringe[1] + ", s2: " + syringe[2] + ", s3: " + syringe[3] + ".");
    deep ++;
    console.log("________________________________________");
    busy = false;
}
let curios = ["Bark", "BearPlush", "Buoy", "CupcakeHolder", "FishMount", "Jeans", "LightsKevin", "Hand", "SoadiDiet", "RightCon"];
let treasures = ["Geode", "BearPlushVintage", "BuoyReciept", "CupcakeHolderCat", "FishMountRoyal", "JeansVintage", "LightsPizza", "Swiper", "Soadi", "LeftCon"];
    /*
    ---         Curios          ---
    0: Bark;            Geode
    1: BearPlush;       BearPlushVintage
    2: Buoy;            BuoyReciept
    3: CupcakeHolder;   CupcakeHolderCat
    4: FishMount;       FishMountRoyal
    5: Jeans;           JeansVintage
    6: LightsKevin;     LightsPizza
    ---         Fossils         ---
    7: Hand;            Swiper
    8: SoadiDiet;       Soadi
    9: RightCon;        LeftCon
    */
function valuation(a, b, c, d){
    //determine the value of the finds based on the syringe contents.
    busy = true;
    let g = 0;
    let gold = (a + b + c + d);
    let value = 1;
    let floor = 4;
    console.log("valuation call! s0: " + syringe[0] + ", s1: " + syringe[1] + ", s2: " + syringe[2] + ", s3: " + syringe[3] + ".");
    for(i = 3; i >= 0; i --){
        console.log("dowsing for fossils...");
        value = 1;
        gold = (a + b + c + d);
        if((gold % 85) >= 21 || (syringe[i] == 3)){
            console.log("fossil get!");
            if((a != 85 && a != 1 && a != 21 && a != 3) || (b != 85 && b != 1 && b != 21 && b != 3) || (c != 85 && c != 1 && c != 21 && c != 3) || (d != 85 && d != 1 && d != 21 && d != 3)){
                if(gold >= 85){
                    console.log("extreme value fossil!!!");
                    while(gold >= 85){
                        value += .5;
                        gold = gold - 85;
                    }
                    trueValue[i] = (value * Math.floor(Math.random() * 80));
                }
            }
        }
    }
    console.log("proceeding to second check!");
    if(gold >= 85){
        console.log("everything else is top-notch, though!");
        while(gold >= 85){
            value += .5;
            gold = gold - 85;
        }
    }
    if(a == 5 || b == 5 || c == 5 || d == 5)
        value ++;
    if(a == 0 || a == 1)
        floor --;
    if(b == 0 || b == 1)
        floor --;
    if(c == 0 || c == 1)
        floor --;
    if(d == 0 || d == 1)
        floor --;
    gold = (a + b + c + d);
    for(i = 3; i >= 0; i --){
        if(syringe[i] == 85 || syringe[i] == 0){
            g = 0;
            console.log("oops all rocks");
        }
        else if(syringe[i] == 21 || syringe[i] == 3){
            g = (Math.random() * 10);
            console.log("fossil roll: " + g + ", translates to: " + Math.trunc(g));
            if(g <= 3)
                g = 7;
            else if(g <= 6)
                g = 8;
            else
                g = 9;
        }
        else{
            g = (Math.random() * 10);
            console.log("curio roll: " + g + ", translates to: " + Math.trunc(g));
            if(g <= 1.5)
                g = 1;
            else if(g <= 3)
                g = 2;
            else if(g <= 4.5)
                g = 3;
            else if(g <= 6)
                g = 4;
            else if(g <= 8.5)
                g = 5;
            else
                g = 6;
        }
        console.log("gold: " + gold);
        if(gold >= 85){
            loot[i] = treasures[g];
            console.log("treasure assigned!");
            if(i == 3)
                Slot4.src = "images/curios/valuable/" + loot[i] + ".png";
            else if(i == 2)
                Slot3.src = "images/curios/valuable/" + loot[i] + ".png";
            else if(i == 1)
                Slot2.src = "images/curios/valuable/" + loot[i] + ".png";
            else
                Slot1.src = "images/curios/valuable/" + loot[i] + ".png";
        }
        else{
            loot[i] = curios[g];
            console.log("curio assigned!");
            if(i == 3)
                Slot4.src = "images/curios/" + loot[i] + ".png";
            else if(i == 2)
                Slot3.src = "images/curios/" + loot[i] + ".png";
            else if(i == 1)
                Slot2.src = "images/curios/" + loot[i] + ".png";
            else
                Slot1.src = "images/curios/" + loot[i] + ".png";
        }
        appValue[i] = Math.floor(Math.random() * 20);
        if(appValue[i] <= 0)
            appValue[i] = 1;
        console.log(loot[i]);
        console.log("value as would be seen without appraisal: $" + appValue[i]);
        if(syringe[i] != 21)
            trueValue[i] = (value * Math.floor(Math.random() * floor * 20));
        else{
            console.log("low-value fossil, won't sell for much.");
            trueValue[i] = appValue[i];
        }
        if(trueValue[i] == 0)
            trueValue[i] = appValue[i];
        console.log("post-appraisal value: $" + trueValue[i]);
    }
    busy = false;
}

let deep = 0;
let cranky = 35.5;
console.log("deep: " + deep);
crank = document.getElementById("Crank");
crank.addEventListener("click", () =>{
    deep --;
    if(deep <= 0)
        deep = 0;
    if(deep % 3 == 1)
        cranky = 44;
    else if(deep % 3 == 2)
        cranky = 40;
    else
        cranky = 35.5;
    crank.style.top = cranky + "%";
    console.log("deep: " + deep);
});

bob = true;
bobbing = 0;
bobber();
function bobber(){
    if(bob){
        document.getElementById("Boat").style.top = (6 + Math.sin(bobbing)) + "%";
        document.getElementById("Operator").style.top = (24 + Math.sin(bobbing)) + "%";
        document.getElementById("Operhand").style.top = (24 + Math.sin(bobbing)) + "%";
        document.getElementById("Crank").style.top = (cranky + Math.sin(bobbing)) + "%";
        bobbing += (Math.PI / 4);
        //console.log("bobbing: " + bobbing + ", and sin: " + Math.sin(bobbing));
        setTimeout(() =>{
            bobber();
        }, 250);
    }
}

let talk = 0;        //1 = talking, 2 = cooldown, 0 = available to talk.
captain.addEventListener("click", ()=>{
    console.log("you clicked the Captain");
    if(talk == 0){
        if(day){
            console.log("Bellows talkin here!");
            bellowTalky();
        }
        else{
            hogTalky();
            console.log("Warthog talkin here!");
        }
        talk = 1;
    }
    else{
        talk = 2;
        console.log("Diplomacy has failed...");
        setTimeout(() =>{
            talk = 0;
            if(day)
                captain.src = "images/mines/Bellows.png";
            else
                captain.src = "images/mines/Warthog.png";
            console.log("It seems relations have changed.");
        }, 100);
    }
    
});
function bellowTalky(){
    console.log("Bellows talkin here!");
    if(talk == 1){
        captain.src = "images/mines/BellowsChange.png";
        setTimeout(() =>{
            captain.src = "images/mines/BellowsFlip.png";
            setTimeout(() =>{
                captain.src = "images/mines/BellowsBack.png";
                setTimeout(() =>{
                    captain.src = "images/mines/BellowsFlip.png";
                    setTimeout(() =>{
                        if(talk == 1)
                            bellowTalky();
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
    }
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
                        if(talk == 1)
                            hogTalky();
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
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
    navig = 0;
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
bike.style.left = legend[0].x + "%";
bike.style.top = legend[0].y + "%";

let navig = 0;          //mines: 0; pawn: 4; appraisal: 6; locust: 10; tiger: 17; mushroom: 21;
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

//Animations for starting/ending the minigame

let dunk = -50;
let aniTimer = 0;
function boatUp(){
    if(bobbing <= (Math.PI * 1.5)){
        console.log("boatUp, baby!");
        if(bobbing >= (Math.PI * 1.5))
            waveRaise(0);
        setTimeout(() =>{
            document.getElementById("Boat").style.top = (5 + Math.sin(bobbing)) + "%";
            document.getElementById("Operator").style.top = (24 + Math.sin(bobbing)) + "%";
            document.getElementById("Operhand").style.top = (24 + Math.sin(bobbing)) + "%";
            document.getElementById("Crank").style.top = (cranky + Math.sin(bobbing)) + "%";
            bobbing += (Math.PI / 4);
            boatUp();
        }, 80);
    }
}

//check waveStage to encompass, check aniTimer to proc next wave
function waveRaise(n){
    if(aniCooldown){
        console.log("waveRaise; aniTimer: " + aniTimer);
        if((aniTimer % 8 == 0)&& n <= 3)
            waveStage ++;
        else if(aniTimer % 32 == 0){
            waveStage ++;
            document.getElementById("Boat").style.display = "none";
            document.getElementById("Operator").style.display = "none";
            document.getElementById("Operhand").style.display = "none";
            document.getElementById("Crank").style.display = "none";
            document.getElementById("Water1").style.display = "none";
            document.getElementById("Water2").style.display = "none";
            document.getElementById("Water3").style.display = "none";
            document.getElementById("Water4").style.display = "none";
            document.getElementById("Waves").style.display = "none";
            document.body.style.backgroundColor = "#306d58";
            console.log("bye bye boat");
        }
            
        if(n >= 1){
            setTimeout(() =>{
                document.getElementById("Water2").style.display = "block";
                document.getElementById("Waves").style.bottom = (bobbing + 14) + "%";
                document.getElementById("Water1").style.bottom = (bobbing - 5) + "%";
                console.log("inclusive of Water1, and Water2 is now visible.");
            }, 100);
        }
        if(aniTimer >= 6){
            setTimeout(() =>{
                document.getElementById("Water3").style.display = "block";
                document.getElementById("Water2").style.bottom = (bobbing - 20) + "%";
                console.log("inclusive of Water2, and Water3 is now visible.");
            }, 100);
        }
        if(n >= 3){
            setTimeout(() =>{
                document.getElementById("Water4").style.display = "block";
                document.getElementById("Water3").style.bottom = (bobbing - 50) + "%";
                console.log("inclusive of Water3, and Water4 is now visible.");
            }, 100);
        }

        if(n >= 4){
            setTimeout(() =>{
                console.log("waveRaise4; Drill: " + document.getElementById('Drill').style.display + ", and " + document.getElementById('Drill').style.top);
                document.getElementById("Drill").style.top = dunk + "%";
                dunk += (Math.PI / 3);
                console.log("dunk in waveRaise4: " + dunk);
            }, 100);
        }
        if(n >= 5){
            setTimeout(() =>{
                console.log("waveRaise4; Cord: " + document.getElementById('Cord').style.display + ", and " + document.getElementById('Cord').style.top);
                document.getElementById("Cord").style.top = (dunk - 85) + "%";
                dunk += (Math.PI / 3);
                console.log("dunk in waveRaise5: " + dunk);
            }, 100);
        }
        setTimeout(() =>{
            document.getElementById("Boat").style.top = (5 - bobbing) + "%";
            document.getElementById("Operator").style.top = (24 - bobbing) + "%";
            document.getElementById("Operhand").style.top = (24 - bobbing) + "%";
            document.getElementById("Crank").style.top = (cranky - bobbing) + "%";
            //bobbing += 1.5;
            aniTimer ++;
            console.log("tier " + waveStage);
            bobbing += (Math.PI);
            waveRaise(waveStage);
        }, 100);
        
        if(aniTimer >= 57){
            layer0.style.display = "block";
            layer1.style.display = "block";
            layer2.style.display = "block";
            layer3.style.display = "block";
            layer4.style.display = "block";
            layer5.style.display = "block";
            aniCooldown = false;
            console.log("Show's over");
        }
    }
}

let aniCooldown = false;
let waveStage = 0;
let earnings = false;       //whether we see the contents of our loot sack
document.addEventListener("keydown", (e) =>{
    if(e.key == " "){
        if(!aniCooldown && waveStage <= 0){
            console.log("Animation started via pressing Spacebar, up edition");
            aniCooldown = true;
            bob = false;
            document.getElementById("Pier").style.display = "none";
            wallMap.style.display = "none";
            document.getElementById("Sack").style.display = "none";
            bobbing = 0;
            aniTimer = 0;
            dunk = -50;
            boatUp();
        }
        else if(!aniCooldown){
            console.log("Animation started via pressing Spacebar, down edition");
            aniCooldown = true;
            bob = false;
            //plant everything for descent
            document.getElementById("Boat").style.display = "block";
            document.getElementById("Operator").style.display = "block";
            document.getElementById("Operhand").style.display = "block";
            document.getElementById("Crank").style.display = "block";
            document.getElementById("Water1").style.display = "block";
            document.getElementById("Water2").style.display = "block";
            document.getElementById("Water3").style.display = "block";
            document.getElementById("Water4").style.display = "block";
            document.getElementById("Waves").style.display = "block";
            document.getElementById("Boat").style.top = "-100%";
            document.getElementById("Operator").style.top = "-100%";
            document.getElementById("Operhand").style.top = "-100%";
            document.getElementById("Crank").style.top = "-100%";
            document.getElementById("Water1").style.top = "-50%";
            document.getElementById("Water2").style.top = "-50%";
            document.getElementById("Water3").style.top = "-50%";
            document.getElementById("Water4").style.top = "-50%";
            document.getElementById("Waves").style.top = "-50%";
            bobbing = 0;
            //waveStage = 6;
            //boatDown();
        }
    }
    else if(e.key == "s"){
        if(!busy){
            console.log("down drill down");
            boreDown(syringe[0], syringe[1], syringe[2], syringe[3]);
        }
        else
            console.log("come back later.");
    }
    else if(e.key == "w"){
        if(!busy){
            console.log("cashing out!!");
            valuation(syringe[0], syringe[1], syringe[2], syringe[3]);
        }
        else
            console.log("come back later.");
    }
    else if(e.key == "q"){
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
