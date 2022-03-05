import { BrowserRouter, Route } from "react-router-dom"
import { Dashboard } from "../Components/Dashboard/Dashboard"
import { CreateUser } from "../Components/Users/CreateUser/CreateUser"


export const Routes = props => {
    return (
        <BrowserRouter>
            <Route exact path="/user" component={Dashboard}/>
            <Route path="/user/create" component={CreateUser}/>
        </BrowserRouter>
    )
}