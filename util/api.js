import request from './request'
// export const getAllBrand=()=>request('/brand/listAll','GET')
//分页获取品牌
export const getBrand=(page=1)=>request('/brand/list','GET',{pageNum:page})
//更新品牌
export const updateBrand=(row)=>request('/brand/update','GET&POST',row)
//删除品牌
export const deleteBrand=(id)=>request('/brand/delete','GET',id)
//添加品牌
export const addBrand=(param)=>request('/brand/create','POST',param)
//批量删除品牌
export const deleteBrands=(param)=>request('/brand/delete/batch','GET',param)


