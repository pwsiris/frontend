<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Помимо игр и аниме иногда мы проводим кино-вечера,
        где смотрим разнообразные фильмs и мультфильмы,
        выбранные через аукцион и колесо
        <button type="button" @click="openModal()" class="text-pwsi-link">(правила проведения).</button>
    </div>

    <div class="flex justify-center mb-2">
        <input
            @input="update_search"
            @keyup.enter="fake_submit()"
            placeholder="Поиск по аукцинам..."
            id="search_input"
            class="focus:outline-none w-4/5 sm:w-1/3 p-2 pr-8 rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3"
        />
        <button @click="search_reset()">
            <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-auto align-middle -ml-9" />
        </button>
    </div>

    <div
        v-for="auction in auctions_filtered.slice().reverse()" :key="auction.id"
        class="rounded-md bg-pwsi-1 mt-4 border-2 border-pwsi-3"
    >
        <Disclosure v-slot="{ open }" :key="is_search" :default-open="default_open || is_search">
            <DisclosureButton
                class="w-full flex flex-col md:flex-row place-items-center justify-between p-2 select-text"
            >
                <div class="flex flex-col md:flex-row sm:place-items-center">
                    <img v-if="auction.picture" :src="auction.picture" class="w-full h-auto sm:w-auto sm:h-48 rounded-md" />
                    <div class="mt-4 sm:mt-0 sm:p-4 text-sm sm:text-base text-start">
                        <div class="">
                            <p v-if="auction.name" class="font-bold text-lg sm:text-2xl mb-1">{{ auction.name.toUpperCase() }}</p>
                            <p v-if="auction.description"><span class="font-bold">Описание: </span>{{ auction.description }}</p>
                            <p v-if="auction.date"><span class="font-bold">Дата: </span>{{ auction.date }}</p>
                            <p v-if="auction.comment"><span class="font-bold">Комментарий: </span>{{ auction.comment }}</p>
                            <p v-if="auction.status" :class="status_mapping.has(auction.status) ? status_mapping.get(auction.status) : ''"><span class="font-bold text-pwsi-text">Статус: </span>{{ auction.status }}</p>
                        </div>
                    </div>
                </div>
                <font-awesome-icon icon="fa-solid fa-angle-down" :class="open ? 'rotate-180 transform' : ''" class="shrink-0 h-8 w-8" />
            </DisclosureButton>
            <DisclosurePanel class="flex flex-col p-2 pt-0">
                <div class="grid md:grid-cols-2 gap-2 mt-2">
                <!-- <div class="flex flex-wrap justify-between"> -->
                    <div
                        v-for="item in auction.list" :key="item.id"
                    >
                    <!-- <div
                        v-for="item in auction.list" :key="item.id"
                        class="w-full md:w-49/100 mt-2"
                    > -->
                        <div
                            class="h-full overflow-hidden flex justify-between place-items-center rounded-md p-2 bg-pwsi-2 border-2 border-pwsi-4"
                            :class="status_mapping.has(item.status) ? status_mapping.get(item.status) : ''"
                        >
                            <span class="px-1 sm:text-lg font-bold text-left">{{ item.name }}</span>
                            <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="item.status">
                                {{ item.status }}
                            </span>
                        </div>
                    </div>
                </div>
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
    
            <div id="dialog-all" class="fixed inset-0 overflow-y-auto" :style="modal_padding" >
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
                            class="transform overflow-hidden rounded-md bg-pwsi-1 border-2 border-pwsi-3 text-pwsi-text shadow-xl transition-all w-full"
                        >
                            <div class="p-6">
                                <div class="text-xl font-bold text-center">
                                    Правила:
                                </div>
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>
                                        Минимальный донат для создания лота - 100 рублей или ставка от 3500 баллов канала.
                                        Далее к лоту можно добавлять любые суммы и доступные ставки - 3.500 (10 раз), 5.000 (5 раз) и 10.000 (3 раза)
                                    </li>
                                    <li>При донате обязательно указать название одного фильма</li>
                                    <li>У многосерийных фильмов лот создается только для первого из них. С поправкой на список просмотренных фильмов</li>
                                    <li>Время проведения аукциона - 30-60 минут</li>
                                    <li>
                                        Во время аукциона есть возможность выкупить фильм за 2.000 руб./900 грн. одним донатом
                                        (или 69696 баллов канала, не более одного выкупа от человека)
                                    </li>
                                    <li>Важно! При выкупе аукцион НЕ прекращается. Количество выкупов не ограничено</li>
                                    <li>Победитель аукциона выбирается через колесо рандома на выбывание</li>
                                    <li>Если тематика/серия некоторых фильмов из финального списка совпадают, то их можно посмотреть вместе</li>
                                    <li>Для тематическийх аукционов принимаются только определённые фильмы</li>
                                    <li>Можно добавлять любые полнометражные фильмы/мультфильмы, не запрещённые на твиче, не 18+, расчленёнка и т.д.</li>
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
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel
    } from '@headlessui/vue';
    import api_get from '@/utils/api_get';

    const is_search = ref(false);
    const search_string = ref('');

    function update_search(event) {
        search_string.value = event.target.value;

        if (search_string.value) {
            const filtered_auctions = [];

            // const auctions_all = auctions.value.slice();
            const auctions_all = JSON.parse(JSON.stringify(auctions.value));
            for (const auction of auctions_all) {
                if (auction.name.toLowerCase().includes(search_string.value.toLowerCase())) {
                    filtered_auctions.push(auction);
                } else {
                    const items_list = [];

                    for (const item of auction.list) {
                        if (item.name.toLowerCase().includes(search_string.value.toLowerCase())) {
                            items_list.push(item);
                        }
                    }

                    if (items_list.length != 0) {
                        auction.list = items_list;
                        filtered_auctions.push(auction);
                    }
                }
            }
            auctions_filtered.value = filtered_auctions;
            is_search.value = true;
        } else {
            search_string.value = '';
            auctions_filtered.value = auctions.value;
            is_search.value = false;
        }
    };

    function search_reset() {
        document.getElementById("search_input").value = "";
        search_string.value = '';
        auctions_filtered.value = auctions.value;
        is_search.value = false;
    }

    function fake_submit() {
        document.getElementById("search_input").blur();
    }

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

    const default_open = ref(false);
    const auctions = ref([]);
    const auctions_filtered = ref([]);

    onBeforeMount(async () => {
        auctions.value = (await api_get('/auctions')).value || [];
        auctions_filtered.value = auctions.value;

        if (auctions.value.length < 3) {
            default_open.value = true;
        }
    });

    const status_mapping = new Map();
    status_mapping.set("Просмотрено", "text-pwsi-done");
    status_mapping.set("Завершено", "text-pwsi-done");
    status_mapping.set("Смотрим", "text-pwsi-in-progress");
    status_mapping.set("В процессе", "text-pwsi-in-progress");
    status_mapping.set("Отложено", "text-pwsi-on-hold");
    status_mapping.set("Заброшено", "text-pwsi-dropped");
</script>
