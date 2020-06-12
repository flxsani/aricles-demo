import React, {Component} from 'react';
import $ from 'bootstrap-jquery';
import bootstrap from 'react-bootstrap';


export const ErrorDialog = (props) => {
// alert(props.error);
    return (

        <div>

            {
             props.error === 'true' ?
                 <div id="pnkErrorModal" className="modal fade in" role="dialog" style={{display: 'block'}}>
                     <div className="modal-dialog">

                         {/*<!-- Modal content-->*/}
                         <div className="modal-content" style={{width: '60%',
                             margin: '215px auto'}}>
                             <div className="modal-header">
                                 <button type="button" className="close" onClick={props.CloseModal('pnkErrorModal')} >&times;</button>
                                 <h4 className="modal-title">{props.errorCode}</h4>
                             </div>
                             <div className="modal-body">
                                 <p>{props.errorMessege}</p>
                             </div>
                             <div className="modal-footer">
                                 <button type="button" className="btn btn-primary" onClick={props.CloseModal('pnkErrorModal')}>Close</button>
                             </div>
                         </div>

                     </div>
                 </div>

                 :
                 null
            }

        </div>

    );
}