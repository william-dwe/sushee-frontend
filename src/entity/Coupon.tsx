export interface ICoupon {
    id: number,
    description: string, 
    discount_amount: number,
    quota_initial: number,
    quota_left: number
}

export interface ICoupons {
    coupons: ICoupon[],
}

export interface ICouponPostReq {
    description?: string, 
    discount_amount?: number,
    quota_initial?: number,
    quota_left?: number
}

export interface ICouponPostUpdateReq {
    coupon_id?: number,
    description?: string, 
    discount_amount?: number,
    quota_initial?: number,
    quota_left?: number
}

export interface IUserCoupon {
    user_id: number,
    coupon_id: number,
    coupon_code: number,
    discount_amount: number,
}

export interface IUserCouponPostReq {
    user_id: number,
    coupon_id: number,
}

export interface IUserCouponsResBody {
    user_coupons: IUserCoupon[],
}