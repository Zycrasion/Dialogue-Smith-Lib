import { VariationResponse, DialogueTone, PlayerCompanionResponse } from "./ResponseTypes";
import { generate_dialogue_smith_headers, HTTPHeaders, request_simple } from "./http_helper";

import {Result , ResultLike, ResultIsError, ResultIsResponse} from "./ResponseTypes";
export {Result, ResultLike, ResultIsError, ResultIsResponse};

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