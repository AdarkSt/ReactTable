import "./Header.css"
import { Navbar } from "./Navbar/Navbar.js"
import { useEffect } from "react"
import { Button } from "../Material/Inputs/Button/Button"
import { useId } from "../../Utils/GlobalUtils/useId"

export const Header = props => {

    const id =  "a" + useId()

    useEffect(() => {
        document.title = props.title
    },[props.title])

    return(
        <div className="header">
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <Button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={"#" + id} 
                    title={<span className="navbar-toggler-icon"></span>}
                    />
                </div>
            </nav> 
            <div className="collapse" id={id}> 
                <Navbar/>
            </div>
            
            
        </div>
    )
}