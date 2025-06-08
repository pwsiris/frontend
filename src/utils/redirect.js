export default function redirect(url) {
    if (url) {
        window.open(url, "_blank", "noopener,noreferrer");
    }
};
