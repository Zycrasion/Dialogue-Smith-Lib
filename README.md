
# Dialogue Smith Typescript/Javascript API Library

This library helps with making requests to the Dialogue Smith API. For more info on dialogue smith refer to this website [Dialogue Smith Homepage](https://dialoguesmith.com/), for the API reference refer to [the api docs](https://api.dialoguesmith.com/). Usage below Example. 

On The Website they also should have a link to their discord server if your interested!
## Example
```ts

import { DialogueSmithAPI, Result, ResultLike} from "../src/index";
import { ResultIsError, ResultIsResponse } from "../src/index";

const key = "KEY";

let instance = new DialogueSmithAPI(key);

async function main()
{
    let scifi_character_sheet = await instance.world_building_scifi_character_sheet(
        "Zycrasion, She is the developer of the package"
    );
    // Check if it resulted in an error
    if (ResultIsError(scifi_character_sheet))
    {
        // If it did, do error handling
        console.error("Error in scifi character sheet:");
        console.error(scifi_character_sheet.errorText);
    } else if (ResultIsResponse(scifi_character_sheet))
    {
        // Otherwise you have your output
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
```

## Usage
First, you have to create an API instance,
```ts
let api_key = "<your api key>";

let instance = new DialogueSmithAPI(api_key)
```
To make a request to the api you can call function on the instance,
```ts
let response = await instance.dialogue_drunk_response(
"I would love to purchase your finest armours"
);
```
The to get the result, you have to do a little bit of error handling in case the response resulted in an error
```ts
if (ResultIsError(response))
{
    console.error(response.errorText);
} else if (ResultIsResponse(response))
{
    for (let dialogue of response.result.dialogue)
    {
        console.log(dialogue);
    }
    console.log("Remaining Tokens = ", response.result.remaining_tokens);
}
```
And that's it! If you have any suggestions feel free to submit an Issue on the repository.