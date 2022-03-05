import "./CreateUser.css"
import { Form } from "../Form/Form.js"
import { manipulateUser } from "../Utils/manipulateUser"
import { createUser } from "../../../Services/UserServices"
import { useHistory} from "react-router-dom"
import { PageLayout } from "../../../Layoutes/PageLayout"
import { Header } from "../../Header/Header"
import { HelmetProvider, Helmet } from "react-helmet-async"
import { created } from "../../../Services/ToastServices.js"

export const CreateUser = props => {
    const history = useHistory()

    const handleCreate = async (user, cb) => {
        const errors = {}
        const _user = await manipulateUser(user)
        const response = await createUser(_user)
        if(response.status === 201){
            created()
            history.replace('/user')
        }
        if(response.status === 400){
            errors.validation = "Invalid user"
        }
        cb(errors);
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Table | Create User</title>
            </Helmet>
            <PageLayout header = {<Header/>}>
                <div className="create">
                    <h1 className="title">User Information</h1>
                    <Form handleAction={handleCreate} buttonName="Create"/>
                </div>
            </PageLayout>
        </HelmetProvider>
        
    )
}
