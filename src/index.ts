import { VariationResponse, DialogueTone, PlayerCompanionResponse } from "./ResponseTypes";
import { generate_dialogue_smith_headers, HTTPHeaders, request_simple } from "./http_helper";

import {Result , ResultLike, ResultIsError, ResultIsResponse} from "./ResponseTypes";
export {Result, ResultLike, ResultIsError, ResultIsResponse};

import * as URL from "node:url"

const API_ENDPOINT = "https://api.dialoguesmith.com/v1";

export class DialogueSmithAPI
{
    private token: string;

    constructor(token: string)
    {
        this.token = token;
    }

    private async create_request_input_tone(end: string, input: string, tone: DialogueTone): Promise<ResultLike<unknown>>
    {
        let url = API_ENDPOINT + `${end}?input=${input}&tone=${tone}`;
        let headers = generate_dialogue_smith_headers(this.token);

        try
        {
            let response_raw = await request_simple(url, headers);
            return new Result<unknown>(false).setResult(JSON.parse(response_raw))

        } catch (e)
        {
            return new Result<unknown>(true).setErrorText(e);
        }
    }

    private async create_request_object_list_dialogue(end: string, dialogue: string, object_list: string[]): Promise<ResultLike<unknown>>
    {
        let url = API_ENDPOINT + `${end}?object_list=${JSON.stringify(object_list)}&tone=${dialogue}`;
        let headers = generate_dialogue_smith_headers(this.token);

        try
        {
            let response_raw = await request_simple(url, headers);
            return new Result<unknown>(false).setResult(JSON.parse(response_raw))

        } catch (e)
        {
            return new Result<unknown>(true).setErrorText(e);
        }
    }

    private async create_request_input(end: string, input: string): Promise<unknown>
    {
        let url = API_ENDPOINT + `${end}?input=${input}`;
        let headers = generate_dialogue_smith_headers(this.token);

        try
        {
            let response_raw = await request_simple(url, headers);
            return new Result<unknown>(false).setResult(JSON.parse(response_raw))

        } catch (e)
        {
            return new Result<unknown>(true).setErrorText(e);
        }
    }

