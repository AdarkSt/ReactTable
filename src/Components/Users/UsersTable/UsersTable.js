import { Table } from "../../Material/DataDisplay/Table/index"
import { Button } from "../../Material/Inputs/Button/index"

import "./UsersTable.css"

export const UsersTable = props => {

    const {data, handleDelete, handleEdit} = props

    const tableData = data.map(item => ({
        id: item.id,
        first_name: item.first_name,
        last_name: item.last_name,
        age: item.age,
        photo: <img width={"40px"} height={"50px"} src={item.photo} alt=""></img>,
        action: <div>
                    <Button onClick={()=>handleEdit(item.id)} className="btn btn-secondary" title="Edit"  type="button"/>
                    <Button onClick = {()=>handleDelete(item.id)} className="btn btn-secondary" title="Delete"  type="button"/>
                </div>
    }))

    const colls = [
        {
            key: "first_name",
            label: "First Name"
        },
        {
            key: "last_name",
            label: "Last Name"
        },
        {
            key: "age",
            label: "Age"
        },
        {
            key: "photo",
            label: "Photo"
        },
        {
            key:"action",
            label: "Action"
        }
    ]

    return (
        <Table colls={colls} data={tableData}/>
    )
}