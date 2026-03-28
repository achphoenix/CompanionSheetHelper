var companionData = {
    mimic: {},
    mouther: {}
};
var companionElements = {
    mimic: {},
    mouther: {}
};
var currentCompanion = 'mimic';

// On Load
addEventListener("DOMContentLoaded", () => {
    LoadSite();
});

function LoadSite() {
    FetchElements('mimic');
    FetchElements('mouther');
    LoadData();
    InitiateLabels('mimic');
    InitiateLabels('mouther');

    document.getElementById("Everything").style.display = "block";

    // Setup event listeners for both companions
    ['mimic', 'mouther'].forEach(companion => {
        companionElements[companion].Player_Character_Level.addEventListener("change", (event) => {
            PlayerLevelChanged(companion, event);
            SaveData();
        });

        companionElements[companion].Ferocity.addEventListener("change", (event) => {
            FerocityManuallyChanged(companion, event);
            SaveData();
        });

        companionElements[companion].Adjacent_Enemies_Dropdown.addEventListener("change", (event) => {
            AdjacentEnemiesChanged(companion, event);
            SaveData();
        });

        companionElements[companion].Current_Health.addEventListener("change", (event) => {
            CurrentHealthChanged(companion, event);
            SaveData();
        });
    });
}

function FetchElements(companion) {
    const prefix = companion + '_';
    companionElements[companion].Player_Character_Level = document.getElementById(prefix + "Player_Character_Level");
    companionElements[companion].Max_Hit_Points_Label = document.getElementById(prefix + "Max_Hit_Points_Label");
    companionElements[companion].Current_Health = document.getElementById(prefix + "Current_Health");
    companionElements[companion].Armor_Class_Label = document.getElementById(prefix + "Armor_Class_Label");
    companionElements[companion].Player_Proficiency = document.getElementById(prefix + "Player_Proficiency");
    companionElements[companion].Ferocity = document.getElementById(prefix + "Ferocity");
    companionElements[companion].Rampage_Risk_Group = document.getElementById(prefix + "Rampage_Risk_Group");
    companionElements[companion].Damage_Input = document.getElementById(prefix + "Damage_Input");
    companionElements[companion].Healing_Input = document.getElementById(prefix + "Healing_Input");
    companionElements[companion].Adjacent_Enemies_Dropdown = document.getElementById(prefix + "Adjacent_Enemies_Dropdown");
    companionElements[companion].Adjacent_Enemies_Label = document.getElementById(prefix + "Adjacent_Enemies_Label");
    companionElements[companion].Animal_Handling_Label = document.getElementById(prefix + "Animal_Handling_Label");
    companionElements[companion].Half_Ferocity_Label = document.getElementById(prefix + "Half_Ferocity_Label");
    companionElements[companion].Signature_Attack_Hit_Label = document.getElementById(prefix + "Signature_Attack_Hit_Label");
    companionElements[companion].Signature_Attack_Damage_Label = document.getElementById(prefix + "Signature_Attack_Damage_Label");

    if (companion === 'mimic') {
        companionElements[companion].Saving_Throws_Bonus = document.getElementById(prefix + "Saving_Throws_Bonus");
        companionElements[companion].Stealth_Skill_Bonus = document.getElementById(prefix + "Stealth_Skill_Bonus");
        companionElements[companion].Adhesive_Pseudopods_DC_Label = document.getElementById(prefix + "Adhesive_Pseudopods_DC_Label");
        companionElements[companion].Im_You_DC_Label = document.getElementById(prefix + "Im_You_DC_Label");
    } else if (companion === 'mouther') {
        companionElements[companion].Dex_Saving_Throw = document.getElementById(prefix + "Dex_Saving_Throw");
        companionElements[companion].Con_Saving_Throw = document.getElementById(prefix + "Con_Saving_Throw");
        companionElements[companion].Wis_Saving_Throw = document.getElementById(prefix + "Wis_Saving_Throw");
        companionElements[companion].Reality_Pull_Targets_Label = document.getElementById(prefix + "Reality_Pull_Targets_Label");
        companionElements[companion].Reality_Pull_DC_Label = document.getElementById(prefix + "Reality_Pull_DC_Label");
        companionElements[companion].Stretch_Attack_Bonus_Label = document.getElementById(prefix + "Stretch_Attack_Bonus_Label");
        companionElements[companion].Vicinity_Shift_Bonus_Label = document.getElementById(prefix + "Vicinity_Shift_Bonus_Label");
        companionElements[companion].Chaotic_Form_Charges_Label = document.getElementById(prefix + "Chaotic_Form_Charges_Label");
        companionElements[companion].Mystic_Connection_Block = document.getElementById(prefix + "Mystic_Connection_Block");
    }
}

