import React from 'react'
import './index.scss'

type content = {
  label: string
  value: number
  handler?: (e: any) => void
}

type Props = {
  text: string
  content: content[]
}

function DropUp(props: Props): JSX.Element {
  return (
    <div className="drop-up">
        <button className="btn btn-success drop-up-button">{props.text}</button>
        <div className="drop-up-content">
          {
            props.content.map((val, i) => {
              return <button onClick={val.handler} value={val.value} key={i}>{val.label}</button>
            })
          }
        </div>
    </div>
  )
}

export default DropUp