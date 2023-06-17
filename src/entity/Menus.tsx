import { IReview } from "./Order";

export interface IMenuCustomization {
	title: string;
	type: string;
	options: string[];
}

export interface IMenu {
    id: number;
    menu_name: string;
	avg_rating: number;
	number_of_favorites: number;
	price: number;
	menu_photo: string;
	category_id: number;
	customization?: IMenuCustomization[];
}

export interface IMenuLists {
    menus: IMenu[];
    current_page: number;
    max_page: number;
}

export interface IMenuPostReq {
	menu_name?: string;
    price?: number;
    menu_photo?: string;
    category_id?: number;
    customization?: any;
}

export interface IMenuPostUpdateReq {
	menu_id: number;
	menu_name?: string;
    price?: number;
    menu_photo?: string;
    category_id?: number;
    customization?: any;
}

export interface IMenuQuery {
	s: string;
	sort: string;
	sortBy: string;
	filterByCategory: string;
	limit: number;
	page: number;

}

export interface IMenuReview {
    id: number;
	menu_name: string;
	avg_rating: number;
	number_of_favorites: number;
	price: number;
	menu_photo: string;
	category_id: number;
	customization: any[];
	reviews: IReview[];
}

export interface IPromotion {
    id: number;
    admin_id: number;
	name: string;
	description: string;
	promotion_photo: string;
	discount_rate: number;
	start_at: Date;
	expired_at: Date;
	promo_menus: [
		{
			id: number;
			promotion_id: number;
			menu_id: number;
			menu: IMenu
			promotion_price: number;
		}
	]
}


export interface IPromotionLists {
    promotions: IPromotion[];
}