
const url = "http://127.0.0.1:8000/back/";
const lead_url = "http://127.0.0.1:8000/";
const static = "https://soorchi.com/static/";
const offer_id = 104;
let player_id = null;
let token = null;
var GetPhone = document.getElementById('getphone');
var GetCode = document.getElementById('getcode');
var EndGame = document.getElementById('end_game');

var currentUrl = window.location.href;
GetCode.style.display = "none";
EndGame.style.display = "none";


var logo_url =                `${static}img/games/G12/logo.png`;
var hand_url =                `${static}img/games/G12/hand.png`;
var bg_url =                  `${static}img/games/G12/bg.png`;

var start_modal_url =         `${static}img/games/G12/start_modal.png`;
var start_modal_btn_url =     `${static}img/games/G12/start_modal_btn.png`;
var start_modal_waiting_url = `${static}img/games/G12/start_modal_waiting.png`;
var win_modal_url =           `${static}img/games/G12/win_modal.png`;
var win_modal_btn_url =       `${static}img/games/G12/button_lose.png`;
var lose_modal_url =          `${static}img/games/G12/lose_modal.png`;
var lose_modal_btn_url =      `${static}img/games/G12/button_lose.png`;
var noChance_modal_url =      `${static}img/games/G12/noChance_modal.png`;
var noChance_modal_btn_url =  `${static}img/games/G12/button_noChance.png`;
var gift_modal_url =      `${static}img/games/G12/win_gift_modal.png`;
var gift_modal_btn_url =  `${static}img/games/G12/button_lose.png`;
var tutorial1_url =       `${static}img/games/G12/tutorial1.png`;
var tutorial2_url =       `${static}img/games/G12/tutorial2.png`;
var tutorial3_url =       `${static}img/games/G12/tutorial3.png`;
var tutorial4_url =       `${static}img/games/G12/tutorial4.png`;

var gems_url =          `${static}img/games/G12/gems.png`;
var explosion2_url =    `${static}img/games/G12/explosion2.png`;
var papers_url =        `${static}img/games/G12/papers.png`;



// sounds' urls
var complete_url =       `${static}sounds/G12/complete.mp3`;
var fall_url =           `${static}sounds/G12/fall.mp3`;
var colourBomb_url =     `${static}sounds/G12/colourBomb.mp3`;
var lineBlast_url =      `${static}sounds/G12/dropped.mp3`;
var click_url =          `${static}sounds/G12/click.mp3`;
var music_url =          `${static}sounds/G12/music.mp3`;
var score_url =          `${static}sounds/G12/score.mp3`;
var win1_url =           `${static}sounds/G12/win1.mp3`;
var win2_url =           `${static}sounds/G12/win2.mp3`;
var lose_url =           `${static}sounds/G12/lose.mp3`;
var move_url =           `${static}sounds/G12/move.mp3`;



function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

async function sendreq(offer){

    let item = document.getElementById("getphoneinput")

    let val = item.value

    if (val.length < 11) {
        alert("شماره تلفن باید 11 رقم باشد مثل(09120000000)");
    }else if ((val.length > 11)){
        alert("شماره باید 11 رقم باشد . ");
    }else{
        let response = await  fetch(`${url}account/get_phone_code`, {
            method: "POST",
            body: JSON.stringify({
                mobile: val,
                offer_id: offer_id,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'X-CSRFToken': csrftoken
            }});
        let data = await response.json();
        if(response.status == 200){
            GetCode.style.display = 'flex';
            // GetCode.style.flexDirection = 'column';
            // GetCode.style.justifyContent = 'center';
            // GetCode.style.alignItems = 'center';
            GetPhone.style.display = 'none';
        }else{
            alert(data["message"])
            setInterval(function () {location.replace(`${lead_url}/lead/${data['offer']}/?C=${data['customerID']}`)}, 1000);
        }}};


async function sendCustomerData(code, name, gender) {
    let response = await  fetch(`${url}account/updateMVTCustomerInfo`, {
        method: "POST",
        body: JSON.stringify({
            code: code,
            name: name,
            gender: gender
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'X-CSRFToken': csrftoken
        }
    });
    let data = await response.json();
    token = data.token
    if(response.status == 200){
        GetCode.style.display = 'none';
        var vendor = document.createElement('script');
        vendor.src = `${lead_url}static/js/game/G19/vendor.js?v=13`; // Replace with the path to your JavaScript file
        vendor.async = true;
        document.head.appendChild(vendor);
        var app = document.createElement('script');
        app.src = `${lead_url}static/js/game/G19/app.js?v=22`; // Replace with the path to your JavaScript file
        app.async = true;
        document.head.appendChild(app);
    } else if(response.status == 404){
        alert("ثبت اطلاعات شما با مشکل مواجه شد  ")
    }
};
async function endGame(time, score) {
    let response = await  fetch(`${url}html5/endGameHandler`, {
        method: "POST",
        body: JSON.stringify({
            time: time,
            score:score,
            offer : offer_id,
            CURL : currentUrl

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "X-CSRFToken": csrftoken,
            "Authorization": `Token ${token}`
        }
    });
    let data = await response.json();
    if(response.status == 200){
        var canvass = document.querySelector('canvas');
        canvass.style.display = 'none';
        EndGame.style.display = 'flex';

        var p1 = document.getElementById("end_game-message");
        var a1 = document.getElementById("end_game-link");

        p1.innerHTML = data.message;
        a1.innerHTML = data.viral;

        EndGame.appendChild(p1);
        EndGame.appendChild(a1);
    } else if(response.status == 404){
        alert("کد صحیح نیست دوباره تلاش کنید!");
    }
};
function sendrequest(status){
    switch (status) {
        case '0':
            sendreq(offer_id)
            break;

        case '1':
            sendCustomerData(document.getElementById('getcodeinput').value,document.getElementById('custumerName').value, document.getElementById('page4_gender').value)

            break;
        case '2':
            GetCode.style.display = 'none';
            GetPhone.style.display = 'flex';
            break;

        default:
            break;
    }};

// function to auto copy text

    // Function to copy text to clipboard
function copy(that){
    var inp =document.createElement('input');
    document.body.appendChild(inp)
    inp.value =that.textContent
    inp.select();
    document.execCommand('copy',true);
    inp.remove();
    alert("لینک با موفقییت کپی شد")
}
