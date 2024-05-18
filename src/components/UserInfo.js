class UserInfo {
  constructor({ nameElement, aboutElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._aboutElement = document.querySelector(aboutElement);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
    return this._userInfo;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }
}

export default UserInfo;
