export interface EpigramResponse {
    text: string;
}

export interface NewEpigramRequest {
    text: string;
}

const URL: string = 'http://localhost:8080/epigram';
export const getRandomEpigram = async (): Promise<EpigramResponse> => {
    const response = await fetch(URL);
    if (response.status === 404) {
        throw new Error("No epigrams available");
    }
    const json = await response.json();
    return {text: json.text}
}

export const addNewEpigram = async (epigram: NewEpigramRequest): Promise<void> => {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(epigram)
    });
    if (response.status !== 201) {
        throw new Error("Could not add new epigram with status: " + response.status);
    }
}

