<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Стример любит находить для себя что-то новое, поэтому периодически балуется демками - в рамках фестивалей или собственных поисков.
        А иногда пробует то, что подскажет ей чат.
    </div>

    <div class="mb-2">
        <div class="flex justify-center">
            <input
                @input="update_search"
                @keyup.enter="fake_submit()"
                placeholder="Поиск демо..."
                id="search_input"
                class="focus:outline-none w-4/5 sm:w-1/3 p-2 pr-8 rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3 placeholder:text-pwsi-text"
            />
            <button @click="search_reset()">
                <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-auto align-middle -ml-9" />
            </button>
        </div>
    </div>

    <div v-if="games_demo.length !== 0">
        <button
            v-for="game in filtered_games" :key="game.id"
            type="button"
            @click="openModal(game)"
            class="flex w-full justify-between place-items-center mt-2 p-2 rounded-md bg-pwsi-1 border-2 border-pwsi-3"
        >
            <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ game.name }}</span>
            <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="game.status">{{ game.status }}</span>
        </button>
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
                            class="transform overflow-hidden w-full sm:w-2/5 rounded-md bg-pwsi-1 border-2 border-pwsi-3 text-pwsi-text shadow-xl transition-all"
                        >
                            <div class="flex flex-col">
                                <button className="absolute h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
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
                                    <p v-if="is_search"><span class="font-bold">Жанр: </span>{{ dataModal.genre }}</p>
                                    <p v-if="dataModal.gift_by && dataModal.order_by && dataModal.gift_by === dataModal.order_by"><span class="font-bold">Подарок+заказ: </span>{{ dataModal.order_by }}</p>
                                    <p v-if="dataModal.gift_by && dataModal.gift_by !== dataModal.order_by"><span class="font-bold">Подарок: </span>{{ dataModal.gift_by }}</p>
                                    <p v-if="dataModal.order_by && dataModal.gift_by !== dataModal.order_by"><span class="font-bold">Заказ: </span>{{ dataModal.order_by }}</p>
                                    <p v-if="dataModal.status"><span class="font-bold">Статус: </span>{{ dataModal.status }}</p>
                                    <p v-if="dataModal.comment"><span class="font-bold">Комментарий: </span>{{ dataModal.comment }}</p>
                                    <div v-if="dataModal.records" class="flex flex-wrap justify-center gap-x-3">
                                        <span class="font-bold -mr-2">Записи:</span>
                                        <div v-for="record in dataModal.records" :key="record.name">
                                            <a v-if="record.url.includes('http')" :href="record.url" class="font-bold text-pwsi-link" target="_blank" rel="noreferrer">
                                                <font-awesome-icon
                                                    :icon="get_source_icon(record.url)"
                                                    class="h-4 w-auto align-middle"
                                                /> {{ record.name }}
                                            </a>
                                            <p v-if="!record.url.includes('http')" class="text-wrap">
                                                {{ record.name }}: {{ record.url }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
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
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel
    } from '@headlessui/vue';
    import api_get from '@/utils/api_get';
    import get_source_icon from '@/utils/get_source_icon';

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
    
    const filtered_games = ref([]);
    const search_string = ref('');
    const is_search = ref(false);

    function update_search(event) {
        search_string.value = event.target.value;
        if (search_string.value) {
            query_params.value.search = search_string.value;
            is_search.value = true;
            filtered_games.value = JSON.parse(JSON.stringify(games_demo.value)).filter(
                (item) => item.name.toLowerCase().includes(search_string.value.toLowerCase())
            );
        } else {
            query_params.value.search = "";
            is_search.value = false;
            filtered_games.value = JSON.parse(JSON.stringify(games_demo.value));
        }
        update_query();
    };

    function search_reset() {
        document.getElementById("search_input").value = "";
        search_string.value = "";
        filtered_games.value = JSON.parse(JSON.stringify(games_demo.value));
        query_params.value.search = "";
        update_query();
        is_search.value = false;
    };

    function fake_submit() {
        document.getElementById("search_input").blur();
    };

    const isOpen = ref(false);
    const emptyModel = {
        id: 0,
        name: '',
        subname: '',
        link: '',
        picture: '',
        status: '',
        genre: '',
        type: '',
        records: [],
        comment: '',
        gift_by: '',
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

    function openModal(game_info) {
        isOpen.value = true;
        dataModal.value = JSON.parse(JSON.stringify(game_info));
        query_params.value.id = dataModal.value.id;
        update_query();
    
        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';
    };

    const games_demo = ref([]);

    onBeforeMount(async () => {    
        const games = await api_get('/games?types=demo');
        if ("demo" in games.value) {
            games_demo.value = games.value.demo;
            filtered_games.value = JSON.parse(JSON.stringify(games_demo.value));
        }

        const query_search = route.query.search;
        if (query_search) {
            const search = (Array.isArray(query_search) ? query_search : [query_search])[0];
            query_params.value.search = search;
            document.getElementById("search_input").value = search;
            update_search({target: {value: search}});
        }

        const query_id = route.query.id;
        if (query_id) {
            const game_id = (Array.isArray(query_id) ? query_id : [query_id])[0];
            const games = JSON.parse(JSON.stringify(games_demo.value));
            for (const game of games) {
                if (game.id == game_id) {
                    query_params.value.id = game_id;
                    openModal(game);
                    break;
                }
            }
        }
    });

</script>
