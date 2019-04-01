import React from "react";
import {importAll} from "../util/general-util";
import {Button, ButtonGroup, Divider} from "@blueprintjs/core";
import ScrollableItems from "./ScrollableItems";
import ImageItem from "./item-types/ImageItem";
import axios from 'axios';
var aws = require('aws-sdk');
aws.config.setPromisesDependency();
aws.config.update({
    region: 'us-east-1', // Put your aws region here
    accessKeyId: 'AKIAJJ443S62P4KO7BIQ' ,
    secretAccessKey: 'N8sR7BCC6WfIGxY43cwPMsD3zIQVuKqwK0gFutsM'
});
var imageListURL = [];
var imageListKeys = [];

class ImageItemDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            success : false,
            url : "",
            error: false,
            errorMessage : ""
        };

        this.getImages = this.getImages.bind(this);
        this.selectType = this.selectType.bind(this);
    }
///////////

    handleChange = (ev) => {
        this.setState({success: false, url : ""});

    }
    handleUpload = (ev) => {
        let file = this.uploadInput.files[0];
        // Split the filename to get the name and type
        let fileParts = this.uploadInput.files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        axios.post("http://localhost:3001/sign_s3",{
            fileName : fileName,
            fileType : fileType
        })
            .then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                this.setState({url: url})
                console.log("Recieved a signed request " + signedRequest);

                var options = {
                    headers: {
                        'Content-Type': fileType
                    }
                };
                axios.put(signedRequest,file,options)
                    .then(result => {
                        console.log("Response from s3")
                        this.setState({success: true});
                    })
                    .catch(error => {
                        alert("ERROR " + JSON.stringify(error));
                    })
            })
            .catch(error => {
                alert(JSON.stringify(error));
            })
    }

    //Trying to display the images here
    getImages() {
        var bucketContents
        aws.config.update({accessKeyId: 'AKIAJJ443S62P4KO7BIQ', secretAccessKey: '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', region: 'us-east-1'});
        var s3 = new aws.S3();

        var params = {
            Bucket: 'michaelverwaayen1'
        }
        s3.listObjects(params,function(err,data) {
            if(err) console.log(err,err.stack)
            else
            {

                bucketContents = data.Contents;
                for(var i = 0; i < bucketContents.length;i++){
                    var urlParams = {Bucket: 'michaelverwaayen1', Key: bucketContents[i].Key};
                    s3.getSignedUrl('getObject', urlParams,function(err,url){
                       // console.log(url);

                        imageListURL.push(url);
                       // console.log(imageListURL);

                    });
                }
                imageListKeys.push(data.Contents);
                console.log("START OF KEYS LIST:",imageListKeys , "END OF KEYS LIST");
            }
        })
/*
        return this.state.imageListURL.map(item => {
            return (
                <div>
                    <img src={ item } />
                </div>
            );
        })
        //This needs changing to AWS?
   /*
        const images = importAll(bucketContents, this.state.activeType);
        //HMMMMMMMH
        return Object.keys(images).map((key) => {
            return (
                <ImageItem
                    id={key}
                    key={key}
                    src={images[key]}
                    isOnCanvas={false}
                    initData={{
                        src: images[key]
                    }}
                />
            )
        }); */
    }
    selectType(key) {
        this.setState({activeType: key})
    }

    render() {
        //IMAGE UPLOAD YES OR NO???????
        const Success_message = () => (
            <div style={{padding:5}}>
                <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
                <br/>
            </div>
        )
        const Error_message = () => (
            <div style={{padding:50}}>
                <h3 style={{color: 'red'}}>FAILED UPLOAD</h3>
                <span style={{color: 'red', backgroundColor: 'black'}}>ERROR: </span>
                <span>{this.state.errorMessage}</span>
                <br/>
            </div>
        )

        return (

            <div className={'image-detail'}>
                <div classNAme = {'upload-image'}>
                    {this.state.success ? <Success_message/> : null}
                    {this.state.error ? <Error_message/> : null}
                    <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                    <br/>
                    <button onClick={this.handleUpload}>UPLOAD</button>
                </div>
                <Divider vertical={'true'}/>
                <ScrollableItems>
                    {this.getImages()}
                </ScrollableItems>
            </div>
        )
    };
}

export default ImageItemDetail