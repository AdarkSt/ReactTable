import { useCallback, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useHistory, useLocation,} from "react-router-dom"
import queryString from "query-string"

import { NotFound } from "../NotFound"
import { ConfirmationModal } from "../Material/Modal"
import { Loading } from "../Loading"

import { deleteUser, getUsers } from "../../Services/UserServices"
import { createUrl } from "../../Utils/AppBasedUtils/createUrl"
import {useEffectAllDepsChange} from "../../Utils/GlobalUtils/useEffectAllDepsChange"

import "./Users.css"
import { View } from "./View/View"

export const Users = props => {

    const location = useLocation()
    const history = useHistory()

    const search =  queryString.parse(location.search)

    const [tableData, setTableData] = useState([])
    const [dataCount, setDataCount] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState({sortLoad: false, pageLoad:false, searchLoad:false})

    const [params, setParams] = useState({
        page: search.page,
        limit: 20, 
        sort: {field: search.sort, order:search.order}, 
        search: {field:"", value:""}
    })
    const [modalState, setModalState] = useState({isOpen:false, data: ""});
    const [searchData, setSearchData] = useState({field:"", value:""})

    const fetching = useCallback(async(loader) => {
        setLoading(prevLoading => ({...prevLoading, [loader]:true}));
        
        const response = await getUsers(params)
        if(response.status===200){
            const tableData = response.data
            setError(false)
            setDataCount(response.count)
            setTableData(tableData)
        }

        setLoading(prevLoading => ({...prevLoading, [loader]:false}));
    },[params])

    useEffect(()=>{
        fetching()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffectAllDepsChange(()=> {
        fetching("sortLoad") 
    },[fetching, params.sort])

    useEffectAllDepsChange(()=> {
        fetching("searchLoad")
    },[fetching, params.search])

    useEffectAllDepsChange(()=> {
        fetching("pageLoad")
    },[fetching, params.page])

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
        history.replace({pathname:"/users", search:Url})
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
        history.replace({pathname:"/users", search:Url})
    }

    const page = <View
                    handleSearch={handleSearch}
                    handleSearchFieldSelect={handleSearchFieldSelect}
                    handleOpenDeleteModal={handleOpenDeleteModal}
                    dataCount={dataCount}
                    searchData={searchData}
                    params={params}
                    handleSort={handleSort}
                    handleSearchInputChange={handleSearchInputChange}
                    tableData={tableData}
                    handleEdit={handleEdit}
                    handleSelect={handleSelect}
                    searchLoading = {loading.searchLoad}
                    sortLoading={loading.sortLoad}
                />

    const content = (!error ? page : <NotFound/>)

    return(
        <>
            <Helmet>
                <title>Table | Users</title>
            </Helmet>
            {loading.pageLoad ? <Loading/> : content}
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