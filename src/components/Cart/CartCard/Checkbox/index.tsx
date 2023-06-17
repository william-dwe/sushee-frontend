import React from 'react'
import './index.scss'
import { useSelector } from 'react-redux';
import { selectSelectedCart } from '../../../../features/cartSlice';

type Props = {
    id: number;
    onChange: (e: any) => void
} 

function CheckBox(props: Props): JSX.Element {
  const selectedCart = useSelector(selectSelectedCart)
  
  return (
    <label className="checkbox-container">
        <input type="checkbox" onChange={props.onChange} checked={selectedCart.includes(props.id)}/>
        <span className="checkbox"></span>
    </label>
  )
}

export default CheckBox