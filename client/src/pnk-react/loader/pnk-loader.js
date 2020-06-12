import React, {Component} from 'react';


export const PnkLoader = (props) => {
    return (

        <div style={{
            /*boxShadow: '0 0 11px 2px',*/
            opacity: '0.6',
            padding: '0',
            borderRadius: '6px',
            position: 'fixed',
            textAlign: 'center',
            zIndex: '99999',
            left: '50%',
            top: '50%'

        }}>

            {
                props.size === 'small' ?
                    <img height="100" width="100" src={require("../images/small.gif")} alt=""/> :
                props.size === 'large' ?
                    <img height="100" width="100" src={require("../images/large.gif")} alt=""/> :

                    <img height="100" width="100" src={require("../images/default.gif")} alt=""/>

            }

        </div>

    );
}