import React, {Component} from 'react';
import {PnkConnect} from '../../pnk-react/pnk-miniredux/';
import {PnkHttp} from './pnk-http';
import {PnkLoader} from "../loader/pnk-loader";
//import HelloWorld from "../../components/helloworld";

class PnkA  {
    constructor(context) {

          //  alert('in constructor');
        this.context = context;
        this.loader = null;
        this.format = "json";
        this.headers = null;
        this.method = "get";
        this.wetherPinakaResponse = true;
        
    }

    
    WetherPinakaResponse = (wetherPinakaResponse) => {

        this.wetherPinakaResponse = wetherPinakaResponse;
        return this;

    }

    AddContext = () => {




    }


    PassToHandleResponseFunc = (parameters) =>
    {


    }
    
    As = (format) => {
       
      this.format = format;  
       
      return this;
    }

    AddHeader= (name,value)=> {

        
        this.headers[name] = value;
        
        
        //this.headers = {'headers':[{'name':'value'}]};
        /*
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

         */   

        return this;
    }

    AttachLoader=(loader) => {

        if (loader)
        {
        this.loader = loader;
        }
        else
        this.isLoader= null;

        return this;
    }

    AddRequiredParams=()=> {

        return this;
    }

    Get=(url)=>{

        this.method = "get";
        this.url = url;

        return this;
    }
    Post=(url)=>{

        this.method = "post";
        this.url = url;
        return this;
    }
    Put=(url)=> {

        this.method = "put";
        this.url = url;
        return this;
    }
    Delete =(url) => {

        this.method = "delete";
        this.url = url;
        return this;
    }

    TransferBackResult = (res) => {

        this.props.GetResult(res);

    }

    ExtraData = (data) => {

        this.body = data;
        return this;

    }

    GetResult = (res) => {


      //  alert("result obtained"+ JSON.stringify(res));
            this.succuessFunc(res,this.context);
        

    }

    OnSuccess(func)
    {
          this.succuessFunc  = func;  
          return this;

    }

    Do = () => {

        //alert('in do');
        //   if (this.props.loader == true)
        // {

        // this.setState({isLoader:true});

        //if (this.props.requiredParams != "")

        //let params = this.props.requiredParams; 
        //  alert("calling Do");
         //return <HelloWorld name={'shiva'} />
        // alert(JSON.stringify(this.context));
        return <PnkHttp PnkStore={this.context} GetResult={this.GetResult} url={this.url} method={this.method}
        ExtraData={''} AddParams={''} body={this.body} Loader={this.loader} As={this.format} wetherPinakaResponse={this.wetherPinakaResponse} />


        
}

}

export const PnkAjax = function(context){

    const pnkA = new PnkA(context);
    return pnkA;


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