import React from 'react'
import { useGetOrdersQuery } from '../../features/orderSlice/orderApiSlice'
import moment from 'moment'
import "./index.scss"
import {BsPencil} from "react-icons/bs"

type Props = {
    title: string,
    thList: string[],
    tdLists: string[][],
    handleDelete?: any,
}

const AdminTable = (props: Props): JSX.Element => {
    return <section className="admin-table">
        <h1>{props.title}</h1>
        
        <table className="admin-table">
            <thead>
                <tr>
                    {props.thList.map((val,i)=><th key={i}>{val}</th>)}
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.tdLists?.every(x => x.length !== 0) && props.tdLists.map((rows, i) => {
                    return <tr key={i}>
                        {rows.map((row, j) => {
                            return <td className='admin-table-row' key={j}>{row}</td>
                        })}
                        <td>
                            <button className='btn btn-danger' value={rows[0]} onClick={props.handleDelete}>Delete</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </section>
}

export default AdminTable