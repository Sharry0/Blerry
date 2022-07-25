
import { useState } from "react"
import settingsIcon from "../../../images/icons/settings_icon.svg"
import css from "./Settings.module.css"

export default function Settings() {

const [showSettings, toggleShowSettings] = useState(false);

const handleSettingsClick=()=>{
  toggleShowSettings(!showSettings)
}

  return (
    <div className={css.settings}>
      <div className={`${css.settingsMenu} ${showSettings && css.settingsMenuActive}`}>
        <div className={css.menuTitle}>Theme</div>
        <button className={css.menuBtn}>Light</button>
        <button className={css.menuBtn}><span className={css.disabled}>Dark <br />(disabled)</span></button>
      </div>
      <button className={`navbarBtn ${css.settingsBtn}`} onClick={handleSettingsClick} >
        <img src={settingsIcon} alt="settings icon" />
        <span >Settings</span>
      </button>
    </div>
  )
}
