import axios from "axios";
import {ref} from 'vue';


export default async function api_delete(route, data) {
    var response_data = ref(null);

    var url_string = `/api${route}`;
    if (
        window.location.host.includes("localhost:") ||
        window.location.href.includes("localhost:") ||
        window.location.origin.includes("localhost:")
    ) {
        url_string = `http://localhost:8040/api${route}`;
    }

    try {
        const response = await axios.delete(
            url_string, {withCredentials: true, data: data}
        ).then(
            function (response) {
                response_data.value = {error: false, content: response.data.content};
            }
        ).catch(
            function (error) {
                response_data.value = {error: true, content: error.response.data.detail};
            }
        );
    } catch (e) {
        response_data.value = {error: true, content: null};
    }
    return response_data;
};
