import React, { Component } from 'react';
import axios from 'axios';
export default class PnkImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progressCompleted: 0
        }
        this.file = null;
        this.buttonStyle = this.props.buttonStyle;
        this.count = 0;
        this.allowedTypeStr = (this.props.allowedTypeStr && this.props.allowedTypeStr != "") ? this.props.allowedTypeStr : "jpg,png";
        this.multiple = (this.props.multiple && this.props.multiple != "") ? this.props.multiple : "false";
        this.limitFiles = (this.props.limitFiles && this.props.limitFiles != "") ? this.props.limitFiles : 20;
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
                    // var div = document.createElement("div");
                    // div.classList.add("col-md-4");
                    // div.setAttribute('style', 'margin-bottom: 10px;height: 130px;');
                    // var img = document.createElement("img");
                    // var x = document.createElement("input");
                    // x.setAttribute('style', 'top:-40px;position: relative;right: 22px;background: black;color: white;');
                    // img.setAttribute('style', 'margin-bottom: 10px;height: 83px;border: 2px solid darkblue;width:90px;');
                    // var p = document.createElement("p");
                    // p.classList.add('fileName');
                    // p.setAttribute('title', file.name);
                    // p.setAttribute('style', 'white-space:nowrap;width: 100%;overflow: hidden;text-overflow:ellipsis;');
                    // var content = "";
                    // if (file.name)
                    //     content = document.createTextNode(file.name);
                    // else
                    //     content = "not find";
                    // p.appendChild(content);
                    // x.setAttribute("type", "button");
                    // x.setAttribute("value", "x");
                    // const that = this;
                    // x.addEventListener("click", function (e) {
                    //     that.RemoveUploadedFile(e, file.name);
                    // });
                    // div.appendChild(img);
                    // // div.appendChild(br);
                    // div.appendChild(x);
                    // div.appendChild(p);

                    // // img.style.height = '100px';
                    // img.classList.add("obj");
                    // img.file = file;
                    // var progressDiv = document.createElement("div");
                    // progressDiv.classList.add('progress');
                    // document.getElementById('currentFileName').innerText = file.name;
                    // progressDiv.innerHTML += '<div id="progress_' + file.name + '" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="100" style="width: 0%">';
                    // progressDiv.innerHTML += ' </div>';

                    // div.appendChild(progressDiv);
                    var div  = '<div class="col-md-8" style="border: 1px solid black; padding: 5px; margin: 5px;"><div class="col-md-7 text-uppercase"><span class="pull-left">'+file.name+'</span><span class="pull-left">('+file.size+')</span></div><div class="col-md-4"><div class=""><div id="progress_'+file.name+'" class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="" aria-valuemin="0" aria-valuemax="" style="width: 0%;"></div></div></div><div class="col-md-1"><span style="padding: 2px 7px; cursor: pointer; border-radius: 50%; background: black; color: rgb(255, 255, 255);">X</span></div></div>'

                    document.getElementById('previewDiv').innerHTML = div; // Assuming that "preview" is the div output where the content will be displayed.

                    // var reader = new FileReader();
                    // reader.onload = (function (aImg) {
                    //     return function (e) {
                    //         //alert(file.type);
                    //         if (file.type.startsWith('application/pdf')) {
                    //             aImg.src = require('./img/pdf.png');
                    //         }
                    //         else if (file.type.startsWith('image/')) {
                    //             aImg.src = e.target.result;

                    //         }
                    //         else {
                    //             aImg.src = require('./img/file.png');
                    //         }


                    //     };
                    // })(img);

                    // reader.readAsDataURL(file);
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
    RemoveUploadedFile = (e, selectedFileName) => {
        var r = window.confirm("Are you sure you want to delete this Image?")
        if (r == true) {
            e.target.closest('div').remove();
            var xhr = new XMLHttpRequest();
            var fd = new FormData();
            xhr.open("GET", "http://localhost:4000/removeupload/" + selectedFileName, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert(xhr.responseText);
                    //do what you want with the image name returned
                    //e.g update the interface
                }
            };
            xhr.send();
        }
    }
    uploadHandler = (e) => {
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        xhr.open('POST', 'http://localhost:4000/sendupload', true);
        //  xhr.setRequestHeader("Content-Type", "multipart/form-data");
        // xhr.setRequestHeader("Content-Type", "text/plain");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var imageName = xhr.responseText;
                //do what you want with the image name returned
                //e.g update the interface
            }
        };
        xhr.upload.addEventListener('progress', function (e) {
            // console.log(Math.ceil(e.loaded / e.total) * 100 + '%');
            var currentFileName = document.getElementById('currentFileName').innerText;
            var progressBar = document.getElementById('progress_' + currentFileName);
            progressBar.style.width = Math.ceil(e.loaded / e.total) * 100 + '%';
            progressBar.textContent = Math.ceil(e.loaded / e.total) * 100 + '%' + " Completed";
            progressBar.setAttribute('aria-valuenow', Math.ceil(e.loaded / e.total) * 100 + '%');

            if (progressBar && progressBar.style.width === "100%") {
                //progressBar.setAttribute('style', 'display:none');
            }

        }, false);
        fd.append("myFile", this.file, this.file.Name);
        fd.append("name", 'shiva');
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
                // return false;
            }
        }
        if (file.size && file.size > 1048576) {
            alert("Document size should be less than 1MB !");
            //return false;
        }
        return true;
    }

    render() {

        return (
            <div>
                


                <div style={{ border: '1px solid black', padding: '20px' }}>
                    <form encType="multipart/form-data" method="post" id="frmUpload">
                        <div id="previewDiv" class="row"></div>
                        <div style={{ display: 'none' }} id="currentFileName"></div>
                        <input style={{ display: 'none' }} type="file" accept="file_extension|audio/*|video/*|image/*|media_type" id="myfile" name="myfile" onChange={this.fileChangedHandler} />
                        <br />
                        <button style={this.buttonStyle} id="fileSelect">Select some files</button>
                    </form>
                </div>
            </div >
        );
    }
}

