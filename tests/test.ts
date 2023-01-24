import { DialogueSmithAPI, Result, ResultLike} from "../src/index";
import { ResultIsError, ResultIsResponse } from "../src/index";

const key = "KEY";

let instance = new DialogueSmithAPI(key);

async function main()
{

    let find_closest_match = await instance.dialogue_find_closest_match(
        ["Can i have a look at your tools", "Got any Quests for me?", "Goodbye"],
        "What are your finest tools?"
    );
    if (ResultIsError(find_closest_match))
    {
        console.error("Error in find closest match:");
        console.error(find_closest_match.errorText);
    } else if (ResultIsResponse(find_closest_match))
    {
        for (let dialogue of find_closest_match.result.dialogue)
        {
            console.log(dialogue);
        }
        console.log("Remaining Tokens = ", find_closest_match.result.remaining_tokens);
    }

    let list_continue = await instance.dialogue_list_continuation(
        "tools",
        [
            "Hoe",
            "Axe",
            "Enchanted Sword"
        ]
    );
    if (ResultIsError(list_continue))
    {
        console.error("Error in list continue:");
        console.error(list_continue.errorText);
    } else if (ResultIsResponse(list_continue))
    {
        for (let dialogue of list_continue.result.dialogue)
        {
            console.log(dialogue);
        }
        console.log("Remaining Tokens = ", list_continue.result.remaining_tokens);
    }

    let contract_generation = await instance.dialogue_contract_gen(
        "Nazeem",
        "Whiterun",
        "Dawnstar",
        "The Jarl",
        "10 thousand septims",
        false
    );
    if (ResultIsError(contract_generation))
    {
        console.error("Error in contract_generation:");
        console.error(contract_generation.errorText);
    } else if (ResultIsResponse(contract_generation))
    {
        for (let dialogue of contract_generation.result.dialogue)
        {
            console.log(dialogue);
        }
        console.log("Remaining Tokens = ", contract_generation.result.remaining_tokens);
    }

    let scifi_character_sheet = await instance.world_building_scifi_character_sheet(
        "Zycrasion, She is the developer of the package"
    );
    if (ResultIsError(scifi_character_sheet))
    {
        console.error("Error in scifi character sheet:");
        console.error(scifi_character_sheet.errorText);
    } else if (ResultIsResponse(scifi_character_sheet))
    {
        for (let dialogue of scifi_character_sheet.result.dialogue)
        {
            console.log(dialogue);
        }
        console.log("Remaining Tokens = ", scifi_character_sheet.result.remaining_tokens);
    }
    /*
    Name: Zycrasion
    Race: Human
    Sex: Female
    Appearance: Tall and slender, long black hair, wears a white lab coat and glasses.
    Temperament: Intelligent and curious 
    Occupation: Scientist/Developer 
    Primary Location: Research Lab 
    Specialization: Developing technological packages 
    Equipment: Computer, various tools for tinkering with technology  
    Inventory: Various components (5) small notebook (1) pen (1) 
    Finances : 500  
    Relationship to Player : A scientist who will develop new technological packages for the player at a price.
    */
    let drunk_npc = await instance.dialogue_drunk_response(
        "Hello Frank! Have you heard about this package? It's amazing!"
    );
    if (ResultIsError(drunk_npc))
    {
        console.error("Error in drunk npc:");
        console.error(drunk_npc.errorText);
    } else if (ResultIsResponse(drunk_npc))
    {
        for (let dialogue of drunk_npc.result.dialogue)
        {
            console.log(dialogue);
        }
        console.log("Remaining Tokens = ", drunk_npc.result.remaining_tokens);
    }
    /*
     Hey Frank! Package? What package? Lemme see it! I love packages! 
    */

    let varied_responses = await instance.dialogue_variations(
        "Hey! Can you install the package in node package manager?"
    );
    if (ResultIsError(varied_responses))
    {
        console.error("Error in varied responses:");
        console.error(varied_responses.errorText);
    } else if (ResultIsResponse(varied_responses))
    {
        for (let dialogue of varied_responses.result.dialogue)
        {
            console.log(dialogue);
        }
        console.log("Remaining Tokens = ", varied_responses.result.remaining_tokens);
    }
    /*
    Hey! Are you able to install the package in node package manager?
    Hey! Do you know how to install the package in node package manager?
    Hey! Could you help me install the package in node package manager?
    Hey! Would it be possible for you to install the package in node package manager?
    Hey! Is it within your capability to install the package in node package manager?
    */

}

main();