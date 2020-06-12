import React, { Component } from 'react';
import HeaderComp from './header';
class headerCtrl extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        console.log("InHeaderControllerHeader");
    }
    scrollOnCurrentPage = (e) => {
        setTimeout(e.target.click(), 2500);
        this.ToggleHeader(1);
    }
    ToggleHeader = (e) => {
        if (e == 1) {
            document.getElementById('header').classList.remove('active');
            document.getElementById('toggle-btn').classList.remove('active');
        } else {
            document.getElementById('header').classList.toggle('active');
            document.getElementById('toggle-btn').classList.toggle('active');
        }
    }
    render() {
        console.log("InHeaderControllerRender");
        return (
            <React.Fragment>
                <HeaderComp ToggleHeader={this.ToggleHeader} scrollOnCurrentPage={this.scrollOnCurrentPage} {...this.props} HandleLoader={this.props.HandleLoader} UserData={'Sani Yadav'} />
            </React.Fragment>
        );
    }
}


export const HeaderCtrl = headerCtrl;


