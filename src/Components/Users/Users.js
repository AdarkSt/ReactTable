import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useHistory, useLocation,} from "react-router-dom"
import queryString from "query-string"

import { PageLayout } from "../../Layoutes"
import { PageInation } from "../Material/PageInation"
import { UsersTable } from "./UsersTable"
import { NotFound } from "../NotFound"
import { ConfirmationModal } from "../Material/Modal"
import { Loading } from "../Loading"
import { Dropdown } from "../Material/Inputs/Dropdown"
import { Search } from "../Material/Inputs/Search"

import { deleteUser, getUsers } from "../../Services/UserServices"
import { createUrl } from "../../Utils/AppBasedUtils/createUrl"
import searchIcon from "../../Assets/Images/search.png"

import "./Users.css"


export const Users = props => {

    const location = useLocation()
    const history = useHistory()

    const search =  queryString.parse(location.search)

    const [tableData, setTableData] = useState([])
    const [dataCount, setDataCount] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({
        page: search.page,
        limit: 20, 
        sort: {field: search.sort, order:search.order}, 
        search: {field:"", value:""}
    })
    const [modalState, setModalState] = useState({isOpen:false, data: ""});
    const [searchData, setSearchData] = useState({field:"", value:""})

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

        const Url = createUrl({...params, page:page})
        history.push({pathname:"/users", search:Url})
    }

    const handleEdit = (id) => {
        history.push(`/user/${id}/edit`)
    }

    const handleOpenDeleteModal = async (id) => {
        setModalState({isOpen: true, data: id})
    }

    const handleDelete = async() => {
        await deleteUser(modalState.data)
        fetching()
        setModalState({isOpen:false, data:""})
    }

    const handleCloseDeleteModal = () => {
        setModalState({isOpen:false, data:""})
    }

    const handleSort = (field, order) => {
        const _order = order === "asc" ? "desc" : "asc"
        setParams(prevParams => ({...prevParams, sort:{field:field, order:_order}}))

        const Url = createUrl({...params, sort:{field:field, order:order}})
        history.push({pathname:"/users", search:Url})
    }

    const handleSearchFieldSelect = (field) => {
        setSearchData(prevSearchData => ({...prevSearchData, field:field}))
    }

    const handleSearchInputChange = (value) => {
        setSearchData(prevSearchData => ({...prevSearchData, value:value}))
    }

    const handleSearch = () => {
        setParams(prevParams => ({...prevParams, search:searchData}))

        const Url = createUrl({...params, search:{field:searchData.field, value:searchData.value}})
        history.push({pathname:"/users", search:Url})
    }

    const page =<PageLayout>
                    <div className="searchArea bg-dark">
                        <img onClick={handleSearch} className="searchIcon" src={searchIcon} alt=""></img>
                        <Dropdown
                            handleClick={handleSearchFieldSelect} 
                            selected={searchData.field} 
                            title = "Choose field"
                            fields={[
                                {key:"first_name", label:"First Name"},
                                {key: "last_name", label:"Last Name"},
                                {key:"age", label:"Age"},
                            ]}
                        />
                        <Search value={params.search.param} onChange={(e)=>{handleSearchInputChange(e.target.value)}}  placeholder = "...Search"/>
                    </div>
                    <UsersTable handleSort={handleSort} sort={params.sort} handleEdit={handleEdit} handleDelete={handleOpenDeleteModal} data={tableData}/>
                    <PageInation active={params.page} handleSelect={handleSelect} count={Math.ceil(dataCount/20)}/>
                </PageLayout> 

    const content = (!error ? page :<NotFound/>)

    return(
        <>
            <Helmet>
                <title>Table | Users</title>
            </Helmet>
            {loading ? <Loading/> : content}
            <ConfirmationModal 
                title = "Do you realy want to delete this user?"
                acceptBtn = "Delete"
                dennyBtn = "Cancel" 
                isOpen = {modalState.isOpen}
                handleAccept = {handleDelete}
                handleDenny = {handleCloseDeleteModal}
                ariaHideApp = {false}
            >
            </ConfirmationModal>
        </>
    )
}