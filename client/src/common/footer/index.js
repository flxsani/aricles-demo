import React, { Component } from 'react';
import FooterComp from './footer';
// import { PnkConnect } from '../../pnk-react/pnk-miniredux'
class footerCtrl extends Component {
    render() {
        console.log("InFooterControllerRender");
        return (
            <FooterComp {...this.props} />
        );
    }
}

// export const FooterCtrl=PnkConnect(footerCtrl,'');
export const FooterCtrl = footerCtrl;