    /**
     * Generate variation of provided input
     * @param input The input to generate variations for.
     * @param tone The tone to use when generating variations for the provided text.
     */
    async dialogue_variations(input: string, tone: DialogueTone = "Default"): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input_tone("/dialogue/variations", input, tone) as Result<VariationResponse>;
    }

    /**
     * Given information about the game state, generate dialogue the player character might say.
     * @param input The input describing the current game state to generate dialog for. ```Example : The player is standing in a deserted golden city. The streets are empty and the buildings are crumbling everywhere.```
     */
    async dialogue_comment_from_game_state(input: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input("/dialogue/comments-from-game-state", input) as Result<VariationResponse>
    }

    /**
     * This will generate variations of the same piece of dialogue as if the speaker is getting frustrated at being repeatedly asked the same question. (Your input will represent the first time it is asked).
     * @param input The input to generate variations for.
    ```Example : You must go now and speak to the man by the river, he has the answers you seek?```
     */
    async dialogue_repeated_response(input: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input("/dialogue/repeated-response", input) as Result<VariationResponse>
    }

    /**
     * Given a description of the player doing something, this will generate an npc's response to that action.
     * @param input The input describing the current game state to generate dialog for.
    ```Example : The player is chopping a tree down with a dull axe.```
     * @param tone The tone to use when generating variations for the provided text.
     */
    async dialogue_npc_comments_from_action(input: string, tone: DialogueTone = "Default"): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input_tone("/dialogue/npc-comments-from-actions", input, tone) as Result<VariationResponse>;
    }

    /**
     * This generates a drunk response to a question asked as input.
     * @param input The question that you would like to have responded to by a drunk individual.
    ```Example : Do you know how to get to the castle?```
     */
    async dialogue_drunk_response(input: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input("/dialogue/drunk-responses", input) as Result<VariationResponse>
    }

    /**
     * Convert the provided input into old Shakespearean english.
     * @param input The input you would like to "shakespearify".
    ```Example : Please, I need you to go find the box for me.```
    */
    async dialogue_shakespearify(input: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input("/dialogue/shakespearify", input) as Result<VariationResponse>
    }

    /**
     * Given a description of the current scenario, provide player & companion comments.
     * @param input The input describing what is currently going on near the player.
    ```Example : The player is standing in a forest. There are countless aggressive turtles nearby.```
    */
    async dialogue_companion_comments(input: string): Promise<Result<PlayerCompanionResponse>>
    {
        return await this.create_request_input("/dialogue/player-companion-comments", input) as Result<PlayerCompanionResponse>
    }

    /**
     * Generate a contract
     * @param target Target of the contract. Can contain a description of the target in parenthesis
     * @param location Where the target is located
     * @param location_current The location of the person that made the contract
     * @param contract_giver Contract giver. The contract will be signed off with this name.
     * @param reward Reward for completing the contract
     * @param more_info Whether or not the contract giver should be consulted before the contract target should be taken care of.
        ```Example : True```
     * @returns 
     */
    async dialogue_contract_gen(target : string, location : string, location_current : string, contract_giver : string, reward : string, more_info : boolean): Promise<Result<VariationResponse>>
    {
        let url = API_ENDPOINT + `/dialogue/contract-gen?target=${target}&location=${location}&location_current=${location_current}&contract_giver=${contract_giver}&reward=${reward}&more_info=${more_info}`;
        let headers = generate_dialogue_smith_headers(this.token);

        try
        {
            let response_raw = await request_simple(url, headers);
            return new Result<VariationResponse>(false).setResult(JSON.parse(response_raw))

        } catch (e)
        {
            return new Result<VariationResponse>(true).setErrorText(e);
        }
    }

    
    /**
     * Uses the inputted list and returns the item thats the closest matching item to the inputted dialogue.
     * @param input The input list
     * @param dialogue the dialogue to match against
    ```Example : ["An old abandoned house" "A beautiful city floating above purple city", "A dog"], "The Dog"```
    */
    async dialogue_find_closest_match(input: string[], dialogue: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_object_list_dialogue("/dialogue/find-closest-match", dialogue, input) as Result<VariationResponse>
    }
    
    /**
     * Uses the items below to generate more items, ideally use 2 or more as examples for the best results.
     * @param guide This field guides the details and patterns of the outputs.
    ```Example : Sharp weapons from the underworld, with details about damage types, attack speed, and range.```
     * @param items Existing list items to copy the style of.
    ```Example : Bow of the dead: An ancient bow made from the wood of the World Tree. Takes a second to fully draw, and fires a single shot that can pierce through multiple enemies.```
    */
    async dialogue_list_continuation(guide: string, items: [string, string?, string?, string?, string?]): Promise<Result<VariationResponse>>
    {
        let item_template = "&item_%NUMBER%=%VALUE%";
        let url = API_ENDPOINT + `/dialogue/list-continuation?guide=${guide}`;
        let headers = generate_dialogue_smith_headers(this.token);

        for (let i=0;i<items.length;i++)
        {
            url = url.concat(item_template.replace("%NUMBER%", (i+1).toString() ).replace("%VALUE%", items[i]));
        }

        try
        {
            let response_raw = await request_simple(url, headers);
            return new Result<VariationResponse>(false).setResult(JSON.parse(response_raw))

        } catch (e)
        {
            return new Result<VariationResponse>(true).setErrorText(e);
        }
    }

    /**
     * Generates game lore based on the provided input.
     * @param input The input you would like to generate lore for.
    ```Example : An old castle within a forest.```
    */
    async world_building_lore(input: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input("/world-building/lore", input) as Result<VariationResponse>
    }

    /**
     * Generates a fantasy character sheet using the provided input.
     * @param input The input for generating a Fantasy Character Sheet.
    ```Example : A busy fisherman, he also recently lost his tackle box.```
    */
    async world_building_fantasy_character_sheet(input: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input("/world-building/fantasy-character-sheet", input) as Result<VariationResponse>
    }

    /**
     * Generates a sci-fi character sheet using the provided input.
     * @param input The input for generating a Sci-fi Character Sheet.
    ```Example : A busy fisherman, he also recently lost his tackle box.```
    */
    async world_building_scifi_character_sheet(input: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input("/world-building/scifi-character-sheet", input) as Result<VariationResponse>
    }

    /**
     * Generates a western character sheet using the provided input.
     * @param input The input for generating a Western Character Sheet.
    ```Example : A busy fisherman, he also recently lost his tackle box.```
    */
    async world_building_western_character_sheet(input: string): Promise<Result<VariationResponse>>
    {
        return await this.create_request_input("/world-building/western-character-sheet", input) as Result<VariationResponse>
    }
}