import React from "react";
import {Button, Divider, Spinner} from "@blueprintjs/core";
import ScrollableItems from "./ScrollableItems";
import PropTypes from 'prop-types';
import ImageItem from "./item-types/ImageItem";

//states for the images 
class ImageItemDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isUploading: false
        };

        this.getImages = this.getImages.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.openImageSelector = this.openImageSelector.bind(this);
    }

    componentWillMount() {
        this.extractPanelData();
    }

    extractPanelData() {
        this.panelData = this.props.otPath
            .reduce((acc, key) => acc[key], this.props.otDoc.data);

        if (!this.panelData['images']) {
            const op = [...this.props.otPath, 'images', {i: {}}];
            this.props.otDoc.submitOp(op);
        }
    }
//makes add images 
    addImage(id, url) {
        const op = [...this.props.otPath, 'images', id, {i: {id: id, url: url}}];
        this.props.otDoc.submitOp(op);
    }
//allow user to upload to blurb
    uploadImage() {
        const input = document.querySelector('input[type="file"]');
        const data = new FormData();
        for (const file of input.files) {
            data.append('image',file,file.name)
        }

        this.setState({isUploading: true});

        fetch(`https://${process.env.REACT_APP_DATASERVICE}/upload`, {
            method: 'POST',
            body: data
        }).then((res) => {
            if (res.ok) {
                return res.json()
            } else {
                return Promise.reject('something went wrong!')
            }
        }).then((data) => {
            this.addImage(data.id, data.url);
        }).catch((err) => {
            alert('Failed to upload image');
            console.error(err);
        }).finally(() => {
            input.value = '';
            this.setState({isUploading: false})
        });
    }

    openImageSelector() {
        const input = document.querySelector('input[type="file"]');
        input.click();
    }
//display all images 
    getImages() {
        const images = this.panelData['images'];
        return Object.keys(images).map((key) => {
            const img = images[key];
            return (
                <ImageItem
                    id={img.id}
                    key={img.id}
                    src={img.url}
                    initData={{
                        id: img.id,
                        src: img.url
                    }}
                />
            )
        });
    }
//display all images in a scrollable window
    render() {
        this.extractPanelData();

        if (this.state.isUploading) {
            return (
                <Spinner/>
            )
        } else {
            return (
                <div className={'image-detail'}>
                    <div style={{paddingTop: '5px'}}>
                        <input hidden={true} id="file-picker" type="file" name="image" onChange={this.uploadImage}/>
                        <Button
                            icon='document'
                            text={'Upload Image'}
                            onClick={this.openImageSelector}
                        />
                    </div>
                    <Divider vertical={'true'}/>
                    <ScrollableItems classNames={'scrollable-icon'}>
                        {this.getImages()}
                    </ScrollableItems>
                </div>
            );
        }
    }

}

export default ImageItemDetail;

ImageItemDetail.propTypes = {
    otDoc: PropTypes.object.isRequired,
    otPath: PropTypes.array.isRequired
};
