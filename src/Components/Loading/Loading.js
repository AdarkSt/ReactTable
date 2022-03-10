import { Loader } from "../Material/Loader/index";

import "./Loading.css"

export const Loading = props => {
    return (
        <div className="loading">
            <Loader className="loader"/>
        </div>
    )
}