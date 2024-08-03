import {useQuery} from "@tanstack/react-query";
import {getRandomEpigram} from "./api.ts";
import {useState} from "react";

interface EpigramViewProps {
    text: string,
    onReloadAction: () => void
    onAutoReloadChanged: (newState: boolean) => void
}

const EpigramView = (props: EpigramViewProps) => {
    const {text, onReloadAction, onAutoReloadChanged} = props;
    return (
        <div className="card">
            <h2>{text}</h2>
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
    const {data, error, isError, isPending, refetch} = useQuery({
        queryKey: ['epigram'],
        queryFn: getRandomEpigram,
        refetchOnWindowFocus: false,
        refetchInterval: isAutoReloadEnabled ? 1000 : false,        //This looks funny but it's actually how this property is defined
    });

    let text: string = '';
    if (isError) {
        text = error.message;
    } else if (isPending) {
        text = 'loading';
    } else {
        text = data!.text;
    }

    return (
        <EpigramView text={text}
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