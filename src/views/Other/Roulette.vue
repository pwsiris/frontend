<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-0 text-justify">
        "Жёваный крот этого казино!" Как известно, стример ещё не отошёл от гача-игр, поэтому крутить мы будем и на стриме... Но не персонажей, а награды в рулетке.
        За ваши донаты. Каждые две сотни - новая крутка. Подходи - налетай. Награды разделены на категории по редкости и перечислены ниже.
    </div>

    <div
        v-for="(rarity, index) in rarities" :key="index"
        class="mt-4 p-2 rounded-md bg-pwsi-1 border-2 border-pwsi-3"
    >
        <div class="flex flex-row place-items-center justify-normal text-lg sm:text-xl font-bold text-left">
            <img :src=rarity.icon class="w-8 h-8 mr-2">{{ rarity.name }}
        </div>
        <div class="flex flex-row flex-wrap mt-2">
            <div
                v-for="award in awards.filter((item) => item.rarity === rarity.name)" :key="award.name"
                class="sm:text-lg mt-2 w-full sm:w-auto sm:mr-2 py-1 px-2 rounded-md bg-pwsi-2 border-2 border-pwsi-4"
            >
                {{ award.name }} <sup v-if="award.description_index" class="font-bold">({{ award.description_index }})</sup>
            </div>
        </div>
    </div>

    <div v-if="descriptions.length !== 0" class="mt-6 text-left">
        <div class="text-lg sm:text-xl font-bold">Примечания: </div>
        <div v-for="(description, index) in descriptions" :key="index" class="sm:text-lg mt-1 text-justify">
            <span class="font-bold"> {{ index+1 }}: </span>{{ description }}
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue';
    import api_get from '@/utils/api_get';

    const rarities = ref([]);
    const awards = ref([]);
    const descriptions = ref([]);

    onBeforeMount(async () => {   
        const roulette = (await api_get('/roulette')).value || [];
        awards.value = roulette.awards;
        descriptions.value = roulette.descriptions;
        const rarities_raw = roulette.rarities;
        for (let i = 0; i < rarities_raw.length; i++) {
            rarities.value.push(
                {
                    name: rarities_raw[i],
                    icon: `/static/images/roulette/roulette${i+1}.png`
                }
            );
        }
    });
</script>
