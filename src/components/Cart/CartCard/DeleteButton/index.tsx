import React from 'react'
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import './index.scss'

type Props = {
  handleDelete: (e: any) => void
}

function DeleteButton(props: Props): JSX.Element {
  return (
    <button className="delete-button" onClick={props.handleDelete}>
        <span className="mdi mdi-delete mdi-24px"><MdDeleteOutline/></span>
        <span className="mdi mdi-delete-empty mdi-24px"><MdDelete/></span>
    </button>
  )
}

export default DeleteButton