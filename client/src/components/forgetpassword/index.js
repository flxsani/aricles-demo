import React, { Component, AsyncStorage } from 'react';
import ForgetPasswordComp from './forgetpassword';
import { UserRegistration } from '../../services/user.services';

class forgetPasswordCtrl extends Component {
    constructor(props) {
        super();
        this.state = {
            txtEmail: null,
           
            errors: {
                txtEmail: ''
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
                    // value.match(validEmailRegex)
                    !validEmailRegex.test(value)
                        ? 'Please enter a valid email!'
                        : '';
                break;
            
            default:
                break;
        }

        this.setState({ errors, [name]: value }, () => {
            //console.log(errors)
        })
    }

    ForgetPassword = () => {
        console.log("state: ", this.state);
        alert("Forget password function will added soon.");
        //ToDo: Handle Add User task
        // let postData = {
        //     email: this.state.txtEmail,
        // }
        // ForgetUserPassword(postData, this.HandleForgetPassword);

    }

    HandleForgetPassword = (error, response) => {
        console.log("Response::", response);

        if (error) {
            alert("Error:" + error.message);
            return
        }
        if (response.status != undefined && !response.status) {
            alert(response.message);
            //ToDo: redirect to login page if token expires

        }
        else {
            console.log("inElse")
            
            this.props.history.replace('/');
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#d2d6de';
    }


    render() {
        return (
            <React.Fragment>
                <ForgetPasswordComp {...this.props} handleChange={this.HandleChange} forgetPassword={this.ForgetPassword} myState={this.state} />
            </React.Fragment>
        );
    }
}

export const ForgetPasswordCtrl = forgetPasswordCtrl;