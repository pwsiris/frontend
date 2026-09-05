import axios from "axios";
import {ref} from 'vue';


export default async function api_post(route, data, params) {
    var response_data = ref(null);

    var url_string = `/api${route}`;
    if (
        window.location.host.includes("localhost:") ||
        window.location.href.includes("localhost:") ||
        window.location.origin.includes("localhost:")
    ) {
        url_string = `http://localhost:8040/api${route}`;
    }

    const headers = {
        "Content-Type": "application/json"
    };

    if (params == "message") {
        headers["X-SITE-MESSAGES-TOKEN"] = import.meta.env.VITE_MESSAGE_TOKEN;
    }

    var request_params = {headers: headers};
    if (params == "data") {
        request_params["withCredentials"] = true;
        // request_params = {withCredentials: true};
    }

    try {
        const response = await axios.post(
            url_string, data, request_params
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
