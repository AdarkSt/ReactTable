import { Header } from "../Components/Header/index"

export const PageLayout = props => {
return (
    <>
        <Header/>
        {props.children}
    </>
)
}