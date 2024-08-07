import {useQuery} from "@tanstack/react-query";
import {getRandomEpigram} from "./api.ts";
import {useState} from "react";

interface EpigramViewProps {
    text?: string,
    status: string,
    onReloadAction: () => void
    onAutoReloadChanged: (newState: boolean) => void
}

const EpigramView = (props: EpigramViewProps) => {
    const {text, status, onReloadAction, onAutoReloadChanged} = props;

    const displayText = (status: string, epigramText?: string) => {
        if (status == "pending") {
            return <div className="information-text"><h3>Loading epigram..</h3></div>
        }
        if (status == "error") {
            return <div className="error-text"><h3>Error while loading epigram</h3></div>
        }

        if (status === "success" && !epigramText) {
            return <div className="error-text"><h3>No epigrams available. Please add some.</h3></div>
        }

        return <h3>{epigramText}</h3>;
    }
    return (
        <div className="card">
            {displayText(status, text)}
            <p>
                <button onClick={onReloadAction}>Get random epigram</button>
            </p>
            <label>Enable/Disable auto reload
                <input id="autoReload" type="checkbox" onClick={(e) => onAutoReloadChanged(e.currentTarget.checked)}/>
            </label>
        </div>
    )
}

export const EpigramLoader = () => {
    const [isAutoReloadEnabled, setAutoReloadEnabled] = useState(false)
    const {data, error, status, refetch} = useQuery({
        queryKey: ['epigram'],
        queryFn: getRandomEpigram,
        refetchOnWindowFocus: false,
        refetchInterval: isAutoReloadEnabled ? 1000 : false,        //This looks funny but it's actually how this property is defined
    });

    let text;
    if (status === "error") {
        console.log(error);
    } else if (status === "success") {
        text = data!.text;
    }

    return (
        <EpigramView text={text}
                     status={status}
                     onReloadAction={() => refetch()}
                     onAutoReloadChanged={(newState) => {
                         console.log("Auto-load: " + newState)
                         setAutoReloadEnabled(newState);
                     }
                     }>
        </EpigramView>
    )
}

export default EpigramLoader