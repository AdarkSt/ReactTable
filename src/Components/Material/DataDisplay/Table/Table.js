import { Row } from "./Row/index"
import { Cell } from "./Cell/index"
import { HeaderCell } from "./HeaderCell/index"

import "./Table.css"

export const Table = props => {

    const {data, colls} = props
    
    return(
        <table className="table Table table-hover">
            <thead>
                <Row Cell={HeaderCell} colls={colls}/>
            </thead>
            <tbody>
                {data.map(item => <Row key={item.id} Cell={Cell} item={item} colls={colls}/>)}
            </tbody>
        </table>
    )
}