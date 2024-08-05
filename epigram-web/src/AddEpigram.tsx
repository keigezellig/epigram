import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {addNewEpigram} from "./api.ts";

interface AddEpigramViewProps {
    onSave: (epigramText: string) => void
    showSaveError: boolean
}

const AddEpigramView = (props: AddEpigramViewProps) => {
    const [input, setInput] = useState("");
    const {onSave, showSaveError} = props;
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
                <p><i>Please enter an epigram </i></p>
            }
            {showSaveError &&
                <p><i>Error while saving epigram</i></p>
            }

        </div>
    )
}

export const AddEpigramComponent = () => {
    const mutation = useMutation({
        mutationFn: addNewEpigram
    });

    return <AddEpigramView showSaveError={mutation.isError} onSave={(e => mutation.mutate({text: e}))}/>
}