function LoadData() {
    const savedData = localStorage.getItem("CompanionData");
    if (!savedData) {
        DefaultData('mimic');
        DefaultData('mouther');
        return;
    }

    console.log("Loaded saved data");
    companionData = JSON.parse(savedData);
    
    ['mimic', 'mouther'].forEach(companion => {
        if (companionData[companion]) {
            companionElements[companion].Player_Character_Level.value = companionData[companion].Player_Character_Level;
            companionElements[companion].Adjacent_Enemies_Dropdown.value = companionData[companion].Adjacent_Enemies_Value;
            companionElements[companion].Ferocity.value = companionData[companion].Ferocity;
            companionElements[companion].Current_Health.value = companionData[companion].Current_Health;
            
            // Load mouther-specific data
            if (companion === 'mouther' && companionData[companion].Chaotic_Form_Charges !== undefined) {
                companionElements[companion].Chaotic_Form_Charges_Label.textContent = companionData[companion].Chaotic_Form_Charges + "/1";
            }
        }
    });
}

function SaveData() {
    localStorage.setItem("CompanionData", JSON.stringify(companionData));
    console.log("Data saved");
}

function DefaultData(companion) {
    console.log("Loading default data for " + companion);

    companionData[companion] = {};
    companionData[companion].Player_Character_Level = 1;
    companionData[companion].Player_Proficiency = 2;
    companionData[companion].Ferocity = 0;
    companionData[companion].Adjacent_Enemies_Value = 0;
    companionData[companion].Animal_Handling_Check = 5;
    companionData[companion].Signature_Attack_Hit_Bonus = 3 + companionData[companion].Player_Proficiency;
    companionData[companion].Signature_Attack_Damage = companionData[companion].Player_Proficiency;

    if (companion === 'mimic') {
        companionData[companion].Max_Health = 7 + (7 * companionData[companion].Player_Character_Level);
        companionData[companion].Current_Health = companionData[companion].Max_Health;
        companionData[companion].Armor_Class = 13 + companionData[companion].Player_Proficiency;
        companionData[companion].Saving_Throws_Bonus = 2 + companionData[companion].Player_Proficiency; // Dex(1) + 1 + PB
        companionData[companion].Stealth_Skill_Bonus = 1 + companionData[companion].Player_Proficiency;
        companionData[companion].Adhesive_Pseudopods_DC = 10 + companionData[companion].Player_Proficiency;
        companionData[companion].Im_You_DC = 10 + companionData[companion].Player_Proficiency;
    } else if (companion === 'mouther') {
        companionData[companion].Max_Health = 7 + (7 * companionData[companion].Player_Character_Level);
        companionData[companion].Current_Health = companionData[companion].Max_Health;
        companionData[companion].Armor_Class = 11 + companionData[companion].Player_Proficiency;
        companionData[companion].Dex_Saving_Throw = 1 + companionData[companion].Player_Proficiency; // Dex(+1) + PB
        companionData[companion].Con_Saving_Throw = 3 + companionData[companion].Player_Proficiency; // Con(+3) + PB
        companionData[companion].Wis_Saving_Throw = 0 + companionData[companion].Player_Proficiency; // Wis(+0) + PB
        companionData[companion].Reality_Pull_DC = 10 + companionData[companion].Player_Proficiency;
        companionData[companion].Chaotic_Form_Charges = 1; // Long rest resource
    }
}

function ResetSite() {
    localStorage.removeItem("CompanionData");
    location.reload();
}

