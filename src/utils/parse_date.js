export default function parse_date(date) {
    if (!date) { return ""; }

    try {
        const date_splitted = date.split("-");
        return `${date_splitted[2]}-${date_splitted[1]}-${date_splitted[0]}`;
    } catch (e) {
        return date;
    }
};
