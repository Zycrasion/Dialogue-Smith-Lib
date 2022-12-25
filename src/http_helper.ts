import * as https from "https";

export interface HTTPHeaders
{
    [key: string]: string;
}

export function request_simple(url: string, headers: HTTPHeaders): Promise<string>
{
    return new Promise<string>((resolve, reject) =>
    {
        https.get(url, { "headers": headers }, res =>
        {
            let status_code = res.statusCode;

            if (status_code !== 200) { res.resume(); reject("STATUS CODE NOT 200! RESPONSE HEADERS ARE ".concat(JSON.stringify(res.headers), "\n", 
            "The most common cause of thise is due to not inputting your api-key correctly")); }

            let raw_data = "";
            res.on("data", (chunk) =>
            {
                raw_data += chunk;
            });

            res.on("end", () =>
            {
                resolve(raw_data);
            })
        })
    })
}

export function generate_dialogue_smith_headers(token: string): HTTPHeaders
{
    return {
        "accept": "application/json",
        "api-key": token
    }
}