import s from '../ImageGallery/ImageGallery.module.css'
import { Component } from "react"


export class ImageGalleryItem extends Component {
    render() {
        return (
            <li className={s.ImageGalleryItem}>
                <img className={s.ImageGalleryItemImage} src={this.props.imgURL} alt="" />
            </li>
        )
    }
}