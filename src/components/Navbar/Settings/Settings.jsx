
import { useState, useEffect, useRef } from "react"
import settingsIcon from "../../../images/icons/settings_icon.svg"
import css from "./Settings.module.css"

export default function Settings() {

const [showSettings, toggleShowSettings] = useState(false);
const settingsRef = useRef(null);
const handleSettingsClick=()=>{
  toggleShowSettings(!showSettings)
}
useEffect(() => {
  function handleClickOutside(event) {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      toggleShowSettings(false);
    }
  }
  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [settingsRef]);

  return (
    <div className={css.settings} ref={settingsRef} >
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
