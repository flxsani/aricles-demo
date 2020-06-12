import AjaxUtils from '../utils/ajaxutil';
import { pnkstore } from '../stores/pnk-store';
const baseUrl = pnkstore.api.baseurl;

export function GetArticleMasterList(store, pageNo, callback) {
    let authToken = store.GetData('user').access_token;
    AjaxUtils.AddHeader({ 'Authorization': authToken });
    AjaxUtils.GetAjax(baseUrl + '/api/admin/articles/' + pageNo, callback);
    // console.log("PnkStroe::", pnkstore.api.baseurl);
}
export function AddMoreAticles(store, callback) {
    let authToken = store.GetData('user').access_token;
    AjaxUtils.AddHeader({ 'Authorization': authToken });
    AjaxUtils.GetAjax(baseUrl + '/api/admin/addarticles', callback);
    // console.log("PnkStroe::", pnkstore.api.baseurl);
}
export function GetArticleList(store, pageNo, callback) {
    let authToken = store.GetData('user').access_token
    AjaxUtils.AddHeader({ 'Authorization': authToken });
    AjaxUtils.GetAjax(baseUrl + '/api/articles/' + pageNo, callback);
    // console.log("PnkStroe::", pnkstore.api.baseurl);
}
export function MarkArticleAsRead(store, articleId, callback) {
    let authToken = store.GetData('user').access_token
    AjaxUtils.AddHeader({ 'Authorization': authToken });
    AjaxUtils.GetAjax(baseUrl + '/api/articles/addasread/' + articleId, callback);
    // console.log("PnkStroe::", pnkstore.api.baseurl);
}

