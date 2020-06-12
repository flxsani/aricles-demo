import React, {Component} from 'react';
import {PnkConnect} from '../../pnk-react/pnk-miniredux/';
import {PnkHttp_class} from './pnk-http-class';
import {PnkLoader} from "../loader/pnk-loader";

export class PnkHttp  {
    constructor() {


        this.isLoader = false;
        this.size = 


        alert('in pnk');
        //  JSON.stringify(props);
        this.state = {
            //isLoader: false
        };
        if (this.props.Loader.isLoader) {
            this.isLoader = true;
        } else {
            this.isLoader = false;
        }
        if (this.props.Loader.size) {
            this.size = this.props.Loader.size;
        } else {
            this.size = '';
        }

        if (this.props.As)
            this.As = this.props.As;
        else
            this.As = "json";

        if (this.props.ResponseFormat)
            this.RespFormat = this.props.ResponseFormat;

       
        //alert("in pnkhttp component");

        //this.Do();

        // alert(JSON.stringify(this.props.componentprops));
    }

    componentDidMount() {

        //  alert("before calling do");
        this.Do();

    }

    As = (format) => {
        if (format)
        this.As = format;
        else
            this.As = "json";

       
      return this;
    }

    AddHeader= (headers)=> {

        this.headers = {'X-CallBack-Type': 'AJAXGET'};
        //this.headers = {'headers':[{'name':'value'}]};
        if (this.headers) {
            this.headers = headers;  // a string of name value
        }


        switch (this.method) {
            case "get":
                this.headers['X-CallBack-Type'] = 'AJAXGET';
                break;
            case "put":
                this.headers['X-CallBack-Type'] = 'AJAXPUT';
                break;
            case "post":
                this.headers['X-CallBack-Type'] = 'AJAXPOST';
                break;
            case "delete":
                this.headers['X-CallBack-Type'] = 'AJAXDELETE';
                break;
        }

        this.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        this.config = {'headers': this.headers};



        return this;
    }

    AttachLoader=(loader) => {

        this.loader = loader;
        this.isLoader = true;
        this.isLoader= loader

        return this;
    }

    AddRequiredParams=()=> {

        return this;
    }

    Get=()=>{

        return this;
    }
    Post=()=>{

        return this;
    }
    Put=()=> {

        return this;
    }
    Delete =() => {

        return this;
    }

    TransferBackResult = (res) => {

        this.props.GetResult(res);

    }

    Do = () => {

        //   if (this.props.loader == true)
        // {

        // this.setState({isLoader:true});

        //if (this.props.requiredParams != "")

        //let params = this.props.requiredParams;
        //  alert("calling Do");
        this.isLoader = true;


        switch (this.props.method) {
            case "get": {

                // alert(JSON.stringify(this.headers));
                PnkHttp_class.Get(this.props.url, this.props.PnkStore, this.config).then(res => {
                        // alert("In pnk-http component in " + JSON.stringify(res.data));
                        //  this.setState({isLoader:false});
                        if (this.As != "html") {
                            alert('hi...');
                            res = this.JsonConvert(res);
                            //alert(res);
                            if (res == "error") {
                                this.isLoader = false;
                                this.forceUpdate();
                                return Promise.reject("Json Parse Error");
                            }
                        }

                        this.isLoader = false;

                        this.TransferBackResult(res);

                        // return res;
                    },
                    error => {
                        this.isLoader = false;
                        this.props.PnkStore.BroadCast();
                        this.forceUpdate()
                    });

            }
                break;

            case "post": {

                // alert(JSON.stringify(this.props.body, null, 4));

                PnkHttp_class.Post(this.props.url, this.props.body, this.props.PnkStore, this.config).then(res => {
                        // alert("In pnk-http component in " + JSON.stringify(res));
                        if (this.As != "html") {
                            alert('hi...');
                            res = this.JsonConvert(res);
                            //alert(res);
                            if (res == "error") {
                                this.isLoader = false;
                                this.forceUpdate();
                                return Promise.reject("Json Parse Error");
                            }
                        }
                        //  this.setState({isLoader:false});
                        this.isLoader = false;
                        this.TransferBackResult(res);

                        // return res;
                    },
                    error => {
                        this.isLoader = false;
                        this.props.PnkStore.BroadCast();
                        this.forceUpdate()
                    });
            }
                break;

            case "put": {

                // alert(JSON.stringify(this.props.body, null, 4));

                PnkHttp_class.Put(this.props.url, this.props.body, this.props.PnkStore, this.config).then(res => {
                        // alert("In pnk-http component in " + JSON.stringify(res));
                        //  this.setState({isLoader:false});
                        if (this.As != "html") {
                            alert('hi...');
                            res = this.JsonConvert(res);
                            //alert(res);
                            if (res == "error") {
                                this.isLoader = false;
                                this.forceUpdate();
                                return Promise.reject("Json Parse Error");
                            }
                        }
                        this.isLoader = false;
                        this.TransferBackResult(res);

                        // return res;
                    },
                    error => {
                        this.isLoader = false;
                        this.props.PnkStore.BroadCast();
                        this.forceUpdate()
                    });

            }
                break;

            case "delete": {
                PnkHttp_class.Delete(this.props.url, this.props.PnkStore, this.config).then(res => {
                        //alert( "In pnk-http component in " + JSON.stringify(res));
                        if (this.As != "html") {
                            alert('hi...');
                            res = this.JsonConvert(res);
                            //alert(res);
                            if (res == "error") {
                                this.isLoader = false;
                                this.forceUpdate();
                                return Promise.reject("Json Parse Error");
                            }
                        }
                        //  this.setState({isLoader:false});
                        this.isLoader = false;
                        this.TransferBackResult(res);

                        // return res;
                    },
                    error => {
                        this.isLoader = false;
                        this.props.PnkStore.BroadCast();
                        this.forceUpdate();
                    });


            }
                break;
        }


        //}

        //}
        //else
        //{


        //}


    }

