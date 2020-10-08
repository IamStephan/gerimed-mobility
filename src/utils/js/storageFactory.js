function storageFactory(getStorage) {
  let inMemoryStorage = {};

  /**
   * Storage Change Detection
   */

  if(typeof window !== 'undefined') {
    const eventSet = new Event('storageSet')
    const eventRemove = new Event('storageRemove')
    // Add
    const originalSetItemLocal = window.localStorage.setItem;
    const originalSetItemSession = window.sessionStorage.setItem;
  
    // Remove
    const originalRemoveItemLocal = window.localStorage.removeItem
    const originalRemoveItemSession = window.sessionStorage.removeItem
  
    // Add
    window.localStorage.setItem = function (...args) {
      window.dispatchEvent(eventSet)
      originalSetItemLocal.apply(this, args);
    }
  
    window.sessionStorage.setItem = function (...args) {
      window.dispatchEvent(eventSet)
      originalSetItemSession.apply(this, args);
    }
  
    // Remove
    window.localStorage.removeItem = function (...args) {
      window.dispatchEvent(eventRemove)
      originalRemoveItemLocal.apply(this, args);
    }
  
    window.sessionStorage.removeItem = function (...args) {
      window.dispatchEvent(eventRemove)
      originalRemoveItemSession.apply(this, args);
    }
  }

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
    if (isSupported()) {
      getStorage().clear();
    } else {
      inMemoryStorage = {};
    }
  }

  function getItem(name) {
    if (isSupported()) {
      return getStorage().getItem(name);
    }
    if (inMemoryStorage.hasOwnProperty(name)) {
      return inMemoryStorage[name];
    }
    return null;
  }

  function key(index) {
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
  }

  function setItem(name, value) {
    if (isSupported()) {
      getStorage().setItem(name, value);
    } else {
      inMemoryStorage[name] = String(value); // not everyone uses TypeScript
    }
  }

  function length() {
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