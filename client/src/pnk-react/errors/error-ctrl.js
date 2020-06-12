import React, { Component } from 'react';
import { PnkConnect } from '../pnk-miniredux';
import { PnkModalDialog } from '../pnk-modal/pnk-modal-dialog';

class Pnk_Error extends React.Component {
    CloseModal = (modalId) => {
        //alert(document.getElementById(modalId).style.display);
         document.getElementById(modalId).style.display = 'none';
        // document.getElementById(modalId).html = '';
       // var element = document.getElementById(modalId);
       // element.parentNode.removeChild(element);
    }

    CallBackOk = (modalId) => {
        document.getElementById(modalId).style.display = 'none';
        alert('in ok');

    }

    componentDidUpdate = (prevProps, prevState) => {

        if (this.props.PnkStore.GetData('error').errorMessage !== ''){
            document.getElementById('pnkModal').style.display = 'block';
        }
    }
    

    render() {
        let pnkError = '';
        let pnkModalData = {
            pnkHeading: 'Error',
            pnkTitle: this.props.PnkStore.GetData('error').errorCode,
            pnkMessege: this.props.PnkStore.GetData('error').errorMessage,
            prettyMessage: this.props.PnkStore.GetData('error').prettyMessage,
            CallBackCancel: this.CloseModal,
            CallBackOk: this.CallBackOk,
            pnkAjaxResponse: ''
        };
        /*
        * pnkShowModal = pnkError , pnkConfirmModal , pnkAjaxModal
        *
        * */
        //    alert("kk"+this.props.PnkStore.GetData('error').errorMessage)
        if (this.props.PnkStore.GetData('error').errorMessage !== '') {
            // alert(this.props.PnkStore.GetData('error').errorMessage);
            pnkError = <PnkModalDialog CallBackOk={this.CallBackOk} CallBackCancel={this.CloseModal} pnkModalData={''}
                pnkHeading={'Error'}
                pnkTitle={this.props.PnkStore.GetData('error').errorCode}
                pnkMessege={this.props.PnkStore.GetData('error').errorMessage}
                prettyMessage={this.props.PnkStore.GetData('error').prettyMessage}
                pnkShowModal="dialog"
                pnkAjaxResponse={''} />;
        }
        else {
            // alert('no error');
            pnkError = <PnkModalDialog pnkShowModal="false" />;
        }

        return (
            <div>
                {pnkError}
            </div>

        );
    }
}


export const Pnk_Error_Ctrl = PnkConnect(Pnk_Error, "error");


/*
function errors(state = {
    wetherError: false,
    errorMessage: '',
    lastUpdated: '',
    clearingReducerFiring: 0
}, action) {
    //alert('in reducers in error action=' + JSON.stringify(action,null,4));
    switch (action.errortype) {
        case 'NETWORK' :
            return Object.assign({}, state, {
                wetherError: true,
                errorMessage: action.message

            })


        case 'SERVERAPPLICATION':
            return Object.assign({}, state, {
                wetherError: true,
                errorMessage: action.message

            })


        case 'CLEARERROR' :
            return Object.assign({}, state, {
                wetherError: false,
                errorMessage: ''

            })

        case 'SERVERERROR' :
            return Object.assign({}, state, {
                wetherError: false,
                errorMessage: action.message

            })


        default:

            return state;


    }

}
*/

// export default errors;