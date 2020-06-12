import React, { Component } from 'react';
import AboutComp from './about'
// import { PnkConnect } from '../../pnk-react/pnk-miniredux'


export default class aboutCtrl extends Component {
    constructor(props) {
        super(props);
        console.log("InAboutUsControllerConstructor");
    }
    Back = () => {
        console.log('BackButtonclick::', this.props);
        this.props.history.goBack();
    }

    render() {
        console.log("InAboutUsControllerRender");
        return (
            <React.Fragment>
                <AboutComp {...this.props} back={this.Back} />
            </React.Fragment>
        );
    }
}

//export const AboutCtrl = PnkConnect(aboutCtrl, '');