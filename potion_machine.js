rpg_data = {};



function loadData() {
    $.getJSON("all.json", function(json_response) {
        rpg_data = json_response.data;
        setModeBasicPotion()
    });
}


function getAlignment() {
    var index = Math.floor(Math.random()*rpg_data.alignments.length)
    var alignment = rpg_data.alignments[index];
    return alignment;
}

function getCreature() {
    var index = Math.floor(Math.random()*rpg_data.creatures.length)
    var creature = rpg_data.creatures[index];
    return creature;
}

function getColor() {
    var index = Math.floor(Math.random()*rpg_data.colors.length)
    var color = rpg_data.colors[index];
    return color;
}

function getLiquidType() {
    var index = Math.floor(Math.random()*rpg_data.liquid_types.length)
    var liquid_type = rpg_data.liquid_types[index];
    return liquid_type;
}

function getPersonality() {
    var index = Math.floor(Math.random()*rpg_data.personalities.length)
    var personality = rpg_data.personalities[index];
    return personality;
}

function getSmell() {
    var index = Math.floor(Math.random()*rpg_data.smells.length)
    var smell = rpg_data.smells[index];
    return smell;
}

function getTrait() {
    var index = Math.floor(Math.random()*rpg_data.traits.length)
    var trait = rpg_data.traits[index];
    return trait;
}


function getNumberOfBasicPotions() {
    combinations = rpg_data.colors.length * rpg_data.liquid_types.length * rpg_data.smells.length
    return combinations

}


function generateBasicPotion() {
    var color = getColor();
    var smell = getSmell();
    var liquid_type = getLiquidType();
    var article = "A ";
    var first_letter = liquid_type[0].toLowerCase()
    if (first_letter == 'a' || first_letter == 'e' || first_letter == 'i' || first_letter == 'o' || first_letter == 'u' || first_letter == 'y') {
        article = "An ";
    }
    var potion = article + liquid_type + " " + color + " potion that smells " +  smell + ". ";
    return potion;
}

function generateDeluxPotion() {
    var alignment = getAlignment();
    var creature = getCreature();
    var personality = getPersonality()
    var trait = getTrait();
    var basic = generateBasicPotion();
    var deluxe = basic + "<br><br><strong>Effect:</strong> You become a " + trait + " " + alignment + " " + creature + " with a " + personality + " personality."
    return deluxe;
}

function getNumberOfDeluxePotions() {
    combinations = getNumberOfBasicPotions() * rpg_data.traits.length * rpg_data.alignments.length * rpg_data.creatures.length * rpg_data.personalities.length
    return combinations
}


function renderDeluxePotion() {
    var potion = generateDeluxPotion();
    $("#generated_potion").html(potion);
}

function renderBasicPotion() {
    var potion = generateBasicPotion();
    $("#generated_potion").html(potion);
}

function setModeBasicPotion() {
    var combinations = getNumberOfBasicPotions()
    renderBasicPotion()
    $("#potion_mode").text("Basic Potion Mode");
    $("#switch_mode_button").text("Switch to Deluxe Mode");
    $("#potion_combinations").text(numeral(combinations).format('0,0'));
    $( "#potion_button" ).click(function() {
        renderBasicPotion();
    });
    $( "#switch_mode_button" ).click(function() {
        setModeDeluxePotion();
    });
}

function setModeDeluxePotion() {
    var combinations = getNumberOfDeluxePotions()
    renderDeluxePotion()
    $("#potion_mode").text("Deluxe Potion Mode");
    $("#switch_mode_button").text("Switch to Basic Mode");
    $("#potion_combinations").text(numeral(combinations).format('0,0'));
    $( "#potion_button" ).click(function() {
        renderDeluxePotion();
    });
    $( "#switch_mode_button" ).click(function() {
        setModeBasicPotion();
    });

}


$( document ).ready(function() {
    loadData();
});
