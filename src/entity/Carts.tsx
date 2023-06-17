export interface ICustomization {
    title: string;
    value: string[];
}

export interface ICart {
    id: number;
    user_id: number,
    menu_id: number,
    menu: {
        id: number,
        menu_name: string,
        avg_rating: number,
        number_of_favorites: number,
        price: number,
        menu_photo: string ,
        category_id: number
    }
    promotion_id: number,
    quantity: number,
    menu_option: any,
    promotion_price: number,
    is_ordered: boolean
}

export interface ICartPostReq {
    cart_id?: number,
    menu_id?: number,
    promotion_id?: number,
    quantity?: number,
    menu_option?: ICartCustomPostReq[],
}

export interface ICartCustomPostReq {
    title: string,
    options: any
}

export interface ICartLists {
    carts: ICart[];
}

export interface ICartState {
    cartToggle: boolean,
    selectedCart: number[],
    selectedCoupon: string,
}