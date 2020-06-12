import React from 'react';

export class PnkValidate{
    constructor() {
        //  alert('in constructor');
        this.value = '';
        this.whitespace = " \t\n\r";

    }

    static abc(){
        return 20;
    }

    static ForceEntry = function(value, displayFieldName)  {
        //let strField = objField;
        if (this.isWhitespace(value)) {
            /*errorMessage = displayFieldName + " cannot be left blank";
            DisplayError(objField, errorMessage)
            objField.focus();
            objField.select();*/
            // alert(value+"in validate");
            return false;
        }
        //alert(value+"in validate true");
        return true;

    }


    static ForceImage = function(value,)  {
        //let strField = objField;
        if (value.length == 0) {
            /*errorMessage = displayFieldName + " cannot be left blank";
            DisplayError(objField, errorMessage)
            objField.focus();
            objField.select();*/
            return false;
        }
        return true;

    }

    static ForceNumber = function(value, displayFieldName){   //alert("hi");

        if (this.isWhitespace(value)) return true;

        let i = 0;

        for (i = 0; i < value.length; i++)
            if (value.charAt(i) < '0' || value.charAt(i) > '9') {
                // errorMessage = displayFieldName + " must be a valid numeric entry.  Please do not use commas or dollar signs or any non-numeric symbols.";
                // DisplayError(objField, errorMessage)
                // objField.focus();
                return false;
            }

        return true;

    }

    static isWhitespace = function(s) {
        // alert(s.length);
        let i;
        let whitespace = " \t\n\r";
        // Is s empty?
        if (this.isEmpty(s)) return true;

        // Search through string's characters one by one
        // until we find a non-whitespace character.
        // When we do, return false; if we don't, return true.

        for (i = 0; i < s.length; i++) {
            // Check that current character isn't whitespace.

            // alert(s.charAt(1));

            // if (s.charAt(0) === ' ') return false;
            // alert(s.charAt(0));
            let c = s.charAt(i);
            if (whitespace.indexOf(c) === -1) return false;
        }

        // All characters are whitespace.
        return true;
    }

    static ForceEmail = function(value) {

        if (!(this.isEmail(value))) {
            return false;
        }
        return true;

    }
    static isEmail = function(s) {

        // is s whitespace?
        if (this.isWhitespace(s)) return false;

        // there must be >= 1 character before @, so we
        // start looking at character position 1
        // (i.e. second character)
        let i = 1;
        let sLength = s.length;

        // look for @
        while ((i < sLength) && (s.charAt(i) != "@")) {
            i++
        }

        if ((i >= sLength) || (s.charAt(i) != "@")) return false;
        else i += 2;
        //alert("hi");
        // look for .
        while ((i < sLength) && (s.charAt(i) != ".")) {
            i++
        }

        // there must be at least one character after the .
        if ((i >= sLength - 1) || (s.charAt(i) != ".")) return false;
        else return true;
    }

    static isEmpty = function(s) {
        return ((s == null) || (s.length == 0) || (s == ''))
    }

    static ForceRNumber = function(value)
    {
        if (this.ForceEntry(value))
        {
            if (this.ForceNumber(value))
                return true;
            else
                return false;
        }
        else
            return false;

    }

    static ForcePassword = function(value)
    {
        //alert("hi");
        let strPassField = value;
        if (this.isWhitespace(strPassField)) {
            /*errorMessage = displayFieldName + " cannot be left blank. Space Not Allowed";
            DisplayError(objField,errorMessage)
            objField.focus();
            objField.select();*/
            return false;
        }
        else {
            let len = strPassField.length;
            if(len>=6){
                return true;
            }
            else{
                return false;
            }
        }
    }

    static ForceCheckBox = function (status) {
        if(status === true )
            return true;
        else
            return false;

    }

    static ForceRadio = function (status) {
        if(status === true )
            return true;
        else
            return false;

    }

    static ForceGroupCheckbox = function (objField, displayFieldName)
    {
        /*//alert(displayFieldName);
        var strField = new String(objField.attr("flxgroup"));
        //alert(strField);
        var flag = false;
        $(":checkbox[flxgroup='" + strField + "']").each(function () {
            //alert($(this).prop("checked"));
            if ($(this).prop("checked") == true) {
                flag = true;
            }
        });
        if (flag==false) {
            // errorMessage = displayFieldName + "Please select atleast one option";
            // DisplayCheckBoxError(objField,errorMessage)
            // objField.focus();
            // objField.select();
            return false;
        }*/
        return true;
    }

