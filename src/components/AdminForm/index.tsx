import React from 'react'
import "./index.scss"

type Props = {
    cols: {label:string, name: string}[],
    handleSubmit: any,

}

const AdminForm = (props: Props): JSX.Element => {
    return <section className="admin-form">
    <form 
        className='admin-form'
        onSubmit={props.handleSubmit}
    >
        {
            props.cols.map((val, i) => {
                return <div className="admin-form-item" key={i}>
                    <h2>{val.label}</h2>
                    <input 
                        type="text" 
                        name={val.name}
                        placeholder={val.label}
                    />
                </div>
            })
        }
        <div className="button-container">
            <button type='submit' className='btn btn-outline-warning' name="edit">Edit</button>
            <button type='submit' className='btn btn-outline-warning' name="add">Add</button>
        </div>
    </form>
</section>
}

export default AdminForm