document.body.style.backgroundColor = "#599aac";
let day = localStorage.getItem('day');          //true: daytime worker, false: night worker; this alternates on visiting the appraisal office particularly.
captain = document.getElementById("Operator");
if(day){
    console.log("Sun alert!");
    captain.src = "images/mines/Bellows.png";
}
else{
    console.log("Sun alertn't.");
    captain.src = "images/mines/Warthog.png";
}
    

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
let cranky = 35.5;
console.log("deep: " + deep);
crank = document.getElementById("Crank");
crank.addEventListener("click", () =>{
    deep ++;
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
        console.log("bobbing: " + bobbing + ", and sin: " + Math.sin(bobbing));
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

//Animations for starting/ending the minigame

let dunk = -50;
function boatUp(){
    if(aniCooldown){
        if(bobbing >= (Math.PI * 1.5)){
            waveRaise(0);
        }
        else{
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
}
function boatDown(){
    if(aniCooldown){
        if(bobbing >= (Math.PI * 1.5)){
            waveRaise(0);
        }
        else{
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
}

function waveRaise(n){
    if(aniCooldown){
        if(n <= 0){
            setTimeout(() =>{
                document.getElementById("Boat").style.top = (5 - bobbing) + "%";
                document.getElementById("Operator").style.top = (24 - bobbing) + "%";
                document.getElementById("Operhand").style.top = (24 - bobbing) + "%";
                document.getElementById("Crank").style.top = (cranky - bobbing) + "%";
                bobbing += 1.5;
                waveRaise(0);
            }, 70);
        }
        else if(n == 1){
            setTimeout(() =>{
                document.getElementById("Waves").style.bottom = (20 + bobbing) + "%";
                document.getElementById("Water1").style.bottom = bobbing + "%";
                waveRaise(1);
            }, 70);
        }
        else if(n == 2){
            setTimeout(() =>{
                document.getElementById("Water2").style.bottom = (bobbing - 18) + "%";
                waveRaise(2);
            }, 70);
        }
        else if(n == 3){
            setTimeout(() =>{
                document.getElementById("Water3").style.bottom = (bobbing - 40) + "%";
                waveRaise(3);
            }, 70);
        }
        else if(n == 4){
            setTimeout(() =>{
                console.log("waveRaise4; Drill: " + document.getElementById('Drill').style.display + ", and " + document.getElementById('Drill').style.top);
                document.getElementById("Drill").style.top = dunk + "%";
                waveRaise(4);
                dunk += (Math.PI / 4);
                console.log("dunk in waveRaise4: " + dunk);
            }, 70);
        }
        else if(n == 5){
            setTimeout(() =>{
                console.log("waveRaise4; Cord: " + document.getElementById('Cord').style.display + ", and " + document.getElementById('Cord').style.top);
                document.getElementById("Drill").style.top = (dunk - 45) + "%";
                waveRaise(5);
                dunk += (Math.PI / 4);
                console.log("dunk in waveRaise4: " + dunk);
            }, 70);
        }
    }
}
function waveCede(n){
    if(aniCooldown){
        if(n <= 0){
            setTimeout(() =>{
                document.getElementById("Boat").style.top = (5 - bobbing) + "%";
                document.getElementById("Operator").style.top = (24 - bobbing) + "%";
                document.getElementById("Operhand").style.top = (24 - bobbing) + "%";
                document.getElementById("Crank").style.top = (cranky - bobbing) + "%";
                bobbing += 1.5;
                waveRaise(0);
            }, 70);
        }
        else if(n == 1){
            setTimeout(() =>{
                document.getElementById("Waves").style.bottom = (20 + bobbing) + "%";
                document.getElementById("Water1").style.bottom = bobbing + "%";
                waveRaise(1);
            }, 70);
        }
        else if(n == 2){
            setTimeout(() =>{
                document.getElementById("Water2").style.bottom = (bobbing - 18) + "%";
                waveRaise(2);
            }, 70);
        }
        else if(n == 3){
            setTimeout(() =>{
                document.getElementById("Water3").style.bottom = (bobbing - 40) + "%";
                waveRaise(3);
            }, 70);
        }
    }
}

let aniCooldown = false;
let waveStage = 0;
document.addEventListener("keydown", (e) =>{
    if(e.key == " "){
        if(!aniCooldown && waveStage <= 0){
            console.log("Animation started via pressing Spacebar");
            aniCooldown = true;
            bob = false;
            document.getElementById("Pier").style.display = "none";
            wallMap.style.display = "none";
            bobbing = 0;
            boatUp();
            console.log("tier " + waveStage);
            setTimeout(() =>{
                waveRaise(waveStage);                   //top wave and Water1 rise while Water2 remains stationary
                waveStage = 1;
                document.getElementById("Water2").style.display = "block";
                console.log("tier " + waveStage);
                setTimeout(() =>{
                    waveRaise(waveStage);               //Water2 joins in as Water3 becomes visible and stationary
                    waveStage = 2;
                    document.getElementById("Water3").style.display = "block";
                    console.log("tier " + waveStage);
                    setTimeout(() =>{
                        waveRaise(waveStage);           //Water3 joins in as Water 4 becomes visible and stationary
                        waveStage = 3;
                        document.getElementById("Water4").style.display = "block";
                        console.log("tier " + waveStage);
                        setTimeout(() =>{               //Water divs are made invisible along with captain and boat stuff.
                            waveStage = 4;
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
                            console.log("tier " + waveStage);
                                //the drill appears!
                            dunk = 30;
                            document.getElementById("Drill").style.display = "block";
                            console.log("Drill made visible " + document.getElementById('Drill').style.display);
                            setTimeout(() =>{           
                                waveStage = 5;
                                document.getElementById("Cord").style.display = "block";
                                console.log("tier " + waveStage);
                                console.log("Cord made visible " + document.getElementById('Cord').style.display);
                                setTimeout(() =>{           //thus ends the animation via waveStage = 6
                                    waveStage = 6;
                                    console.log("tier " + waveStage);
                                    aniCooldown = false;
                                    console.log("Show's over");
                                }, 2000);
                            }, 2000);
                        }, 750);
                    }, 500);
                }, 400);
            }, 100);
        }
        else if(!aniCooldown){
            console.log("Animation started via pressing Spacebar");
            aniCooldown = true;
            bob = false;
            document.getElementById("Boat").style.display = "block";
            document.getElementById("Operator").style.display = "block";
            document.getElementById("Operhand").style.display = "block";
            document.getElementById("Crank").style.display = "block";
            document.getElementById("Water1").style.display = "block";
            document.getElementById("Water2").style.display = "block";
            document.getElementById("Water3").style.display = "block";
            document.getElementById("Water4").style.display = "block";
            document.getElementById("Waves").style.display = "block";
            document.getElementById("Boat").style.top = "-50%";
            document.getElementById("Operator").style.display = "none";
            document.getElementById("Operhand").style.display = "none";
            document.getElementById("Crank").style.display = "none";
            document.getElementById("Water1").style.display = "none";
            document.getElementById("Water2").style.display = "none";
            document.getElementById("Water3").style.display = "none";
            document.getElementById("Water4").style.display = "none";
            document.getElementById("Waves").style.display = "none";
            bobbing = 0;
            waveCede(waveStage);
            setTimeout(() =>{
                waveRaise(waveStage);                   //top wave and Water1 rise while Water2 remains stationary
                waveStage = 1;
                document.getElementById("Water2").style.display = "block";
                setTimeout(() =>{
                    waveRaise(waveStage);               //Water2 joins in as Water3 becomes visible and stationary
                    waveStage = 2;
                    document.getElementById("Water3").style.display = "block";
                    setTimeout(() =>{
                        waveRaise(waveStage);           //Water3 joins in as Water 4 becomes visible and stationary
                        waveStage = 3;
                        document.getElementById("Water4").style.display = "block";
                        setTimeout(() =>{               //Water divs are made invisible along with captain and boat stuff.
                            waveStage = 4;
                            aniCooldown = false;
                            
                            document.body.style.backgroundColor = "#306d58";
                            setTimeout(() =>{           //the drill appears!
                            }, 800);
                        }, 800);
                    }, 500);
                }, 400);
            }, 100);
        }
    }
});
