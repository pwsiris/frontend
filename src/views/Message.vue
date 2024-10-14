<template>
    <input
        type="text"
        id="title"
        placeholder="Заголовок сообщения"
        class="focus:outline-none mb-4 p-2 rounded-lg text-pwsi-text bg-pwsi-1 border-2 border-pwsi-2"
    />
    <textarea
        type="text"
        id="description"
        placeholder="Сообщение"
        class="focus:outline-none mb-4 p-2 rounded-lg text-pwsi-text bg-pwsi-1 border-2 border-pwsi-2"
        <!-- required -->
    />
    <button 
        v-on:click="send_message"
        class="px-4 py-3 rounded-md bg-pwsi-1 sm:hover:bg-pwsi-2 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
    >
        Отправить
    </button>
</template>


<script setup>
    import send_to_api from '@/utils/send_to_api'

    async function send_message() {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value

        // if (!description) {
        //     return
        // }
        const answer = (await send_to_api('/site/message', {"title": title, "description": description})).value
        console.log(answer)
    }

</script>
