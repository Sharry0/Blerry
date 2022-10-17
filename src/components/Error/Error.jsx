
import css from "./Error.module.css"
import blerryLogo from "../../images/blerry_logo.svg"

export default function Error() {

  return (
    <div className={css.errorComponent}>
      <img className={css.errorImage} src={blerryLogo} alt="blerry" />
      <h1>{"Oops! Looks like something went wrong"}</h1>
    </div>
  )
}
