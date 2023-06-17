import React from 'react'
import './index.scss' //todo: styling
import { IUserCoupon } from '../../entity/Coupon'

type Props = {
    name: string,
    handle: ((e:any) => void)
    coupons: IUserCoupon[]
}

function DropDown(props: Props): JSX.Element {
    return (
        props.coupons
        ? <select className='dropdown' name={props.name} id={props.name} onChange={props.handle}>
            <option value="">(Choose your coupon)</option>
            {
                props.coupons.map((val, i) => {
                    return <option value={val.coupon_code} key={i}>Cashback IDR {val.discount_amount.toLocaleString('id-ID')}</option>
                })
            }
        </select>
        : <></>
    )
}

export default DropDown