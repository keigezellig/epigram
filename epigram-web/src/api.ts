export interface EpigramResponse {
    text?: string;
}

export interface NewEpigramRequest {
    text: string;
}

const URL: string = 'http://localhost:8100/epigram';
export const getRandomEpigram = async (token: string | undefined): Promise<EpigramResponse> => {

    //const headers = token ? {'authorization': `Bearer ${token}`} : {}
    const requestInit: RequestInit = {};
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    requestInit.headers = headers;

    const response = await fetch(URL, requestInit);

    if (response.ok) {
        const json = await response.json();
        return {text: json.text}
    }
    if (response.status === 404) {
        return {}
    }

    throw new Error(response.statusText);
}

export const addNewEpigram = async (epigram: NewEpigramRequest, token: string | undefined): Promise<void> => {

    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);

    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },

        body: JSON.stringify(epigram)
    });
    if (response.status !== 201) {
        throw new Error("Could not add new epigram with status: " + response.status);
    }
}

