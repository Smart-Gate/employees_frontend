export default {
    Domain: function () {
      return window.location.hostname.includes("localhost")
        ? "http://127.0.0.1:8000"
        : "";
    },
}