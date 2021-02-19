
var players = [];
var entryNo = 0;

const boardPickr = Pickr.create({
    el: '#board-colour',
    theme: 'monolith',
    default: '#50657E',

    components: {

        // Main components
        preview: true,
        opacity: false,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            hsla: false,
            hsva: false,
            cmyk: false,
            input: true,
            clear: true,
            save: true
        }
    }
});

const entryPickr = Pickr.create({
    el: '#entry-colour',
    theme: 'monolith',
    default: 'rgba(255, 255, 255, 0.644)',

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

boardPickr.on('change', (color, instance) => {
    var leaderboard = document.getElementById("leaderboard-graphic");
    var buttons = document.getElementsByClassName("leaderboard-button");
    leaderboard.style.backgroundColor = color.toRGBA().toString();

    /* Change colour of buttons and leaderboard */
    for (var button = 0; button < buttons.length; button++ ){
        buttons[button].style.backgroundColor = color.toRGBA().toString();
    }
    
    generateCode();
})

entryPickr.on('change', (color, instance) => {
    changeEntryColour(color, instance)
    generateCode();
});

function changeEntryColour(color, instance) {
    var leaderboard = document.getElementById("leaderboard-players");
    var entries = leaderboard.childNodes;

    /* Change colour of buttons and leaderboard */
    for (var entry = 0; entry < entries.length; entry++ ){
        entries[entry].style.backgroundColor = color.toRGBA().toString();
    }
}

function addPlayer(username = "Anon", score = "100"){
    var leaderboard = document.getElementById("leaderboard-players");
    var playerNo = players.length;
    entryNo++;

    if (playerNo >= 10) {  /* Prevent adding more than 10 scores */
        document.getElementById("exceeded-players").style.visibility = "visible";
        players.pop();
    }

    leaderboard.innerHTML = '';  // clear scores
    playerNo = players.length;

    var usernameText = document.getElementById("username").value;
    var scoreText = document.getElementById("score").value;
    var playerInfo = [usernameText != "" ? usernameText : username + "#" + entryNo, scoreText != "" ? scoreText : score];
    players.push(playerInfo);

    players.sort((a, b) => {
        return b[1] - a[1]
    });

    for (var player = 0; player < players.length; player++){  /* Update scores */
        var userEntry = document.createElement("ul");
        userEntry.className = "leaderboard-player";

        /* Checks if textboxes are empty and if not, get their values and create username and score element */
        var userNode = document.createTextNode(players[player][0]);
        var scoreNode = document.createTextNode(players[player][1]);
        var userEl = document.createElement("li");
        var scoreEl = document.createElement("li");

        var rankImg = document.createElement("div");
        var rankEl = document.createElement("li");

        rankEl.className = "leaderboard-rank";
        userEl.className = "leaderboard-user";
        scoreEl.className = "leaderboard-score";

        /* Putting the leaderboard together */
        rankEl.appendChild(rankImg);
        userEl.appendChild(userNode);
        scoreEl.appendChild(scoreNode);
        userEntry.appendChild(rankEl);
        userEntry.appendChild(userEl);
        userEntry.appendChild(scoreEl);
        leaderboard.appendChild(userEntry);
    }

    var leaderboardEntries = leaderboard.childNodes;
    playerNo = players.length;

    if (playerNo > 0) {
        leaderboardEntries[0].firstChild.firstChild.style.backgroundColor = "gold";
    }
    if (playerNo > 1) {
        leaderboardEntries[1].firstChild.firstChild.style.backgroundColor = "silver";
    }
    if (playerNo > 2) {
        leaderboardEntries[2].firstChild.firstChild.style.backgroundColor = "sienna";
    }
    changeEntryColour(entryPickr.getSelectedColor());
}

function generateCode(){
    var boardColour = boardPickr.getSelectedColor().toRGBA().toString();
    var entryColour = entryPickr.getSelectedColor().toRGBA().toString();

    var code = `<div id="leaderboard" style="float: left; margin-right: 50px;">
        <div id="leaderboard-graphic">
            <div id="leaderboard-players" style="text-align: justify;">
            </div>
        </div>
    </div>
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lexend+Mega&family=Roboto+Condensed:wght@300&display=swap');

        #leaderboard-graphic {
            width: 250px;
            height: 320px;
            background-color: ${boardColour};
            border-radius: 5px;
            position: relative;
        }
        
        #leaderboard-players {
            font-family: 'Roboto Condensed', sans-serif;
            padding: 0 10px;
            width: 210px;
            height: 300px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
        }

        .leaderboard-player {
            color: black;
            background-color: ${entryColour};
            border-radius: 5px;
            width: 83%;
            margin: 10px 0;
            display: table;
            list-style-type: none;
            table-layout: fixed;
        }
        
        .leaderboard-player li {
            padding: 0 5px;
            width: 100%;
            display: table-cell;
        }
        
        .leaderboard-rank div{
            height: 10px;
            width: 10px;
            border: 1px solid black ;
            border-radius: 50%;
        }
        
        .leaderboard-rank{
            text-align: left;
            transform: translate(-70%, 5%);
        }
        
        .leaderboard-user {
            text-align: left;
            transform: translate(-140%);
        }
        
        .leaderboard-score {
            text-align: right;
        }
    </style>
    
    <script>
        var players = [];
        var entryNo = 0;

        function addPlayer(username = "Anon", score = "100"){
            var leaderboard = document.getElementById("leaderboard-players");
            var playerNo = players.length;
            entryNo++;
        
            if (playerNo >= 10) {  /* Prevent adding more than 10 scores */
                players.pop();
            }
        
            leaderboard.innerHTML = '';  // clear scores
            playerNo = players.length;
            var playerInfo = [username + "#" + entryNo, score];
            players.push(playerInfo);
        
            players.sort((a, b) => {
                return b[1] - a[1]
            });
        
            for (var player = 0; player < players.length; player++){  /* Update scores */
                var userEntry = document.createElement("ul");
                userEntry.className = "leaderboard-player";
        
                /* Checks if textboxes are empty and if not, get their values and create username and score element */
                var userNode = document.createTextNode(players[player][0]);
                var scoreNode = document.createTextNode(players[player][1]);
                var userEl = document.createElement("li");
                var scoreEl = document.createElement("li");
        
                var rankImg = document.createElement("div");
                var rankEl = document.createElement("li");
        
                rankEl.className = "leaderboard-rank";
                userEl.className = "leaderboard-user";
                scoreEl.className = "leaderboard-score";
        
                /* Putting the leaderboard together */
                rankEl.appendChild(rankImg);
                userEl.appendChild(userNode);
                scoreEl.appendChild(scoreNode);
                userEntry.appendChild(rankEl);
                userEntry.appendChild(userEl);
                userEntry.appendChild(scoreEl);
                leaderboard.appendChild(userEntry);
            }
        
            var leaderboardEntries = leaderboard.childNodes;
            playerNo = players.length;
        
            if (playerNo > 0) {
                leaderboardEntries[0].firstChild.firstChild.style.backgroundColor = "gold";
            }
            if (playerNo > 1) {
                leaderboardEntries[1].firstChild.firstChild.style.backgroundColor = "silver";
            }
            if (playerNo > 2) {
                leaderboardEntries[2].firstChild.firstChild.style.backgroundColor = "sienna";
            }
            changeEntryColour("${entryColour}");
        }

        function changeEntryColour(color) {
            var leaderboard = document.getElementById("leaderboard-players");
            var entries = leaderboard.childNodes;
        
            /* Change colour of buttons and leaderboard */
            for (var entry = 0; entry < entries.length; entry++ ){
                entries[entry].style.backgroundColor = color;
            }
        }
    </script>`;

    document.getElementById("leaderboard-code").value = code;
}

function initialise(){
    addPlayer();
    generateCode();
}