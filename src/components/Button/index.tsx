import React from 'react'
import './index.scss'

type Props = {
    text: string
    onsubmit?: () => void
    type?: 'submit'
}

function Button(props: Props): JSX.Element {
  return (
    <button className="btn btn-outline-warning template-button" type={props.type} onSubmit={props.onsubmit}>{props.text}</button>
  )
}

export default Button