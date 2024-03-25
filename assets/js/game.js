console.log("Le fichier javascript est bien importé ✅");

let input_min = document.getElementById("input_min");
let input_max = document.getElementById("input_max");
let input_attempt = document.getElementById("input_attempt");
let btn_launch = document.getElementById("btn_launch");
let alert = document.getElementById("alert");

let vol = document.getElementById("vol");

let input_play = document.getElementById("input_play");
let btn_play = document.getElementById("btn_play");
let message = document.getElementById("message");

let attempt, min, max, nb_rand, info, play;

Array.from(document.getElementsByTagName('audio')).forEach(function (audio) {
    audio.volume=0.25;
});

vol.addEventListener("click", function() {
    if(vol.textContent == "mute") {
        vol.textContent = "unmute";
        Array.from(document.getElementsByTagName('audio')).forEach(function (audio) {
            audio.volume=0;
        });
    } else {
        vol.textContent = "mute";
        Array.from(document.getElementsByTagName('audio')).forEach(function (audio) {
            audio.volume=0.25;
        });
    }
});

input_min.addEventListener("input", function() {
    checkNumbers();
});

input_max.addEventListener("input", function() {
    checkNumbers();
});

input_attempt.addEventListener("input", function() {
    checkNumbers();
});

function checkNumbers() {
    parseInput();
    if(isNaN(min) || isNaN(max) || isNaN(attempt)) {
        document.getElementById("alert").textContent = "Toutes les valeurs doivent être renseignées !";
        btn_launch.setAttribute("disabled", "");
    } else if(min == 0 || max == 0 || attempt <= 0) {
        if(attempt < 0 ) {
            alert.textContent = "Le nombre de tentative ne peut pas être inférieur à 1 !";
        } else {
            alert.textContent = "Les valeurs ne peuvent pas être égales à 0 !";
        }
        btn_launch.setAttribute("disabled", "");
    } else if (min >= max) {
        alert.extContent = "Le minimum est supérieur ou égal au maximum :c";
        btn_launch.setAttribute("disabled", "");
    } else {
        alert.textContent = "";
        btn_launch.removeAttribute("disabled", "");
    }
}

btn_launch.addEventListener("click", function() {
    parseInput();
    // Faire disparaître la boîte des paramètres
    document.getElementById('audio_launch').play();
    document.getElementById('settings').style.display = 'none';

    // Faire apparaître la boîte de jeu & ses éléments
    btn_play.removeAttribute("disabled", "");
    document.getElementById("min").textContent = "min : " +  min;
    document.getElementById("max").textContent = "max : " +  max;
    plrInfo();
    document.getElementById('playbox').style.display = 'flex';
    nb_rand = Math.floor(Math.random() * (max-min)) + min;
});

input_play.addEventListener("input", function () {
    btn_play.removeAttribute("disabled", "");
    if(message.classList.contains('err')) {
        message.classList.remove('err');
        message.textContent = "There. You. Go.";
    } else {
        message.textContent = "";
    }
});

// on joue :)
btn_play.addEventListener("click", function() {
    play = parseInt(input_play.value);
    if(isNaN(play)) {
        document.getElementById('audio_play').play();
        message.classList.add('err');
        message.textContent = "Bah ! Faut remplir le champ :c";
        btn_play.setAttribute("disabled", "");
    } else if(play < min || play > max) {
        document.getElementById('audio_play').play();
        message.classList.add('err');
        message.textContent = "Le nombre joué n'appartient pas à l'interval de jeu ! Veuillez réessayer !";
    } else if(attempt == 1 && play != nb_rand) {
        finished(false);
    } else if (play > nb_rand) {
        message.classList.remove('err');
        message.textContent = "Trop haut";
        attempt -= 1;
        plrInfo();
    } else if ( play < nb_rand) {
        message.classList.remove('err');
        message.textContent = "Trop bas";
        attempt -= 1;
        plrInfo();
    } else if (play == nb_rand) {
        finished(true);
    }
});

// rejouer
document.getElementById("btn_replay").addEventListener("click", function () {
    message.textContent="";
    document.getElementById('finished').style.display = 'none';
    document.getElementById('settings').style.display = 'flex';
    document.getElementById("rep").style.display = 'block';
    document.getElementById('audio_replay').play();
});

// function parse_int
function parseInput() {
    min = parseInt(input_min.value);
    max = parseInt(input_max.value);
    attempt = parseInt(input_attempt.value);
}

// fonction de fin
function finished(result) {
    document.getElementById('playbox').style.display = 'none';
    document.getElementById('finished').style.display = 'flex';
    if(result) {
        document.getElementById("msg_fin").textContent = "Félicitations !";
        document.getElementById("rep").style.display = 'none';
        document.getElementById("img_end").src='https://c.tenor.com/_BaYDIbn3dgAAAAC/yay-up.gif';
        document.getElementById('audio_win').play();

    } else {
        document.getElementById("msg_fin").textContent = "Oh non, oh zut, oooooooh ! :c";
        document.getElementById("rep").textContent = "C'était " + nb_rand + " ! Et oui, dommage hein . . .";
        document.getElementById("img_end").src='https://c.tenor.com/VrNYXs-O3WwAAAAS/sad-cat.gif';
        document.getElementById('audio_fail').play();
    }
}

// fonction d'affichage du nombre de tentative(s) restante(s)
function plrInfo() {
    if(attempt == 1) {
        info = " tentative."
    } else {
        info = " tentatives."
    }
    document.getElementById("attempt").textContent = "Il reste " + attempt + info;
}