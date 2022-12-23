import { DialogueSmithAPI } from "./src/index";

const key = "KEY";

let instance = new DialogueSmithAPI(key);

async function main()
{
    let result = await instance.world_building_western_character_sheet(
        "An all-powerful duck."
    );
    console.log(result);
}

main();