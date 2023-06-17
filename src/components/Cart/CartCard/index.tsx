import React from 'react'
import "./index.scss"
import Menu from '../../../pages/Menu';
import CheckBox from './Checkbox';
import DeleteButton from './DeleteButton';
import { useDeleteCartsMutation, usePostUpdateCartMutation } from '../../../features/cartSlice/cartApiSlice';
import { useDispatch } from 'react-redux';
import { removeCart, selectCart } from '../../../features/cartSlice';

type Props = {
    id: number,
    menu: {
        id: number,
        menu_name: string,
        avg_rating: number,
        number_of_favorites: number,
        price: number,
        menu_photo: string ,
        category_id: number
    },
    promotion_id?: number,
    quantity: number,
    menu_option?: any,
    promotion_price?: number,
}

export default function CartCard(props: Props): JSX.Element {
    const [deleteCarts] = useDeleteCartsMutation()
    const [postUpdateCart] = usePostUpdateCartMutation()
    
    const handleDelete = () => {
        deleteCarts(props.id)
    } 

    const handleMinus = () => {
        postUpdateCart({
            cart_id: props.id,
            quantity: props.quantity-1,
        })
    }
    const handlePlus = () => {
        postUpdateCart({
            cart_id: props.id,
            quantity: props.quantity+1
        })
    }

    const dispatch = useDispatch()
    const handleChecked = (e: any) => {
        if (e.target.checked) {
            dispatch(selectCart(props.id))
            return
        }
        dispatch(removeCart(props.id))
    }

    return (
        <div className="card cart_card">
            <div className="row">
                <div className="d-flex align-items-center col-md-1">
                    <CheckBox id={props.id} onChange={handleChecked}/>
                </div>
                <div className="d-flex align-items-center col-md-3"> 
                    <img src={props.menu.menu_photo} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="d-flex align-items-center col-md-7">
                    <div className="card-body">
                        <h5 className="card-title"><span className='promo'>{props.promotion_id ? "[Special Offer]" :""}<br/></span>{props.menu.menu_name}</h5>
                        <div className="container d-flex row">
                            <div className="quantity">
                                <button className="btn minus" onClick={handleMinus}>-</button> 
                                <p className="quantity">{props.quantity} pcs</p>
                                <button className="btn plus" onClick={handlePlus}>+</button>
                            </div>
                                {
                                    !props.promotion_price 
                                    ? <div className="price"> 
                                        <p className="card-text">IDR {(props.menu.price*props.quantity).toLocaleString('id-ID')}</p>
                                    </div>
                                    : <div className="price"> 
                                        <p className="prev-price">IDR {(props.menu.price*props.quantity).toLocaleString('id-ID')}</p>
                                        <p className="current-price">IDR {(props.promotion_price*props.quantity).toLocaleString('id-ID')}</p> 
                                    </div>
                                }
                                {/* {
                                    <div className="options">
                                        {
                                            Object.keys(props.menu_option).map((val, i) => {
                                                return <p className="options-item" key={i}>{`${val}: ${props.menu_option[val]}`}</p>
                                            })   
                                        }
                                    </div>
                                } */}
                        </div>
                    </div>
                </div>
                
                <div className="d-flex align-items-center col-md-1">
                    <DeleteButton handleDelete={handleDelete}/>
                </div>
            </div>
        </div>
    )
}