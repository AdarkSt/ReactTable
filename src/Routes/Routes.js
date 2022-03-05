import { BrowserRouter, Route } from "react-router-dom"
import { Dashboard } from "../Components/Dashboard/Dashboard.js"
import { CreateUser } from "../Components/Users/CreateUser/CreateUser.js"
import { EditUser } from "../Components/Users/EditUser/EditUser.js"


export const Routes = props => {
    return (
        <BrowserRouter> 
            <Route exact path="/user" component={Dashboard}/>
            <Route exact path="/user/create" component={CreateUser}/>
            <Route exact path="/user/:id/edit" component={EditUser}/>
        </BrowserRouter>
    )
}