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

export interface ResultLike<T>
{
    error : boolean,
    errorText? : string,
    result? : T,
}

export function ResultIsError(rl : ResultLike<any>) : rl is {error : true, errorText : string}
{
    return rl.error;
}

export function ResultIsResponse<T>(rl : ResultLike<T>) : rl is {error : false, result : T}
{
    return !rl.error
}

export class Result<T> implements ResultLike<T>
{
    readonly error : boolean;
    public errorText?: string;
    public result?: T;

    constructor(error : boolean)
    {
        this.error = error;
    }

    setResult(res : T)
    {
        if (this.error) return this;
        this.result = res;
        return this;
    }

    setErrorText(err : string)
    {
        if (!this.error) return this;
        this.errorText = err;
        return this;
    }
}