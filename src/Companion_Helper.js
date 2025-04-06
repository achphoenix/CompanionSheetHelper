var data = {};
var elements = {};

// On Load
addEventListener("DOMContentLoaded", () => {
    DefaultData();
    FetchElements();
    InitiateLabels();

    elements.Player_Character_Level.addEventListener("change", (event) => {
        PlayerLevelChanged(event);
    });
});

function DefaultData() {
    // todo-ah: Get from cookie.
    data.Player_Level = 1;
    data.Player_Proficiency = 2;
    data.Max_Health = 7 + (7 * data.Player_Level);
    data.Armor_Class = 13 + data.Player_Proficiency;
}

function FetchElements()
{
    elements.Player_Character_Level = document.getElementById("Player_Character_Level");
    elements.Max_Hit_Points_Label = document.getElementById("Max_Hit_Points_Label");
    elements.Armor_Class_Label = document.getElementById("Armor_Class_Label");
}

function InitiateLabels() {
    // Health
    elements.Max_Hit_Points_Label.textContent = data.Max_Health;
    elements.Max_Hit_Points_Label.title = "7 + (7 * Player Level)";

    // Armor
    elements.Armor_Class_Label.textContent = data.Armor_Class;
    elements.Armor_Class_Label.title = "13 + PC Proficiency";
}


function PlayerLevelChanged(event) {
    // Level
    data.Player_Level = event.target.value;

    // Health
    data.Max_Health = 7 + (7 * data.Player_Level);
    elements.Max_Hit_Points_Label.textContent = data.Max_Health;
    elements.Max_Hit_Points_Label.title = "7 + (7 * Player Level)";

    // Proficiency
    

    // Armor
    elements.Armor_Class_Label.textContent = data.Armor_Class;
    elements.Armor_Class_Label.title = "13 + PC Proficiency";
}