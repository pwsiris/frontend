<template>
    <div class="mx-auto text-lg font-bold mt-4 text-justify">
        Хотите потискать Ириску? Это вполне возможно - у нас есть мерч!
        Нюансы заказов указаны <button type="button" @click="openModal()" class="text-pwsi-link">ТУТ (инфо)</button>.
        По всем вопросам и заказам обращаться к стримеру в лс
        <span class="text-pwsi-link"><font-awesome-icon icon="fa-brands fa-discord" class="h-5 w-auto align-middle mr-1" />дискорда (Iris_ti)</span>
        или
        <a
            href="https://vk.com/iris_ti"
            target="_blank" rel="noreferrer"
            class="text-pwsi-link"
        >
            <font-awesome-icon icon="fa-brands fa-vk" class="h-5 w-auto align-middle mr-1" />вконтакте
        </a>.
    </div>

    <div v-if="merch_status" class="mx-auto text-xl md:text-2xl font-bold mt-4 text-pwsi-link">
        {{ merch_status }}
    </div>

    <div class="mt-4 grid md:grid-cols-2 gap-4 xl:grid-cols-3 xl:gap-6">
    <!-- <div class="flex flex-wrap justify-between"> -->
        <div
            v-for="merch_item in merch" :key="merch_item.id"
        >
        <!-- <div
            v-for="merch_item in merch" :key="merch_item.id"
            class="w-full md:w-48/100 xl:w-32/100 mt-4 md:mt-6"
        > -->
            <div class="h-full overflow-hidden bg-pwsi-1 rounded-md border-2 border-pwsi-3">
                <div class="h-full p-2 flex flex-col">
                    <div class="w-full aspect-square flex relative">
                        <img
                            v-if="merch_item.picture" :src="merch_item.picture"
                            class="w-full aspect-square object-contain m-auto"
                            :class="sizes_mapping.has(merch_item.picture_size) ? sizes_mapping.get(merch_item.picture_size) : ''"
                            alt="а нету картинки"
                        />
                        <img :src="merch_item.status" class="z-10 absolute w-1/3 md:w-1/4 xl:w-1/5 right-0" />
                    </div>
                    <div class="h-full flex flex-col place-items-center mt-2 border-t-2 border-pwsi-3">
                        <div class="my-auto text-sm sm:text-base">
                            <p class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto mt-1 sm:mt-2 mb-4 sm:mb-3">{{ merch_item.name }}</p>
                            <p v-if="merch_item.description">{{ merch_item.description }}</p>
                            <p v-if="merch_item.price" class="font-bold text-lg md:text-xl">{{ merch_item.price }}</p>
                            <a
                                v-if="merch_item.creator_link"
                                :href="merch_item.creator_link"
                                target="_blank" rel="noreferrer"
                                class="text-pwsi-link"
                            >
                                <span class="font-bold text-pwsi-text">Художник: </span>
                                <font-awesome-icon
                                    v-if="merch_item.creator_link"
                                    :icon="get_source_icon(merch_item.creator_link)"
                                    class="h-4 w-auto font-bold align-middle"
                                />
                                {{ merch_item.creator_name }}
                            </a>
                            <p v-else-if="merch_item.creator_name">
                                <span class="font-bold">Художник: </span> {{ merch_item.creator_name }}
                            </p>
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
    
            <div id="dialog-all" class="fixed inset-0" :style="modal_padding" >
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
                            class="transform overflow-hidden rounded-md bg-pwsi-1 border-2 border-pwsi-3 text-pwsi-text shadow-xl transition-all w-full sm:w-4/5 lg:w-3/4"
                        >
                            <div class="p-6">
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify space-y-2">
                                    <li>Оформление мерча происходит по предзаказам (сроки ищите в соцсетях)</li>
                                    <li>Стоимость указана отдельно для России и Украины, остальные страны - в зависимости от того, откуда будет доставка</li>
                                    <li>Доставка в стоимость не входит - она рассчитывается индивидуально (разные страны, города и т.д.) и оплачивается заказчиком</li>
                                    <li>За заказ трёх и более позиций одновременно - стикерпак в подарок</li>
                                </ul>
                                <button className="absolute h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
                            </div>
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
    const modal_padding = ref("");

    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        modal_padding.value = "";
    };

    function openModal() {
        isOpen.value = true;
    
        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        modal_padding.value = 'padding-right: ' + scroller + 'px !important;';
    };

    const merch = ref([]);
    const merch_status = ref("");

    onBeforeMount(async () => {   
        merch.value = (await api_get('/merch')).value || [];
        merch_status.value = (await api_get('/merch/status')).value || "";
    });

    const sizes_mapping = new Map();
    sizes_mapping.set("full", "w-auto");
    sizes_mapping.set("medium", "h-2/3");
    sizes_mapping.set("small", "h-1/2");
</script>
