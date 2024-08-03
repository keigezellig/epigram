export interface EpigramResponse {
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