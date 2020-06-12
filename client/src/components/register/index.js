import React, { Component, AsyncStorage } from 'react';
import RegisterComp from './register';
import { UserRegistration } from '../../services/user.services';

class registerCtrl extends Component {
    constructor(props) {
        super();
        this.state = {
            txtFullName: null,
            txtEmail: null,
            txtPassword: null,
            chkRemember: false,
            errors: {
                txtFullName: '',
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

            case 'txtFullName':
                errors.txtFullName =
                    value.length < 3
                        ? 'Name must be minimum 3 characters!'
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

    Register = () => {
        console.log("state: ", this.state);
        if (this.ValidateForm(this.state.errors) && this.state.txtEmail && this.state.txtPassword && this.state.txtFullName) {
            let postData = {
                email: this.state.txtEmail,
                password: this.state.txtPassword,
                full_name: this.state.txtFullName
            }
            UserRegistration(postData, this.HandleRegister);
        } else {
            alert("Please fill all the details");
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
    HandleRegister = (error, response) => {
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
            // New user sussessfully registered and redirect to login page
            
            this.props.history.replace('/');
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = '#d2d6de';
    }


    render() {
        return (
            <React.Fragment>
                <RegisterComp {...this.props} handleChange={this.HandleChange} register={this.Register} myState={this.state} />
            </React.Fragment>
        );
    }
}


export const RegisterCtrl = registerCtrl;