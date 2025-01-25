<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-0 text-justify">
        Над красотой, которую вы видите на стримах каждый день, трудилось множество замечательных человечков, которым за это хочется сказать большое спасибо!
    </div>

    <div class="mt-4 grid md:grid-cols-2 gap-4 xl:grid-cols-3 xl:gap-6">
    <!-- <div class="flex flex-wrap justify-between"> -->
        <div
            v-for="credits_item in credits" :key="credits_item.id"
        >
        <!-- <div
            v-for="credits_item in credits" :key="credits_item.id"
            class="w-full md:w-48/100 xl:w-32/100 mt-4 md:mt-6"
        > -->
            <div class="h-full overflow-hidden bg-pwsi-1 rounded-md border-2 border-pwsi-3">
                <div class="h-full p-2 flex flex-col">
                    <div class="w-full aspect-square flex relative">
                        <img
                            v-if="credits_item.picture" :src="credits_item.picture"
                            class="w-full aspect-square object-contain m-auto rounded-md cursor-pointer"
                            :class="sizes_mapping.has(credits_item.picture_size) ? sizes_mapping.get(credits_item.picture_size) : ''"
                            alt="а нету картинки"
                            @click="openModal(credits_item.picture_original)"
                        />
                        <font-awesome-icon
                            icon="fa-solid fa-magnifying-glass-plus"
                            class="z-10 absolute w-[7%] md:w-[5%] h-auto top-3 right-3 cursor-pointer text-pwsi-2 hidden sm:inline"
                            @click="openModal(credits_item.picture_original)"
                        />
                    </div>
                    <div class="h-full flex flex-col place-items-center mt-2 border-t-2 border-pwsi-3">
                        <div class="my-auto text-sm sm:text-base">
                            <p v-if="credits_item.name" class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto mt-1 sm:mt-2 mb-4 sm:mb-3">{{ credits_item.name }}</p>
                            <p v-if="credits_item.description">{{ credits_item.description }}</p>
                            <div v-for="creator in credits_item.creators" :key="creator.name">
                                <a
                                    v-if="creator.link"
                                    :href="creator.link"
                                    target="_blank" rel="noreferrer"
                                    class="text-pwsi-link"
                                >
                                    <span class="font-bold text-pwsi-text">{{ creator.role || 'Автор' }}: </span>
                                    <font-awesome-icon
                                        v-if="creator.link"
                                        :icon="get_source_icon(creator.link)"
                                        class="h-4 w-auto font-bold align-middle"
                                    />
                                    {{ creator.name }}
                                </a>
                                <p v-else-if="credits_item.creator_name">
                                    <span class="font-bold">{{ creator.role || Автор }}: </span>{{ creator.name }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-50">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-100 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-75" />
            </TransitionChild>
    
            <div id="dialog-all" class="fixed inset-0" :style="dataModal.padding" >
                <div
                    class="mx-auto max-w-screen-2xl flex min-h-full items-center justify-center px-6 lg:px-8 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-100 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="transform overflow-hidden rounded-md bg-pwsi-1 border-2 border-pwsi-3 text-pwsi-text shadow-xl transition-all aspect-square max-h-[80vh] sm:max-w-[80vw]"
                        >
                            <img
                                :src="dataModal.picture"
                                class="aspect-square object-contain m-auto"
                                alt="а нету картинки"
                            />
                            <button className="absolute h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue';
    import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel
    } from '@headlessui/vue';
    import api_get from '@/utils/api_get';
    import get_source_icon from '@/utils/get_source_icon';

    const isOpen = ref(false);
    const dataModal = ref(
        {
            picture: '',
            padding: ''
        }
    );

    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        dataModal.value.padding = "";
    };

    function openModal(picture) {
        if (window.innerWidth >= 640) {
            isOpen.value = true;
            dataModal.value.picture = picture;
        
            var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
            dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';
        }
    };

    const credits = ref([]);

    onBeforeMount(async () => {
        credits.value = (await api_get('/credits')).value || [];
    });

    const sizes_mapping = new Map();
    sizes_mapping.set("full", "w-auto");
    sizes_mapping.set("medium", "h-2/3");
    sizes_mapping.set("small", "h-1/2");
</script>
