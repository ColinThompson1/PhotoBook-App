import React from "react";
import TextTypes from "./TextTypes";
import EditableText from "./item-types/EditableText";
import ScrollableItems from "./ScrollableItems";
import Fonts from "../styles/Fonts.css";

class EditableTextDetail extends React.Component {

    constructor(props) {
        super(props);

        this.getTextTypes = this.getTextTypes.bind(this);
    }

    getTextTypes() {
        return Object.values(TextTypes).map((tt) => {
            return (
                <EditableText
                    id={tt.type}
                    key={tt.type}
                    isOnCanvas={false}
                    displayName={tt.displayName}
                    textStyle={tt.style}
                    initData={{
                        type: tt.type, // Because when paced on a canvas the id will change to be a unique instance
                        text: tt.placeholderText
                    }}
                />
            )
        })
    }

    render() {
        return (
            <div className={'text-detail'}>
                <ScrollableItems classNames={'scrollable-row'}>
                    {this.getTextTypes()}
                </ScrollableItems>
            </div>
        );
    }

}

export default EditableTextDetail;