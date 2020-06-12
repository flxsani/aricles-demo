import AjaxUtils from '../utils/ajaxutil';
import { pnkstore } from '../stores/pnk-store';
const baseUrl = pnkstore.api.baseurl;
const AuthToken = pnkstore.authtoken;


export function UserLogin(data, callback) {
    // AjaxUtils.AddHeader({ 'Authorization': AuthToken });
    AjaxUtils.PostAjax(baseUrl + '/api/users/login', data, callback);
}
export function UserRegistration(data, callback) {
    // AjaxUtils.AddHeader({ 'Authorization': AuthToken });
    AjaxUtils.PostAjax(baseUrl + '/api/users/registration', data, callback);
}