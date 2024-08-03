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
            <p>{text}</p>
            <button onClick={onReloadAction}>Get random epigram</button>
            <input id="autoReload" type="checkbox" onClick={(e) => onAutoReloadChanged(e.currentTarget.checked)}/>
            <label for="autoReload">Enable/Disable auto reload</label>
        </div>


    )
}

export const EpigramComponent = () => {

    const [isAutoReloadEnabled, setAutoReloadEnabled] = useState(false)
    const {data, error, isError, isPending, refetch} = useQuery({
        queryKey: ['epigram'],
        queryFn: getRandomEpigram,
        refetchOnWindowFocus: false,
        refetchInterval: isAutoReloadEnabled ? 1000 : false,
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
                     }></EpigramView>
    )
}

export default EpigramComponent