import s from "../../App.module.css";

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  openModal,
}) {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => openModal(largeImageURL, tags)}
    >
      <img className={s.ImageGalleryItemImg} src={webformatURL} alt={tags} />
    </li>
  );
}
