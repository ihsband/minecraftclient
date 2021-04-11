import swal from "sweetalert";

var UrlParams = function (game, cb) {
    var nameList = [
        "Time",
        "Past",
        "Future",
        "Dev",
        "Fly",
        "Flying",
        "Soar",
        "Soaring",
        "Power",
        "Falling",
        "Fall",
        "Jump",
        "Cliff",
        "Mountain",
        "Rend",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Gold",
        "Panda",
        "Cat",
        "Kitty",
        "Kitten",
        "Zero",
        "Memory",
        "Trooper",
        "XX",
        "Bandit",
        "Fear",
        "Light",
        "Glow",
        "Tread",
        "Deep",
        "Deeper",
        "Deepest",
        "Mine",
        "Your",
        "Worst",
        "Enemy",
        "Hostile",
        "Force",
        "Video",
        "Game",
        "Donkey",
        "Mule",
        "Colt",
        "Cult",
        "Cultist",
        "Magnum",
        "Gun",
        "Assault",
        "Recon",
        "Trap",
        "Trapper",
        "Redeem",
        "Code",
        "Script",
        "Writer",
        "Near",
        "Close",
        "Open",
        "Cube",
        "Circle",
        "Geo",
        "Genome",
        "Germ",
        "Spaz",
        "Shot",
        "Echo",
        "Beta",
        "Alpha",
        "Gamma",
        "Omega",
        "Seal",
        "Squid",
        "Money",
        "Cash",
        "Lord",
        "King",
        "Duke",
        "Rest",
        "Fire",
        "Flame",
        "Morrow",
        "Break",
        "Breaker",
        "Numb",
        "Ice",
        "Cold",
        "Rotten",
        "Sick",
        "Sickly",
        "Janitor",
        "Camel",
        "Rooster",
        "Sand",
        "Desert",
        "Dessert",
        "Hurdle",
        "Racer",
        "Eraser",
        "Erase",
        "Big",
        "Small",
        "Short",
        "Tall",
        "Sith",
        "Bounty",
        "Hunter",
        "Cracked",
        "Broken",
        "Sad",
        "Happy",
        "Joy",
        "Joyful",
        "Crimson",
        "Destiny",
        "Deceit",
        "Lies",
        "Lie",
        "Honest",
        "Destined",
        "Bloxxer",
        "Hawk",
        "Eagle",
        "Hawker",
        "Walker",
        "Zombie",
        "Sarge",
        "Capt",
        "Captain",
        "Punch",
        "One",
        "Two",
        "Uno",
        "Slice",
        "Slash",
        "Melt",
        "Melted",
        "Melting",
        "Fell",
        "Wolf",
        "Hound",
        "Legacy",
        "Sharp",
        "Dead",
        "Mew",
        "Chuckle",
        "Bubba",
        "Bubble",
        "Sandwich",
        "Smasher",
        "Extreme",
        "Multi",
        "Universe",
        "Ultimate",
        "Death",
        "Ready",
        "Monkey",
        "Elevator",
        "Wrench",
        "Grease",
        "Head",
        "Theme",
        "Grand",
        "Cool",
        "Kid",
        "Boy",
        "Girl",
        "Vortex",
        "Paradox",
    ];
    var finalName = "";
    finalName = nameList[Math.floor(Math.random() * nameList.length)];
    finalName += nameList[Math.floor(Math.random() * nameList.length)];

    game.nick = new URL(document.location).searchParams.get("nick");
    game.server = new URL(document.location).searchParams.get("server");
    game.serverPort = new URL(document.location).searchParams.get("port");
    game.premium = new URL(document.location).searchParams.get("premium");
    var reload = false;
    if (game.nick === "" || game.nick === null) {
        reload = true;
        game.nick = finalName;
    }
    if (game.server === "" || game.server === null) {
        reload = true;
        game.server = game.production
            ? game.servers.production[0]
            : game.servers.development[0];
    }
    if (game.serverPort === "" || game.serverPort === null) {
        reload = true;
        game.serverPort = game.production
            ? game.servers.production[1]
            : game.servers.development[1];
    }
    if (game.premium === "" || game.premium === null) {
        reload = true;
        game.premium = "false";
    }
    if (reload) {
        document.location.href = `?server=${game.server}&port=${game.serverPort}&nick=${game.nick}&premium=${game.premium}`;
    } else {
        if (game.premium === "true") {
            swal({
                text: "Enter password for premium account",
                content: "input",
                button: {
                    text: "Login",
                },
            }).then((password) => {
                cb(password);
            });
        } else {
            cb(null);
        }
    }
};

export { UrlParams };
