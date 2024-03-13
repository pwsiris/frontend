<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Марафоны... Кто ты без них? <span class="line-through">Гений, миллиардер, плейбой, филантроп</span> Челка и ворона. Хотя я и с ними такая же. Я запуталась...
        Так о чём мы? Ах да, марафоны. Ну да, провожу, иногда хочется, списочек, вот, ниже.
    </div>

    <div
        v-for="marathon in marathons" :key="marathon.name"
        class="rounded-lg bg-pwsi-1 mt-2 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
    >
        <Disclosure v-slot="{ open }">
            <DisclosureButton
                class="w-full flex flex-col sm:flex-row place-items-center justify-between p-2 select-text"
            >
                <div class="flex flex-col sm:flex-row place-items-center">
                    <img v-if="marathon.picture" :src="marathon.picture" class="w-full h-auto sm:w-auto sm:h-48 rounded-lg" />
                    <div class="p-2 text-sm sm:text-base">
                        <div class="text-start">
                            <p v-if="marathon.name" class="font-bold text-lg sm:text-xl mb-1">{{ marathon.name }}</p>
                            <p v-if="marathon.description"><span class="font-bold">Описание: </span>{{ marathon.description }}</p>
                            <p v-if="marathon.comment"><span class="font-bold">Комментарий: </span>{{ marathon.comment }}</p>
                            <p v-if="marathon.status" :class="status_mapping.has(marathon.status) ? status_mapping.get(marathon.status) : ''"><span class="font-bold text-pwsi-text">Статус: </span>{{ marathon.status }}</p>
                            <a v-if="marathon.records && marathon.records.includes('http')" :href="marathon.records" class="font-bold text-pwsi-link" target="_blank" rel="noreferrer">
                                Записи <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="h-3 w-auto align-middle" />
                            </a>
                        </div>
                    </div>
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-down" :class="open ? 'rotate-180 transform' : ''" class="shrink-0 h-8 w-8" />
            </DisclosureButton>
            <DisclosurePanel class="flex flex-col p-2 pt-0">
                <button
                    v-for="game in marathon.games" :key="game.id"
                    type="button"
                    @click="openModal(game)"
                    class="flex justify-between place-items-center rounded-lg mt-2 p-2 bg-pwsi-2"
                >
                    <span class="px-1 sm:text-lg font-bold text-left">{{ game.name }}</span>
                    <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" :class="status_mapping.has(game.status) ? status_mapping.get(game.status) : ''" v-if="game.status">
                        {{ game.status }}
                    </span>
                </button>
            </DisclosurePanel>
        </Disclosure>
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
                            class="transform overflow-hidden rounded-2xl bg-pwsi-1 text-pwsi-text shadow-xl transition-all"
                            :class="dataModal.name !== '' ? 'w-full sm:w-2/5' : ''"
                        >
                            <a class="w-full h-auto" :href="dataModal.link" target="_blank" rel="noreferrer">
                                <img v-if="dataModal.picture" :src="dataModal.picture" class="w-full h-auto" />
                            </a>
                            <div class="flex flex-col justify-center mx-auto p-2 text-sm sm:text-base">
                                <p class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto mt-1 sm:mt-2 mb-4 sm:mb-3">{{ dataModal.name }}</p>
                                <p v-if="dataModal.status"><span class="font-bold">Статус: </span>{{ dataModal.status }}</p>
                                <p v-if="dataModal.comment"><span class="font-bold">Комментарий: </span>{{ dataModal.comment }}</p>
                                <a v-if="dataModal.records && dataModal.records.includes('http')" :href="dataModal.records" class="font-bold text-pwsi-link" target="_blank" rel="noreferrer">
                                    Записи <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="h-3 w-auto align-middle" />
                                </a>
                                <p v-if="dataModal.records && !dataModal.records.includes('http')" :href="dataModal.records">
                                    <span class="font-bold">Записи: </span>{{ dataModal.records }}
                                </p>
                                <button className="h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    } from '@headlessui/vue'
    import get_from_api from '@/utils/get_from_api'

    const isOpen = ref(false)
    const emptyModel = {
        id: 0,
        name: '',
        link: '',
        picture: '',
        status: '',
        comment: '',
        records: ''
    }
    const dataModal = ref(emptyModel)
    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        dataModal.value.padding = "";
    }
    function openModal(game_info) {
        isOpen.value = true;
        dataModal.value = JSON.parse(JSON.stringify(game_info));
    
        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';
    }

    const marathons = ref([])
    onBeforeMount(async () => {
        marathons.value = (await get_from_api('/marathons')).value
    })

    const status_mapping = new Map();
    status_mapping.set("Пройдено", "text-pwsi-done");
    status_mapping.set("Завершено", "text-pwsi-done");
    status_mapping.set("Проходим", "text-pwsi-in-progress");
    status_mapping.set("В процессе", "text-pwsi-in-progress");
    status_mapping.set("Отложено", "text-pwsi-on-hold");
    status_mapping.set("Заброшено", "text-pwsi-dropped");
</script>