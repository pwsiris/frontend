export default function get_mx_auto(order, len) {
    var mx_string = "";
    if (len % 2 == 1 && order == len) {
        mx_string += "sm:mx-auto ";
    }
    if (len % 3 != 0) {
        if ([order-1, order].includes(order)) {
            mx_string += "xl:mx-auto";
        }
    } else if (mx_string) {
        mx_string += "xl:mx-0";
    }
    return mx_string;
};
