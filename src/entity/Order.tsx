import { IMenu } from "./Menus";

export interface IOrder {
    id: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    user_id: number,
    order_date: Date,
    coupon_id: number,
    payment_option_id: number,
    ordered_menus: IOrderedMenu[],
    gross_amount: number,
    discount_amount: number,
    net_amount: number,
    status: string,
}

export interface IOrderHistory {
    orders: IOrder[],
}

export interface IOrderTrackingUpdateReqBody {
    order_id: number,
    status: string,
}

export interface IOrderQuery {
    search: string;
	sort: string;
	sortBy: string;
	filterByStatus: string;
	limit: number;
	page: number;
}

export interface IOrderedMenu {
    id: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    order_id: number,
    menu_id: number,
    menu: IMenu,
    promotion_id: number, 
    quantity: number,
    customization: any,
    review: IReview,
}

export interface IReview {
    id: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    review_description: string,
    rating: number,
    ordered_menu_id: number,
    menu_id: number, 
}

export interface IOrderReqBody {
    cart_id_list: number[],
    payment_option_id: number,
}

export interface IPaymentOption {
    id: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date,
    payment_name: string,
}

export interface IPaymentOptionResBody {
    payment_options: IPaymentOption[]
}