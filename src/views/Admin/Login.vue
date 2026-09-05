<template>
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 place-items-center">
        <div class="lg:max-w-2lg">
            <div class="flex flex-col p-5 mx-auto rounded-md border-2 border-pwsi-3">
                <h2 class="font-bold mb-4">Введите токен администратора:</h2>
                <input
                    type="password"
                    id="token_input"
                    placeholder="Token"
                    class="focus:outline-none p-2 rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3 placeholder:text-pwsi-text"
                    required
                />
                <span :class="login_success ? 'text-pwsi-done' : 'text-pwsi-dropped'" class="my-2" v-text="message_login_result"></span>
                <button
                    :disabled="!login_button_enabled"
                    v-on:click="login"
                    class="px-4 py-3 rounded-md bg-pwsi-1 sm:hover:bg-pwsi-2 border-2 border-pwsi-3"
                >
                    Применить/Логин
                </button>             
            </div>
        </div>
        <img :src="picture" class="order-first lg:order-none select-none" />
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { onBeforeMount, ref } from 'vue';
    import api_post from '@/utils/api_post';
    import api_get from '@/utils/api_get';
    import sleep from '@/utils/sleep';

    const router = useRouter();
    const picture = ref(`/static/images/main/iris_ti_main_2.png`);
    const login_success = ref(true);
    const login_button_enabled = ref(true);
    const message_login_result = ref("");

    async function login() {
        login_button_enabled.value = false;
        message_login_result.value = "";
        const token = document.getElementById('token_input').value;
        const answer = (await api_post('/admin/login', {"token": token}, "data")).value;

        if (answer.error) {
            login_success.value = false;
            message_login_result.value = answer.content ? "Incorrect token" : "Send error!";
            login_button_enabled.value = true;
            await sleep(5000);
            message_login_result.value = "";
        } else {
            login_success.value = true;
            message_login_result.value = "Logged-in, redirect in 5 seconds";
            await sleep(5000);
            message_login_result.value = "";
            login_button_enabled.value = true;
            router.push({ path: '/admin' });
        };
    };

    onBeforeMount(async () => {
        const admin = (await api_get('/admin/me')).value || "";
        if (admin != "") {
            router.push({ path: '/admin' });
        };
    });
</script>