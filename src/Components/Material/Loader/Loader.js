import "./Loader.css"

export const Loader = (props) => {
    const {className} = props
    return (
        <div className={className} style={{display: "flex", justifyContent: "center"}}>
            <div className="lds-dual-ring"></div>
        </div>
    )
}
    
