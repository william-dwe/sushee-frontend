import React from 'react'
import './index.scss'

type Props = {
    groupName: string
    text: string
    value: string
    onChange: (e: any) => void
    default?: boolean
}

function RadioButton(props: Props): JSX.Element {
    return (
      <>
        <input 
            type="radio" 
            className="btn-check" 
            name="options-outlined"
            id={props.text}
            autoComplete="off" 
            value={props.value}
            onChange={props.onChange}
            defaultChecked={props.default}
        />
        <label 
            className="btn btn-outline-warning" 
            htmlFor={props.text}
        >{props.text}</label>
      </>
        
    )
}

export default RadioButton