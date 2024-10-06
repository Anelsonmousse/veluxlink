class TokenStorage {
  private storage: Storage;

  private key = "sess_key";

  constructor(storage: Storage) {
    this.storage = storage;
  }

  set(token: string) {
    this.storage.setItem(this.key, token);
  }

  remove() {
    this.storage.removeItem(this.key);
  }

  reset() {
    this.storage.clear();
  }

  get() {
    return this.storage.getItem(this.key);
  }
}

export default TokenStorage;
