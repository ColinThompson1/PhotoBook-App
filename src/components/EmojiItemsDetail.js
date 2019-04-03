import React from "react";
import {importAll} from "../util/general-util";
import {Button, ButtonGroup, Divider} from "@blueprintjs/core";
import ScrollableItems from "./ScrollableItems";
import EmojiItem from "./item-types/EmojiItem";

const emojiTypes = [
    {
        key: 'activity',
        icon: 'walk'
    },
    {
        key: 'people',
        icon: 'person'
    },
    {
        key: 'diversity',
        icon: 'people'
    },
    {
        key: 'flags',
        icon: 'flag'
    },
    {
        key: 'food',
        icon: 'glass'
    },
    {
        key: 'nature',
        icon: 'tree'
    },
    {
        key: 'travel',
        icon: 'airplane'
    }
];

class EmojiItemsDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeType: 'nature'
        };

        this.getEmojis = this.getEmojis.bind(this);
        this.selectType = this.selectType.bind(this);
    }

    getEmojis() {
        const images = importAll(require.context('../images/emoji/', true, /\.(png|jpe?g|svg)$/), this.state.activeType);
        return Object.keys(images).map((key) => {
            return (
                <EmojiItem
                    id={key}
                    key={key}
                    src={images[key]}
                    isOnCanvas={false}
                    initData={{
                        src: images[key]
                    }}
                />
            )
        });
    }

    selectType(key) {
        this.setState({activeType: key})
    }

    render() {

        const buttons = emojiTypes.map((type) => {
            const active = this.state.activeType === type.key;
            return (
                <Button
                    key={type.key}
                    icon={type.icon}
                    active={active}
                    onClick={() => {
                        this.selectType(type.key)
                    }}
                />
            )
        });

        return (
            <div className={'emoji-detail'}>
                <div>
                    <ButtonGroup minimal={true}>
                        {buttons}
                    </ButtonGroup>
                </div>
                <Divider vertical={'true'}/>
                <ScrollableItems>
                    {this.getEmojis()}
                </ScrollableItems>
            </div>
        )
    };
}

export default EmojiItemsDetail