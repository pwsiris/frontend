<template>
    <div class="text-center">
        <img src="/static/images/iris_square.png" class="mx-auto mt-2 self-center select-none rounded-full bg-pwsi-1 max-h-72 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"/>
        <p class="text-3xl font-bold tracking-tight sm:text-4xl mt-6">Iris_ti</p>
        <p class="text-lg mt-3">Кролякошаковая белкокицунэ-тян</p>
        <p class="text-md mt-0 pt-0">(и ваш стример ...)</p>
        <a :href="main_link.link"
            class="overflow-hidden mx-auto flex place-items-center sm:max-w-sm bg-pwsi-1 sm:hover:bg-pwsi-2 rounded-lg text-xl font-bold shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
            target="_blank" rel="noreferrer"
        >
            <div class="p-1 pl-2 h-full flex place-items-center">
                <font-awesome-icon :icon="main_link.icon" class="w-12 h-auto" />
            </div>
            <span class="px-2 grow text-center lg:text-left">{{ main_link.name }}</span>
            <span class="pr-4">&rarr;</span>
        </a>
    </div>

    <div class="flex flex-row justify-center place-items-center">
        <img src="/static/images/pumpkin_2y.png" class="select-none h-6" />
        <img src="/static/images/pumpkin_2y.png" class="select-none h-9" />
        <img src="/static/images/pumpkin_2y.png" class="select-none h-12" />
        <img src="/static/images/pumpkin_2y.png" class="select-none h-9" />
        <img src="/static/images/pumpkin_2y.png" class="select-none h-6" />
    </div>
    <div class="mt-1 text-md font-bold leading-6 flex flex-wrap">
        <div
            v-for="social in all_socials.filter((item) => !item.type.includes('main'))" :key="social.id"
            class="w-full sm:w-1/2 mx-auto"
        >
            <a :href="social.link"
            class="overflow-hidden my-1 sm:m-1 bg-pwsi-1 sm:hover:bg-pwsi-2 rounded-lg flex place-items-center h-16 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
            target="_blank" rel="noreferrer"
            >
            <div class="p-1 pl-2 h-full flex place-items-center">
                <font-awesome-icon :icon="social.icon" class="w-12 h-auto" />
            </div>
            <span class="px-2 grow text-center lg:text-left">{{ social.name }}</span>
            <span class="pr-4">&rarr;</span>
            </a>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import get_from_api from '@/utils/get_from_api'

    const all_socials = ref([])
    const main_link = ref({
        link: '',
        name: 'Twitch',
        icon: 'fa-brands fa-twitch'
    })

    onBeforeMount(async () => {
        all_socials.value = (await get_from_api('/socials')).value
        for (const social of all_socials.value) {
            if (social.type.includes('main')) {
                main_link.value = social
            }
        }
    })
  
</script>
