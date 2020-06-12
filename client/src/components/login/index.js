import React, { Component, AsyncStorage } from 'react';
import LoginComp from './login';
import { UserLogin } from '../../services/user.services';
import { PnkConnect } from '../../pnk-react/pnk-miniredux/';

class loginCtrl extends Component {
    constructor(props) {
        super();
        this.state = {
            redirectToAdmin: false,
            txtEmail: null,
            txtPassword: null,
            chkRemember: false,
            errors: {
                txtEmail: '',
                txtPassword: '',
                chkRemember: '',
            }
        }

    }


    HandleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

        switch (name) {
            case 'txtEmail':
                errors.txtEmail =
                    !validEmailRegex.test(value)
                        ? 'Please enter a valid email!'
                        : '';

                break;
            case 'txtPassword':
                errors.txtPassword =
                    value.length < 6
                        ? 'Password must be 6 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            //console.log(errors)
        })
    }

    Login = () => {
        console.log("state: ", this.state);
        if (this.ValidateForm(this.state.errors) && this.state.txtEmail && this.state.txtPassword) {
            //console.info('Valid Form')
            let postData = {
                email: this.state.txtEmail,
                password: this.state.txtPassword
            }
            UserLogin(postData, this.HandleLogin);
        } else {
            // console.error('Invalid Form');
            alert("Please enter valid email and password")
        }


    }
    ValidateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
    }
    HandleLogin = (error, response) => {
        // console.log("Response::", response);

        if (error) {
            alert("Error:" + error.message);
            return
        }
        if (response.status != undefined && !response.status) {
            alert(response.message);
            //ToDo: redirect to login page if token expires

        }
        else {
            // Login sucessful
            localStorage.setItem('User', JSON.stringify(response));
            this.props.PnkStore.SetData("user",response);
            if (response.role == 'Super Admin') {
                this.props.componentprops.history.replace('/admin');
            }
            else {
                this.props.componentprops.history.replace('/articles');
            }
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#d2d6de';
    }


    render() {
        console.log("InLoginControllerRender", this.props);
        return (
            <React.Fragment>
                <LoginComp {...this.props} handleChange={this.HandleChange} login={this.Login} myState={this.state} />
            </React.Fragment>
        );
    }
}


// export const LoginCtrl = loginCtrl;
export const LoginCtrl = PnkConnect(loginCtrl, '');