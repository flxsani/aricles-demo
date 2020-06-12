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
        //let file = document.getElementById('file').files[0];
         let file = event.target.files[0];
		console.log('hi '+file);
		 //var file = document.getElementById('myFile').files[0];
    
         this.file = file;
      //  this.setState({
        //    selectedFile: file
        //});
    }

    uploadHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
            //formData.append('file', this.file,this.file.name);
         
              //console.log("FORfile"+JSON.stringify(this.file))
			  const k = this.file;
			 if (k) {
        // create reader
        var reader = new FileReader();
        reader.readAsText(this.file);
        reader.onload = function(e) {
            // browser completed reading file - display it
            alert(e.target.result);
			 axios.post('http://localhost/shweta/one.php',

			 {uploadFile: { fileName: k.name, fileObj: e.target.result }},
			 {
			 headers: {
			
					//'Content-Type': 'application/x-www-form-urlencoded'
					//'Content-Type':'multipart/form-data',
					//"Content-length": e.target.result.length
				}
			}
				
                //formData: formData
            )
                .then(function (response) {
                    console.log("SERVER RESP"+response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
    } 
           
        
    }

    render() {

        return (
            <div>
                <form  encType="multipart/form-data" method="post"> 
                    //<img src={this.state.imagePreviewUrl} id="previewImage" height="100px" />
                    <input type="file" id="myfile" name="myfile" onChange={this.fileChangedHandler} />
                    <input type="submit" onClick={this.uploadHandler} value="Upload!" />
                </form>
            </div>
        );
    }
}

