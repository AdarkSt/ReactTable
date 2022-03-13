import { Helmet } from "react-helmet-async"
import { useHistory} from "react-router-dom"

import { Form } from "../Form"
import { manipulateUser } from "../Utils/manipulateUser"
import { createUser } from "../../../Services/UserServices"
import { PageLayout } from "../../../Layoutes"
import { toastService } from "../../../Services/ToastServices.js"

import "./CreateUser.css"


export const CreateUser = props => {
    const history = useHistory()

    const handleCreate = async (user, cb) => {
        const errors = {}
        const _user = await manipulateUser(user)
        try{
            const response = await createUser(_user)
            if(response.status === 201){
                toastService.succes()
                history.replace('/')
            }
            if(response.status === 400){
                errors.validation = "Invalid user"
            }
            cb(errors);
        }
        catch(e){
            toastService.error("Connection failed")
        }
       
    }

    return (
    <>
        <Helmet>
            <title>Table | Create User</title>
        </Helmet>
        <PageLayout>
            <div className="create">
                <h1 className="title">User Information</h1>
                <Form onSubmit={handleCreate} buttonName="Create"/>
            </div>
        </PageLayout>
    </>          
    )
}
