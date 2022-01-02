import { Component } from "react/cjs/react.production.min";
import s from "../../App.module.css";

export default class Modal extends Component {
  render() {
    const { onClick, largeImageURL, alt } = this.props;
    return (
      <div className={s.Overlay} onClick={onClick}>
        <div>
          <img className={s.Modal} src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}
