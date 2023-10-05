const { make } = require('./util')
import { IconStar } from '@codexteam/icons'

class ShowOnHomepagePlugin {
  static get isTune() {
    return true
  }

  constructor({ api, data, config, block }) {
    this.api = api
    this.block = block

    this.settings = config
    this.data = data || { ShowOnHomepage: false }
    this._CSS = {
      ShowOnHomepage: 'show-on-homepage',
      Button: 'ce-popover-item',
      Icon: 'ce-popover-item__icon',
      Text: 'ce-popover-item__title',
      ActiveButton: 'ce-block-settings__item--active', // Add a new CSS class for the active button
    }
  }

  wrap(blockContent) {
    this.wrapper = make('div')
    this.wrapper.classList.toggle(this._CSS.ShowOnHomepage, this.data.ShowOnHomepage)
    this.wrapper.append(blockContent)
    return this.wrapper
  }

  render() {
    const wrapper = make('div')
    const button = document.createElement('div')
    const icon = document.createElement('span')
    icon.classList.add(this._CSS.Icon)
    icon.innerHTML = IconStar
    button.appendChild(icon)
    const buttonText = document.createElement('div')
    buttonText.innerText = 'Вывести на главную'
    buttonText.classList.add(this._CSS.Text)
    button.appendChild(buttonText)
    button.addEventListener('click', () => {
      this.data.ShowOnHomepage = !this.data.ShowOnHomepage
      this.wrapper.classList.toggle(this._CSS.ShowOnHomepage, this.data.ShowOnHomepage)
      button.classList.toggle(this._CSS.ActiveButton) // Toggle the active class for the button
    })
    button.classList.add(this._CSS.Button) // Add the CSS class 'ce-popover-item' to the button
    wrapper.appendChild(button)
    return wrapper
  }

  save() {
    return this.data
  }
}

module.exports = ShowOnHomepagePlugin