    static ForceSelect = function (value) {
        // alert(value);
        if(value == -1){
            return false
        }else {
            return true;
        }
    }

    static ForceMobile = function(value)
    {
        for ( let i = 0; i < value.length; i++)
        {
            if (value.charAt(i) < '0' || value.charAt(i) > '9')
            {
                return false;
            }
            else if(/\s/g.test(value))
            {
                return false;
            }
            else if(value.length !=10)
            {

                return false;
            }
        }
        return true;

    }
    static ForceRMobile = function(value)
    {
        if (this.isWhitespace(value)) {
            /*errorMessage = displayFieldName + " cannot be left blank";
            DisplayError(objField, errorMessage)
            objField.focus();
            objField.select();*/
            // alert(value+"in validate");
            return false;
        }else {
            for ( let i = 0; i < value.length; i++)
            {
                if (value.charAt(i) < '0' || value.charAt(i) > '9')
                {
                    return false;
                }
                else if(/\s/g.test(value))
                {
                    return false;
                }
                else if(value.length !=10)
                {

                    return false;
                }
            }
            return true;
        }

    }
    static ForceFloat = function(strField) {
        let countminus = 0;
        let countplus = 0;
        let countpoint = 0;
        // let strField = new String(objField.val());

        if (this.isWhitespace(strField)) return true;

        let i = 0;

        for (i = 0; i < strField.length; i++) {
            //alert(strField.charAt(i));
            if ((strField.charAt(i) < '0' || strField.charAt(i) > '9') && strField.charAt(i) != '.' && strField.charAt(i) != '-' && strField.charAt(i) != '+') {
                /*errorMessage = displayFieldName + " must be a valid numeric entry. Allowed speciel characters are (+, -, .)";
                DisplayError(objField, errorMessage)
                objField.focus();*/
                return false;
            }
            else if (strField.charAt(i) == '-') {
                countminus = countminus + 1;
            }
            else if (strField.charAt(i) == '+') {
                countplus = countplus + 1;
            }
            else if (strField.charAt(i) == '.') {
                countpoint = countpoint + 1;
            }
        }
        //alert(countminus);
        if(countminus >1 || countplus >1 || countpoint> 1){
            /*errorMessage = "Any Symbol should be used only once";
            DisplayError(objField, errorMessage)
            objField.focus();*/
            return false;
        }
        else if(countminus >=1 && countplus >=1){
            /*errorMessage = "+ and - Symbol should not be used same time.";
            DisplayError(objField, errorMessage)
            objField.focus();*/
            return false;
        }
        else
        {
            return true;
        }
    }
    static ForceRFloat = function(strField,displayFieldName) {
        let countminus = 0;
        let countplus = 0;
        let countpoint = 0;
        // let strField = new String(objField.val());

        if (this.isWhitespace(strField)) {
            /*errorMessage = displayFieldName + " cannot be left blank. Space Not Allowed";
            DisplayError(objField, errorMessage)
            objField.focus();
            objField.select();*/
            return false;
        }

        let i = 0;

        for (i = 0; i < strField.length; i++) {
            //alert(strField.charAt(i));
            if ((strField.charAt(i) < '0' || strField.charAt(i) > '9') && strField.charAt(i) != '.' && strField.charAt(i) != '-' && strField.charAt(i) != '+') {
                /*errorMessage = displayFieldName + " must be a valid numeric entry. Allowed speciel characters are (+, -, .)";
                DisplayError(objField, errorMessage)
                objField.focus();*/
                return false;
            }
            else if (strField.charAt(i) == '-') {
                countminus = countminus + 1;
            }
            else if (strField.charAt(i) == '+') {
                countplus = countplus + 1;
            }
            else if (strField.charAt(i) == '.') {
                countpoint = countpoint + 1;
            }
        }
        //alert(countminus);
        if(countminus >1 || countplus >1 || countpoint> 1){
            /*errorMessage = "Any Symbol should be used only once";
            DisplayError(objField, errorMessage)
            objField.focus();*/
            return false;
        }
        else if(countminus >=1 && countplus >=1){
            /*errorMessage = "+ and - Symbol should not be used same time.";
            DisplayError(objField, errorMessage)
            objField.focus();*/
            return false;
        }
        else
        {
            return true;
        }
    }

}