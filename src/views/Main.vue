<template>
    <div class="mx-auto grid max-w-2xl grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 place-items-center">
        <div class="lg:max-w-2lg">
            <p class="text-3xl font-bold tracking-tight sm:text-8xl text-center sm:text-left">Iris_ti</p>
            <p class="mt-6 text-lg leading-6 text-justify">
                Она, рождённая лунным светом и магией, провела крайне насыщенную жизнь в совершенно другом и далёком от нас мире. 
                Там было всё - и сложное детство, и война, и весёлые деньки в школе магии. 
                Но, запечатав свои силы и убежав от всех проблем, она пришла на эту планету и нашла дело для души - стриминг. 
            </p>
            <p class="mt-6 text-lg leading-6 text-justify">
                Часто немного грубовата, но дружелюбная кошкодевушка Льдинка, изменившая имя на Айрис, 
                радует людей уютом, небольшой токсичностью и разнообразием игр, 
                тем самым пытаясь найти новых знакомых и самую крепкую семью.
            </p>
            <p v-if="all_socials.length" class="mt-6 sm:mt-10 text-xl sm:text-2xl font-bold leading-6 text-center sm:text-left">
                Найти меня можно тут:
            </p>
            <div class="mt-3 text-xl font-bold leading-6 grid sm:grid-cols-2 gap-2"> <!-- flex flex-wrap justify-between -->
                <a
                    v-for="social in all_socials.filter((item) => item.type.includes('primary'))" :key="social.id"
                    class="overflow-hidden p-1 sm:p-2 bg-pwsi-1 sm:hover:bg-pwsi-2 rounded-md flex place-items-center border-2 border-pwsi-3"
                    :href="social.link" target="_blank" rel="noreferrer"
                > <!-- w-full sm:w-49/100 my-1 -->
                    <font-awesome-icon :icon="social.icon" class="w-6 h-auto max-h-6 mr-2" />
                    <span class="grow text-center lg:text-left -ml-7 lg:ml-0">{{ social.name }}</span>
                </a>
            </div>
        </div>
        <img :src="picture" class="order-first lg:order-none select-none cursor-pointer" @click="click_picture" />
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue';
    import api_get from '@/utils/api_get';

    const all_socials = ref([]);
    const choosen_pic = ref(1);
    const picture = ref("");
    const clicks = ref(0);

    onBeforeMount(async () => {
        if ((Math.floor(Math.random() * 3) + 1) == 2) {
            choosen_pic.value = 2;
        }
        picture.value = `/static/images/main/iris_ti_main_${choosen_pic.value}.png`;
        all_socials.value = (await api_get('/socials')).value || [];
    });

    function click_picture() {
        choosen_pic.value = (choosen_pic.value % 2) + 1;
        clicks.value += 1;
        if (clicks.value < 15) {
            picture.value = `/static/images/main/iris_ti_main_${choosen_pic.value}.png`;
        }
        if (clicks.value == 15) { picture.value = `/static/images/main/iris_ti_angry_1.png`; }
        if (clicks.value == 20) { picture.value = `/static/images/main/iris_ti_angry_2.png`; }
        if (clicks.value == 25) { picture.value = `/static/images/main/iris_ti_angry_3.png`; }
        if (clicks.value == 35) { picture.value = `/static/images/main/iris_ti_angry_4.png`; }
        if (clicks.value == 37) {
            clicks.value = 0;
            choosen_pic.value = 1;
            picture.value = `/static/images/main/iris_ti_main_${choosen_pic.value}.png`;
        }
    };
</script>
