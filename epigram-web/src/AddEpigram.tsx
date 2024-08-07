import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {addNewEpigram} from "./api.ts";

interface AddEpigramViewProps {
    onSave: (epigramText: string) => void
}

const AddEpigramView = (props: AddEpigramViewProps) => {
    const [input, setInput] = useState("");
    const {onSave} = props;
    return (
        <div className="card">
            <h2>Add epigram</h2>
            <label htmlFor="epigramText"> Enter epigram text: </label>
            <input type="text" size={100} required id="epigramText"
                   onChange={(e) => setInput(e.target.value)}/>
            <button disabled={input === ""} onClick={() => {
                if (input !== "") {
                    onSave(input);
                }
            }
            }>Save
            </button>

            {input === "" &&
                <div className="error-text"><p>Please enter an epigram</p></div>
            }
        </div>
    )
}

export const AddEpigramComponent = () => {
    const mutation = useMutation({
        mutationFn: addNewEpigram
    });

    const save = (epigramText: string) => {
        mutation.mutate({text: epigramText});
    }

    return (
        <>
            <AddEpigramView onSave={save}/>
            {mutation.isSuccess && <div className="information-text">Successfully saved epigram</div>}
            {mutation.isError && <div className="error-text">Error while saving epigram</div>}
        </>
    )
}