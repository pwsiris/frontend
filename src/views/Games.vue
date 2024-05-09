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
        <button type="button" @click="openModal(emptyModel)" class="text-pwsi-link">(тык)</button>,
        например, из того же
        <a
            href="https://store.steampowered.com/wishlist/id/Iris_ti"
            target="_blank" rel="noreferrer"
            class="text-pwsi-link"
        >
            вишлиста
        </a>
        стима.
    </div>

    <div class="mb-4">
        <div class="flex justify-center">
            <input
                @input="update_search"
                @keyup.enter="fake_submit()"
                placeholder="Поиск игр..."
                id="search_input"
                class="focus:outline-none w-4/5 sm:w-1/3 p-2 pr-8 rounded-lg text-pwsi-text bg-pwsi-1 border-2 border-pwsi-2"
            />
                <button @click="search_reset()">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-auto align-middle -ml-9" />
                </button>
        </div>

        <div
            v-if="isHidden"
            class="mt-4"
        >
            <button
                v-for="game in (games_ordered.concat(games_main)).filter((item) => item.name.toLowerCase().includes(search_string.toLowerCase()))"
                :key="game.id"
                type="button"
                @click="openModal(game)"
                class="flex w-full justify-between place-items-center mt-2 p-2 rounded-lg bg-pwsi-1 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
                :class="status_mapping.has(game.status) ? status_mapping.get(game.status) : ''"
            >
                <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ game.name }}</span>
                <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="game.status">{{ game.status }}</span>
            </button>
        </div>
    </div>

    <div
        v-if="games_ordered.length !== 0" 
        :class="isHidden ? 'hidden' : ''"
        class="rounded-lg bg-pwsi-1 mb-8 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
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
                    class="flex justify-between place-items-center rounded-lg mt-2 p-2 bg-pwsi-2"
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
        :class="isHidden ? 'hidden' : ''"
        class="rounded-lg bg-pwsi-1 mt-2 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
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
                    class="flex justify-between place-items-center rounded-lg mt-2 p-2 bg-pwsi-2"
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

    <div
        v-if="games_demo.length !== 0" 
        :class="isHidden ? 'hidden' : ''"
        class="rounded-lg bg-pwsi-1 mt-10 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
    >
        <Disclosure v-slot="{ open }">
            <DisclosureButton
                class="w-full flex place-items-center justify-between p-2"
            >
                <span class="px-1 text-lg sm:text-xl font-bold text-left">ДЕМО</span>
                <font-awesome-icon icon="fa-solid fa-angle-down" :class="open ? 'rotate-180 transform' : ''" class="shrink-0 h-8 w-8" />
            </DisclosureButton>
            <DisclosurePanel class="flex flex-col p-2 pt-0">
                <button
                    v-for="game in games_demo" :key="game.id"
                    type="button"
                    @click="openModal(game)"
                    class="flex justify-between place-items-center rounded-lg mt-2 p-2 bg-pwsi-2"
                >
                    <span class="px-1 sm:text-lg font-bold text-left">{{ game.name }}</span>
                    <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="game.status">{{ game.status }}</span>
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
                            <!-- <div v-if="dataModal.name !== ''" class="flex flex-col sm:flex-row sm:justify-end"> -->
                            <div v-if="dataModal.name !== ''" class="flex flex-col">
                                <!-- <img v-if="dataModal.picture" :src="dataModal.picture" class="sm:order-last w-full h-auto sm:w-auto sm:h-72" /> -->
                                <a class="w-full h-auto" :href="dataModal.link" target="_blank" rel="noreferrer">
                                    <img v-if="dataModal.picture" :src="dataModal.picture" class="w-full h-auto" />
                                </a>
                                <div class="flex flex-col justify-center mx-auto p-2 text-sm sm:text-base">
                                    <a
                                        :href="dataModal.link" target="_blank" rel="noreferrer"
                                        class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto text-pwsi-link mt-1 sm:mt-2 mb-4 sm:mb-3"
                                    >
                                        {{ dataModal.name }}
                                    </a>
                                    <p v-if="isHidden && dataModal.type === 'ordered'" class="font-bold">ТЕКУЩИЙ ЗАКАЗ</p>
                                    <p v-if="isHidden"><span class="font-bold">Жанр: </span>{{ dataModal.genre }}</p>
                                    <p v-if="dataModal.order_by"><span class="font-bold">Заказчик: </span>{{ dataModal.order_by }}</p>
                                    <p v-if="dataModal.status"><span class="font-bold">Статус: </span>{{ dataModal.status }}</p>
                                    <p v-if="dataModal.comment"><span class="font-bold">Комментарий: </span>{{ dataModal.comment }}</p>
                                    <div v-if="dataModal.records" class="flex flex-wrap justify-center">
                                        <span class="font-bold mr-2">Записи:</span>
                                        <div
                                            v-for="record in dataModal.records" :key="record.name"
                                            :class="(dataModal.records.length > 1 && record.order != dataModal.records.length) ? 'mr-3' : ''"
                                        >
                                            <a v-if="record.url.includes('http')" :href="record.url" class="font-bold text-pwsi-link" target="_blank" rel="noreferrer">
                                                {{ record.name }} <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="h-3 w-auto align-middle" />
                                            </a>
                                            <p v-if="!record.url.includes('http')" class="text-wrap">
                                                {{ record.name }}: {{ record.url }}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
                                </div>
                            </div>
                            <div v-else class="p-4">
                                <div class="text-xl font-bold text-center">
                                Критерии:
                                </div>
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>Игра не должна быть СКАМОМ и нужно сначала скинуть ссылку на игру для одобрения</li>
                                    <li>Наличие русского языка или вменяемого русификатора (или же в игре практически нет текста)</li>
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

                                <div class="text-xl font-bold text-center mt-1">
                                    Как заказать:
                                </div>
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>Подарить игру (стим/ключ) или задонатить на покупку по укр (в этом случае игра пройдётся когда-нибудь)</li>
                                    <li>Донат сверх подаренной игры/ключа в 1.5к ставит игру в приоритетную очередь (пишите явно)</li>
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
    
    const search_string = ref('');
    const isHidden = ref(false);

    function update_search(event) {
        search_string.value = event.target.value;
        if (search_string.value) {
            isHidden.value = true;
        } else {
            isHidden.value = false;
        }
    }

    function search_reset() {
        document.getElementById("search_input").value = "";
        search_string.value = "";
        isHidden.value = false;
    }

    function fake_submit() {
        document.getElementById("search_input").blur();
    }

    const isOpen = ref(false)
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
        order_by: '',
        padding: ''
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

    const genres = ref([])
    const games_main = ref([])
    const games_ordered = ref([])
    const games_demo = ref([])

    onBeforeMount(async () => {
        genres.value = (await get_from_api('/games/genres?genre=main')).value
    
        const games = await get_from_api('/games?types=main&types=ordered&types=demo')
        if (games) {
            games_main.value = games.value.main
            games_ordered.value = games.value.ordered
            games_demo.value = games.value.demo
        }
    })

    const status_mapping = new Map();
    status_mapping.set("Пройдено", "text-pwsi-done");
    status_mapping.set("Проходим", "text-pwsi-in-progress");
    status_mapping.set("Играем", "text-pwsi-in-progress");
    status_mapping.set("Отложено", "text-pwsi-on-hold");
    status_mapping.set("Первый взгляд", "text-pwsi-first-look");
    status_mapping.set("Заброшено", "text-pwsi-dropped");
    status_mapping.set("Даже начинать не будем", "text-pwsi-dropped");
</script>
