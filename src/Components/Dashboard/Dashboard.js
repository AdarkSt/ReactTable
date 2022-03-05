import { PageLayout } from "../../Layoutes/PageLayout"
import { Header } from "../Header/Header"
import "./Dashboard.css"
import dashBoardArrow from "../../Assets/Images/dashboardArrow.png"
import {Helmet, HelmetProvider} from "react-helmet-async"

export const Dashboard = props => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Table | Dashboard</title>
            </Helmet>
            <PageLayout header={<Header/>}>
                <div className="dashboard">
                    <h1>Welcome to Users Table!!</h1>
                    <h4><img className="dashArrow" src={dashBoardArrow} alt=""></img>Create your own table of users</h4>
                    <h4><img className="dashArrow" src={dashBoardArrow} alt=""></img>Edit your table when you want</h4>
                    <h4><img className="dashArrow" src={dashBoardArrow} alt=""></img>Save your work</h4>
                    <h4><img className="dashArrow" src={dashBoardArrow} alt=""></img>Select photos for users</h4>
                </div>
            </PageLayout>
        </HelmetProvider>
        
    )
}