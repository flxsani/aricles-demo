import React, {Component} from 'react';


export const PnkModalDialog = (props) => {
/*    alert('in modal'+JSON.stringify(props.pnkModalData,null,10));
    if(props.pnkModalData !== undefined || props.pnkModalData !== null){
        // alert(props.pnkModalData.pnkHeading);

        /!*let pnkModalData = {
            pnkHeading: props.pnkModalData.pnkHeading,
            pnkTitle: props.pnkModalData.pnkTitle,
            pnkMessege: props.pnkModalData.pnkMessege,
            CallBackCancel: props.pnkModalData.CallBackCancel
        };
        alert('kjashk'+
            pnkModalData
        )*!/
    }*/
    
    return (
        <div>
            {
                props.pnkShowModal === 'dialog' ?
                    <div className="modal fade in" id="pnkModal" role="dialog"
                         style={{display: 'block',zIndex:1400}}>
                        <div className="modal-dialog" style={{
                            height: '600px',
                            margin: '200px auto auto',
                            verticalAlign: 'middle',
                            width: '500px'
                        }}>
                            <div className="modal-content " style={{minHeight: '220px', width: '400px'}}>
                                <div className="modal-header">
                                    <button type="button" className="close" onClick={(modalId) => props.CallBackCancel('pnkModal')}>×</button>
                                    <span id="pnkModalHeading">{props.pnkHeading}</span>
                                </div>
                                <div id="pnkModalBody" className="modal-body"
                                     style={{padding: '20px', maxHeight: '400px', textAlign: 'center'}}>
                                    <img src={require("../images/logo.png")}
                                         style={{marginBottom: '10px', height: '80px', borderRadius: '5px'}}/>
                                    <h4 className="" id="pnkModalTitle">{props.pnkTitle}</h4>
                                    {/* <div id="pnkModalMessage">{props.pnkMessege}</div> */}
                                    <div id="pnkModalMessage">{props.prettyMessage}</div>
                                </div>
                                <div className="modal-footer" style={{textAlign: 'center'}}>
                                    <button className="btn btn-primary" type="button" onClick={(modalId) => props.CallBackCancel('pnkModal')}
                                            style={{paddingTop: '5px'}}> Ok
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    :

                    props.pnkShowModal === 'pnkConfirmModal' ?
                        <div className="modal fade in" id="pnkConfirmModal" role="dialog"
                             style={{display: 'block'}}>
                            <div className="modal-dialog" style={{
                                height: '600px',
                                margin: '200px auto auto',
                                verticalAlign: 'middle',
                                width: '500px'
                            }}>
                                <div className="modal-content " style={{minHeight: '220px', width: '400px'}}>
                                    <div className="modal-header">
                                        <button type="button" className="close" onClick={(modalId) => props.CallBackCancel('pnkConfirmModal')}>×</button>
                                        <span id="pnkModalHeading">{props.pnkHeading}</span>
                                    </div>
                                    <div id="pnkModalBody" className="modal-body"
                                         style={{padding: '20px', maxHeight: '400px', textAlign: 'center'}}>
                                        <img src={require("../images/logo.png")}
                                             style={{marginBottom: '10px', height: '80px', borderRadius: '5px'}}/>
                                        <h4 className="" id="pnkModalTitle">{props.pnkTitle}</h4>
                                        <div id="pnkModalMessage">{props.pnkMessege}</div>
                                    </div>
                                    <div className="modal-footer" style={{textAlign: 'center'}}>
                                        <button className="btn btn-primary pull-left" type="button" onClick={(modalId) => props.CallBackOk('pnkConfirmModal')}
                                                style={{paddingTop: '5px'}}> Ok
                                        </button>
                                        <button className="btn btn-primary pull-right" type="button" onClick={(modalId) => props.CallBackCancel('pnkConfirmModal')}
                                                style={{paddingTop: '5px'}}> Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :

                        props.pnkShowModal === 'pnkAjaxModal' ?

                        <div className="modal fade in" id="pnkAjaxModal" role="dialog"
                             style={{display: 'block'}}>
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" onClick={(modalId) => props.CallBackCancel('pnkAjaxModal')}>×</button>
                                        <span id="pnkModalHeading">{props.pnkHeading}</span>
                                    </div>
                                    <div id="pnkModalBody" className="modal-body">
                                        {props.pnkAjaxResponse}
                                    </div>
                                    <div className="modal-footer" style={{textAlign: 'center'}}>
                                        <button className="btn btn-primary" type="button" onClick={(modalId) => props.CallBackCancel('pnkAjaxModal')}
                                                style={{paddingTop: '5px'}}> Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        :

                        null
            }
            {(document.getElementById('pnkModal') && (document.getElementById('pnkModal').style.display === 'none')) ? (document.getElementById('pnkModal').style.display === 'block') : ''}

        </div>

    );
}