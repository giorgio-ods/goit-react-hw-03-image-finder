import s from "../../App.module.css";

export default function Button({ onClick }) {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      Show More
    </button>
  );
}
