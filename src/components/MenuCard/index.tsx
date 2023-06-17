import React, { useState } from 'react'
import "./index.scss"
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { usePostCartsMutation } from '../../features/cartSlice/cartApiSlice';
import { ICartCustomPostReq, ICartPostReq } from "../../entity/Carts";
import { toast } from 'react-toastify';
import CustomizationModal from '../CustomizationModal';
import { IMenuCustomization } from '../../entity/Menus';
import { selectIsLoggedIn, selectModalToggle, setModalToggle } from '../../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    menu_id: number;
    promotion_id?:number;
    menu_name: string
    avg_rating: number
    number_of_favorites: number
    price: number
    menu_photo: string
    category_id: number
    customization?: IMenuCustomization[]
}

export default function MenuCard(props: Props): JSX.Element {
    const [customResult, setCustomResult] = useState([] as any)
    const [toggleCustom, setToggleCustom] = useState(false)
    const [postCarts] = usePostCartsMutation()
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const modalToggle = useSelector(selectModalToggle)    
    const dispatch = useDispatch()

    const handleAddCart = () => {
        if (!isLoggedIn) {
            dispatch(setModalToggle(!modalToggle))
            return
        }

        if (props.customization?.length !== 0) {
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
        toast.success(`"${props.menu_name}" added to the cart`)

    }

    const handleAddCartWithCustom = () => {
        let cartCustoms: ICartCustomPostReq[] = [];
        
        (Object.keys(customResult) as (keyof typeof customResult)[]).forEach((key, index) => {
            let cr = customResult[key] as []
            for (let i = 0; i < cr.length; i++) {
                let cartCustom : ICartCustomPostReq = {
                    title: key as string,
                    options: customResult[key][i] as any
                }
                cartCustoms = [
                    ...cartCustoms,
                    cartCustom
                ]
            }
        });

        const newItemCart =  {
            menu_id: props.menu_id,
            promotion_id: props.promotion_id ? props.promotion_id: null,
            quantity: 1,
            menu_option: cartCustoms,
        } as ICartPostReq

        postCarts(newItemCart)
        setCustomResult([])
        setToggleCustom(false)
        toast.success(`"${props.menu_name}" added to the cart`)
    }


    return (
        <div className="card mb-3">
            <img src={props.menu_photo} className="card-img" alt={props.menu_name}/>
            <div className="card-body"></div>
            <div className="card-footer">
                <h5 className="card-title">{props.menu_name}</h5>
                <p className="card-text">IDR {(props.price).toLocaleString('id-ID')}</p>
                <div className="ratingFavoriteCart">
                    <div className="ratingFavorite">
                        <div className="rating">
                        <p className="card-text">{props.avg_rating.toFixed(2)}</p>
                            <FaStar/>
                        </div>
                        <div className="favorite">
                        <p className="card-text">{props.number_of_favorites > 1000 ? "1K+" : props.number_of_favorites}</p>
                            <FaHeart/>
                        </div>
                    </div>
                    {
                        toggleCustom && props.customization?.length !== 0
                        ? <></>
                        : <button className='btn btn-success' onClick={handleAddCart}><FaShoppingCart/>Cart</button>
                    }
                </div>
                {
                    toggleCustom && props.customization && props.customization?.length !== 0
                    ? <CustomizationModal 
                        customization={props.customization}
                        customResult={customResult}
                        setCustomResult={setCustomResult}
                        handleSubmit={handleAddCartWithCustom}
                    />
                    :<></>
                }
            </div>
        </div>
    )
}