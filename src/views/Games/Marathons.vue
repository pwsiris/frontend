<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Марафоны... Кто ты без них? <span class="line-through">Гений, миллиардер, плейбой, филантроп</span> Челка и ворона. Хотя я и с ними такая же. Я запуталась...
        Так о чём мы? Ах да, марафоны. Ну да, провожу, иногда хочется, списочек, вот, ниже.
    </div>

    <div class="flex justify-center">
        <input
            @input="update_search"
            @keyup.enter="fake_submit()"
            placeholder="Поиск по марафонам..."
            id="search_input"
            class="focus:outline-none w-4/5 sm:w-1/3 p-2 pr-8 rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3"
        />
        <button @click="search_reset()">
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-auto align-middle -ml-9" />
        </button>
    </div>

    <div
        v-for="marathon in marathons_filtered.slice().reverse()" :key="marathon.id"
        class="rounded-md bg-pwsi-1 mt-4 border-2 border-pwsi-3"
    >
        <Disclosure v-slot="{ open }" :key="is_search" :default-open="is_search">
            <DisclosureButton
                class="w-full flex flex-col md:flex-row place-items-center justify-between p-2 select-text"
            >
                <div class="flex flex-col md:flex-row sm:place-items-center">
                    <img v-if="marathon.picture" :src="marathon.picture" class="w-full h-auto sm:w-auto sm:h-48 rounded-md" />
                    <div class="mt-4 md:mt-0 md:p-4 text-sm sm:text-base">
                        <div class="text-start">
                            <p v-if="marathon.name" class="font-bold text-lg sm:text-2xl mb-1">{{ marathon.name.toUpperCase() }}</p>
                            <p v-if="marathon.description"><span class="font-bold">Описание: </span>{{ marathon.description }}</p>
                            <p v-if="marathon.rules">
                                <span class="font-bold">Правила: </span>
                                <button type="button" v-on:click.stop.prevent="openModal({id: null, rules: marathon.rules, current_rule: 0});" class="text-pwsi-link">Нажать тут</button>
                            </p>
                            <p v-if="marathon.comment"><span class="font-bold">Комментарий: </span>{{ marathon.comment }}</p>
                            <p v-if="marathon.status" :class="status_mapping.has(marathon.status) ? status_mapping.get(marathon.status) : ''"><span class="font-bold text-pwsi-text">Статус: </span>{{ marathon.status }}</p>
                            <a v-if="marathon.records && marathon.records.includes('http')" :href="marathon.records" class="flex place-items-center font-bold text-pwsi-link" target="_blank" rel="noreferrer">
                                <font-awesome-icon
                                    :icon="get_source_icon(marathon.records)"
                                    class="h-4 w-auto align-middle pr-1"
                                /> Записи
                            </a>
                        </div>
                    </div>
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-down" :class="open ? 'rotate-180 transform' : ''" class="shrink-0 h-8 w-8" />
            </DisclosureButton>
            <DisclosurePanel class="flex flex-col p-2 pt-0">
                <button
                    v-for="item in marathon.list" :key="item.id"
                    type="button"
                    @click="openModal(item)"
                    class="flex justify-between place-items-center rounded-md mt-2 p-2 bg-pwsi-2 border-2 border-pwsi-4"
                    :class="status_mapping.has(item.status) ? status_mapping.get(item.status) : ''"
                >
                    <span class="px-1 sm:text-lg font-bold text-left">{{ item.name }}</span>
                    <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="item.status">
                        {{ item.status }}
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
                            class="transform overflow-hidden rounded-md bg-pwsi-1 border-2 border-pwsi-3 text-pwsi-text shadow-xl transition-all"
                            :class="dataModal.id ? 'w-full sm:w-2/5' : 'max-h-[90vh] sm:max-w-[90vh]'"
                        >
                            <div v-if="dataModal.id">
                                <a class="w-full h-auto" :href="dataModal.link" target="_blank" rel="noreferrer">
                                    <img v-if="dataModal.picture" :src="dataModal.picture" class="w-full h-auto" />
                                </a>
                                <div class="flex flex-col justify-center w-full p-2 text-sm sm:text-base">
                                    <a
                                        :href="dataModal.link" target="_blank" rel="noreferrer"
                                        class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto text-pwsi-link mt-1 sm:mt-2 mb-4 sm:mb-3"
                                    >
                                        {{ dataModal.name }} <font-awesome-icon v-if="dataModal.link" icon="fa-solid fa-arrow-up-right-from-square" class="h-3 w-auto font-bold align-middle" />
                                    </a>
                                    <p v-if="dataModal.status"><span class="font-bold">Статус: </span>{{ dataModal.status }}</p>
                                    <p v-if="dataModal.description"><span class="font-bold">Описание: </span>{{ dataModal.description }}</p>
                                    <p v-if="dataModal.comment"><span class="font-bold">Комментарий: </span>{{ dataModal.comment }}</p>
                                    <a v-if="dataModal.records && dataModal.records.includes('http')" :href="dataModal.records" class="font-bold text-pwsi-link" target="_blank" rel="noreferrer">
                                        <font-awesome-icon
                                            :icon="get_source_icon(dataModal.records)"
                                            class="h-4 w-auto align-middle"
                                        /> Записи
                                    </a>
                                    <p v-if="dataModal.records && !dataModal.records.includes('http')" :href="dataModal.records">
                                        <span class="font-bold">Записи: </span>{{ dataModal.records }}
                                    </p>
                                    <button className="absolute h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
                                </div>
                            </div>
                            <div v-else class="relative">
                                <img
                                    :src="dataModal.rules[dataModal.current_rule]"
                                    alt="а нету картинки"
                                />
                                <div
                                    v-if="dataModal.rules.length > 1"
                                    @click="change_picture(-1)"
                                    class="z-[60] absolute left-0 top-0 h-full w-1/2 group cursor-pointer flex flex-col justify-center"
                                >
                                    <font-awesome-icon icon="fa-solid fa-caret-left" class="h-20 w-auto hidden sm:group-hover:inline ml-2 mr-auto"/>
                                </div>
                                <div
                                    v-if="dataModal.rules.length > 1"
                                    @click="change_picture(1)"
                                    class="z-[60] absolute right-0 top-0 h-full w-1/2 group cursor-pointer flex flex-col justify-center"
                                >
                                    <font-awesome-icon icon="fa-solid fa-caret-right" class="h-20 w-auto hidden sm:group-hover:inline mr-2 ml-auto" />
                                </div>
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
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel
    } from '@headlessui/vue';
    import api_get from '@/utils/api_get';
    import get_source_icon from '@/utils/get_source_icon';
    
    const search_string = ref('');
    const is_search = ref(false);

    function update_search(event) {
        search_string.value = event.target.value;
        if (search_string.value) {
            const filtered_marathons = [];

            const marathons_all = JSON.parse(JSON.stringify(marathons.value));
            for (const marathon of marathons_all) {
                if (marathon.name.toLowerCase().includes(search_string.value.toLowerCase())) {
                    filtered_marathons.push(marathon);
                } else {
                    const items_list = [];

                    for (const item of marathon.list) {
                        if (item.name.toLowerCase().includes(search_string.value.toLowerCase())) {
                            items_list.push(item);
                        }
                    }

                    if (items_list.length != 0) {
                        marathon.list = items_list;
                        filtered_marathons.push(marathon);
                    }
                }
            }
            marathons_filtered.value = filtered_marathons;
            is_search.value = true;
        } else {
            search_string.value = '';
            marathons_filtered.value = marathons.value;
            is_search.value = false;
        }
    };

    function search_reset() {
        document.getElementById("search_input").value = "";
        search_string.value = "";
        marathons_filtered.value = marathons.value;
        is_search.value = false;
    }

    function fake_submit() {
        document.getElementById("search_input").blur();
    }

    const isOpen = ref(false);
    const emptyModel = {
        id: 0,
        name: '',
        link: '',
        picture: '',
        status: '',
        comment: '',
        records: '',
        rules: [],
        current_rule: 0,
    };
    const dataModal = ref(emptyModel);

    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        dataModal.value.padding = "";
    };

    function openModal(info) {
        isOpen.value = true;
        dataModal.value = JSON.parse(JSON.stringify(info));
    
        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';
    };

    function change_picture(diff) {
        if (dataModal.value.rules.length > 1) {
            dataModal.value.current_rule = ((dataModal.value.rules.length + dataModal.value.current_rule + diff) % dataModal.value.rules.length);
        }
    };

    const marathons = ref([]);
    const marathons_filtered = ref([]);

    onBeforeMount(async () => {
        marathons.value = (await api_get('/marathons')).value || [];
        marathons_filtered.value = marathons.value;
    });

    const status_mapping = new Map();
    status_mapping.set("Пройдено", "text-pwsi-done");
    status_mapping.set("Завершено", "text-pwsi-done");
    status_mapping.set("Выполнено", "text-pwsi-done");
    status_mapping.set("Проходим", "text-pwsi-in-progress");
    status_mapping.set("В процессе", "text-pwsi-in-progress");
    status_mapping.set("Отложено", "text-pwsi-on-hold");
    status_mapping.set("Заброшено", "text-pwsi-dropped");
</script>
