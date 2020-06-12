import {pnkstore} from "../../stores/pnk-store";
import axios from 'axios';


export class PnkHttp_class {

    constructor() {
    }

}

PnkHttp_class.Get = function(url, pnkProvider, config) {

    //alert("in http class" +JSON.stringify(config));
    let myurl = pnkstore.api.baseurl + "/" + url;
    return  axios.get(myurl, config)
        .then(res => {



                // this.forceUpdate();
                // this.setState({posts});
                // alert("pnkstore global" + JSON.stringify(this.props.PnkStore.GetData('categories'), null, 4));
                // alert("pnkstore khkhk" + JSON.stringify(this.props, null, 4));
                // console.log(JSON.stringify(this.props.PnkStore.GetData('categories') ,null,4))
                // console.log(res);
                return res;
            },
            error => {

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    console.log('1st error');
                    console.log(error.response);
                    //return res;

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('2nd error');
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('3rd error');
                    console.log('Error', error.message);
                }
                //alert('in pnkhttp error');
                let myErr=  {errorCode:'',errorType:'',errorMessage:'Oops Network Error. Please try later',prettyMessage:''}
                pnkProvider.SetData('error',myErr);

                return  Promise.reject(error);

            }

        )



    // .catch((error) => {
    //     // Error
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         // console.log(error.response.data);
    //         // console.log(error.response.status);
    //         // console.log(error.response.headers);
    //         console.log('1st error');
    //         console.log(error.response);
    //         //return res;

    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         console.log('2nd error');
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('3rd error');
    //         console.log('Error', error.message);
    //     }
    //     //console.log(error.config);

    // });

}
PnkHttp_class.Post = function(url, body, pnkProvider,config) {

    //alert("in http class" +JSON.stringify(pnkProvider));
    let myurl = pnkstore.api.baseurl + "/" + url;
    // alert(typeof body);
    return  axios.post(myurl,body,config)
        .then(res => {



                // this.forceUpdate();
                // this.setState({posts});
                // alert("pnkstore global" + JSON.stringify(this.props.PnkStore.GetData('categories'), null, 4));
                // alert("pnkstore khkhk" + JSON.stringify(this.props, null, 4));
                // console.log(JSON.stringify(this.props.PnkStore.GetData('categories') ,null,4))
                // console.log(res);
                return res;
            },
            error => {

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    console.log('1st error');
                    console.log(error.response);
                    //return res;

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('2nd error');
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('3rd error');
                    console.log('Error', error.message);
                }
                //alert('in pnkhttp error');
                let myErr=  {errorCode:'',errorType:'',errorMessage:'network',prettyMessage:''}
                pnkProvider.SetData('error',myErr);

                return  Promise.reject(error);

            }

        )



    // .catch((error) => {
    //     // Error
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         // console.log(error.response.data);
    //         // console.log(error.response.status);
    //         // console.log(error.response.headers);
    //         console.log('1st error');
    //         console.log(error.response);
    //         //return res;

    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         console.log('2nd error');
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('3rd error');
    //         console.log('Error', error.message);
    //     }
    //     //console.log(error.config);

    // });

}

PnkHttp_class.Put = function(url, body, pnkProvider,config) {
//    alert("in http class" +JSON.stringify(pnkProvider));
//    alert("in http class" +JSON.stringify(body));
    let myurl = pnkstore.api.baseurl + "/" + url;
    // alert(typeof body);
    // body = JSON.parse(body);
    return axios.put(myurl,body,config)
        .then(res => {
                // this.forceUpdate();
                // this.setState({posts});
                //alert("pnkstore global" + JSON.stringify(this.props.PnkStore.GetData('categories'), null, 4));
                //alert("pnkstore khkhk" + JSON.stringify(this.props, null, 4));
                // console.log(JSON.stringify(this.props.PnkStore.GetData('categories') ,null,4))
                // console.log(res);
                return res;
            },
            error => {

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    console.log('1st error');
                    console.log(error.response);
                    //return res;

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('2nd error');
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('3rd error');
                    console.log('Error', error.message);
                }
                //alert('in pnkhttp error');
                let myErr=  {errorCode:'',errorType:'',errorMessage:'network',prettyMessage:''}
                pnkProvider.SetData('error',myErr);

                return  Promise.reject(error);

            }

        )



    // .catch((error) => {
    //     // Error
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         // console.log(error.response.data);
    //         // console.log(error.response.status);
    //         // console.log(error.response.headers);
    //         console.log('1st error');
    //         console.log(error.response);
    //         //return res;

    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         console.log('2nd error');
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('3rd error');
    //         console.log('Error', error.message);
    //     }
    //     //console.log(error.config);

    // });

}

PnkHttp_class.Delete = function(url, pnkProvider,config) {

    //alert("in http class" +JSON.stringify(pnkProvider));
    let myurl = pnkstore.api.baseurl + "/" + url;
    return  axios.delete(myurl,config)
        .then(res => {

                // this.forceUpdate();
                // this.setState({posts});
                // alert("pnkstore global" + JSON.stringify(this.props.PnkStore.GetData('categories'), null, 4));
                // alert("pnkstore khkhk" + JSON.stringify(this.props, null, 4));
                // console.log(JSON.stringify(this.props.PnkStore.GetData('categories') ,null,4))
                // console.log(res);
                return res;
            },
            error => {

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    console.log('1st error');
                    console.log(error.response);
                    //return res;

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('2nd error');
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('3rd error');
                    console.log('Error', error.message);
                }
                alert('in pnkhttp error');
                let myErr=  {errorCode:'',errorType:'',errorMessage:'network',prettyMessage:''}
                pnkProvider.SetData('error',myErr);

                return  Promise.reject(error);

            }

        )



    // .catch((error) => {
    //     // Error
    //     if (error.response) {
    //         // The request was made and the server responded with a status code
    //         // that falls out of the range of 2xx
    //         // console.log(error.response.data);
    //         // console.log(error.response.status);
    //         // console.log(error.response.headers);
    //         console.log('1st error');
    //         console.log(error.response);
    //         //return res;

    //     } else if (error.request) {
    //         // The request was made but no response was received
    //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //         // http.ClientRequest in node.js
    //         console.log('2nd error');
    //         console.log(error.request);
    //     } else {
    //         // Something happened in setting up the request that triggered an Error
    //         console.log('3rd error');
    //         console.log('Error', error.message);
    //     }
    //     //console.log(error.config);

    // });

}


