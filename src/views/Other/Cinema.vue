<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Стример иногда может посматривать всякие фильмы/мульты/сериалы/т.д. и их можно даже заказывать
        <button type="button" @click="openModal(emptyModel)" class="text-pwsi-link">(правила).</button>
    </div>

    <div class="flex justify-center">
        <input
            @input="update_search"
            @keyup.enter="fake_submit()"
            placeholder="Поиск..."
            id="search_input"
            class="focus:outline-none w-4/5 sm:w-1/3 p-2 pr-8 rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3"
        />
        <button @click="search_reset()">
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-auto align-middle -ml-9" />
        </button>
    </div>

    <!-- v-if="(cinema_all_filtered[cinema_type]).length !== 0" -->
    <div v-for="(cinema_type, index) in cinema_types" :key="cinema_type">
        <div
            v-if="cinema_type in cinema_all_filtered"
            class="rounded-md bg-pwsi-1 mt-4 border-2 border-pwsi-3"
        >
            <Disclosure v-slot="{ open }" :key="is_search" :default-open="index == 0 || is_search">
                <DisclosureButton
                    class="w-full flex place-items-center justify-between p-2 select-text"
                >
                    <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ cinema_type }}</span>
                    <font-awesome-icon icon="fa-solid fa-angle-down" :class="open ? 'rotate-180 transform' : ''" class="shrink-0 h-8 w-8" />
                </DisclosureButton>
                <DisclosurePanel class="flex flex-col p-2 pt-0">
                    <div class="grid md:grid-cols-2 gap-2 mt-2">
                        <button
                            v-for="item in cinema_all_filtered[cinema_type]" :key="item.id"
                            type="button"
                            @click="openModal(item)"
                            class="h-full overflow-hidden flex justify-between place-items-center rounded-md p-2 bg-pwsi-2 border-2 border-pwsi-4"
                            :class="status_mapping.has(item.status) ? status_mapping.get(item.status) : ''"
                        >
                            <span class="px-1 sm:text-lg font-bold text-left">{{ item.name }}</span>
                            <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="item.status">{{ item.status }}</span>
                        </button>
                    </div>
                </DisclosurePanel>
            </Disclosure>
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
    
            <div id="dialog-all" class="fixed inset-0 overflow-y-auto" :style="dataModal.padding" >
                <div
                    class="mx-auto max-w-screen-2xl flex min-h-full items-center justify-center px-6 lg:px-8 my-8 sm:my-0 text-center"
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
                            class="transform overflow-hidden rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3 shadow-xl transition-all"
                            :class="dataModal.name !== '' ? 'w-4/5 sm:w-1/3' : ''"
                        >
                            <div v-if="dataModal.name !== ''" class="flex flex-col justify-center w-full p-2 text-sm sm:text-base">
                                <button className="absolute h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
                                <p
                                    class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto text-pwsi-link mt-1 sm:mt-2 mb-4 sm:mb-3"
                                >
                                    {{ dataModal.name }}
                                </p>
                                <p v-if="is_search"><span class="font-bold">Категория: </span>{{ dataModal.type }}</p>
                                <p v-if="dataModal.order_by"><span class="font-bold">Заказ: </span>{{ dataModal.order_by }}</p>
                                <p v-if="dataModal.event"><span class="font-bold">Ивент: </span>{{ dataModal.event }}</p>
                                <p v-if="dataModal.status"><span class="font-bold">Статус: </span>{{ dataModal.status }}</p>
                                <p v-if="dataModal.date"><span class="font-bold">Дата: </span>{{ dataModal.date }}</p>
                                <p v-if="dataModal.comment"><span class="font-bold">Комментарий: </span>{{ dataModal.comment }}</p>
                            </div>
                            <div v-else class="p-6">
                                <div class="text-xl font-bold text-center">
                                    Правила:
                                </div>
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>Обсудить фильм/мультфильм/сериал/т.д. со стримером, донат на заказ только ПОСЛЕ одобрения стримером</li>
                                    <li>Просмотр может быть дропнут, если заказ ну совсем не зайдёт стримеру и/или чату или вызывает отторжение</li>
                                    <li>Пожалуй обойдёмся без скама</li>
                                    <li>Стоимость: каждые 30 минут - 400р, время округляется вверх</li>
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
    import { useRouter, useRoute } from 'vue-router';
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
    import parse_date from '@/utils/parse_date';

    const route = useRoute();
    const router = useRouter();
    const query_params = ref(
        {
            search: "",
            id: ""
        }
    );

    function update_query() {
        const q = {};
        if (query_params.value.search) {
            q.search = query_params.value.search;
        }
        if (query_params.value.id) {
            q.id = query_params.value.id;
        }
        router.replace({query: q, force: false});
    };

    const is_search = ref(false);
    const search_string = ref('');

    function update_search(event) {
        search_string.value = event.target.value;

        if (search_string.value) {
            query_params.value.search = search_string.value;
            const filtered_cinema = {};

            // const cinema_all_tmp = cinema_all.value.slice();
            const cinema_all_tmp = JSON.parse(JSON.stringify(cinema_all.value));
            for (const cinema_type of cinema_types.value) {
                const typed_list = cinema_all_tmp[cinema_type];
                const items_list = [];

                for (const item of typed_list) {
                    if (item.name.toLowerCase().includes(search_string.value.toLowerCase())) {
                        items_list.push(item);
                    }
                }
                if (items_list.length != 0) {
                    filtered_cinema[cinema_type] = items_list;
                }
            }
            cinema_all_filtered.value = filtered_cinema;
            is_search.value = true;
        } else {
            query_params.value.search = "";
            search_string.value = '';
            cinema_all_filtered.value = JSON.parse(JSON.stringify(cinema_all.value));
            is_search.value = false;
        }
        update_query();
    };

    function search_reset() {
        document.getElementById("search_input").value = "";
        search_string.value = '';
        cinema_all_filtered.value = JSON.parse(JSON.stringify(cinema_all.value));
        query_params.value.search = "";
        update_query();
        is_search.value = false;
    }

    function fake_submit() {
        document.getElementById("search_input").blur();
    }

    const isOpen = ref(false);
    const emptyModel = {
        id: 0,
        name: '',
        subname: '',
        type: '',
        event: '',
        comment: '',
        date: '',
        status: '',
        order_by: '',
        padding: ''
    };
    const dataModal = ref(emptyModel);

    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        dataModal.value.padding = "";
        query_params.value.id = "";
        update_query();
    };

    function openModal(cinema_info) {
        isOpen.value = true;
        dataModal.value = JSON.parse(JSON.stringify(cinema_info));
        query_params.value.id = dataModal.value.id;
        update_query();
    
        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';

        if (dataModal.value.date) {
            dataModal.value.date = parse_date(dataModal.value.date)
        }
    };

    const cinema_types = ref([]);
    const cinema_all = ref({});
    const cinema_all_filtered = ref({});

    onBeforeMount(async () => {
        cinema_types.value = (await api_get('/cinema/types')).value || [];
        cinema_all.value = (await api_get('/cinema')).value || {};
        cinema_all_filtered.value = JSON.parse(JSON.stringify(cinema_all.value));

        const query_search = route.query.search;
        if (query_search) {
            const search = (Array.isArray(query_search) ? query_search : [query_search])[0];
            query_params.value.search = search;
            document.getElementById("search_input").value = search;
            update_search({target: {value: search}});
        }

        const query_id = route.query.id;
        if (query_id) {
            const cinema_id = (Array.isArray(query_id) ? query_id : [query_id])[0];
            const cinema_all_tmp = JSON.parse(JSON.stringify(cinema_all.value));
            for (const cinema_type of cinema_types.value) {
                const typed_list = cinema_all_tmp[cinema_type];
                
                for (const item of typed_list) {
                    if (item.id == cinema_id) {
                        query_params.value.id = cinema_id;
                        openModal(item);
                        break;
                    }
                }
            }
        }
    });

    const status_mapping = new Map();
    status_mapping.set("Просмотрено", "text-pwsi-done");
    status_mapping.set("Смотрим", "text-pwsi-in-progress");
    status_mapping.set("Смотрю", "text-pwsi-in-progress");
    status_mapping.set("Отложено", "text-pwsi-on-hold");
    status_mapping.set("Заброшено", "text-pwsi-dropped");
</script>
