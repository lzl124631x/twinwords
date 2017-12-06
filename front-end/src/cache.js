export default {
    getJSON(key) {
        return JSON.parse(localStorage.getItem(key))
    },
    setJSON(key, val) {
        localStorage.setItem(key, JSON.stringify(val))
    }
}