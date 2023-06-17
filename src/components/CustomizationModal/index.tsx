import React from 'react'
import { IMenuCustomization } from '../../entity/Menus'
import './index.scss'

type Props = {
  customization: IMenuCustomization[];
  customResult: any;
  setCustomResult: any;
  handleSubmit: (e: any) => void;
}

function CustomizationModal (props: Props): JSX.Element {
  const handleCheckbox = (e: any) => {
    let newArray = [] as string[]
    if (e.target.checked) {
      if (props.customResult[e.target.name]?.length === 1) {
        newArray = [props.customResult[e.target.name]]
      }
      if (props.customResult[e.target.name]?.length >= 1) {
        newArray = [...props.customResult[e.target.name]]
      }
      newArray.push(e.target.value)
    }
    if (!e.target.checked) {
      newArray = props.customResult[e.target.name].filter((option:string)=>option!==e.target.value)
    }

    props.setCustomResult({
      ...props.customResult,
      [e.target.name]: newArray,
    })
  }

  const handleRadio = (e: any) => {
    props.setCustomResult({
      ...props.customResult,
      [e.target.name]: [e.target.value],
    })
  }

  return (
    <form className="customization-modal" onSubmit={props.handleSubmit}>
      {
        props.customization && props.customization.length &&
        props.customization?.map((val, i) => {
          return <div className="customization-modal-item" key={i}>
            <hr/>
            <h5>{val.title}</h5>
            {
              val.type === "checkbox" 
              ? <div className="customization-modal-checkbox">
                {
                  val.options.map((option, j) => {
                    return <div className="checkbox-item" key={j}>
                      <input id={option} type="checkbox" name={val.title} value={option} onChange={handleCheckbox}/>
                      <label htmlFor={option}>{option}</label>
                    </div>
                  })
                }
              </div>
              : val.type === "radio"
              ? <div className="customization-modal-radio">
                {
                  val.options.map((option, j) => {
                    return <div className="radio-item" key={j}>
                      <input id={option} type="radio" name={val.title} value={option} onChange={handleRadio} required={true}/>
                      <label htmlFor={option}>{option}</label>
                    </div>
                  })
                }
              </div>
              : <></>
            }
          </div>
        })
      }
      <div className="customization-modal-submit">
        <button type="submit" className='btn btn-success submit' >Submit</button>
      </div>
    </form>
  )
}

export default CustomizationModal