import { KeyboardEventHandler } from "react"


export const onEnter = (func: Function): KeyboardEventHandler => {
  return (e) => {
    if(!!!e || !!!e.key) return
    if(e.key === "Enter") func()
  }
}

export const onEscape = (func: Function): KeyboardEventHandler => {
  return (e) => {
    if(!!!e || !!!e.key) return
    if(e.key === "Escape") func()
  }
}

export default onEnter