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

    elements.Ferocity.addEventListener("change", (event) => {
        FerocityManuallyChanged(event);
    })

    elements.Adjacent_Enemies_Dropdown.addEventListener("change", (event) => {
        AdjacentEnemiesChanged(event);
    })
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
    elements.Ferocity = document.getElementById("Ferocity");
    elements.Rampage_Risk_Group = document.getElementById("Rampage_Risk_Group");
    elements.Damage_Input = document.getElementById("Damage_Input");
    elements.Healing_Input = document.getElementById("Healing_Input");
    elements.Adjacent_Enemies_Dropdown = document.getElementById("Adjacent_Enemies_Dropdown");
    elements.Adjacent_Enemies_Label = document.getElementById("Adjacent_Enemies_Label");
    elements.Animal_Handling_Label = document.getElementById("Animal_Handling_Label");
    elements.Half_Ferocity_Label = document.getElementById("Half_Ferocity_Label");
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
    data.Ferocity = 0;
    data.Adjacent_Enemies_Value = 0;
    data.Animal_Handling_Check = 5;
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

    // Ferocity
    elements.Ferocity.value = data.Ferocity;
    elements.Rampage_Risk_Group.style.display = "none";
    elements.Adjacent_Enemies_Label.textContent = data.Adjacent_Enemies_Value;
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

function Heal() {
    const healValue = elements.Healing_Input.value;
    if (healValue) {
        data.Current_Health += parseInt(healValue);
        if (data.Current_Health > data.Max_Health) {
            data.Current_Health = data.Max_Health;
        }
        elements.Current_Health.value = data.Current_Health;
        elements.Healing_Input.value = 0;
        elements.Damage_Input.value = 0;
    }
}

function Damage() {
    const damageValue = elements.Damage_Input.value;
    if (damageValue) {
        data.Current_Health -= damageValue;
        elements.Current_Health.value = data.Current_Health;
        elements.Damage_Input.value = 0;
        elements.Healing_Input.value = 0;
    }
}

function FerocityManuallyChanged(event) {
    data.Ferocity = event.target.value;

    FerocityChanged();
}

function FerocityChanged()
{
    data.Animal_Handling_Check = 5 + parseInt(data.Ferocity);
    elements.Animal_Handling_Label.textContent = data.Animal_Handling_Check;
    elements.Half_Ferocity_Label.textContent = Math.floor(data.Ferocity / 2);

    CheckForRampage();
}

function AdjacentEnemiesChanged(event) {
    data.Adjacent_Enemies_Value = event.target.value;
    elements.Adjacent_Enemies_Label.textContent = data.Adjacent_Enemies_Value;
}

function IncreaseFerocity(ferocityValue) {
    data.Ferocity += (parseInt(ferocityValue) + parseInt(data.Adjacent_Enemies_Value));
    elements.Ferocity.value = data.Ferocity;

    FerocityChanged();
}

function CheckForRampage() {
    if (data.Ferocity >= 10) {
        elements.Rampage_Risk_Group.style.display = "block";
        document.querySelectorAll('div.Ferocity-Increase-Button-Group').forEach(
            el => el.querySelectorAll('input').forEach(
                el2 => el2.disabled = true
            )
        )
    }
    else {
        elements.Rampage_Risk_Group.style.display = "none";
    }
}