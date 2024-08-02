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
            <button onClick={onReloadAction}>Reload epigram</button>
            <input id="autoReload" type="checkbox" onClick={(e) => onAutoReloadChanged(e.currentTarget.checked)} />
            <label for="autoReload">Enable/Disable auto reload</label>
        </div>


    )
}

export const EpigramComponent = () => {
    return (
        <EpigramView text="The journey of a thousand miles begins with a single step"
                     onReloadAction={() => console.log("Reload!!!")}
                     onAutoReloadChanged={(newState) => console.log("Auto-load: "+newState)}></EpigramView>
    )
}

export default EpigramComponent