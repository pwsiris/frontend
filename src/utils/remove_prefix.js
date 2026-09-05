export default function remove_prefix(string, prefix) {
    if (string.startsWith(prefix)) {
        return string.slice(prefix.length);
    }
    return string;
};