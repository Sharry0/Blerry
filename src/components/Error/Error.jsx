
import css from "./Error.module.css";
import bitenCherry from "../../images/biten_cherry.png";

export default function Error() {

  return (
    <div className={css.errorComponent}>
      <img src={bitenCherry} alt="cherry with a bite" />
      <div>
        <h1>{"Ohh no! Looks like something went wrong"}</h1>
        <h3>Please try again later ...</h3>
      </div>
    </div>
  )
}