function InitiateLabels(companion) {
    const data = companionData[companion];
    const elements = companionElements[companion];

    // Player Proficiency
    elements.Player_Proficiency.textContent = data.Player_Proficiency;

    // Max Health
    elements.Max_Hit_Points_Label.textContent = data.Max_Health;
    elements.Max_Hit_Points_Label.title = "7 + (7 * Player Level)";

    // Health
    elements.Current_Health.value = data.Current_Health;

    // Armor
    elements.Armor_Class_Label.textContent = data.Armor_Class;
    if (companion === 'mimic') {
        elements.Armor_Class_Label.title = "13 + PC Proficiency";
    } else {
        elements.Armor_Class_Label.title = "11 + PC Proficiency";
    }

    // Companion-specific traits
    if (companion === 'mimic') {
        data.Saving_Throws_Bonus = 2 + data.Player_Proficiency;
        elements.Saving_Throws_Bonus.textContent = data.Saving_Throws_Bonus;

        data.Stealth_Skill_Bonus = 1 + data.Player_Proficiency;
        elements.Stealth_Skill_Bonus.textContent = data.Stealth_Skill_Bonus;

        elements.Adhesive_Pseudopods_DC_Label.textContent = data.Adhesive_Pseudopods_DC;
        elements.Im_You_DC_Label.textContent = data.Im_You_DC;
    } else if (companion === 'mouther') {
        data.Dex_Saving_Throw = 1 + data.Player_Proficiency;
        elements.Dex_Saving_Throw.textContent = data.Dex_Saving_Throw;

        data.Con_Saving_Throw = 3 + data.Player_Proficiency;
        elements.Con_Saving_Throw.textContent = data.Con_Saving_Throw;

        data.Wis_Saving_Throw = 0 + data.Player_Proficiency;
        elements.Wis_Saving_Throw.textContent = data.Wis_Saving_Throw;

        elements.Reality_Pull_Targets_Label.textContent = data.Player_Proficiency;
        elements.Reality_Pull_DC_Label.textContent = data.Reality_Pull_DC;
        elements.Stretch_Attack_Bonus_Label.textContent = data.Player_Proficiency;
        elements.Vicinity_Shift_Bonus_Label.textContent = data.Player_Proficiency;
        
        // Long rest resources
        if (data.Chaotic_Form_Charges === undefined) {
            data.Chaotic_Form_Charges = 1;
        }
        elements.Chaotic_Form_Charges_Label.textContent = data.Chaotic_Form_Charges + "/1";
        
        // Enable/disable Mystic Connection based on level
        UpdateMysticConnectionAvailability('mouther');
    }

    // Ferocity
    elements.Ferocity.value = data.Ferocity;
    elements.Rampage_Risk_Group.style.display = "none";
    elements.Adjacent_Enemies_Label.textContent = data.Adjacent_Enemies_Value;

    // Attacks
    elements.Signature_Attack_Hit_Label.textContent = data.Signature_Attack_Hit_Bonus;
    elements.Signature_Attack_Damage_Label.textContent = data.Signature_Attack_Damage;
}

function PlayerLevelChanged(companion, event) {
    const data = companionData[companion];
    const elements = companionElements[companion];

    // Level
    data.Player_Character_Level = event.target.value;

    // Player Proficiency
    data.Player_Proficiency = (Math.ceil(data.Player_Character_Level / 4) + 1);
    elements.Player_Proficiency.textContent = data.Player_Proficiency;

    // Max Health
    data.Max_Health = 7 + (7 * data.Player_Character_Level);
    elements.Max_Hit_Points_Label.textContent = data.Max_Health;

    // Health
    data.Current_Health = data.Max_Health;
    elements.Current_Health.value = data.Max_Health;

    // Armor
    if (companion === 'mimic') {
        data.Armor_Class = 13 + data.Player_Proficiency;
    } else {
        data.Armor_Class = 11 + data.Player_Proficiency;
    }
    elements.Armor_Class_Label.textContent = data.Armor_Class;

    // Companion-specific traits
    if (companion === 'mimic') {
        data.Saving_Throws_Bonus = 2 + data.Player_Proficiency;
        elements.Saving_Throws_Bonus.textContent = data.Saving_Throws_Bonus;

        data.Stealth_Skill_Bonus = 1 + data.Player_Proficiency;
        elements.Stealth_Skill_Bonus.textContent = data.Stealth_Skill_Bonus;

        data.Adhesive_Pseudopods_DC = 10 + parseInt(data.Player_Proficiency);
        elements.Adhesive_Pseudopods_DC_Label.textContent = data.Adhesive_Pseudopods_DC;

        data.Im_You_DC = 10 + parseInt(data.Player_Proficiency);
        elements.Im_You_DC_Label.textContent = data.Im_You_DC;
    } else if (companion === 'mouther') {
        data.Dex_Saving_Throw = 1 + data.Player_Proficiency;
        elements.Dex_Saving_Throw.textContent = data.Dex_Saving_Throw;

        data.Con_Saving_Throw = 3 + data.Player_Proficiency;
        elements.Con_Saving_Throw.textContent = data.Con_Saving_Throw;

        data.Wis_Saving_Throw = 0 + data.Player_Proficiency;
        elements.Wis_Saving_Throw.textContent = data.Wis_Saving_Throw;

        data.Reality_Pull_DC = 10 + parseInt(data.Player_Proficiency);
        elements.Reality_Pull_DC_Label.textContent = data.Reality_Pull_DC;
        elements.Reality_Pull_Targets_Label.textContent = data.Player_Proficiency;
        elements.Stretch_Attack_Bonus_Label.textContent = data.Player_Proficiency;
        elements.Vicinity_Shift_Bonus_Label.textContent = data.Player_Proficiency;
    }

    // Attacks
    data.Signature_Attack_Hit_Bonus = 3 + parseInt(data.Player_Proficiency);
    elements.Signature_Attack_Hit_Label.textContent = data.Signature_Attack_Hit_Bonus;
    data.Signature_Attack_Damage = data.Player_Proficiency;
    elements.Signature_Attack_Damage_Label.textContent = data.Signature_Attack_Damage;
    
    // Update Mystic Connection availability for mouther
    if (companion === 'mouther') {
        UpdateMysticConnectionAvailability(companion);
    }
}

