class AccessLocalStorage {
  static _key: string;

  static resetStorage() {
    let userConfirmation = confirm('Warning: This action is irreversible! Are you sure you want to continue?');
    if (!userConfirmation) return;

    localStorage.removeItem(this._key);
  }

  static retrieveValue() {
    let savePath = window.localStorage.getItem(this._key);
    if (savePath === null) {
      const userHomeDir = window.api.getHomeDirectory();
      this.setValue(userHomeDir);
      return userHomeDir;
    } else {
      return savePath;
    }
  }

  static setValue(newValue: string) {
    window.localStorage.setItem(this._key, newValue);
  }
}

export class SaveFolderLocation extends AccessLocalStorage {
  static _key = 'saveFolderLocation';
}
