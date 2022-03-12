import { PageLayout } from "../../../Layoutes"
import { UsersTable } from "../UsersTable"
import { PageInation } from "../../Material/PageInation"
import { SearchArea } from "../SearchArea"

import "./View.css"

export const View = props => {

    const { handleSearch,
            handleSearchFieldSelect,
            handleOpenDeleteModal,
            dataCount, 
            searchData, 
            params, 
            handleSort, 
            handleSearchInputChange, 
            tableData, 
            handleEdit, 
            handleSelect,
            searchLoading,
            sortLoading
        } = props

    return (
        <PageLayout>
                    <SearchArea 
                        handleSearch={handleSearch}
                        handleSearchFieldSelect={handleSearchFieldSelect}
                        searchData={searchData}
                        params={params}
                        handleSearchInputChange={handleSearchInputChange}
                        loading={searchLoading}
                    />
                    <UsersTable sortLoading={sortLoading} handleSort={handleSort} sort={params.sort} handleEdit={handleEdit} handleDelete={handleOpenDeleteModal} data={tableData}/>
                    <PageInation active={params.page} handleSelect={handleSelect} count={Math.ceil(dataCount/20)}/>
        </PageLayout>
    )
}