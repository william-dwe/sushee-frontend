import React, { useEffect, useState } from 'react'
import "./index.scss"
import MenuCard from '../../components/MenuCard'
import { menuApiSlice, useGetMenusQuery, useGetPromotionsQuery } from '../../features/menuSlice/menuApiSlice'
import Loader from '../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilterQuery, setFilterQuery } from '../../features/menuSlice'
import RadioButton from '../../components/RadioButton'
import PromotionCard from '../../components/PromotionCard'

const Menu = (): JSX.Element => {
    const hero1 = "https://res.cloudinary.com/dgr6o89ym/image/upload/c_scale,h_1080,w_1920/v1672109205/sources/wallpaperflare.com_wallpaper_wtqler.jpg"
    const hero2 = "https://res.cloudinary.com/dgr6o89ym/image/upload/c_scale,h_1080,w_1920/v1672122757/sources/wallpaperflare.com_wallpaper_1_nekcbo.jpg"
    const hero3 = "https://res.cloudinary.com/dgr6o89ym/image/upload/c_scale,h_1080,w_1920/v1672122755/sources/wallpaperflare.com_wallpaper_2_vhqq27.jpg"
    const [slideState, setSlideState] = useState(1)

    const dispatch = useDispatch()
    const filterQuery = useSelector(selectFilterQuery)
    const { data: menu, isLoading: isMenuLoading } = useGetMenusQuery(filterQuery)
    const { data: promotion, isError: isPromotionError, isLoading: isPromotionLoading } = useGetPromotionsQuery()
    
    const handleFilterCategory = ((e: any) => {
        const newFilterQuery = {...filterQuery}
        newFilterQuery.filterByCategory = e.target.value
        dispatch(setFilterQuery(newFilterQuery))
    })

    const handleFilterSearch = ((e: any) => {
        const newFilterQuery = {...filterQuery}
        newFilterQuery.s = e.target.value
        dispatch(setFilterQuery(newFilterQuery))
    })

    const handleFilterSort = ((e: any) => {
        const newFilterQuery = {...filterQuery}
        newFilterQuery.sort = e.target.value
        dispatch(setFilterQuery(newFilterQuery))
    })
    const handleFilterSortBy = ((e: any) => {
        const newFilterQuery = {...filterQuery}
        newFilterQuery.sortBy = e.target.value
        dispatch(setFilterQuery(newFilterQuery))
    })
    const handleFilterPage = ((e: any) => {
        const newFilterQuery = {...filterQuery}
        newFilterQuery.page = e.target.value
        dispatch(setFilterQuery(newFilterQuery))
    })

    useEffect(() => {
        const interval = setInterval(()=>{
            setSlideState((x)=>(x+1) % 4 === 0 ? 1 : x+1)
        }, 5000);
      
        return () => clearInterval(interval);
      }, []);

    

    const content = (
        <div className='main'>
            <section className="hero">
                <div className="carousel-inner">
                    <div className={`carousel-item ${slideState === 1 ? "active" : ""}`}>
                        <img src={hero1} className="d-block w-100" alt="slide 1"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Fine sushi dining in one-click away</h5>
                            <p>Experience your favorite japanese meals at its finest.</p>
                        </div>
                    </div>
                        <div className={`carousel-item ${slideState === 2 ? "active" : ""}`}>
                        <img src={hero2} className="d-block w-100" alt="slide 2"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Fine sushi dining in one-click away</h5>
                            <p>Experience your favorite japanese meals at its finest.</p>
                        </div>
                    </div>
                    <div className={`carousel-item ${slideState === 3 ? "active" : ""}`}>
                        <img src={hero3} className="d-block w-100" alt="slide 3"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Fine sushi dining in one-click away</h5>
                            <p>Experience your favorite japanese meals at its finest.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* { 
                !isPromotionError 
                && <section className="promotion">
                    
                    <h2>Special for you!</h2>
                    <div className="container">
                        <div className="row menu-container">
                            {
                                !isPromotionLoading && promotion 
                                ?  promotion.data.promotions.map((val, i) => {
                                    return (
                                        <div key={i} className="col-lg-6 mt-1 mb-1 menu-item">
                                            <PromotionCard
                                                    menu_name= {val.name}
                                                    description= {val.description}
                                                    promotion_photo= {val.promotion_photo}
                                                    discount_rate= {val.discount_rate}
                                                    start_at= {val.start_at}
                                                    expired_at= {val.expired_at}
                                                    promotion_menus={val.promo_menus}
                                            />
                                        </div>
                                    )
                                })
                                :<Loader/>
                            }
                        </div>
                    </div>
                </section>
            }
            <br/> */}
            <section className="menu">
                <h2>Our specialties!</h2>
                <div className="container">
                    <div className="row">
                        <div className="menu-filter col-12 d-flex gap-3 mb-3 justify-content-center">
                            <RadioButton 
                                groupName='menu-filter' 
                                text='All Menu' 
                                value='appetizers,meals,drinks'
                                onChange={handleFilterCategory}
                                default={true}
                            />
                            <RadioButton 
                                groupName='menu-filter' 
                                text='Appetizers' 
                                value='appetizers'
                                onChange={handleFilterCategory}
                            />
                            <RadioButton 
                                groupName='menu-filter' 
                                text='meals' 
                                value='meals'
                                onChange={handleFilterCategory}
                            />
                            <RadioButton 
                                groupName='menu-filter' 
                                text='drinks' 
                                value='drinks'
                                onChange={handleFilterCategory}
                            />
                            
                        </div>
                        <div className="menu-filter col-12 d-flex gap-3 mb-3 justify-content-center">
                            <select className='mb-3' name="sortBy" id="sort" onChange={handleFilterSortBy}>
                                <option value="menu_name">Menu Name</option>
                                <option value="avg_rating">Average Rating</option>
                                <option value="price">Price</option>
                            </select>
                            {/* <select name="sort" id="sort" onChange={handleFilterSort}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select> */}
                            {/* <input className='page' type="text" placeholder="page" onChange={handleFilterPage} /> */}
                            <input className='search mb-3' type="text" placeholder="search" onChange={handleFilterSearch} />
                            
                        </div>
                    </div>
                    <div className="row menu-container">
                        {
                            !isMenuLoading && menu 
                            ?  menu.data.menus.map((val, i) => {
                                return (
                                    <div key={i} className="col-lg-3 mt-1 mb-1 menu-item">
                                        <MenuCard
                                            menu_id={val.id}
                                            menu_name={val.menu_name}
                                            avg_rating={val.avg_rating}
                                            number_of_favorites={val.number_of_favorites}
                                            price={val.price}
                                            menu_photo={val.menu_photo}
                                            category_id={val.category_id}
                                            customization={val.customization}
                                        />
                                    </div>
                                )
                            })
                            :<Loader/>
                        }
                    </div>
                </div>
                

            </section>
        </div>
    )

    return content
}

export default Menu