import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useHistory, useLocation,} from "react-router-dom"
import queryString from "query-string"

import { PageLayout } from "../../Layoutes/index"
import { PageInation } from "../Material/PageInation/index"
import { UsersTable } from "./UsersTable/index"
import { NotFound } from "../NotFound/index"
import { ConfirmationModal } from "../Material/Modal/index"
import { Loading } from "../Loading/index"

import { deleteUser, getUsers } from "../../Services/UserServices"

import "./Users.css"


export const Users = props => {

    const search =  queryString.parse(useLocation().search)

    const [tableData, setTableData] = useState([])
    const [dataCount, setDataCount] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({page: search.page, limit: 20})
    const [modalState, setModalState] = useState({isOpen:false, data: ""});

    const history = useHistory()

    const fetching = useCallback(async() => {
        setLoading(true);
        
        const response = await getUsers(params)
        if(response.status===200){
            const tableData = response.data
            setError(false)
            setDataCount(response.count)
            setTableData(tableData)
        }

        setLoading(false)
    },[params])
    
    useEffect(()=> {
        fetching()
    },[fetching, params])

    const handleSelect = (page) => {
        setParams(prevParams => ({...prevParams, page:page}))
        const query = queryString.stringify({...search, page:page})
        history.push({pathname:"/users", search:query})
    }

    const handleEdit = id => {
        history.push(`/user/${id}/edit`)
    }

    const handleDelete = async id => {
        setModalState({isOpen: true, data: id})
    }

    const handleModalAccept = async() => {
        await deleteUser(modalState.data)
        fetching()
        setModalState({isOpen:false, data:""})
    }

    const handleModalDenny = () => {
        setModalState({isOpen:false, data:""})
    }

    const Page =<PageLayout>
                    <UsersTable handleEdit={handleEdit} handleDelete={handleDelete} data={tableData}/>
                    <PageInation active={params.page} handleSelect={handleSelect} count={Math.ceil(dataCount/20)}/>
                </PageLayout> 

    const Content = (!error ? Page :<NotFound/>)

    return(
        <>
            <Helmet>
                <title>Table | Users</title>
            </Helmet>
            {loading ? <Loading/> : Content}
            <ConfirmationModal 
                title = "Do you realy want to delete this user?"
                acceptBtn = "Delete"
                dennyBtn = "Cancel" 
                isOpen = {modalState.isOpen}
                handleAccept = {handleModalAccept}
                handleDenny = {handleModalDenny}
            >
            </ConfirmationModal>
        </>
    )
}