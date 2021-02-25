import { CONSTS } from "../models/consts";

export async function fetchJson(path: string, method: "get" | "post" | "delete" | "put" = "get", payload: any = null, payloadType = "application/json") {
    let headers = {};
    // if (TOKEN != "") {
    // headers = { "Authorization": `Bearer ${TOKEN}` };
    // }

    if (payloadType == "application/json") {
        headers = { ...headers, "Content-Type": payloadType }
    }

    const res = await fetch(`${CONSTS.endpoint}/${path}`, {
        method,
        body: payload,
        headers: {
            // "Content-Type": payloadType,
            ...headers
        }
    });

    try {
        return await res.json();
    } catch (e) {
        console.log(e);
        return null;
    }
}