function Heal(companion) {
    const data = companionData[companion];
    const elements = companionElements[companion];
    const healValue = elements.Healing_Input.value;
    
    if (healValue) {
        data.Current_Health += parseInt(healValue);
        if (data.Current_Health > data.Max_Health) {
            data.Current_Health = data.Max_Health;
        }
        elements.Current_Health.value = data.Current_Health;
        elements.Healing_Input.value = 0;
        elements.Damage_Input.value = 0;

        SaveData();
    }
}

function Damage(companion) {
    const data = companionData[companion];
    const elements = companionElements[companion];
    const damageValue = elements.Damage_Input.value;
    
    if (damageValue) {
        data.Current_Health -= damageValue;
        elements.Current_Health.value = data.Current_Health;
        elements.Damage_Input.value = 0;
        elements.Healing_Input.value = 0;

        SaveData();
    }
}

function FerocityManuallyChanged(companion, event) {
    companionData[companion].Ferocity = parseInt(event.target.value);
    FerocityChanged(companion);
}

function FerocityChanged(companion) {
    const data = companionData[companion];
    const elements = companionElements[companion];
    
    elements.Ferocity.value = data.Ferocity;
    CheckForRampage(companion);
}

function AdjacentEnemiesChanged(companion, event) {
    const data = companionData[companion];
    const elements = companionElements[companion];
    
    data.Adjacent_Enemies_Value = event.target.value;
    elements.Adjacent_Enemies_Label.textContent = data.Adjacent_Enemies_Value;
}

function CurrentHealthChanged(companion, event) {
    companionData[companion].Current_Health = event.target.value;
}

function IncreaseFerocity(companion, ferocityValue) {
    const data = companionData[companion];
    
    data.Ferocity += (parseInt(ferocityValue) + parseInt(data.Adjacent_Enemies_Value));
    FerocityChanged(companion);
    SaveData();
}

function SpendFerocity(companion, cost) {
    const data = companionData[companion];
    
    if (data.Ferocity >= cost) {
        data.Ferocity -= cost;
        FerocityChanged(companion);
        SaveData();
    }
}

function CheckForRampage(companion) {
    const data = companionData[companion];
    const elements = companionElements[companion];
    
    if (data.Ferocity >= 10) {
        data.Animal_Handling_Check = 5 + parseInt(data.Ferocity);
        elements.Animal_Handling_Label.textContent = data.Animal_Handling_Check;
        elements.Half_Ferocity_Label.textContent = Math.floor(data.Ferocity / 2);

        elements.Rampage_Risk_Group.style.display = "block";
    } else {
        elements.Rampage_Risk_Group.style.display = "none";
    }
}

function EndRampage(companion) {
    companionData[companion].Ferocity = 0;
    FerocityChanged(companion);
    SaveData();
}

function switchTab(companion) {
    // Update active tab
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[data-companion="${companion}"]`).classList.add('active');

    // Update active content
    document.querySelectorAll('.companion-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${companion}-content`).classList.add('active');

    currentCompanion = companion;
}

function UseMysticConnection() {
    const data = companionData.mouther;
    const elements = companionElements.mouther;
    
    // Check if level requirement is met
    if (data.Player_Character_Level < 9) {
        return;
    }
    
    if (data.Chaotic_Form_Charges > 0) {
        data.Chaotic_Form_Charges -= 1;
        elements.Chaotic_Form_Charges_Label.textContent = data.Chaotic_Form_Charges + "/1";
        SaveData();
    }
}

function UpdateMysticConnectionAvailability(companion) {
    if (companion !== 'mouther') return;
    
    const data = companionData[companion];
    const elements = companionElements[companion];
    
    if (data.Player_Character_Level >= 9) {
        elements.Mystic_Connection_Block.classList.remove('disabled');
    } else {
        elements.Mystic_Connection_Block.classList.add('disabled');
    }
}

function LongRest() {
    // Restore health for all companions
    ['mimic', 'mouther'].forEach(companion => {
        if (companionData[companion] && companionElements[companion]) {
            const maxHealth = companionData[companion].Max_Health;
            companionData[companion].Current_Health = maxHealth;
            companionElements[companion].Current_Health.value = maxHealth;
            console.log(`${companion} health restored to ${maxHealth}`);
        }
    });
    
    // Reset all long rest resources for mouther
    if (companionData.mouther && companionElements.mouther) {
        companionData.mouther.Chaotic_Form_Charges = 1;
        companionElements.mouther.Chaotic_Form_Charges_Label.textContent = "1/1";
    }
    
    SaveData();
    console.log("Long rest completed - resources restored and health replenished");
}
