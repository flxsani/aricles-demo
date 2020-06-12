import React from 'react';
import {PnkValidate} from '../pnk-controls/pnk-validation';

export class PnkHtmlForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            target: false,
            controlmode: 'initial',
            formmode: this.props.formmode,
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

    shouldComponentUpdate = (nextProps) =>{
        // console.log(nextProps);
        return true;
    }

    HandleChangeValue = (childvalues) => {

        let index = this.manageerror.findIndex((x) => x.id === childvalues.id);
        if (index === -1) {
            if (childvalues.value != undefined && childvalues.id != undefined) {
                this.manageerror.push(childvalues);
            }
        }
        else {
            // console.log('child values in else');
            // console.log(childvalues);
            if (childvalues.value != undefined && childvalues.id != undefined) {
                this.manageerror[index].value = childvalues.value;
                this.manageerror[index].whethererror = childvalues.whethererror;
            }
        }
        // console.log('ooooooooooooo');
        // console.log('in handle change value ');
        // console.log(childvalues);
        // console.log('below childvalue');
        // console.log(this.manageerror);
        //this.CheckValidated();
    }

    CheckValidated = () => {
        // let errorindex = this.manageerror.findIndex((x) => x.whethererror === false);
        // alert(typeof this.manageerror);
        let myerrorflag = false;
        let submitbutton = document.getElementById(this.props.submitbtn);
        let pnkvalidateform = document.getElementById(this.props.id);
        // alert(submitbutton);
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
        // console.log('in check error == ' + this.controlmode);
        // console.log('in check error flag == ' + myerrorflag);
        // if ((myerrorflag == true && this.controlmode != 'validated') || (( this.props.whetherformerror == true || this.props.formmode != 'validated'))) {
        if (myerrorflag) {
            // console.log(this.manageerror);
            // alert('error');
            window.scrollTo(0, 0);
            this.whetherformerror = true;


        } else {
            let res = this.manageerror;
            let formdata = {};
            let id = '';
            for (let data in res) {
                formdata[res[data].id] = res[data].value;
                // document.getElementById(res[data].id).value = '';
            }
            this.whetherformerror = false;
            this.props.onsubmit(formdata);
        }
    }

    HandleUserInputOnChange = (e) =>{
        let forminput = '';
        let myeventobj = {};
        let targetid = '';
        let targetvalue = '';
        let ischecked = '';
        let targettype = '';
        let targetname = '';
        let pnkvalidate = '';
        let pnkdisplayerrormsg = '';
        let targetchecked = '';
        // console.log(e.target);
        // console.log(e.target.value);
        if (typeof (e.target.name) != 'undefined') {
            let is_valid_entity = e.target.name.substring(0, 3);
            if (is_valid_entity == 'ddl') {
                targetid = e.target.name;
                targetname = e.target.name;
                forminput = document.getElementById(targetid);
                // console.log(forminput);
                forminput.value = e.target.value;
                targetvalue = forminput.value;
                targettype = forminput.type;
                pnkvalidate = forminput.getAttribute('pnkvalidate');
                pnkdisplayerrormsg = forminput.getAttribute('pnkdisplayerrormsg');
                // console.log(document.getElementById(targetid));
                /*if (forminput.value == -1) {
                    console.log('please select');
                } else {
                    console.log('Ok Valid Hai');
                }*/
                // return;
            } else if (is_valid_entity == 'fup') {
                targetid = e.target.name;
                targetname = e.target.name;
                forminput = document.getElementById(targetid);
                // console.log(forminput);
                forminput.value = e.target.value;
                targetvalue = forminput.value;
                targettype = forminput.type;
                pnkvalidate = e.target.getAttribute('pnkvalidate');
                pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                // console.log(forminput.value);
                /*if (forminput.value == -1) {
                    console.log('please select');
                } else {
                    console.log('Ok Valid Hai');
                }*/
                return true;
            } else if (is_valid_entity == 'rad' || is_valid_entity == 'chk') {
                targetid = e.target.name;
                targetname = e.target.name;
                if (e.target.name === null || e.target.name === '') {
                    targetid = e.target.id;
                } else if (e.target.id === null || e.target.id === '') {
                    targetid = e.target.name;
                } else {
                    targetid = e.target.name;
                }
                forminput = document.getElementById(targetid);
                targetchecked = e.target.checked;
                forminput.checked = e.target.checked;
                // console.log(forminput);
                forminput.value = e.target.value;
                targetvalue = forminput.value;
                targettype = forminput.type;
                pnkvalidate = e.target.getAttribute('pnkvalidate');
                pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');
                // console.log(forminput.value);
                /*                if (forminput.value == -1) {
                                    console.log('please select');
                                } else {
                                    console.log('Ok Valid Hai');
                                }*/
                // return;
            } else if (is_valid_entity == 'txt') {
                targetid = e.target.name;
                targetname = e.target.name;
                if (e.target.name === null || e.target.name === '') {
                    targetid = e.target.id;
                } else if (e.target.id === null || e.target.id === '') {
                    targetid = e.target.name;
                } else {
                    targetid = e.target.name;
                }
                forminput = document.getElementById(targetid);
                // console.log('console  target value = '+e.target.value);

                this.newvalue = e.target.value;
                forminput.value = e.target.value;
                targetvalue = forminput.value;
                // console.log('console  target value = '+targetvalue);
                // console.log(document.getElementById(targetid));
                targettype = forminput.type;
                pnkvalidate = e.target.getAttribute('pnkvalidate');
                pnkdisplayerrormsg = e.target.getAttribute('pnkdisplayerrormsg');

                // console.log(forminput);
                /*if (forminput.value == -1) {
                    console.log('please select');
                } else {
                    console.log('Ok Valid Hai');
                }*/
                // return;
            }
        }
        // console.log(forminput);
    }

    HandleUserInput = (e) => {
        // alert(type+'value'+value);
        // console.log(' /in handle ');
        // console.log(e);
        // alert(value);
        this.controlmode = 'validating';
        let forminput = '';
        let myeventobj = {};
        let targetid = e.id;
        let type = e.type;
        let value = e.value;
        let groupvalue = e.groupvalue;
        let checked = e.checked;
        let name = e.name;
        let pnkvalidate = e.pnkvalidate;
        let pnkdisplayerrormsg = e.pnkdisplayerrormsg;

        if (type === 'radio' || type === 'checkbox') {
            // alert('targetid='+id);
            // alert('name'+name);
            if (name === null || name === '') {
                targetid = e.id;
            } else if (e.id === null || e.id === '') {
                targetid = e.name;
            } else {
                targetid = e.name;
            }
            // alert('terget id = '+targetid);
            value = e.value;
            if((pnkvalidate == 'forceradiogroup' || pnkvalidate == 'forcecheckboxgroup') && groupvalue != undefined){
                value = groupvalue
            }

        } else {
            // alert(id);
            // alert(name);
            if (e.id === null || e.id === '') {
                targetid = e.name;
            } else if (name === null || name === '') {
                targetid = e.id;
            } else {
                targetid = e.id;
            }
            value = e.value;

        }

        if (pnkvalidate !== null && pnkvalidate != undefined) {
            // console.log(pnkvalidate);
            switch (pnkvalidate) {

                case "forceentry":
                    // alert('hi'+ value + "," + forminput.value);
                    if (!(PnkValidate.ForceEntry(value))) {
                        // alert(id +  "force entry"+ pnkdisplayerrormsg);
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (!(PnkValidate.ForceNumber(value))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (!(PnkValidate.ForceEmail(value))) {
                        if (pnkdisplayerrormsg !== '' && pnkdisplayerrormsg !== undefined && pnkdisplayerrormsg !== null) {
                            this.pnkdisplayerrormsg = pnkdisplayerrormsg;
                        }
                        else
                            this.pnkdisplayerrormsg = 'Email cannot be left blank or format is Invalid';
                        this.whethererror = true;
                    }
                    else {
                        this.whethererror = false;
                    }

                    break;
                case "forceRnumber":
                    if (!(PnkValidate.ForceRNumber(value))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    // alert('hi'+ value + "," + forminput.value);
                    if (!(PnkValidate.ForceMobile(value))) {
                        // alert(id +  "force entry"+ pnkdisplayerrormsg);
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    // alert('hi'+ value + "," + forminput.value);
                    if (!(PnkValidate.ForceRMobile(value))) {
                        // alert(id +  "force entry"+ pnkdisplayerrormsg);
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (value.length >= 6) {
                        if (!(PnkValidate.ForcePassword(value))) {
                            if (pnkdisplayerrormsg !== null) {
                                if (pnkdisplayerrormsg !== undefined) {
                                    if (pnkdisplayerrormsg !== '')
                                        this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (!(PnkValidate.ForceCheckBox(checked))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (!(PnkValidate.ForceCheckBoxGroup(value))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (!(PnkValidate.ForceRadio(checked))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (!(PnkValidate.ForceRadioGroup(value))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    // alert(PnkValidate.ForceSelect(this.statvalue));
                    if (!(PnkValidate.ForceSelect(value))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                case "forceselectmultiple":
                    // alert(PnkValidate.ForceSelect(this.state.value));
                    if (!(PnkValidate.ForceSelectMultiple(value))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (!(PnkValidate.ForceFloat(value))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
                    if (!(PnkValidate.ForceRFloat(value))) {
                        if (pnkdisplayerrormsg !== null) {
                            if (pnkdisplayerrormsg !== undefined) {
                                if (pnkdisplayerrormsg !== '')
                                    this.pnkdisplayerrormsg = pnkdisplayerrormsg;
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
            if (pnkvalidate === 'forcecheckboxgroup') {

                let checkboxgroup = e.target;
                // console.log(checkboxgroup);
                let myarrcheckboxgroup = [];
                let indexcheckboxgroup = this.manageerror.findIndex((x) => x.id === name);
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
            else if (pnkvalidate === 'forceradiogroup' && type == 'radio') {
                let myeventobj = {id: targetid, value: value, whethererror: this.whethererror};
                console.log('in forceradio group');
                console.log(myeventobj);
                this.HandleChangeValue(myeventobj);
            } else {
                // alert(type);
                if (type === 'radio' || type === 'checkbox') {
                    myeventobj = {id: targetid, value: value, whethererror: this.whethererror};
                } else {
                    myeventobj = {id: targetid, value: value, whethererror: this.whethererror};
                    /*console.log('in push obj == text');
                    console.log('whe==erro'+ this.whethererror);*/
                    // console.log(myeventobj);
                }
                this.HandleChangeValue(myeventobj);
            }

            // this.HandleErrorMsg(id);
            let errid = '';
            let errorspan = '';
            let contenterr = '';
            let errortag = '';
            if (pnkvalidate === 'forceradiogroup' || pnkvalidate === 'forcecheckboxgroup') {
                errid = 'spnErr_' + name;
                let groupnode = document.getElementsByName(e.name);
                let length = groupnode.length-1;
                errortag = groupnode[length];
            } else {
                errid = 'spnErr_' + targetid;
                errortag = document.getElementById(targetid);
            }
            // alert(errid);
            errorspan = document.getElementById(errid);
            contenterr = document.createTextNode(this.pnkdisplayerrormsg);
            // errortag = document.getElementById(targetid);
            // alert('error'+ this.whethererror);
            // console.log(errid);
            // console.log(errorspan);
            // console.log(errortag);
            if (this.whethererror) {

                if (errorspan === null) {
                    // alert("span not exists " +  this.pnkdisplayerrormsg);
                    let errorspan = document.createElement("p");
                    // errorspan.classList.add("text-danger");
                    errorspan.setAttribute('style', 'color: red; position: relative;top: 0px;display:block;');
                    errorspan.setAttribute('id', errid);
                    errorspan.appendChild(contenterr);
                    this.pnkdisplayerrormsg = '';
                    // if(errortag.childNodes[-1] != undefined)
                    if (errortag.childNodes[-1] === undefined)
                        errortag.after(errorspan);
                    else
                        errortag.after(errorspan, errortag.childNodes[-1]);

                    // document.getElementById(id).parentNode.appendChild(errorspan);
                } else {
                    // alert("span already created" +  this.pnkdisplayerrormsg);
                    if (errorspan != null) {
                        errorspan.setAttribute('style', 'color: red; position: relative;top: 0px;display:block;');
                        errorspan.innerText = this.pnkdisplayerrormsg;
                        this.pnkdisplayerrormsg = '';
                    }
                }

            } else {
                // console.log(errorspan);
                if (errorspan != null) {
                    errorspan.setAttribute('style', 'display:none;');
                    this.pnkdisplayerrormsg = '';
                    errorspan.innerText = '';
                }
            }
        } else {
            let myeventobj = {id: targetid, value: value, whethererror: false};
            // console.log(myeventobj);
            this.HandleChangeValue(myeventobj);
        }

    }

    HandleSubmit = (event) => {
        // alert('in submit mera wala');
        event.preventDefault();

        // this.CheckValidated();
        let formdata = {};

        if (this.props.formmode != 'validated') {

        }

        let pnkform = document.getElementById(this.props.id).elements;

        for (let i = 0; i < pnkform.length; i++) {
            formdata = {
                id: pnkform[i].id,
                name: pnkform[i].name,
                type: pnkform[i].type,
                value: pnkform[i].value,
                checked: pnkform[i].checked,
                groupvalue: pnkform[i].getAttribute('groupvalue'),
                pnkvalidate: pnkform[i].getAttribute('pnkvalidate'),
                pnkdisplayerrormsg: pnkform[i].getAttribute('pnkdisplayerrormsg')
            };
            // console.log(formdata);
            this.HandleUserInput(formdata);
        }
        this.CheckValidated();

    }


    renderChildren(children) {

        return React.Children.map(children, child => {
            let childProps = {};
            // console.log(child);
            // if (React.isValidElement(child) && ((child.type === 'input') || (child.type === 'select') || (child.type === 'button') || (child.type === 'a'))) {
            if (React.isValidElement(child) && ((child.type === 'input') || (child.type === 'select') || (child.type === 'button') || (child.type === 'a') || (child.type === 'textarea') || typeof (child.type) == 'function')) {

                let obj = {};
                let style = {cursor: 'default', pointerEvents: 'none'};
                let myinitialvalue = child.props.value;
                let myeventobj = {};
                let checkerror = false;

                // console.log(child);
                // console.log('whetherformerror = ' + this.whetherformerror + '---whetherformerror props---=' + this.props.whetherformerror + '---formmode == ' + this.props.formmode);


                if ((child.type === 'button' || child.type === 'a') || child.props.type === 'button' || child.props.type === 'submit') {
                    let classes = child.props.className;
                    let myarr;
                    if (classes != undefined) {
                        myarr = classes.split(' ');
                    }

                    for (let i in myarr) {
                        if (myarr[i] === 'pnkvalidatesubmit') {
                            this.controlmode = this.props.formmode;
                            // console.log('controlmode == ' + this.controlmode);
                            childProps = {
                                // style: style,
                                // disabled: true,
                                onClick: this.HandleSubmit
                            };
                        }
                    }


                }else if ((child.type === 'input') || ((child.type === 'textarea'))) {
                    /*console.log('@@');
                    console.log(child);
                    console.log('##');*/
                    if (typeof (child.props.onBlur) != 'undefined') {

                        if (child.props.pnkvalue != undefined && child.props.value == '') {
                            // myvalue = child.props.pnkvalue;
                            // console.log('value in render if = '+child.props.value);
                            // console.log('id in render if = '+child.props.id);
                            // console.log('pnkvalue in render if = '+child.props.pnkvalue);
                            childProps = {
                                value: child.props.pnkvalue,
                                onFocus: child.props.onBlur,
                                onChange: child.props.onBlur
                                /*onChange(event) {
                                    that.HandleUserInput(event);
                                    child.props.onBlur(event);
                                }*/
                            }
                            // console.log('my if '+child.props.pnkvalue);
                        } else {
                            // console.log('value in render else = '+child.props.value);
                            // console.log('id in render else = '+child.props.id);
                            // console.log('pnkvalue in render else = '+child.props.pnkvalue);
                            // myvalue = child.value;
                            childProps = {
                                value: child.value,
                                onChange: this.HandleUserInputOnChange
                            }
                        }
                        /*
                        childProps = {
                            // value: child.value,
                            onChange: this.HandleUserInputOnChange
                            /!*onBlur(event) {
                                event.preventDefault()
                            }*!/
                        };*/
                    }else {
                        // console.log('in else ');
                        // console.log(child);
                    }
                }else if (typeof (child.props.inputProps) != 'undefined') {
                    // console.log(child);
                    // console.log('input props');
                    // console.log('value = '+typeof (child.props.value));
                    // console.log(child.props.value);
                    // console.log(child.props.pnkvalidate);
                    // console.log(child.props.inputProps);
                    const that = this;
                    if (child.props.pnkvalue != undefined && child.props.value == '') {
                        // myvalue = child.props.pnkvalue;
                        // console.log('value in render if = '+child.props.value);
                        // console.log('id in render if = '+child.props.inputProps.id);
                        // console.log('pnkvalue in render if = '+child.props.pnkvalue);
                        childProps = {
                            value: child.props.pnkvalue,
                            onChange: child.props.onChange
                            // onChange: child.props.onBlur
                            /*onChange(event) {
                                that.HandleUserInput(event);
                                child.props.onBlur(event);
                            }*/
                        }
                        // console.log('my if '+child.props.pnkvalue);
                    } else {
                        // console.log('value in render else = '+child.props.value);
                        // console.log('@@@@@@@@@id in render else = '+child.props.inputProps.id);
                        // console.log('pnkvalue in render else = '+child.props.pnkvalue);
                        // myvalue = child.value;
                        childProps = {
                            // value: child.value,
                            onChange: child.props.onChange
                        }
                    }
                    /*childProps = {
                        // value: child.props.value,
                        // pnkvalidate: child.props.inputProps.pnkvalidate,
                        // pnkdisplayerrormsg: child.props.inputProps.pnkdisplayerrormsg,
                        // onBlur: this.HandleUserInput,
                        // onChange: this.HandleUserInput
                        onChange(event) {
                            that.HandleUserInput(event);
                            child.props.onChange(event);

                        },
                        /!*onBlur(event) {
                            that.HandleUserInput(event);
                            child.props.onChange(event);

                        }*!/*/
                } else if (typeof (child.type) == 'function' && child.type.name == 'PnkImage') {

                    /*myeventobj = {id: 'fupUploadedFile', value: child.props.value, whethererror: checkerror};
                    this.HandleChangeValue(myeventobj);*/
                    // console.log('in pnk image');
                    // console.log(child.props.pnkvalidate);
                    // console.log(child);

                    let that = this;
                    if (child.props.pnkvalue != undefined && (child.props.value != '' || child.props.value == undefined )) {
                        // myvalue = child.props.pnkvalue;
                        // console.log('value in render if = '+child.props.value);
                        // console.log('id in render if = '+child.props.id);
                        // console.log('pnkvalue in render if image = '+child.props.pnkvalue);
                        // console.log('value in render if image = '+child.props.value);
                        childProps = {
                            value: child.props.pnkvalue,
                            validateevent: this.HandleUserInputOnChange,
                            onchangeevent: child.props.onChange
                            // onchangeevent: child.props.onChange
                            /*onClick(event) {
                                that.HandleUserInputOnChange(event);
                                child.props.onChange(event);
                            }*/
                            /*onchangeevent: child.props.onChange,
                            validateevent: this.HandleUserInputOnChange*/
                            // onChange: child.props.onBlur
                            /*onChange(event) {
                                that.HandleUserInput(event);
                                child.props.onBlur(event);
                            }*/
                        }
                        // console.log('my if '+child.props.pnkvalue);
                    } else {
                        // console.log('value in render else = '+child.props.value);
                        // console.log('id in render else = '+child.props.id);
                        // console.log('pnkvalue in render else = '+child.props.pnkvalue);
                        // myvalue = child.value;
                        // console.log('pnkvalue in render else image = '+child.props.pnkvalue);
                        // console.log('value in render else image = '+child.props.value);
                        childProps = {
                            value: child.value,
                            validateevent: this.HandleUserInputOnChange,
                            onchangeevent: child.props.onChange
                            // onClick:this.HandleUserInputOnChange
                            /*onClick(event) {
                                that.HandleUserInputOnChange(event);
                            }*/
                            /*validateevent: this.HandleUserInputOnChange,
                            onchangeevent: child.props.onChange*/
                        }
                    }
                    /*childProps = {
                        /!*onClick(event) {
                            that.HandleUserInput(event);
                            child.props.onChange(event);

                        }*!/
                        validateevent: this.HandleUserInputOnChange,
                        onchangeevent: child.props.onChange
                    }*/
                }

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
