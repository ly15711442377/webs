import axios from "../utils/http"
import base from "./base"

const api = {
    /**
     * 登录接口
     */
    login(params){
        return axios.post(base.baseUrl+base.login,params)
    },
   /**
    * 产品查询接口
    */
   selectTbItemAllByPage(params){
    return axios.get(base.baseUrl+base.selectTbItemAllByPage,{
        params
    })
   },
   /**
    * 商品类目接口
    */
   getSelectItemCategoryByParentId(params){
       return axios.get(base.baseUrl+base.selectItemCategoryByParentId,{
           params
       })
   },
   /**
    * 添加产品接口
    */
   insertTbItem(params){
        return axios.get(base.baseUrl+base.insertTbItem,{
            params
        })
   },
   /**
    * 删除产品接口
    */
   deleteItemById(params){
        return axios.get(base.baseUrl+base.deleteItemById,{
            params
        })
   },
   /**
    * 产品预更新
    */
   preUpdateItem(params){
       return axios.get(base.baseUrl+base.preUpdateItem,{
           params
       })
   },
   /**
    * 更新产品
    */
   updateTbItem(params){
       return axios.get(base.baseUrl+base.updateTbItem,{
        params
    })
   },
   /**
    * 参数查询
    */
   getSelectItemParamAll(params){
    return axios.get(base.baseUrl+base.selectItemParamAll,{
        params
    })
   },
   /**
     * 规格参数 添加
     */
    getInsertItemParam(params) {
        return axios.get(base.baseUrl + base.insertItemParam, {
            params: params
        })
    },
    /**
     * 规格参数 删除
     */
    getDeleteItemParamById(params) {
        return axios.get(base.baseUrl + base.deleteItemParamById, {
            params: params
        })
    },
    /**
     * 内容管理分类 查询广告
     */
    selectContentCategoryByParentId(params){
        return axios.get(base.baseUrl + base.selectContentCategoryByParentId, {
            params: params
        })
    },
    /**
     * 内容管理分类 添加广告
     */
    insertContentCategory(params){
        return axios.get(base.baseUrl + base.insertContentCategory, {
            params: params
        })
    },
    /**
     * 内容管理分类 删除广告
     */
    deleteContentCategoryById(params){
        return axios.get(base.baseUrl + base.deleteContentCategoryById, {
            params: params
        })
    },
    /**
     * 内容管理分类 修改广告
     */
    updateContentCategory(params){
        return axios.get(base.baseUrl + base.updateContentCategory, {
            params: params
        })
    },
    /**
     * 内容分类管理内容 查询
     */
    selectTbContentAllByCategoryId(params){
        return axios.get(base.baseUrl + base.selectTbContentAllByCategoryId, {
            params: params
        })
    },
    /**
     * 内容分类管理内容 添加
     */
    insertTbContent(params){
        return axios.get(base.baseUrl + base.insertTbContent, {
            params: params
        })
    },
     /**
     * 内容分类管理内容 删除
     */
    deleteContentByIds(params){
        return axios.get(base.baseUrl + base.deleteContentByIds, {
            params: params
        })
    }
}

export default api