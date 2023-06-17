import React, { useState } from 'react'
import "./index.scss"
import {FaStar, FaShoppingCart } from "react-icons/fa";
import { usePostCartsMutation } from '../../../features/cartSlice/cartApiSlice';
import { ICartPostReq, ICustomization } from "../../../entity/Carts";
import { toast } from 'react-toastify';
import CustomizationModal from '../../CustomizationModal';
import { IMenuCustomization } from '../../../entity/Menus';
import { selectIsLoggedIn, selectModalToggle, setModalToggle } from '../../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    id: number;
    promotion_id: number;
    menu_id: number;
    menu: {
        id: number;
        menu_name: string;
        avg_rating: number;
        number_of_favorites: number;
        price: number;
        menu_photo: string;
        category_id: number;
        customization?: IMenuCustomization[];
    }
    promotion_price: number;
}

export default function PromotionItem(props: Props): JSX.Element {
    const [customResult, setCustomResult] = useState([])
    const [toggleCustom, setToggleCustom] = useState(false)
    const [postCarts] = usePostCartsMutation()
    const isLoggedIn = useSelector(selectIsLoggedIn)


    const dispatch = useDispatch()
    const modalToggle = useSelector(selectModalToggle)


    const handleAddCart = (e:any) => {
        if (!isLoggedIn) {
            dispatch(setModalToggle(!modalToggle))
            return
        }

        if (props.menu.customization?.length !== 0) {
            setToggleCustom(true)
            return
        }

        const newItemCart =  {
            menu_id: props.menu_id, 
            promotion_id: props.promotion_id ? props.promotion_id: null,
            quantity: 1,
            menu_option: [],
        } as ICartPostReq

        postCarts(newItemCart)
        toast.success(`"${props.menu.menu_name}" added to the cart`)
    }

    const handleAddCartWithCustom = (e:any) => {
        
        const newItemCart =  {
            menu_id: props.menu_id,
            promotion_id: props.promotion_id ? props.promotion_id: null,
            quantity: 1,
            menu_option: customResult,
        } as ICartPostReq

        postCarts(newItemCart)
        setCustomResult([])
        setToggleCustom(false)
        toast.success(`"${props.menu.menu_name}" added to the cart`)
    }

    return (
        <div className="promo-item">
            <h2>{props.menu.menu_name}</h2>
            <div className="price">
                <p className="prev-price">IDR {(props.menu.price).toLocaleString('id-ID')}</p>
                <p className="current-price">IDR {(props.promotion_price).toLocaleString('id-ID')}</p>
            </div>
            <div className="rating">
                <p className="card-text">{props.menu.avg_rating.toFixed(2)}</p>
                <FaStar/>
            </div>
            {
                toggleCustom && props.menu.customization?.length !== 0
                ? <></>
                : <button className='btn btn-success' onClick={handleAddCart}><FaShoppingCart/>Cart</button>
            }
            {
                toggleCustom && props.menu.customization && props.menu.customization?.length !== 0
                ? <CustomizationModal 
                    customization={props.menu.customization}
                    customResult={customResult}
                    setCustomResult={setCustomResult}
                    handleSubmit={handleAddCartWithCustom}
                />
                :<></>
            }
        </div>
    )
}