<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-8 text-justify">
        Стримлер не анимесса (анимесса), поэтому у неё есть
        <a
            href="https://myanimelist.net/profile/Iris_ti"
            target="_blank" rel="noreferrer"
            class="text-pwsi-link"
        >
            <font-awesome-icon icon="fa-brands fa-myanimelist" class="h-8 w-auto align-middle mr-1" />(аниме лист),
        </a>
        а ещё веские доказательства:
        <button
            type="button"
            class="text-pwsi-link"
            @click="openModal(emptyModel, 'https://clips.twitch.tv/embed?clip=BlueDifficultMarjoramCclamChamp-YOZfdjLkpu7WBF2G')"
        >
            <font-awesome-icon icon="fa-brands fa-twitch" class="align-middle mr-1" />раз
        </button>, 
        <button
            type="button"
            class="text-pwsi-link"
            @click="openModal(emptyModel, 'https://clips.twitch.tv/embed?clip=GlamorousFragileAntelopeBrokeBack-KzY4m4ERMUdbNfaB')"
        >
            <font-awesome-icon icon="fa-brands fa-twitch" class="align-middle mr-1" />два
        </button>
        и
        <button
            type="button"
            class="text-pwsi-link"
            @click="openModal(emptyModel, 'https://clips.twitch.tv/embed?clip=SourHandsomeBeanPanicBasket-TZFX_L_d7O7j80XJ')"
        >
            <font-awesome-icon icon="fa-brands fa-twitch" class="align-middle mr-1" />три
        </button>.
        Хотя главным доказательством является сам факт существования данной страницы...
        А ещё, аниме можно заказать <button type="button" @click="openModal(emptyModel, '')" class="text-pwsi-link">(тык)</button>.
    </div>

    <div
        v-for="anime in all_anime.value" :key="anime.name"
        class="rounded-lg mt-2 bg-pwsi-1 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
        :class="status_mapping.has(anime.status) ? status_mapping.get(anime.status) : ''"
    >
        <div v-if="anime.series !== null">
            <Disclosure v-slot="{ open }">
                <DisclosureButton
                    class="w-full flex place-items-center justify-between p-2 select-text"
                >
                    <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ anime.name }}</span>
                    <div class="flex pl-1 place-items-center">
                        <span class="mr-2 sm:text-lg font-bold" v-if="anime.score">{{ anime.score }}/10</span>
                        <font-awesome-icon icon="fa-solid fa-angle-down" :class="open ? 'rotate-180 transform' : ''" class="shrink-0 h-6 w-5 sm:h-7 sm:w-6" />
                    </div>
                </DisclosureButton>
                <DisclosurePanel class="flex flex-col p-2 pt-0">
                    <button
                        v-for="sub_anime in anime.list" :key="sub_anime.id"
                        type="button"
                        @click="openModal(sub_anime, '')"
                        class="flex justify-between place-items-center rounded-lg mt-2 bg-pwsi-2 p-2"
                        :class="status_mapping.has(sub_anime.status) ? status_mapping.get(sub_anime.status) : 'text-pwsi-text'"
                    >
                        <span class="px-1 sm:text-lg font-bold text-left">{{ sub_anime.name }}</span>
                        <span class="px-1 text-sm sm:text-base font-bold text-end" v-if="sub_anime.score">{{ sub_anime.score }}/10</span>
                    </button>
                </DisclosurePanel>
            </Disclosure>
        </div>
        <div v-else>
            <button 
                type="button"
                @click="openModal(anime, '')"
                class="flex w-full justify-between place-items-center p-2"
            >
                <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ anime.name }}</span>
                <span class="px-1 sm:text-lg font-bold text-end" v-if="anime.score">{{ anime.score }}/10</span>
            </button>
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
                            class="transform overflow-hidden rounded-2xl text-pwsi-text bg-pwsi-1 shadow-xl transition-all"
                            :class="
                                dataModal.name == ''
                                ?
                                (
                                    dataModal.iframe_link !== ''
                                    ?
                                    'w-full sm:w-3/4'
                                    :
                                    ''
                                )
                                :
                                'w-4/5 sm:w-1/2'
                            "
                        >
                            <div v-if="dataModal.name !== ''" class="flex flex-col sm:flex-row sm:justify-end">
                                <img v-if="dataModal.picture" :src="dataModal.picture" class="sm:order-last w-full h-auto sm:w-auto sm:h-96" />
                                <div class="flex flex-col justify-center mx-auto p-2 text-sm sm:text-base">
                                    <a
                                        :href="dataModal.link" target="_blank" rel="noreferrer"
                                        class="text-base sm:text-lg font-medium leading-4 sm:leading-5 mx-auto text-pwsi-link mt-1 sm:mt-0 mb-4 sm:mb-6"
                                    >
                                        <div v-if="dataModal.series" class="font-bold">{{ dataModal.series }}</div>
                                        <div :class="dataModal.series ? 'mt-1' : 'font-bold'">{{ dataModal.name }}</div>
                                    </a>
                                    <div><span class="font-bold">Заказчик: </span>{{ dataModal.order_by }}</div>
                                    <p v-if="dataModal.status === 'Смотрим'"><span class="font-bold">Статус: </span>{{ dataModal.status }}</p>
                                    <p v-if="dataModal.completed_time && dataModal.status === 'Просмотрено'"><span class="font-bold">Просмотр закончен: </span>{{ dataModal.completed_time }} </p>
                                    <p v-if="dataModal.voice_acting"><span class="font-bold">Озвучка: </span>{{ dataModal.voice_acting }}</p>
                                    <p v-if="dataModal.score > 0"><span class="font-bold">Оценка: </span>{{ dataModal.score }}</p>
                                    <p v-if="dataModal.episodes > 1"><span class="font-bold">Серий: </span>{{ dataModal.episodes }}</p>
                                    <p v-if="dataModal.comment"><span class="font-bold">Комментарий: </span>{{ dataModal.comment }}</p>
                                </div>
                            </div>
                            <div v-else-if="dataModal.name == '', dataModal.iframe_link == ''" class="p-4">
                                <div class="text-xl font-bold text-center">Критерии:</div>
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>Сначала обсудить аниму с Миром (mirakzen), только потом донат</li>
                                    <li>Озвучка/субтитры выбираются заказчиком, но могут смениться</li>
                                    <li>Обычно смотрим
                                        <a href="https://animego.org/" target="_blank" rel="noreferrer" class="text-pwsi-link font-bold">тут, </a>
                                        <a href="https://animego.online/" target="_blank" rel="noreferrer" class="text-pwsi-link font-bold">тут</a>
                                        и
                                        <a href="https://animejoy.ru/" target="_blank" rel="noreferrer" class="text-pwsi-link font-bold">тут,</a>
                                        но если анимы нет, то предложить другие варианты</li>
                                    <li>Пожалуй обойдёмся без скама ("боку но пико" передаёт привет)</li>
                                    <li>Фильмы и длинные серии расчитываются по "количеству обычных (~23 минуты) серий в них"</li>
                                </ul>

                                <div class="text-xl font-bold text-center mt-1">Стоимость серии:</div>
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>200р - в аниме меньше 48 серий</li>
                                    <li>100р - в аниме больше 48 серий</li>
                                    <li>150р - в аниме больше 48 серий, но заказывается меньше 48 серий</li>
                                </ul>
                            </div>
                            <div v-else-if="dataModal.name == '', dataModal.iframe_link !== ''">
                                <iframe :src="dataModal.iframe_link" frameborder="0" allowfullscreen="true" allow="autoplay" scrolling="no" class="w-full aspect-video"></iframe>
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
        DialogPanel
    } from '@headlessui/vue'
    import get_from_api from '@/utils/get_from_api'

    const isOpen = ref(false)
    const emptyModel = {
        name: '',
        type: '',
        episodes: -1,
        picture: '',
        score: -1,
        status: '',
        comment: '',
        voice_acting: '',
        order_by: '',
        series: '',
        link: '',
        completed_time: '',
        padding: ''
    }
    const dataModal = ref(emptyModel)

    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        dataModal.value.padding = "";
        // URL.revokeObjectURL(dataModal.value.picture)
    }
    function openModal(anime_info, iframe_link) {
        if (iframe_link) {
            anime_info.iframe_link = iframe_link + `&autoplay=true&parent=${window.location.hostname}`
        } else {
            anime_info.iframe_link = ""
        }
        isOpen.value = true;
        dataModal.value = JSON.parse(JSON.stringify(anime_info));

        // const picture = ref('')
        // try {
        //   axios.get(
        //     anime_info.picture, { responseType: "blob" }
        //   ).then(
        //     function (response) {
        //       picture.value = URL.createObjectURL(response.data);
        //       dataModal.value.picture = picture.value;
        //     }
        //   ).catch(
        //     function (error) {
        //       picture.value = '';
        //       dataModal.value.picture = picture.value;
        //     }
        //   )
        // } catch (e) {
        //   picture.value = '';
        //   dataModal.value.picture = picture.value;
        // }

        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';

        if (dataModal.value.completed_time) {
            const datetime_local = new Date(dataModal.value.completed_time);
            datetime_local.setHours(datetime_local.getHours() + 3); /** MSK +3 */
            const date_splitted = datetime_local.toISOString().split("T")[0].split("-");
            dataModal.value.completed_time = `${date_splitted[2]}-${date_splitted[1]}-${date_splitted[0]}`;
        }
    }

    const all_anime = ref([])

    onBeforeMount(async () => {
        all_anime.value = await get_from_api('/anime')
    })

    const status_mapping = new Map();
    status_mapping.set("Просмотрено", "text-pwsi-done");
    status_mapping.set("Смотрим", "text-pwsi-in-progress");
    status_mapping.set("Заброшено", "text-pwsi-dropped");

</script>
