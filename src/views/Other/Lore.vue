<template>
    <div
        v-for="lore_block in lore" :key="lore_block.id"
        class="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center"
        :class="lore_block.style"
    >
        <div class="text-justify col-span-1 lg:col-span-2 xl:col-span-3">
            <p
                v-for="paragraph in lore_block.paragraphs" :key="paragraph.id"
                class="text-lg leading-6 select-none"
                :class="paragraph.style"
            >
            {{ paragraph.text }}
            </p>
        </div>
        <div
            class="col-span-1 md:px-10 xl:my-6"
            :class="lore_block.image_style"
        >
            <img :src="lore_block.image" class="p-2 pb-8 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />
        </div>
    </div>

    <div v-if="lore.length" class="mt-6 text-right">
        <p>Автор: Snejara</p>
        <p>Редактура: Iris_ti</p>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue';
    import api_get from '@/utils/api_get';

    const images_style = [
        "md:rotate-12",
        "md:-rotate-3 md:order-first",
        "md:rotate-6",
        "md:-rotate-6 md:order-first",
        "md:rotate-12",
        "md:-rotate-12 md:order-first",
    ];
    const lore = ref([]);

    onBeforeMount(async () => {
        lore.value = (await api_get('/lore')).value || [];

        for (const [i, block_value] of lore.value.entries()) {
            if (i == 0) {
                block_value["style"] = "mt-2";
            } else {
                block_value["style"] = "mt-6 sm:mt-12";
            }

            block_value["image"] = `/static/images/lore/lore${i+1}.png`;
            block_value["image_style"] = images_style[i];

            for (const [j, paragraph_value] of block_value["paragraphs"].entries()) {
                if (j != 0) {
                    paragraph_value["style"] = "mt-6";
                }
            }
        }
    });

</script>
