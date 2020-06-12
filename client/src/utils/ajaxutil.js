import React from 'react'

class ajaxUtils extends React.Component {
    constructor(props) {
        super(props);
        this.Headers = {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
    GetAjax = (url, callback) => {
        //alert("Hello in GetAjax");
        // try {
        let response = fetch(url, {
            method: 'GET',
            headers: this.Headers
        }).then((resp) => resp.json()).then((result) => {
            console.log("APIResponse::", result);
            if (result.error) {
                let errData = result.error;
                errData.statusCode = result.status;
                console.log("Error::", errData);
                callback(errData, null);
            }
            else {
                callback(null, result);
            }

        }).catch((e) => {
            callback(e, null);
        });
    }

    PostAjax = (url, postData, callback) => {
        //alert("Hello in GetAjax");
        console.log("PostData::", postData);
        let response = fetch(url, {
            method: 'POST',
            headers: this.Headers,
            body: JSON.stringify(postData)
        }).then((resp) => resp.json()).then((result) => {
            console.log("APIResponse::", result);
            if (result.error) {
                callback(result.error, null);
            }
            else {
                callback(null, result);
            }

        }).catch((e) => {
            callback(e, null);
        });
    }

    PostAjaxFileUpload = (url, postData, callback) => {
        //alert("Hello in GetAjax");
        console.log("PostData::", postData);
        let response = fetch(url, {
            method: 'POST',
            // headers: {
            //     // 'Content-Type': 'application/json;charset=utf-8',
            //     'Content-Type': 'multipart/form-data; boundary=—-WebKitFormBoundaryfgtsKTYLsT7PNUVD'
            // },
            body: postData
        });

        let result = response.json();
        //console.log("result of Post Data :", result)
        callback(result);
    }

    PutAjax = (url, postData, callback) => {
        //alert("Hello in GetAjax");
        console.log("PostData::", postData);
        let response = fetch(url, {
            method: 'PUT',
            headers: this.Headers,
            body: JSON.stringify(postData)
        });

        let result = response.json();
        //console.log("result of Post Data :", result)
        callback(result);
    }

    DeleteAjax = (url, callback) => {
        //alert("Hello in GetAjax");
        let response = fetch(url, {
            method: 'DELETE',
            headers: this.Headers
        });

        let result = response.json();
        callback(result);
    }

    GetAjaxWithHtmlResponse = (url, callback) => {
        //alert("Hello in GetAjax");
        let response = fetch(url, {
            method: 'GET',
            headers: this.Headers
        });

        let result = response.text();
        callback(result);

    }
    AddHeader = (headers) => {
        for (var key in headers) {
            this.Headers[key] = headers[key];
        }
        //this.headers['content_type'] = 'application/json';
        //return this;
    }

}
const AjaxUtils = new ajaxUtils();
export default AjaxUtils;