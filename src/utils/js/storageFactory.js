function storageFactory(getStorage) {
  let inMemoryStorage = {};
  if(typeof window === 'undefined') return

  /**
   * Storage Change Detection
   */
  
  
  const storageChange = new Event('storageChange')

  function isSupported() {
    try {
      const testKey = "___STORAGE_SUPPORT_TEST___";
      getStorage().setItem(testKey, testKey);
      getStorage().removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  function clear() {
    if(typeof window === 'undefined') return
    if (isSupported()) {
      getStorage().clear();
    } else {
      inMemoryStorage = {};
    }
    window.dispatchEvent(storageChange)
  }

  function getItem(name) {
    if(typeof window === 'undefined') return
    if (isSupported()) {
      return getStorage().getItem(name);
    }
    if (inMemoryStorage.hasOwnProperty(name)) {
      return inMemoryStorage[name];
    }
    return null;
  }

  function key(index) {
    if(typeof window === 'undefined') return
    if (isSupported()) {
      return getStorage().key(index);
    } else {
      return Object.keys(inMemoryStorage)[index] || null;
    }
  }

  function removeItem(name) {
    if (isSupported()) {
      getStorage().removeItem(name);
    } else {
      delete inMemoryStorage[name];
    }
    window.dispatchEvent(storageChange)
  }

  function setItem(name, value) {
    if(typeof window === 'undefined') return
    if (isSupported()) {
      getStorage().setItem(name, value);
    } else {
      inMemoryStorage[name] = String(value); // not everyone uses TypeScript
    }
    window.dispatchEvent(storageChange)
  }

  function length() {
    if(typeof window === 'undefined') return
    if (isSupported()) {
      return getStorage().length;
    } else {
      return Object.keys(inMemoryStorage).length;
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
    get length() {
      return length();
    }
  }
}

export {
  storageFactory
}