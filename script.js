let boxgame = document.querySelector(".boxgame");
let letter = Array.from(document.querySelectorAll(".boxgame > div"));
let playgame = document.querySelector(".playgame");
let scorehigh = document.querySelector(".scorehigh");
let scoredefault = document.querySelector(".scoredefault");
let counttime = document.querySelector(".counttime");

let letterfull = "ก - ข - ฃ - ค - ฅ - ฆ - ง - จ - ฉ - ช - ซ - ฌ - ญ - ฎ - ฏ - ฐ - ฑ - ฒ - ณ - ด - ต - ถ - ท - ธ - น - บ - ป - ผ - ฝ - พ - ฟ - ภ - ม - ย - ร - ล - ว - ศ - ษ - ส - ห - ฬ - อ - ฮ";
let letters = letterfull.split(" - ");
let position = [];
let startspeed = [];
let speed = [];
let gethighscore = 0;
let getscore = 0;
let fulltime = 0;

//random position default of array letter
for (let i = 0 ; i < letter.length ; i++) {
    position[i] = Math.floor(Math.random() * window.innerWidth - 250) + 250;
    startspeed[i] = 0;
    speed[i] = Math.floor(Math.random() * 5) + 1;

    letter[i].innerHTML = letters[Math.floor(Math.random() * 43) + 0];
    letter[i].style.left = `${position[i]}px`;
}

//click play game
playgame.addEventListener("click",() => {
    playgame.style.display = "none";
    let dropletter = setInterval(() => {
        for (let i = 0 ; i < letter.length ; i++) {
            startspeed[i] += speed[i];
            letter[i].style.top =  `${startspeed[i]}px`;
            letter[i].style.left = `${position[i]}px`;

            if (startspeed[i] > window.innerHeight) {
                letter[i].innerHTML = letters[Math.floor(Math.random() * 43) + 0];
                startspeed[i] = -60;
                position[i] = Math.floor(Math.random() * window.innerWidth - 250) + 250;
                speed[i] = Math.floor(Math.random() * 5) + 1;
            }
        }
    },100);

    //check count time
    fulltime = 60;
    counttime.innerHTML = `time : ${fulltime}`;
    getscore = 0;
    scoredefault.innerHTML = `score : ${getscore}`;
    let time = setInterval((() => {
        fulltime -= 1;
        counttime.innerHTML = `time : ${fulltime}`;
        if (fulltime == 0) {
            clearInterval(dropletter);
            clearInterval(time);
            playgame.style.display = "grid";
        }
    }),1000);
});

//press btn and remove letter
document.addEventListener("keypress",(event) => {
    //check ก-ฮ
    let char = event.key.charCodeAt(0);
    if (char >= 0x0E01 && char <= 0x0E2E) {
        //check letter equal
        for (let i = 0 ; i < letter.length ; i++) {
            if (letter[i].innerHTML == event.key) {

                //count score and highscore
                if (fulltime > 0) {
                    getscore += 1;
                    scoredefault.innerHTML = `score : ${getscore}`;
                    if (getscore > gethighscore) {
                        gethighscore += 1;
                        scorehigh.innerHTML = `highscore : ${gethighscore}`;
                    }
                }

                if (fulltime >  0) {
                    //remove letter and remove array back to font
                    position.splice(i,1);
                    startspeed.splice(i,1);
                    speed.splice(i,1);
                    letter[i].remove();

                    //create element div and hidden
                    let div = document.createElement("div");
                    div.style.display = "none";
                    boxgame.appendChild(div);

                    //random new array
                    position.push(Math.floor(Math.random() * window.innerWidth - 250) + 250);
                    startspeed.push(-60);
                    speed.push(Math.floor(Math.random() * 5) + 1);
                    div.innerHTML = letters[Math.floor(Math.random() * 43) + 0];

                    //visible div
                    let visible = setTimeout(() => {
                        div.style.display = "grid";
                    },100);

                    //check array object of div
                    letter = Array.from(document.querySelectorAll(".boxgame > div"));
                    break;
                }
            }
        }
    }
});

let str = "you you";

let array = str.matchAll("you");

console.log(array[0]);