import { Loader } from "../../../Material/Loader"
import "./SearchLoading.css"

export const SearchLoading = props => {
    return(
             <Loader clasName="searchLoading" contentClassName="lds-dual-ring-searchLoading"/>
    )
}