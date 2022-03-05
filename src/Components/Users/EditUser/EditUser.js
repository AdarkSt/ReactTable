import { useEffect, useState } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { useHistory, useParams } from "react-router-dom"
import { PageLayout } from "../../../Layoutes/PageLayout"
import { updated } from "../../../Services/ToastServices"
import { getUser, updateUser } from "../../../Services/UserServices"
import { Header } from "../../Header/Header"
import { Form } from "../Form/Form"
import { manipulateUser } from "../Utils/manipulateUser"
import "./EditUser.css"
import { Loader } from "../../Material/Loader/Loader.js"

export const EditUser = props => {

    const history = useHistory()
    const {id} = useParams()

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const geting = async()=>{
            const response = await getUser(id)
            const _user = await response.json()
            
            setUser(_user)
            setLoading(false)
        }
        geting()
    },[id])

    const handleUpdate = async(user, cb) => {
        const errors = {}
        const _user = await manipulateUser(user)
        const response = await updateUser(_user, id)
        if(response.status === 200) {
            updated()
            history.replace('/user')
        }
        if(response.status === 400){
            errors.validation = "Invalid user"
        }
        cb(errors)
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Table | Edit User</title>
            </Helmet>
            <PageLayout header={<Header/>}>
                <div className="update">
                    <h1 className="title">User Information</h1>
                    {loading ? <Loader/> : <Form initialValue = {user} buttonName="Update" handleAction={handleUpdate}/>}
                </div>
            </PageLayout>
        </HelmetProvider>
    )
}