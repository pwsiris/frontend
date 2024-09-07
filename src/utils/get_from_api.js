import axios from "axios";
import {ref} from 'vue';


export default async function get_from_api(route) {
    var data = ref(null)

    var url_string = `/api${route}`
    if (
        window.location.host.includes("localhost:") ||
        window.location.href.includes("localhost:") ||
        window.location.origin.includes("localhost:")
    ) {
        url_string = `http://127.0.0.1:8040/api${route}`
    }

    try {
        const response = await axios.get(
            url_string
        ).then(
            function (response) {
                data.value = response.data.content;
            }
        ).catch(
            function (error) {
                data.value = null
            }
        )
    } catch (e) {
        data.value = null;
    }
    return data
}
