<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Стример любит поиграть, поэтому тут представлены игры, которые у неё есть в
        <a
            href="https://steamcommunity.com/id/Iris_ti"
            target="_blank" rel="noreferrer"
            class="text-pwsi-link"
        >
            <font-awesome-icon icon="fa-brands fa-steam" class="h-5 w-auto align-middle mr-1" />Steam
        </a>
        и других сервисах. А ещё, игры можно заказать или подарить
        <button type="button" @click="openModal(emptyModel)" class="text-pwsi-link">(правила)</button>,
        например, из того же
        <a
            href="https://store.steampowered.com/wishlist/id/Iris_ti"
            target="_blank" rel="noreferrer"
            class="text-pwsi-link"
        >
            <font-awesome-icon icon="fa-brands fa-steam" class="h-5 w-auto align-middle mr-1" />вишлиста
        </a>
        стима.
    </div>

    <div class="flex justify-center mb-2">
        <input
            @input="update_search"
            @keyup.enter="fake_submit()"
            placeholder="Поиск игр..."
            id="search_input"
            class="focus:outline-none w-4/5 sm:w-1/3 p-2 pr-8 rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3 placeholder:text-pwsi-text"
        />
        <button @click="search_reset()">
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-auto align-middle -ml-9" />
        </button>
    </div>

    <div v-if="is_search">
        <button
            v-for="game in filtered_games"
            :key="game.id"
            type="button"
            @click="openModal(game)"
            class="flex w-full justify-between place-items-center mt-2 p-2 rounded-md bg-pwsi-1 border-2 border-pwsi-3"
            :class="status_mapping.has(game.status) ? status_mapping.get(game.status) : ''"
        >
            <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ game.name }}</span>
            <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="game.status">{{ game.status }}</span>
        </button>
    </div>

    <div
        v-if="games_ordered.length !== 0" 
        :class="is_search ? 'hidden' : ''"
        class="rounded-md bg-pwsi-1 mt-2 mb-6 border-2 border-pwsi-3"
    >
        <Disclosure v-slot="{ open }" defaultOpen>
            <DisclosureButton
                class="w-full flex place-items-center justify-between p-2"
            >
                <span class="px-1 text-lg sm:text-xl font-bold text-left">ЗАКАЗЫ</span>
                <font-awesome-icon icon="fa-solid fa-angle-down" :class="open ? 'rotate-180 transform' : ''" class="shrink-0 h-8 w-8" />
            </DisclosureButton>
            <DisclosurePanel class="flex flex-col p-2 pt-0">
                <button
                    v-for="game in games_ordered" :key="game.id"
                    type="button"
                    @click="openModal(game)"
                    class="flex justify-between place-items-center rounded-md mt-2 p-2 bg-pwsi-2 border-2 border-pwsi-4"
                    :class="status_mapping.has(game.status) ? status_mapping.get(game.status) : ''"
                >
                    <span class="px-1 sm:text-lg font-bold text-left">{{ game.name }}</span>
                    <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="game.status">{{ game.status }}</span>
                </button>
            </DisclosurePanel>
        </Disclosure>
    </div>

    <div
        v-for="genre in genres" :key="genre"
        :class="is_search ? 'hidden' : ''"
        class="rounded-md bg-pwsi-1 mt-2 border-2 border-pwsi-3"
    >
        <Disclosure v-slot="{ open }">
            <DisclosureButton
                class="w-full flex place-items-center justify-between p-2"
            >
                <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ genre }}</span>
                <font-awesome-icon icon="fa-solid fa-angle-down" :class="open ? 'rotate-180 transform' : ''" class="shrink-0 h-8 w-8" />
            </DisclosureButton>
            <DisclosurePanel class="flex flex-col p-2 pt-0">
                <button
                    v-for="game in games_main.filter((item) => item.genre === genre)" :key="game.id"
                    type="button"
                    @click="openModal(game)"
                    class="flex justify-between place-items-center rounded-md mt-2 p-2 bg-pwsi-2 border-2 border-pwsi-4"
                    :class="status_mapping.has(game.status) ? status_mapping.get(game.status) : ''"
                >
                    <span class="px-1 sm:text-lg font-bold text-left">{{ game.name }}</span>
                    <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="game.status">
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
                            class="transform overflow-hidden rounded-md bg-pwsi-1 border-2 border-pwsi-3 text-pwsi-text shadow-xl transition-all"
                            :class="
                                dataModal.name !== ''
                                ?
                                (
                                    dataModal.picture_mode == 'portrait'
                                    ?
                                    'w-4/5 sm:w-1/2'
                                    :
                                    'w-full sm:w-2/5'
                                )
                                :
                                ''
                            "
                        >
                            <div v-if="dataModal.name !== ''" class="flex flex-col" :class="dataModal.picture_mode == 'portrait' ? 'sm:flex-row' : ''">
                                <button className="absolute h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
                                <img
                                    v-if="dataModal.picture"
                                    :src="dataModal.picture"
                                    class="w-full h-auto cursor-pointer"
                                    :class="dataModal.picture_mode == 'portrait' ? 'sm:order-last sm:mr-0 sm:w-auto sm:h-96' : ''"
                                    @click="redirect(dataModal.link)"
                                    :title="dataModal.link || ''"
                                />
                                <div class="flex flex-col justify-center w-full p-2 text-sm sm:text-base">
                                    <a
                                        :href="dataModal.link" target="_blank" rel="noreferrer" :title="dataModal.link || ''"
                                        class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto text-pwsi-link mt-1 sm:mt-2 mb-4 sm:mb-3"
                                    >
                                        {{ dataModal.name }} <font-awesome-icon v-if="dataModal.link" icon="fa-solid fa-arrow-up-right-from-square" class="h-3 w-auto font-bold align-middle" />
                                    </a>
                                    <p v-if="is_search && type_mapping.has(dataModal.type)"><span class="font-bold">Категория: </span>{{ type_mapping.get(dataModal.type) }}</p>
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
                            <div v-else class="p-6">
                                <div class="text-xl font-bold text-center">
                                Критерии:
                                </div>
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>Игра для заказа не должна быть СКАМОМ, и её нужно согласовать со стримером</li>
                                    <li>Желательно наличие русского языка или вменяемого русификатора (или же в игре практически нет текста)</li>
                                    <li>Прохождение может быть дропнуто, если игра багуется (как было с Tomb Raider) или ну совсем не зайдёт ни стримеру, ни чату</li>
                                    <li>
                                        <router-link
                                            to="/challenges" target="_blank" rel="noreferrer"
                                            class="text-pwsi-link font-bold"
                                        >
                                            Челенжи <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="h-3 w-auto align-middle" />
                                        </router-link>
                                        и их цены обсуждаются отдельно (как, например, ачивки в Dark Souls)
                                    </li>
                                </ul>

                                <div class="text-xl font-bold text-center mt-2">
                                    Как подарить/заказать:
                                </div>
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>Подарить игру (стим/ключ) или задонатить на покупку по укр - в этом случае игра пройдётся когда-нибудь</li>
                                    <li>Заказ - донат сверх подаренной игры/ключа (или ещё непройденой игры у меня в библиотеке) в 3к ставит игру в приоритетную очередь (пишите про это явно)</li>
                                </ul>
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
    import get_source_icon from '@/utils/get_source_icon';
    import redirect from '@/utils/redirect';

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
            filtered_games.value = games_ordered.value.concat(games_main.value).filter((item) => search_filter(item));
        } else {
            query_params.value.search = "";
            is_search.value = false;
            filtered_games.value = [];
        }
        update_query();
    };

    function search_filter(game) {
        const not_played_statuses = ["не начато", "не начали", "не играли", "не тронуто", "не трогали", '""'];
        var search_string_filter = (" " + search_string.value).slice(1);
        if (not_played_statuses.includes(search_string.value.toLowerCase())) {
            search_string_filter = "";
        }
        const game_status = game.status || "";

        return search_string && (
            game.name.toLowerCase().includes(search_string.value.toLowerCase())
            ||
            (
                game_status.toLowerCase() != ""
                &&
                game_status.toLowerCase() == search_string_filter.toLowerCase()
            )
        );
    };

    function search_reset() {
        document.getElementById("search_input").value = "";
        search_string.value = "";
        filtered_games.value = [];
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
        picture_mode: '',
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

    const genres = ref([]);
    const games_ordered = ref([]);
    const games_main = ref([]);

    onBeforeMount(async () => {    
        const games = await api_get('/games?types=main&types=ordered');
        if (games.value !== null && "ordered" in games.value) {
            games_ordered.value = games.value.ordered;
        }
        if (games.value !== null && "main" in games.value) {
            genres.value = (await api_get('/games/genres?genre=main')).value || [];
            games_main.value = games.value.main;
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
            const games = games_ordered.value.concat(games_main.value);
            for (const game of games) {
                if (game.id == game_id) {
                    query_params.value.id = game_id;
                    openModal(game);
                    break;
                }
            }
        }
    });

    const status_mapping = new Map();
    status_mapping.set("Пройдено", "text-pwsi-done");
    status_mapping.set("Проходим", "text-pwsi-in-progress");
    status_mapping.set("Играем", "text-pwsi-in-progress");
    status_mapping.set("Отложено", "text-pwsi-on-hold");
    status_mapping.set("Первый взгляд", "text-pwsi-first-look");
    status_mapping.set("Заброшено", "text-pwsi-dropped");
    status_mapping.set("Даже начинать не будем", "text-pwsi-dropped");

    const type_mapping = new Map();
    type_mapping.set("ordered", "Заказы");

</script>
