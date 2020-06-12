import React from 'react';
import {PnkValidate} from '../pnk-controls/pnk-validation';

export class PnkHtmlForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            target: false,
            controlmode: 'initial',
            whethererror: false
        }
        this.controlmode = 'initial';
        this.manageerror = [];
        this.whethererror = false;
        this.whetherformerror = false;
        this.pnkdisplayerrormsg = '';

        if (this.props.pnkvalidate === undefined || this.props.pnkvalidate === null || this.props.pnkvalidate === '') {
            this.pnkvalidate = true;
        } else {
            this.pnkvalidate = true;
        }

        if ((this.props.selected === undefined) || (this.props.selected === null) || (this.props.selected === '')) {
            this.selected = false;
        } else {
            this.selected = true;
        }

    }

    HandleChangeValue = (childvalues) => {

        let index = this.manageerror.findIndex((x) => x.id === childvalues.id);
        if (index === -1) {
            if (childvalues.value != undefined && childvalues.id != undefined) {
                this.manageerror.push(childvalues);
            }
        }
        else {
            if (childvalues.value != undefined && childvalues.id != undefined) {
                this.manageerror[index].value = childvalues.value;
                this.manageerror[index].whethererror = childvalues.whethererror;
            }
        }
        // console.log('ooooooooooooo');
        // console.log(this.manageerror[index]);
        console.log(this.manageerror);
        this.CheckValidated();
    }

    CheckValidated = () => {
        // let errorindex = this.manageerror.findIndex((x) => x.whethererror === false);
        // alert(typeof this.manageerror);
        let myerrorflag = false;
        let submitbutton = document.getElementById(this.props.submitbtn);
        // console.log(submitbutton);
        for (let i in this.manageerror) {
            if ((this.manageerror[i].whethererror) === true) {
                // this.whetherformerror = true;
                myerrorflag = true;
                // alert(this.whethererror+'in check is');
                break;
            } else {
                // alert(this.whethererror+'in check else');
                // this.whetherformerror = false;
            }
        }
        if (myerrorflag) {
            // console.log(this.manageerror);
            this.whetherformerror = true;
            if (submitbutton != null) {
                submitbutton.style.pointerEvents = "none";
                submitbutton.style.cursor = "default";
                submitbutton.disabled = true;
            }


        } else {
            this.whetherformerror = false;
            if (submitbutton != null) {
                submitbutton.style.pointerEvents = "auto";
                submitbutton.style.cursor = "pointer";
                submitbutton.removeAttribute('disabled');
            }
        }
    }


    HandleUserInput = (e) => {
        // alert(e.target.type+'value'+e.target.value);
        //     console.log(' //'+JSON.stringify(e.target.getAttribute('pnkvalidate')));
        // alert(e.target.value);
        this.controlmode = 'onchange';
        let forminput = '';
        let myeventobj = {};
        var targetid = '';

        if (e.target.type === 'radio' || e.target.type === 'checkbox') {
            // alert('targetid='+e.target.id);
            // alert('name'+e.target.name);
            if (e.target.name === null || e.target.name === '') {
                targetid = e.target.id;
            } else if (e.target.id === null || e.target.id === '') {
                targetid = e.target.name;
            }else {
                targetid = e.target.name;
            }
            forminput = document.getElementById(targetid);
        } else {
            //alert(e.target.id);
            //alert(e.target.name);
            if (e.target.id === null || e.target.id === '') {
                targetid = e.target.name;
            } else if (e.target.name === null || e.target.name === '') {
                targetid = e.target.id;
            }else {
                targetid = e.target.id;
            }
            forminput = document.getElementById(targetid);
        }

        if (forminput != null) {
            if (e.target.type === "text" || e.target.type === "password" || e.target.type === "email" || e.target.type === "number") {
                forminput.value = e.target.value;
                // alert(forminput.value);

            } else if (e.target.type === "checkbox") {

                forminput.checked = e.target.checked;
            } else if (e.target.type === "radio") {

                forminput.checked = e.target.checked;
            }
        }


        if (e.target.getAttribute('pnkvalidate') !== null) {
            // console.log(e.target.getAttribute('pnkvalidate'));
            switch (e.target.getAttribute('pnkvalidate')) {

                case "forceentry":
                    // alert('hi'+ e.target.value + "," + forminput.value);
                    if (!(PnkValidate.ForceEntry(e.target.value))) {
                        // alert(e.target.id +  "force entry"+ e.target.getAttribute('pnkdisplayerrormsg'));
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'This field is required and should not be left blank'
                                }
                            } else {
                                this.pnkdisplayerrormsg = 'This field is required and should not be left blank'
                            }
                        }
                        else {
                            this.pnkdisplayerrormsg = 'This field is required and should not be left blank';
                        }
                        this.whethererror = true;
                    }
                    else {
                        // alert('no error');
                        this.whethererror = false;
                    }

                    break;
                case "forcenumber":
                    if (!(PnkValidate.ForceNumber(e.target.value))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = ' Must be a valid numeric entry.  Please do not use commas or dollar signs or any non-numeric symbols.'
                                }
                            } else {
                                this.pnkdisplayerrormsg = ' Must be a valid numeric entry.  Please do not use commas or dollar signs or any non-numeric symbols.'
                            }
                        }
                        else
                            this.pnkdisplayerrormsg = ' Must be a valid numeric entry.  Please do not use commas or dollar signs or any non-numeric symbols.'

                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }
                    break;
                case "forceemail":
                    if (!(PnkValidate.ForceEmail(e.target.value))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'Must be a Valid Email'
                                }
                            } else {
                                this.pnkdisplayerrormsg = 'Must be a Valid Email'
                            }
                        }
                        else
                            this.pnkdisplayerrormsg = 'Must be a Valid Email';
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }

                    break;
                case "forceRnumber":
                    if (!(PnkValidate.ForceRNumber(e.target.value))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = ' Must be a valid numeric entry.  Please do not use commas or dollar signs or any non-numeric symbols.'
                                }
                            } else {
                                this.pnkdisplayerrormsg = ' Must be a valid numeric entry.  Please do not use commas or dollar signs or any non-numeric symbols.'
                            }
                        }
                        else
                            this.pnkdisplayerrormsg = ' Must be a valid numeric entry.  Please do not use commas or dollar signs or any non-numeric symbols.'
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }
                    break;
                case "forcemobile":
                    // alert('hi'+ e.target.value + "," + forminput.value);
                    if (!(PnkValidate.ForceMobile(e.target.value))) {
                        // alert(e.target.id +  "force entry"+ e.target.getAttribute('pnkdisplayerrormsg'));
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'No. must be a valid Numeric entry and 10 Digit';
                                }
                            } else {
                                this.pnkdisplayerrormsg = 'No. must be a valid Numeric entry and 10 Digit';
                            }
                        }
                        else {
                            this.pnkdisplayerrormsg = 'No. must be a valid Numeric entry and 10 Digit';
                        }
                        this.whethererror = true;
                    }
                    else {
                        // alert('no error');
                        this.whethererror = false;
                    }

                    break;
                case "forceRmobile":
                    // alert('hi'+ e.target.value + "," + forminput.value);
                    if (!(PnkValidate.ForceRMobile(e.target.value))) {
                        // alert(e.target.id +  "force entry"+ e.target.getAttribute('pnkdisplayerrormsg'));
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'No. must be a valid Numeric entry and 10 Digit';
                                }
                            } else {
                                this.pnkdisplayerrormsg = 'No. must be a valid Numeric entry and 10 Digit';
                            }
                        }
                        else {
                            this.pnkdisplayerrormsg = 'No. must be a valid Numeric entry and 10 Digit';
                        }
                        this.whethererror = true;
                    }
                    else {
                        // alert('no error');
                        this.whethererror = false;
                    }

                    break;
                case "forcepassword":
                    if (e.target.value.length >= 6) {
                        if (!(PnkValidate.ForcePassword(e.target.value))) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                    if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                        this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                    else {
                                        this.pnkdisplayerrormsg = 'Password Cannot be left blank';
                                    }
                                } else {
                                    this.pnkdisplayerrormsg = 'Password Cannot be left blank';
                                }
                            }
                            else
                                this.pnkdisplayerrormsg = 'Password Cannot be left blank';
                            this.whethererror = true;
                        }
                        else {
                            this.whethererror = false;
                        }
                    } else {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'Password must be greater than 6';
                                }
                            } else {
                                this.pnkdisplayerrormsg = 'Password must be greater than 6';
                            }
                            this.whethererror = true;
                        }
                        else
                            this.pnkdisplayerrormsg = 'Password must be greater than 6';
                        this.whethererror = true;
                    }
                    break;
                case "forcecheckbox":
                    // console.log('state after incheck//' + JSON.stringify(this.state.target));
                    if (!(PnkValidate.ForceCheckBox(e.target.checked))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                                }
                            } else {
                                this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                            }
                            this.whethererror = true;
                        } else
                            this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }
                    break;
                case "forcecheckboxgroup":
                    if (!(PnkValidate.ForceCheckBox(e.target.checked))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                                }
                            } else {
                                this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                            }
                            this.whethererror = true;
                        } else
                            this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }
                    break;
                case "forceradio":
                    if (!(PnkValidate.ForceRadio(e.target.checked))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                                }
                            } else
                                this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                            this.whethererror = true;
                        }
                        else {
                            this.whethererror = false;
                        }
                    } else {
                        this.whethererror = false;
                    }
                    break;
                case "forceradiogroup":
                    if (!(PnkValidate.ForceRadio(e.target.checked))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                                }
                            } else
                                this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                            this.whethererror = true;
                        } else
                            this.pnkdisplayerrormsg = 'This Feild is required and should not be left blank';
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }
                    break;
                case "forceselect":
                    // alert(PnkValidate.ForceSelect(this.state.value));
                    if (!(PnkValidate.ForceSelect(e.target.value))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'This Feild is required Please Select an Option';
                                }
                            } else
                                this.pnkdisplayerrormsg = 'This Feild is required Please Select an Option';
                            this.whethererror = true;
                        } else
                            this.pnkdisplayerrormsg = 'This Feild is required Please Select an Option';
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }
                    break;

                case "forcefloat":
                    // alert(PnkValidate.ForceSelect(this.statvalue));
                    if (!(PnkValidate.ForceFloat(e.target.value))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'Must be a valid numeric entry. Allowed speciel characters are (+, -, .)';
                                }
                            } else
                                this.pnkdisplayerrormsg = 'Must be a valid numeric entry. Allowed speciel characters are (+, -, .)';
                            this.whethererror = true;
                        } else
                            this.pnkdisplayerrormsg = 'Must be a valid numeric entry. Allowed speciel characters are (+, -, .)';
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }
                    break;

                case "forceRfloat":
                    // alert(PnkValidate.ForceSelect(this.statvalue));
                    if (!(PnkValidate.ForceRFloat(e.target.value))) {
                        if (e.target.getAttribute('pnkdisplayerrormsg') !== null) {
                            if (e.target.getAttribute('pnkdisplayerrormsg') !== undefined) {
                                if (e.target.getAttribute('pnkdisplayerrormsg') !== '')
                                    this.pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                                else {
                                    this.pnkdisplayerrormsg = 'Must be a valid numeric entry. Allowed speciel characters are (+, -, .)';
                                }
                            } else
                                this.pnkdisplayerrormsg = 'Must be a valid numeric entry. Allowed speciel characters are (+, -, .)';
                            this.whethererror = true;
                        } else
                            this.pnkdisplayerrormsg = 'Must be a valid numeric entry. Allowed speciel characters are (+, -, .)';
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }
                    break;

            }
            if (e.target.getAttribute('pnkvalidate') === 'forcecheckboxgroup') {

                let checkboxgroup = e.target;
                // console.log(checkboxgroup);
                let myarrcheckboxgroup = [];
                let indexcheckboxgroup = this.manageerror.findIndex((x) => x.id === e.target.name);
                // console.log(indexcheckboxgroup);
                if (indexcheckboxgroup === -1) {
                    if (checkboxgroup != null) {
                        myarrcheckboxgroup.push(checkboxgroup.value);
                    }
                }
                else {
                    if (checkboxgroup != null) {
                        if (this.manageerror[indexcheckboxgroup].value.length === 0) {

                            // console.log('in elseaaa');
                            // console.log(myarrcheckboxgroup);
                            myarrcheckboxgroup.push(checkboxgroup.value);
                        }
                        else {
                            let index = myarrcheckboxgroup.indexOf(checkboxgroup.value);
                            // alert(checkboxgroup.value);
                            if (index == -1) {
                                let arr = []
                                for (let i in this.manageerror[indexcheckboxgroup].value) {
                                    if (this.manageerror[indexcheckboxgroup].value[i] != checkboxgroup.value)
                                        arr.push(this.manageerror[indexcheckboxgroup].value[i]);
                                }
                                arr.push(checkboxgroup.value);
                                myarrcheckboxgroup = arr;
                                // console.log('inhhhhhhhhhhhhh');
                                // console.log();
                                // myarrcheckboxgroup.push(checkboxgroup.value);
                            }
                            else {
                                let arr = []
                                for (let i in this.manageerror[indexcheckboxgroup].value) {
                                    arr.push(this.manageerror[indexcheckboxgroup].value[i]);
                                }
                                arr.push(checkboxgroup.value);
                                myarrcheckboxgroup = arr;
                            }

                            // console.log(arr);
                            // console.log(myarrcheckboxgroup);
                            // console.log('in elsewwww'+myarrcheckboxgroup);
                        }
                    }
                }

                if (e.target.checked === true) {
                    let myeventobj = {id: targetid, value: myarrcheckboxgroup, whethererror: false};
                    // console.log('in true');
                    // console.log(myeventobj);
                    this.HandleChangeValue(myeventobj);
                } else {
                    /* console.log('in else');
                    console.log(myarrcheckboxgroup);*/
                    let index = myarrcheckboxgroup.indexOf(checkboxgroup.value);
                    let myeventobj = {};
                    myarrcheckboxgroup.splice(index, 1);
                    if (myarrcheckboxgroup.length === 0)
                        myeventobj = {id: targetid, value: myarrcheckboxgroup, whethererror: true};
                    else
                        myeventobj = {id: targetid, value: myarrcheckboxgroup, whethererror: false};
                    this.HandleChangeValue(myeventobj);
                }
                // console.log(myarrcheckboxgroup);

            }
            else if (e.target.getAttribute('pnkvalidate') === 'forceradiogroup') {
                let myeventobj = {id: targetid, value: e.target.value, whethererror: this.whethererror};
                this.HandleChangeValue(myeventobj);
            } else {
                if (e.target.type === 'radio' || e.target.type === 'checkbox') {
                    myeventobj = {id: targetid, value: e.target.value, whethererror: this.whethererror};
                } else {
                    myeventobj = {id: targetid, value: e.target.value, whethererror: this.whethererror};
                }
                this.HandleChangeValue(myeventobj);
            }

            // this.HandleErrorMsg(e.target.id);
            let errid = '';
            if (e.target.getAttribute('pnkvalidate') === 'forceradiogroup' || e.target.getAttribute('pnkvalidate') === 'forcecheckboxgroup') {
                errid = 'spnErr_' + e.target.name;
            } else {
                errid = 'spnErr_' + targetid;
            }
            let errorspan = document.getElementById(errid);
            let contenterr = document.createTextNode(this.pnkdisplayerrormsg);
            // alert('error'+ this.whethererror);
            if (this.whethererror) {

                let errortag = document.getElementById(targetid);

                if (errorspan === null) {
                    // alert("span not exists " +  this.pnkdisplayerrormsg);
                    let errorspan = document.createElement("p");
                    // errorspan.classList.add("text-danger");
                    errorspan.setAttribute('style', 'color: red; position: relative;top: 0px;display:block;');
                    errorspan.setAttribute('id', errid);
                    errorspan.appendChild(contenterr);
                    // if(errortag.childNodes[-1] != undefined)
                    if (errortag.childNodes[-1] === undefined)
                        errortag.after(errorspan);
                    else
                        errortag.after(errorspan, errortag.childNodes[-1]);

                    // document.getElementById(e.target.id).parentNode.appendChild(errorspan);
                } else {
                    // alert("span already created" +  this.pnkdisplayerrormsg);
                    errorspan.setAttribute('style', 'color: red; position: relative;top: 0px;display:block;');
                    errorspan.innerText = this.pnkdisplayerrormsg;
                }

            } else {
                // console.log(errorspan);
                if (errorspan != null) {
                    errorspan.setAttribute('style', 'display:none;');
                    errorspan.innerText = '';
                }
            }
        } else {
            let myeventobj = {id: targetid, value: e.target.value, whethererror: false};
            console.log(myeventobj);
            this.HandleChangeValue(myeventobj);
        }

    }

    HandleSubmit = (event) => {
        // alert(this.controlmode);
        event.preventDefault();
        if (this.whetherformerror === false && this.controlmode !== 'initial') {

            let res = this.manageerror;
            let formdata = {};
            let id = '';
            for (let data in res) {
                formdata[res[data].id] = res[data].value;
            }
            this.controlmode = 'validated';
            this.props.onsubmit(formdata);
            // console.log(formdata);

        } else {
            this.controlmode = 'initial';
            this.props.onsubmit('');
        }
    }

    renderChildren(children) {

        return React.Children.map(children, child => {
            let childProps = {};
            // console.log(child);
            if (React.isValidElement(child) && ((child.type === 'input') || (child.type === 'select') || (child.type === 'button') || (child.type === 'a') || (child.type === 'textarea'))) {

                let obj = {};
                let myinitialvalue = child.props.value;
                let myeventobj = {};
                let checkerror = false;

                // console.log('child.props.pnkvalidate=== '+child.props.pnkvalidate);
                if (child.props.pnkvalidate != undefined && child.props.pnkvalidate != '') {
                    if (myinitialvalue != '') {
                        if (child.type == 'select') {
                            if (child.props.children[0].props.value == -1 || myinitialvalue == -1)
                                checkerror = true;
                            else {
                                checkerror = false;
                            }
                        } else if (child.props.type == 'checkbox' && child.props.pnkvalidate == 'forcecheckboxgroup') {
                            if (myinitialvalue != undefined) {
                                checkerror = true;
                            }
                        } else {
                            checkerror = false;
                        }
                    } else if (myinitialvalue == '' || myinitialvalue == undefined) {
                        checkerror = true;
                    }
                } else {
                    checkerror = false;
                }

                if (child.props.type !== 'button' && child.props.type !== 'submit') {

                    /*
                                        let id = '';

                                        if (child.props.type === 'radio' || child.props.type === 'checkbox') {
                                            // alert('id='+child.props.id);
                                            // alert('name'+child.props.name);
                                            if (child.props.name === null || child.props.name === '') {
                                                id = child.props.id;
                                            } else if (child.props.id === null || child.props.id === '') {
                                                id = child.props.name;
                                            }
                                        } else {
                                            if (child.props.name === null || child.props.name === '') {
                                                id = child.props.id;
                                            } else if (child.props.id === null || child.props.id === '') {
                                                id = child.props.name;
                                            }
                                        }
                    */


                    // if (myinitialvalue == '' || myinitialvalue != undefined) {
                    if ((child.props.type === 'checkbox') && (child.props.pnkvalidate === 'forcecheckboxgroup')) {
                        myeventobj = {id: child.props.name, value: [], whethererror: checkerror};
                        // console.log(myeventobj);
                    } else if ((child.props.type === 'checkbox') && (child.props.pnkvalidate === 'forcecheckbox')) {
                        myeventobj = {id: child.props.name, value: child.props.value, whethererror: checkerror};
                        // console.log(myeventobj);
                    } else if (child.props.type === 'checkbox') {
                        myeventobj = {id: child.props.name, value: child.props.value, whethererror: checkerror};
                        // console.log(myeventobj);
                    } else if ((child.props.type === 'radio') && (child.props.pnkvalidate === 'forceradiogroup')) {
                        myeventobj = {id: child.props.name, value: child.props.value, whethererror: checkerror};
                        // console.log(myeventobj);
                    } else if ((child.props.type === 'radio' && (child.props.pnkvalidate === 'forceradio'))) {
                        myeventobj = {id: child.props.name, value: child.props.value, whethererror: checkerror};
                        // console.log(myeventobj);
                    } else if (child.props.type === 'radio') {
                        myeventobj = {id: child.props.name, value: child.props.value, whethererror: checkerror};
                        // console.log(myeventobj);
                    } else if (child.type == 'select') {
                        if (child.props.children[0].props.value == -1) {
                            myeventobj = {
                                id: child.props.id,
                                value: child.props.children[0].props.value,
                                whethererror: checkerror
                            };
                        }
                        else {
                            myeventobj = {id: child.props.id, value: child.props, whethererror: checkerror};
                        }
                        // console.log(myeventobj);
                    } else if (child.type == 'input' || child.type == 'textarea') {
                        myeventobj = {id: child.props.id, value: child.props.value, whethererror: checkerror};
                        console.log(myeventobj);
                    }
                    // }
                    this.HandleChangeValue(myeventobj);
                }


                if ((child.props.type === 'checkbox' || child.props.type === 'radio')) {
                    childProps = {
                        value: child.props.value,
                        onClick: this.HandleUserInput
                        // onChange: child.props.onChange
                    };
                    // console.log(child);
                }
                else if ((child.type === 'button' || child.type === 'a') || child.props.type === 'button' || child.props.type === 'submit') {
                    let classes = child.props.className;
                    let myarr;
                    if (classes != undefined) {
                        myarr = classes.split(' ');
                    }

                    let style1 = {cursor: 'default', pointerEvents: 'none',};
                    let propstyle = child.props.style;
                    let style = {...style1,...propstyle};


                    for (let i in myarr) {
                        if (myarr[i] === 'btn' || child.props.type === 'button' || child.props.type === 'submit') {
                            childProps = {
                                style: style,
                                disabled: true,
                                onClick: this.HandleSubmit
                            };
                        }
                    }


                } else if ((child.type === 'input') || ((child.type === 'textarea')) || ((child.type === 'select'))){
                    // if(this.HandleUserInput)
                    // console.log(child.type);
                    childProps = {
                        value: child.value,
                        // onChange(event) {
                        //     this.HandleUserInput(event);
                        //     child.props.onChange;

                        // }
                        onChange: this.HandleUserInput
                    };
                }

                // }


            }

            if (child.props) {
                // String has no Prop
                childProps.children = this.renderChildren(child.props.children);
                return React.cloneElement(child, childProps);
            }
            return child;
        })
    }

    render() {
        return <form className={this.props.class} style={this.props.style} onSubmit={this.HandleSubmit}
                     id={this.props.id} data-value={this.state.value}>
            {this.renderChildren(this.props.children)}
            {/*{(this.whethererror) ? <span className='text-danger'>{this.pnkdisplayerrormsg}</span> : ''}*/}
        </form>
    }
}
