export type DialogueTone = "Default" | "Angry" | "Arrogant" | "Happy" | "Sad" | "Scared" | "Envious" | "Disgusted" | "Confused" | "Hopeful";

export type VariationResponse = {
    dialogue: string[],
    remaining_tokens: number
}

export type PlayerCompanionResponse = {
    playerResponse: string,
    companionResponse: string,
    remaining_tokens: number
}