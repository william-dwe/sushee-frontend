import React from 'react'
import "./index.scss"
import { FaShoppingCart } from "react-icons/fa";
import PromotionItem from './PromotionItem';
import { IMenuCustomization } from '../../entity/Menus';

type Props = {
    menu_name: string
    description: string
    promotion_photo: string
    discount_rate: number
    start_at: Date
    expired_at: Date
    promotion_menus: [
		{
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
	]
}

export default function PromotionCard(props: Props): JSX.Element {
    return (
        <div className="card">
            <img src={props.promotion_photo} className="card-img" alt={props.menu_name}/>
            <div className="card-body">
                <h5 className="card-title">{props.menu_name}</h5>
                <p className="card-description">{props.description}</p>
            </div>
            <div className="card-footer">
                <div className="priceAndCart">
                        { props.promotion_menus 
                            ? props.promotion_menus.map((val, i) => {
                                return <PromotionItem 
                                    id={val.id}
                                    promotion_id={val.promotion_id}
                                    menu_id={val.menu_id}
                                    menu= {val.menu}
                                    promotion_price= {val.promotion_price}
                                    key={i}
                                />
                            })
                            : <></>
                        }
                </div>
            </div>
        </div>
    )
}