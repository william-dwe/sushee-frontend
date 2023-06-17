import React, { useState } from 'react'
import AdminTable from '../../components/AdminTable'
import { useDeleteMenuMutation, useGetMenusQuery, usePostMenusMutation, usePostUpdateMenuMutation } from '../../features/menuSlice/menuApiSlice'
import Loader from '../../components/Loader'
import AdminForm from '../../components/AdminForm'
import { toast } from 'react-toastify'
import './index.scss'
import { IMenuPostReq, IMenuPostUpdateReq } from '../../entity/Menus'
import { useSelector } from 'react-redux'
import { selectFilterQuery } from '../../features/menuSlice'

export default function AdminMenu():JSX.Element {
    const property = {
        title: "Menu",
        cols: [
            {label:"Id", name:"id"},
            {label:"Menu Name", name:"menu_name"},
            {label:"Average Rating", name:"avg_rating"},
            {label:"Number of Favorites", name:"number_of_favorites"},
            {label:"Price", name:"price"},
            {label:"Menu Photo", name:"menu_photo"},
            {label:"Category Id", name:"category_id"},
            {label:"Customization", name:"customization"},
        ] 
    }

    const filterQuery = useSelector(selectFilterQuery)
    const {data: menu, isLoading: isMenuLoading } = useGetMenusQuery(filterQuery)
    const [deleteMenu] = useDeleteMenuMutation()
    const [updateMenu] = usePostUpdateMenuMutation()
    const [postMenu] = usePostMenusMutation()

    const handleDelete = (e: any) => deleteMenu(e.target.value)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (e.nativeEvent.submitter.name === "edit") {
                const reqBody: IMenuPostUpdateReq = {
                    menu_id: parseInt(e.target["id"].value),
                    menu_name: e.target["menu_name"].value,
                    price: parseInt(e.target["price"].value),
                    menu_photo: e.target["menu_photo"].value,
                    category_id: parseInt(e.target["category_id"].value),
                    customization: e.target["customization"].value,
                } 
                updateMenu(reqBody)
                toast.success(`${property.title} edited`)
            } 
            if (e.nativeEvent.submitter.name === "add") {
                const reqBody: IMenuPostReq = {
                    menu_name: e.target["menu_name"].value,
                    price: parseInt(e.target["price"].value),
                    menu_photo: e.target["menu_photo"].value,
                    category_id: parseInt(e.target["category_id"].value),
                    customization: e.target["customization"].value,
                } 
                postMenu(reqBody)
                toast.success(`${property.title} added`)
            }
        } catch (err: any) {
            toast.error(err.data.message)
        }
    }
    
    

    const content = (
        <div className="admin-menu-page">
            {
                !isMenuLoading && menu 
                ? <AdminTable
                    title={property.title}
                    thList={property.cols.map((val)=>val.label)}
                    tdLists={Object.values(menu.data.menus.map((val) => {
                        return [
                            val.id.toString(),
                            val.menu_name,
                            val.avg_rating.toString(),
                            val.number_of_favorites.toString(),
                            val.price.toString(),
                            val.menu_photo,
                            val.category_id.toString(),
                            ""
                        ]
                    }))}
                    handleDelete={handleDelete}
                />
                : <Loader/>
            }
            <AdminForm
                cols={property.cols.filter((val) => !["avg_rating", "number_of_favorites"].includes(val.name))}
                handleSubmit={handleSubmit}
            />
        </div>
        
    )

    return content
}
 