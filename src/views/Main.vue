<template>
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 place-items-center">
        <div class="lg:max-w-2lg">
            <p class="text-3xl font-bold tracking-tight sm:text-8xl text-center sm:text-left">Iris_ti</p>
            <p class="mt-6 text-lg leading-6 text-justify">
                Она, рождённая лунным светом и магией, провела крайне насыщенную жизнь в совершенно другом и далёком от нас мире. 
                Там было всё - и сложное детство, и война, и веселые деньки в школе магии. 
                Но, запечатав свои силы и убежав от всех проблем, она пришла на эту планету и нашла дело для души - стриминг. 
            </p>
            <p class="mt-6 text-lg leading-6 text-justify">
                Часто немного грубовата, но дружелюбная кошкодевушка Льдинка, изменившая имя на Айрис, 
                радует людей уютом, небольшой токсичностью и разнообразием игр, 
                тем самым пытаясь найти новых знакомых и самую крепкую семью.
            </p>
            <p class="mt-20 text-xl sm:text-2xl font-bold leading-6 text-center sm:text-left">
                Найти меня можно тут:
            </p>
            <div class="mt-3 text-xl font-bold leading-6 flex flex-wrap">
                <div
                    v-for="social in all_socials.filter((item) => item.type.includes('primary'))" :key="social.id"
                    class="w-full sm:w-1/2 mx-auto"
                >
                    <a
                        :href="social.link"
                        class="my-1 sm:m-1 p-1 sm:p-2 bg-pwsi-1 rounded-lg flex place-items-center shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
                        target="_blank" rel="noreferrer"
                    >
                        <font-awesome-icon :icon="social.icon" class="w-6 mr-2" />
                        <span class="grow text-center lg:text-left -ml-8 lg:ml-0">{{ social.name }}</span>
                    </a>
                </div>
            </div>
        </div>
        <img :src="'/static/images/Iris_ti_main_dark.png'" class="order-first lg:order-none select-none" />
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import get_from_api from '@/utils/get_from_api'

    const all_socials = ref([])

    onBeforeMount(async () => {
        all_socials.value = (await get_from_api('/socials')).value || []
    });
</script>
