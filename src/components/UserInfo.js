class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
  setAvatar(avatarLink) {
    this._avatar.src = avatarLink.avatar;
  }
}

export default UserInfo;
