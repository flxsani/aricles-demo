import React, {Component} from 'react';
import {PnkConnect} from '../../pnk-react/pnk-miniredux/';
import {PnkHttp_class} from './pnk-http-class';
import {PnkLoader} from "../loader/pnk-loader";

export class PnkHttp extends React.Component {
    constructor(props) {

        super(props);

        //  JSON.stringify(props);
        this.state = {
            //isLoader: false
        };
//        this.wetherPinakaResponse = true;
        if (this.props.Loader.isLoader) {
            this.isLoader = true;
        } 
        else {
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

        this.headers = {'X-CallBack-Type': 'AJAXGET'};
        //this.headers = {'headers':[{'name':'value'}]};
        if (this.props.AddHeaders) {
            this.headers = this.props.AddHeaders;  // a string of name value
        }


        switch (this.props.method) {
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


        //alert("in pnkhttp component");

        //this.Do();

        // alert(JSON.stringify(this.props.componentprops));
    }

    componentDidMount() {

         // alert("before calling do in pnkhttp");
        this.Do();

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
        //this.isLoader = true;


        switch (this.props.method) {
            case "get": {

                // alert(JSON.stringify(this.headers));
                PnkHttp_class.Get(this.props.url, this.props.PnkStore, this.config).then(res => {
                        // alert("In pnk-http component in " + JSON.stringify(res.data));
                        //  this.setState({isLoader:false});
                        if (this.As != "html") {
                            //alert('hi...');
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
                            //alert('hi...');
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
                            //alert('hi...');
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
                            //alert('hi...');
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
        if (this.props.wetherPinakaResponse)
        {
            //alert('true');
        if (res.data.PinakaResponse) {
            if ((res.data.PinakaResponse.ServerStatus) && (res.data.PinakaResponse.ServerStatus.value == "SUCCESS")) {

                return res;

            }
            else {
                //this.props.PnkStore
                //alert('in pnkhttp error');
                let msg = 'Oops Server Error. Please try later';
                if(res.data.PinakaResponse.FailureReason !== "" || res.data.PinakaResponse.FailureReason !== undefined)
                    msg = res.data.PinakaResponse.FailureReason;
                
                let myErr = {
                    errorCode: '',
                    errorType: 'Server',
                    errorMessage: 'Server Application Error',
                    prettyMessage: msg
                };

                if (this.props.PnkStore.GetData('app').mode == "dev")
                myErr.errorMessage = res.data;
                else
                myErr.errorMessage = myErr.prettyMessage ;


                this.props.PnkStore.SetData('error', myErr);
                this.props.PnkStore.BroadCast();
                this.isLoader = false;
                return false;
                // return "error";
                //this.forceUpdate();

            }
        }
        else
        {

            //another kind of fatal error uncaught by server
            // alert('error');
            let msg = 'Oops Server Error. Please try later';
                if(res.data.PinakaResponse.FailureReason !== "" || res.data.PinakaResponse.FailureReason !== undefined)
                    msg = res.data.PinakaResponse.FailureReason;
                
            let myErr = {
                errorCode: '',
                errorType: 'Server',
                errorMessage: 'Server Application Error',
                prettyMessage: msg
            };
            if (this.props.PnkStore.GetData('app').mode == "dev")
                myErr.errorMessage = res.data;
                else
                myErr.errorMessage = myErr.prettyMessage ;

            this.props.PnkStore.SetData('error', myErr);
            this.props.PnkStore.BroadCast();
            this.isLoader = false;
            return false;
            // return "error";



        }
    }
    else
    {
        //let go
        alert('getting bypassed');
    }



        return res;

    }

    JsonConvert = (res) => {
        //  alert("in json convert" + JSON.stringify(res.data));

        //res = res.data.replace(/<script.*?>.*?<\/script>/igm, '');
        try {

            //let result = JSON.parse(res);
            //   alert("in json convert" + JSON.stringify(res));

            if (this.props.wetherPinakaResponse)   // if format is pinakas
                res = this.CheckForPinakaError(res);
                else
                {
                    //errors developer has to do himself
                }

        }
        catch (ex) {

            //alert('in catch' +ex);

            this.HandleJsonParseError(res);
            return "error";

        }

        return res;


    }

    HandleJsonParseError = (res) => {
        let msg = 'Oops Server Error. Please try later';
                if(res.data.PinakaResponse.FailureReason !== "" || res.data.PinakaResponse.FailureReason !== undefined)
                    msg = res.data.PinakaResponse.FailureReason;
                
        let myErr = {
            errorCode: '',
            errorType: 'JSONPARSE',
            errorMessage: 'PARSE Error',
            prettyMessage: msg,
            response: res
        };

        if (this.props.PnkStore.GetData('app').mode == "dev")
                myErr.errorMessage = res.data;
                else
                myErr.errorMessage = myErr.prettyMessage ;

        this.props.PnkStore.SetData('error', myErr);
        this.props.PnkStore.BroadCast();
        return false;


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