    CheckForPinakaError = (res) => {
        //alert('in check pinaka error '+JSON.stringify(res, null, 4));
        if (res.data.PinakaResponse) {
            if ((res.data.PinakaResponse.ServerStatus) && (res.data.PinakaResponse.ServerStatus.value == "SUCCESS")) {

                return res;

            }
            else {
                //this.props.PnkStore
                //alert('in pnkhttp error');
                let myErr = {
                    errorCode: '',
                    errorType: 'Server',
                    errorMessage: 'Server Application Error',
                    prettyMessage: 'Oops Server Error. Please try later'
                };
                this.props.PnkStore.SetData('error', myErr);
                this.props.PnkStore.BroadCast();
                this.isLoader = false;
                return "error";
                //this.forceUpdate();

            }
        }


        return res;

    }

    JsonConvert = (res) => {
        //  alert("in json convert" + JSON.stringify(res.data));

        //res = res.data.replace(/<script.*?>.*?<\/script>/igm, '');
        try {

            //let result = JSON.parse(res);
            //   alert("in json convert" + JSON.stringify(res));

            if (res.data.PinakaResponse)   // if format is pinaka
                res = this.CheckForPinakaError(res);

        }
        catch (ex) {

            //alert('in catch' +ex);

            this.HandleJsonParseError(res);
            return "error";

        }

        return res;


    }

    HandleJsonParseError = (res) => {

        let myErr = {
            errorCode: '',
            errorType: 'JSONPARSE',
            errorMessage: 'PARSE Error',
            prettyMessage: 'Oops Server Error. Please try later',
            response: res
        };
        this.props.PnkStore.SetData('error', myErr);
        this.props.PnkStore.BroadCast();


    }

    render() {
        let loader = '';
        if (this.isLoader) {
            loader = <PnkLoader size={this.size}/>;
            /*if (this.props.Loader.containerId) {
                let containerId = document.getElementById(this.props.Loader.containerId);
            } else {
                this.isLoader = false;
            }*/
        }
        else {

            loader = "";
        }
        return (
            <div>
                {loader}
            </div>

            /*<div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                zIndex: 2,
                backgroundColor: '#ccccc',
                opacity: 0.6

            }}>
                {loader}
            </div>*/
        );
    }
}


/*

function errors(state = {
    wetherError: false,
    errorMessage: '',
    lastUpdated:'',
    clearingReducerFiring:0
}, action ) {
    //alert('in reducers in error action=' + JSON.stringify(action,null,4));
    switch (action.errortype) {
        case 'NETWORK' :
            return Object.assign({}, state, {
                wetherError:true,
                errorMessage:action.message

            })


        case 'SERVERAPPLICATION':
            return Object.assign({}, state, {
                wetherError:true,
                errorMessage:action.message

            })





        case 'CLEARERROR' :
            return Object.assign({}, state, {
                wetherError:false,
                errorMessage:''

            })

        case 'SERVERERROR' :
            return Object.assign({}, state, {
                wetherError:false,
                errorMessage: action.message

            })



        default:

            return state;



    }

}

export default errors;
*/