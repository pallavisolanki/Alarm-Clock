
// variables
const ring = new Audio('iPhone-Naruto.mp3');
ring.loop = true;

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;

// Script for Time and Date
function updateClock(){
    var now = new Date();
    var hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        ampm = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            ampm = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }
        var ids =[ "hour", "minutes", "seconds", "period"];
        var values = [hou.pad(2),min.pad(2),sec.pad(2),ampm];
        
        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${ampm}`){
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
                
            }
        }
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


//Set Alarm section
for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm 
function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarms";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("setSeconds") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else {
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
        alert(`Your Alarm Set ${alarmTime}.`);
    }

}
setAlarmBtn.addEventListener("click",setAlarm);

//delete alarm
function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
    alert(`Your Alarm ${click_id} Delete.`);
}

function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}



//using defiened method
setInterval(()=>{
    let date = new Date();
    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = "AM";
    if( h >= 12){
        h = h - 12;
        ampm = "PM"
    }
    //setting hours with current timestamp
    h = h == 0 ? h = 12 :h;
    h = h < 10 ? "0" + h : h;
    //setting minutes with current timestamp
    m = m==0 ? m=59 : m;
    m = m<10 ? "0" + m : m;
    //setting seconds with current timestamp
    s = s==0 ? s=59 : s;
    s = s<10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    if(alarmTime === `${h}:${m}:${s} ${ampm}`){
        ringtone.play();
        ringtone.loop = true;
    }

},1000)