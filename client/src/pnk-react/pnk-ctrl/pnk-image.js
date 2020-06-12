import React, {Component} from 'react';
import axios from 'axios';
import {pnkstore} from "../../stores/pnk-store";
//pnkstore.api.baseurl + "/" + url
// import './pnkimage.css';
// import FormData from 'form-data';
//  import {FileUpload} from 'file-upload-react';
//  const FileUpload = require('react-fileupload');
// var FileReader = require('filereader')
export default class PnkImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // selectedFile: null,
            // imagePreviewUrl: "",
            progressCompleted: 0
        }
        // this.serverPath = "http://ec2-18-219-200-46.us-east-2.compute.amazonaws.com:3000/";
        this.serverPath = pnkstore.api.baseurl + "/";
        // this.serverPath = "http://localhost:3000/";
        this.file = null;
        this.buttonStyle = this.props.buttonStyle;
        this.count = 0;
        this.destinationFolder = (this.props.destinationFolder && this.props.destinationFolder != "") ? this.props.destinationFolder : "application/public/uploads";
        this.pnkvalidate = (this.props.pnkvalidate && this.props.pnkvalidate != "") ? this.props.pnkvalidate : "";
        this.pnkvalue = (this.props.pnkvalue ) ? this.props.pnkvalue : "";
        this.id = this.props.id ? this.props.id : "fupUploadedFile";
        this.name = this.props.name ? this.props.name : "fupUploadedFile";
        this.pnkdisplayerrormsg = (this.props.pnkdisplayerrormsg && this.props.pnkdisplayerrormsg != "") ? this.props.pnkdisplayerrormsg : "";
        this.enctype = (this.props.enctype && this.props.enctype != "") ? this.props.enctype : "";
        this.btnPreviewText = (this.props.btnPreviewText && this.props.btnPreviewText != "") ? this.props.btnPreviewText : "Select Some Files";
        this.allowedTypeStr = (this.props.allowedTypeStr && this.props.allowedTypeStr != "") ? this.props.allowedTypeStr : "jpg,png";
        this.multiple = (this.props.multiple && this.props.multiple != "") ? this.props.multiple : "false";
        this.limitFiles = (this.props.limitFiles && this.props.limitFiles != "") ? this.props.limitFiles : 20;
        this.previewImageSrc = (this.props.previewImageSrc && this.props.previewImageSrc != "") ? this.props.previewImageSrc : "";
        /*this.props.validateevent(event);
        this.props.onchangeevent(event);*/
        // this.gotovalidation()
    }

    componentDidMount = () => {
        if (this.multiple == "true") {
            document.getElementById('myfile').setAttribute('multiple', '');
        }
        var fileSelect = document.getElementById("fileSelect"),
            myfile = document.getElementById("myfile");

        fileSelect.addEventListener("click", function (e) {
            e.preventDefault();
            if (myfile) {
                myfile.click();
            }
        }, false);

        /*********************For Edit Mode************************* */
        if (this.previewImageSrc != "") {
            var str_array = this.previewImageSrc.split(',');
            for (var i = 0; i < str_array.length; i++) {
                // alert(str_array[i]);
                // Trim the excess whitespace.
                str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
                // Add additional code here, such as:

                var div = document.createElement("div");
                div.classList.add("col-md-4 col-xs-12");
                div.setAttribute('style', 'margin-bottom: 10px;height: 130px;');
                div.setAttribute('id', 'divOuter_' + str_array[i]);
                var img = document.createElement("img");
                var x = document.createElement("input");
                var editBtn = document.createElement("input");
                x.setAttribute('style', 'top:-40px;position: relative;right: 22px;background: black;color: white;');
                editBtn.setAttribute('style', 'top:-40px;position: relative;left: 22px;background: black;color: white;');
                img.setAttribute('style', 'margin-bottom: 10px;height: 83px;border: 2px solid darkblue;width:90px;');
                img.setAttribute('id', 'editImg_' + str_array[i]);
                img.setAttribute('title', str_array[i]);
                var p = document.createElement("p");
                p.classList.add('fileName');
                p.setAttribute('title', str_array[i]);
                p.setAttribute('style', 'white-space:nowrap;width: 100%;overflow: hidden;text-overflow:ellipsis;');
                var content = "";
                if (str_array[i])
                    content = document.createTextNode(str_array[i]);
                else
                    content = "not find";
                p.appendChild(content);
                x.setAttribute("type", "button");
                x.setAttribute("value", "x");
                x.setAttribute("title", str_array[i]);
                editBtn.setAttribute("type", "button");
                editBtn.setAttribute("value", "edit");
                editBtn.setAttribute("title", str_array[i]);
                const that = this;
                var myFileName = str_array[i];
                x.addEventListener("click", function (e) {
                    that.RemoveUploadedFile(e);
                });
                editBtn.addEventListener("click", function (e) {
                    document.getElementById('currentChangingImage').textContent = e.target.title;
                    that.ChangeUploadedFile(e);
                });

                div.appendChild(editBtn);
                div.appendChild(img);
                // div.appendChild(br);
                div.appendChild(x);
                div.appendChild(p);

                // img.style.height = '100px';
                // img.classList.add("obj");

                var xhr = new XMLHttpRequest();
                xhr.open("GET", this.serverPath + 'checkfile/' + myFileName, false);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var resp = JSON.parse(xhr.responseText);
                        // alert(resp.response);
                        if (resp.response == true) {


                            var ext = myFileName.substring(myFileName.lastIndexOf('.') + 1);

                            if (ext == "pdf") {
                                img.src = require('./img/pdf.png');
                            }
                            else if (ext == "jpg" || ext == "png" || ext == "JPEG" || ext == "JPG" || ext == "PNG" || ext == "JPEG") {
                                img.src = resp.path;
                            }
                            else {
                                img.src = require('./img/file.png');
                            }
                        }
                        else {
                            img.src = require('./img/notfound.png');
                        }


                        document.getElementById('previewDiv').appendChild(div);
                    }
                    else {
                    }
                };
                xhr.send();


            }
        }
    }

    fileChangedHandler = (event) => {
        var numFiles;
        //let file = document.getElementById('file').files[0];
        //alert("Before Count" + this.count);
        this.count = event.target.files.length;
        //alert("Count" + this.count);
        //alert("Leng" + event.target.files.length);
        if (this.count <= this.limitFiles && event.target.files.length <= this.limitFiles) {
            for (var i = 0, numFiles = event.target.files.length; i < numFiles; i++) {
                var file = event.target.files[i];
                this.file = file;
                //alert(this.allowedTypeStr);
                if (this.FileValidation(file, this.allowedTypeStr)) {
                    this.count++;
                    // alert(this.count);
                    var div = document.createElement("div");
                    div.setAttribute('class', "col-md-4 col-xs-12 divUploadFile");
                    div.setAttribute('style', 'margin-bottom: 10px;height: 130px;');
                    var img = document.createElement("img");
                    var x = document.createElement("input");
                    x.setAttribute('style', 'top:-40px;position: relative;right: 22px;background: black;color: white;');
                    img.setAttribute('style', 'margin-bottom: 10px;height: 83px;border: 2px solid darkblue;width:90px;');

                    var p = document.createElement("p");
                    p.classList.add('fileName');
                    p.setAttribute('title', file.name);
                    p.setAttribute('style', 'white-space:nowrap;width: 100%;overflow: hidden;text-overflow:ellipsis;');
                    var content = "";
                    if (file.name)
                        content = document.createTextNode(file.name);
                    else
                        content = "not find";
                    p.appendChild(content);
                    x.setAttribute("type", "button");
                    x.setAttribute("value", "x");
                    x.setAttribute("title", file.name);
                    const that = this;
                    x.addEventListener("click", function (e) {
                        that.RemoveUploadedFile(e);
                    });
                    div.appendChild(img);
                    // div.appendChild(br);
                    div.appendChild(x);
                    div.appendChild(p);

                    // img.style.height = '100px';
                    img.classList.add("obj");
                    img.file = file;
                    var progressDiv = document.createElement("div");
                    progressDiv.classList.add('progress');
                    document.getElementById('currentFileName').innerText = file.name;
                    progressDiv.innerHTML += '<div id="progress_' + file.name + '" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0%">';
                    progressDiv.innerHTML += ' </div>';

                    div.appendChild(progressDiv);
                    document.getElementById('previewDiv').appendChild(div); // Assuming that "preview" is the div output where the content will be displayed.

                    var reader = new FileReader();
                    reader.onload = (function (aImg) {
                        return function (e) {
                            //alert(file.type);
                            if (file.type.startsWith('application/pdf')) {
                                aImg.src = require('./img/pdf.png');
                            }
                            else if (file.type.startsWith('image/')) {
                                aImg.src = e.target.result;

                            }
                            else {
                                aImg.src = require('./img/file.png');
                            }


                        };
                    })(img);

                    reader.readAsDataURL(file);
                    this.uploadHandler(event);
                }
                else {

                }
            }
        }
        else {
            alert("You can upload Maximum " + this.limitFiles + " files");
        }

    }
    changeCurrentFileHandler = (event) => {
        var oldimage_name = document.getElementById('currentChangingImage').textContent;
        var file = event.target.files[0];
        this.file = file;
        if (this.FileValidation(file, this.allowedTypeStr)) {
            var div = document.createElement("div");
            div.classList.add("col-md-4 col-xs-12");
            div.setAttribute('style', 'margin-bottom: 10px;height: 130px;');
            var img = document.createElement("img");
            var x = document.createElement("input");
            x.setAttribute('style', 'top:-40px;position: relative;right: 22px;background: black;color: white;');
            img.setAttribute('style', 'margin-bottom: 10px;height: 83px;border: 2px solid darkblue;width:90px;');

            var p = document.createElement("p");
            p.classList.add('fileName');
            p.setAttribute('title', file.name);
            p.setAttribute('style', 'white-space:nowrap;width: 100%;overflow: hidden;text-overflow:ellipsis;');
            var content = "";
            if (file.name)
                content = document.createTextNode(file.name);
            else
                content = "not find";
            p.appendChild(content);
            x.setAttribute("type", "button");
            x.setAttribute("value", "x");
            x.setAttribute("title", file.name);
            const that = this;
            x.addEventListener("click", function (e) {
                that.RemoveUploadedFile(e);
            });
            div.appendChild(img);
            // div.appendChild(br);
            div.appendChild(x);
            div.appendChild(p);

            // img.style.height = '100px';
            img.classList.add("obj");
            img.file = file;
            var progressDiv = document.createElement("div");
            progressDiv.classList.add('progress');
            document.getElementById('currentFileName').innerText = file.name;
            progressDiv.innerHTML += '<div id="progress_' + file.name + '" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0%">';
            progressDiv.innerHTML += ' </div>';

            div.appendChild(progressDiv);
            //document.getElementById('previewDiv').appendChild(div); // Assuming that "preview" is the div output where the content will be displayed.
            var outerDiv = document.getElementById('divOuter_' + oldimage_name);
            outerDiv.replaceWith(div);
            var reader = new FileReader();
            reader.onload = (function (aImg) {
                return function (e) {
                    //alert(file.type);
                    if (file.type.startsWith('application/pdf')) {
                        aImg.src = require('./img/pdf.png');
                    }
                    else if (file.type.startsWith('image/')) {
                        aImg.src = e.target.result;

                    }
                    else {
                        aImg.src = require('./img/file.png');
                    }


                };
            })(img);

            reader.readAsDataURL(file);
            this.uploadHandler(event);
        }
        else {

        }
    }

    changeCurrentFileHandler1 = (event) => {
        var file = event.target.files[0];
        this.file = file;
        if (this.FileValidation(file, this.allowedTypeStr)) {
            alert(file.name);
            var image = document.getElementById('editImg_' + file.name);
            var div = document.createElement('div');
            var progressDiv = document.createElement("div");
            progressDiv.classList.add('progress');
            document.getElementById('currentFileName').innerText = file.name;
            progressDiv.innerHTML += '<div id="progress_' + file.name + '" class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0%">';
            progressDiv.innerHTML += ' </div>';


            var oldimage = document.getElementById('currentChangingImage').textContent;
            alert("oldimage--" + document.getElementById('currentChangingImage').textContent);

            var img = document.createElement("img");
            img.setAttribute('style', 'margin-bottom: 10px;height: 83px;border: 2px solid darkblue;width:90px;');
            img.setAttribute('title', file.name);
            img.classList.add("obj");
            img.file = file;
            // document.getElementById('editImg_' + document.getElementById('currentChangingImage').textContent).setAttribute('src', file);
            // var img = document.getElementById('editImg_' + document.getElementById('currentChangingImage'));
            // img.setAttribute('class', "obj");
            // img.file = file;
            var reader = new FileReader();
            reader.onload = (function (aImg) {
                return function (e) {
                    //alert(file.type);
                    if (file.type.startsWith('application/pdf')) {
                        aImg.src = require('./img/pdf.png');
                    }
                    else if (file.type.startsWith('image/')) {
                        aImg.src = e.target.result;

                    }
                    else {
                        aImg.src = require('./img/file.png');
                    }


                };
            })(img);
            div.appendChild(img);
            div.appendChild(progressDiv);
            reader.readAsDataURL(file);

            var html = '<div class="col-md-4 col-xs-12" style="margin-bottom: 10px;height: 130px;" id="divOuter_' + file.name + '"><input style="top:-40px;position: relative;left: 22px;background: black;color: white;" type="button" value="edit" title="' + file.name + '">' + img + '<input style="top:-40px;position: relative;right: 22px;background: black;color: white;" type="button" value="x" title="' + file.name + '"><p class="fileName" title="' + file.name + '" style="white-space:nowrap;width: 100%;overflow: hidden;text-overflow:ellipsis;">' + file.name + '</p></div>';


            //      var A = document.getElementById('editImg_' + document.getElementById('currentChangingImage').textContent);
            var A = document.getElementById('divOuter_' + oldimage);
            A.replaceWith(html);
            this.uploadHandler(event);
        }

    }
    RemoveUploadedFile = (e) => {
        var selectedFileName = e.target.title;
        var destinationPath = e.target.name;
        var r = window.confirm("Are you sure you want to delete this Image?")
        if (r == true) {
            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            fd.append('destinationPath', destinationPath);
            xhr.open("POST", this.serverPath + 'removeupload/' + selectedFileName, false);
            let that = this;
            xhr.onreadystatechange = function () {
                // alert(JSON.stringify(xhr));
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var uploadedFile = document.getElementById(that.id).value;
                    uploadedFile = uploadedFile.trim(',');
                    var uploadedFileArray = uploadedFile.split(',');
                    var remainingFile = "";
                    for (var i = 0; i < uploadedFileArray.length; i++) {
                        //alert(uploadedFileArray[i]+"$$$$$$$$$$$$$$$$$$"+selectedFileName);
                        if (uploadedFileArray[i] === selectedFileName) {

                        }
                        else {
                            remainingFile += uploadedFileArray[i] + ",";
                        }
                    }
                    remainingFile = remainingFile.replace(/(^[,\s]+)|([,\s]+$)/g, '');
                    document.getElementById(that.id).value = remainingFile;
                    document.getElementById(that.id).click();
                    // document.getElementById('fupUploadedFile').onchange();
                    //do what you want with the image name returned
                    //e.g update the interface

                }
                else {
                    // alert("Server Error...");
                    // var currentFileName = document.getElementById('currentFileName').innerText;
                    // var progressBar = document.getElementById('progress_' + currentFileName);
                    // // progressBar.style.width = "100%";
                    // progressBar.textContent = 'Failed Removing from the Server !';
                    // progressBar.setAttribute('class', 'progress-bar progress-bar-danger progress-bar-striped active');

                }
                e.target.closest('div').remove();
            };
            xhr.send(fd);
        }
    }
    ChangeUploadedFile = (e) => {
        var selectedFileName = e.target.title;
        // var src = image.getAttribute('src');
        // alert("hhh" + src);
        var changeCurrentfile = document.getElementById("changeCurrentfile");
        e.target.addEventListener("click", function (e) {
            e.preventDefault();
            if (changeCurrentfile) {
                changeCurrentfile.click();
            }
        }, false);
        // var xhr = new XMLHttpRequest();
        // xhr.open("GET", this.serverPath + 'changeupload/' + selectedFileName, false);
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         alert(xhr.responseText);
        //     }
        // };
        // xhr.send();
    }
    uploadHandler = (e) => {
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', this.serverPath + 'uploadfile', true);
        //  xhr.setRequestHeader("Content-Type", "multipart/form-data");
        // xhr.setRequestHeader("Content-Type", "text/plain");
        const that = this;
        xhr.onreadystatechange = function () {
            //alert(JSON.stringify(xhr));
            if (xhr.readyState == 4 && xhr.status == 200) {
                var resp = JSON.parse(xhr.responseText);
                //alert(resp.response);
                if (resp.response == true) {
                    var imageName = resp.fileName;
                    // document.getElementById('fupUploadedFile').addEventListener('change',that.props.validateevent);

                    document.getElementById(that.id).value += resp.fileName + ",";
                    // document.getElementById('fupUploadedFile').onchange();
                    document.getElementById(that.id).click();
                    var lastdiv = document.getElementById('previewDiv').querySelector('.divUploadFile:last-child');
                    var lastdiv = lastdiv.querySelector('input');
                    lastdiv.setAttribute('title', imageName);
                    lastdiv.setAttribute('name', that.destinationFolder);
                }
                else {
                    // alert(JSON.stringify(resp))
                    var currentFileName = document.getElementById('currentFileName').innerText;
                    var progressBar = document.getElementById('progress_' + currentFileName);
                    progressBar.textContent = 'Failed Uploading to the Server !';
                    progressBar.setAttribute('class', 'progress-bar progress-bar-danger progress-bar-striped active');
                }
                //do what you want with the image name returned
                //e.g update the interface
            }
            // else if (JSON.stringify(xhr) === '{}') {
            //     alert("Server Error...");

            // }
        };
        xhr.upload.addEventListener('progress', function (e) {
            // console.log(Math.ceil(e.loaded / e.total) * 100 + '%');
            var currentFileName = document.getElementById('currentFileName').innerText;
            var progressBar = document.getElementById('progress_' + currentFileName);
            progressBar.style.width = Math.ceil(e.loaded / e.total) * 100 + '%';
            if (isNaN(e.loaded / e.total)) {
                progressBar.style.width = "100%";
                progressBar.textContent = 'Failed Uploading to the Server !';
                progressBar.setAttribute('class', 'progress-bar progress-bar-danger progress-bar-striped active');
            }
            else {

                progressBar.textContent = Math.ceil(e.loaded / e.total) * 100 + '%' + " Completed";
                progressBar.setAttribute('aria-valuenow', Math.ceil(e.loaded / e.total) * 100 + '%');
            }

            if (progressBar && progressBar.style.width === "100%") {
                //progressBar.setAttribute('style', 'display:none');
            }
        }, false);
        fd.append("myFile", this.file, this.file.Name);
        fd.append("destination", this.destinationFolder);
        xhr.send(fd);

    }

    UpdateProgressBarValue = (pe) => {
        alert(pe);
    }

    FileValidation = (file, allowedTypeStr) => {
        if (file.name && file.name != undefined) {
            let ext = file.name.substring(file.name.lastIndexOf('.') + 1);
            var re = new RegExp(ext, 'gi');
            if (allowedTypeStr.search(re) == -1) {
                alert("Allowed File Types are: " + this.allowedTypeStr);
                return false;
            }
        }
        if (file.size && file.size > 1048576) {
            alert("Document size should be less than 1MB !");
            return false;
        }
        return true;
    }
    HandleImageChangeValue = (e) => {
        if(this.props.validateevent(e)){
            this.props.onchangeevent(e)
        }else {
            console.log('in pnk image else part.');
        }
    }

    render() {

        return (
            <div>
                <div style={{border: '1px solid black', padding: '20px'}}>
                    {/*<form encType="multipart/mixed" method="post" id="frmUpload">*/}
                    {/*<form encType="multipart/form-data" method="post" id="frmUpload">*/}
                    <div id="previewDiv" class="row"></div>
                    <div style={{display: 'none'}} id="currentFileName"></div>
                    <div style={{display: 'none'}} id="currentChangingImage"></div>
                    {/*<img src={this.state.imagePreviewUrl} id="previewImage" height="100px" />*/}
                    <input style={{display: 'none'}} type="file"
                           accept="file_extension|audio/*|video/*|image/*|media_type" id="myfile" name="myfile"
                           onChange={this.fileChangedHandler}/>
                    <input style={{display: 'none'}} type="file" id="changeCurrentfile" name="changeCurrentfile"
                           onChange={this.changeCurrentFileHandler}/>
                    <br/>
                    <button style={this.buttonStyle} id="fileSelect">{this.btnPreviewText}</button>
                    {/*<input type="hidden" id="fupUploadedFile" name="fupUploadedFile" value='' />*/}
                    {this.pnkvalue ?
                        <input type="hidden" onClick={this.HandleImageChangeValue} pnkvalidate={this.pnkvalidate} pnkdisplayerrormsg={this.pnkdisplayerrormsg} id={this.id}
                               name={this.name} value={this.props.pnkvalue}/>
                        :
                        <input type="hidden" onClick={this.HandleImageChangeValue} pnkvalidate={this.pnkvalidate} pnkdisplayerrormsg={this.pnkdisplayerrormsg} id={this.id}
                               name={this.name} />
                    }

                    {/*<input type="hidden" pnkvalidate={this.pnkvalidate} pnkdisplayerrormsg={this.pnkdisplayerrormsg} id={this.id}
                           name={this.name} value={this.pnkvalue}/>*/}
                    {/*<input type="hidden" onClick={this.props.validateevent} pnkvalidate={this.pnkvalidate} pnkdisplayerrormsg={this.pnkdisplayerrormsg} id="fupUploadedFile" name="fupUploadedFile" value='' />*/}

                    {/*</form>*/}
                </div>
            </div>
        );
    }
}

