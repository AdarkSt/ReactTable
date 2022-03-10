import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useHistory, useParams } from "react-router-dom"

import { PageLayout } from "../../../Layoutes/index"
import { Form } from "../Form/index"
import { NotFound } from "../../NotFound/index"
import { Loading } from "../../Loading/index"

import { toastService } from "../../../Services/ToastServices"
import { getUser, updateUser } from "../../../Services/UserServices"
import { manipulateUser } from "../Utils/manipulateUser"

import "./EditUser.css"


export const EditUser = props => {

    const history = useHistory()
    const {id} = useParams()

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(true)

    useEffect(()=>{
        const fetching = async()=>{
            setLoading(true)
            const response = await getUser(id)
        
            if(response.status === 200){
                const _user = response.data
                setUser(_user)
                setError(false)
            }
            setLoading(false)
        }
        fetching()
    },[id])

    const handleUpdate = async(user, cb) => {
        const errors = {}
        const _user = await manipulateUser(user)
        const response = await updateUser(_user, id)
        if(response.status === 200) {
            toastService.succes("Successfully Updated")
            history.replace('/')
        }
        if(response.status === 400){
            errors.validation = "Invalid user"
        }
        cb(errors)
    }

    const Page =<PageLayout>
                    <div className="update">
                        <h1 className="title">User Information</h1>
                        <Form initialValue = {user} buttonName="Update" onSubmit={handleUpdate}/> 
                    </div>
                </PageLayout>

    const Content = (!error ? Page : <NotFound/>)

    return (
    <>
        <Helmet>
            <title>Table | Edit User</title>
        </Helmet>
        {loading ? <Loading/> : Content}
    </>
    )
}