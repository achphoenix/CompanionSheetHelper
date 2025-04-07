var data = {};
var elements = {};

// On Load
addEventListener("DOMContentLoaded", () => {
    FetchElements();
    DefaultData();
    InitiateLabels();

    document.getElementById("Everything").style.display = "block";

    elements.Player_Character_Level.addEventListener("change", (event) => {
        PlayerLevelChanged(event);
    });
});

function FetchElements()
{
    elements.Player_Character_Level = document.getElementById("Player_Character_Level");
    elements.Max_Hit_Points_Label = document.getElementById("Max_Hit_Points_Label");
    elements.Current_Health = document.getElementById("Current_Health");
    elements.Armor_Class_Label = document.getElementById("Armor_Class_Label");
    elements.Player_Proficiency = document.getElementById("Player_Proficiency");
    elements.Saving_Throws_Bonus = document.getElementById("Saving_Throws_Bonus");
    elements.Stealth_Skill_Bonus = document.getElementById("Stealth_Skill_Bonus");
}

function DefaultData() {
    // todo-ah: Get from cookie.
    data.Player_Level = 1;
    data.Player_Proficiency = 2;
    data.Max_Health = 7 + (7 * data.Player_Level);
    data.Current_Health = data.Max_Health;
    data.Armor_Class = 13 + data.Player_Proficiency;
    data.Player_Proficiency = (Math.ceil(data.Player_Level / 4) + 1);
    data.Saving_Throws_Bonus = 2 + data.Player_Proficiency; // Dex(1) + 1 + Player Proficiency Bonus
    data.Stealth_Skill_Bonus = 1 + data.Player_Proficiency;
}

function InitiateLabels() {
    // Player Proficiency
    elements.Player_Proficiency.textContent = data.Player_Proficiency;

    // Max Health
    elements.Max_Hit_Points_Label.textContent = data.Max_Health;
    elements.Max_Hit_Points_Label.title = "7 + (7 * Player Level)";

    // Health
    elements.Current_Health.value = data.Current_Health;

    // Armor
    elements.Armor_Class_Label.textContent = data.Armor_Class;
    elements.Armor_Class_Label.title = "13 + PC Proficiency";

    // Basic Traits
    data.Saving_Throws_Bonus = 2 + data.Player_Proficiency; // Dex(1) + 1 + Player Proficiency Bonus
    elements.Saving_Throws_Bonus.textContent = data.Saving_Throws_Bonus;

    data.Stealth_Skill_Bonus = 1 + data.Player_Proficiency;
    elements.Stealth_Skill_Bonus.textContent = data.Stealth_Skill_Bonus;
}


function PlayerLevelChanged(event) {
    // Level
    data.Player_Level = event.target.value;

    // Player Proficiency
    data.Player_Proficiency = (Math.ceil(data.Player_Level / 4) + 1)
    elements.Player_Proficiency.textContent = data.Player_Proficiency;

    // Max Health
    data.Max_Health = 7 + (7 * data.Player_Level);
    elements.Max_Hit_Points_Label.textContent = data.Max_Health;
    elements.Max_Hit_Points_Label.title = "7 + (7 * Player Level)";

    // Health
    data.Current_Health = data.Max_Health;
    elements.Current_Health.value = data.Max_Health;

    // Armor
    elements.Armor_Class_Label.textContent = data.Armor_Class;
    elements.Armor_Class_Label.title = "13 + PC Proficiency";

    // Basic Traits
    data.Saving_Throws_Bonus = 2 + data.Player_Proficiency; // Dex(1) + 1 + Player Proficiency Bonus
    elements.Saving_Throws_Bonus.textContent = data.Saving_Throws_Bonus;

    data.Stealth_Skill_Bonus = 1 + data.Player_Proficiency;
    elements.Stealth_Skill_Bonus.textContent = data.Stealth_Skill_Bonus;
}