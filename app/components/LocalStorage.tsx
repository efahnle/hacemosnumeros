'use client'
const LocalStorageClear = (key: string) => {
    localStorage.removeItem(key);
    location.reload();
}
export default LocalStorageClear