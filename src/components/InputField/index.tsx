import React from 'react'
import './index.scss'

type Props = {
    title: string;
    name: string;
    type: 'text' | 'password' | 'option';
    textInputProps?: {
        placeholder?: string;
        value?: string;
        isDisabled?: boolean;
    }
    optionInputProps?: {
        optionMap: Map<string,number>;
    }
    stateHandler: (e: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => void
}

const renderInput = (props: Props): any => {
    switch(props.type) {
        case 'text':
        case 'password':
            return (props.textInputProps && 
            <input 
                name={props.name} 
                type={props.type} 
                value={props.textInputProps.value}
                onChange={props.stateHandler} 
                placeholder={props.textInputProps.placeholder} 
                disabled={props.textInputProps.isDisabled}
            />)
        case 'option':
            return (props.optionInputProps && 
            <select 
                name={props.name} 
                id="option" 
                onChange={props.stateHandler}
            >
                {Array.
                    from(props.optionInputProps.optionMap).
                    map(([key, val]) => 
                        <option 
                            value={val} 
                            key={key}
                        >
                            {key}
                        </option>
                    )
                }
            </select>)
    }
}

export default function InputField(props: Props): JSX.Element { 
    const content = renderInput(props)

    return (
        <div className="inputText">
            <h2>{props.title}</h2>
            {content}
        </div>

    )
}