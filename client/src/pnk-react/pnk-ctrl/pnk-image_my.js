import React, { Component } from 'react';
import axios from 'axios';
import FormData from 'form-data';
//  import {FileUpload} from 'file-upload-react';
//  const FileUpload = require('react-fileupload');
// var FileReader = require('filereader')
export default class PnkImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            imagePreviewUrl: ""
        }
        this.file = null;
    }

    fileChangedHandler = (event) => {
        let file = document.getElementById('file').files[0];
        // let file = event.target.files[0];
         this.file = file;
        this.setState({
            selectedFile: file
        });
    }

    uploadHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (this.state.selectedFile !={}) {
            formData.append('file', this.file,this.file.name);
             alert("FORM"+JSON.stringify(this.state.selectedFile.name))
              alert("FORfile"+JSON.stringify(this.file))
            axios.post('http://localhost/shweta/one.php', {
                //uploadImage: { fileName: this.state.selectedFile.name, fileObj: this.file },
                formData: formData
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    render() {

        return (
            <div>
                <form action="." enctype="multipart/form-data" method="post"> 
                    <img src={this.state.imagePreviewUrl} id="previewImage" height="100px" />
                    <input type="file" id="file" name="file" onChange={this.fileChangedHandler} />
                    <input type="submit" onClick={this.uploadHandler} value="Upload!" />
                </form>
            </div>
        );
    }
}

