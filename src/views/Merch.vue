<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Хотите потискать Ириску? Это вполне возможно - у нас есть мерч!
        Нюансы заказов указаны <button type="button" @click="openModal()" class="text-pwsi-link">ТУТ (тык)</button>.
        По всем вопросам и заказам обращаться к стримеру в лс
        <a
            href="https://discord.gg/cwZvAkuhp4"
            target="_blank" rel="noreferrer"
            class="text-pwsi-link"
        >
            <font-awesome-icon icon="fa-brands fa-discord" class="h-5 w-auto align-middle mr-1" />через сервер дискорда
        </a>
        или
        <a
            href="https://vk.com/iris_ti"
            target="_blank" rel="noreferrer"
            class="text-pwsi-link"
        >
            <font-awesome-icon icon="fa-brands fa-vk" class="h-5 w-auto align-middle mr-1" />вконтакте
        </a>.
    </div>

    <div class="mt-1 flex flex-wrap">
        <div
            v-for="merch_item in merch" :key="merch_item.id"
            class="w-full sm:w-1/2 xl:w-1/3 mx-auto"
        >
            <div class="h-full sm:p-5">
                <div class="h-full overflow-hidden bg-pwsi-1 rounded-lg shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow">
                    <div class="h-full p-2 flex flex-col">
                        <div class="w-full aspect-square flex border-b-2 border-pwsi-2 relative">
                            <img
                                v-if="merch_item.picture" :src="merch_item.picture"
                                class="aspect-square object-contain m-auto"
                                :class="sizes_mapping.has(merch_item.picture_size) ? sizes_mapping.get(merch_item.picture_size) : ''"
                                alt="а нету картинки"
                            />
                            <!-- <span v-if="merch_item.label" class="z-10 absolute w-1/3 text-left text-wrap text-ellipsis overflow-hidden font-bold">{{ merch_item.label }}</span> -->
                        </div>
                        <div class="h-full flex flex-col place-items-center mt-2">
                            <div class="my-auto text-sm sm:text-base">
                                <p class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto mt-1 sm:mt-2 mb-4 sm:mb-3">{{ merch_item.name }}</p>
                                <p v-if="merch_item.description">{{ merch_item.description }}</p>
                                <p v-if="merch_item.price"><span class="font-bold">Стоимость: </span>{{ merch_item.price }}</p>
                                <a
                                    v-if="merch_item.creator_link"
                                    :href="merch_item.creator_link"
                                    target="_blank" rel="noreferrer"
                                    class="text-pwsi-link"
                                >
                                    <span class="font-bold text-pwsi-text">Художник: </span>{{ merch_item.creator_name }}
                                </a>
                                <p v-else-if="merch_item.creator_name">
                                    <span class="font-bold">Художник: </span> {{ merch_item.creator_name }}
                                </p>
                                <p v-if="merch_item.status" class="text-base sm:text-lg"><span class="font-bold">Статус: </span>{{ merch_item.status }}</p>
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
                            class="transform overflow-hidden rounded-2xl bg-pwsi-1 text-pwsi-text shadow-xl transition-all"
                        >
                            <div class="p-4">
                                <ul class="list-disc ml-3 sm:ml-5 sm:text-lg text-justify">
                                    <li>Оформление мерча происходит по предзаказам (сроки ищите в соцсетях)</li>
                                    <li>Стоимость указана отдельно для России и Украины, остальные страны - в зависимости от того, откуда будет доставка</li>
                                    <li>Доставка в стоимость не входит - она рассчитывается индивидуально (разные страны, города и т.д.) и оплачивается заказчиком</li>
                                    <li>За заказ трёх и более позиций одновременно - стикерпак в подарок</li>
                                </ul>
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
    const modal_padding = ref("")
    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        modal_padding.value = ""
    }
    function openModal() {
        isOpen.value = true;
    
        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        modal_padding.value = 'padding-right: ' + scroller + 'px !important;';
    }

    const merch = ref([])
    onBeforeMount(async () => {   
        merch.value = (await get_from_api('/merch')).value || []
    })

    const sizes_mapping = new Map();
    sizes_mapping.set("full", "w-auto");
    sizes_mapping.set("medium", "h-2/3");
    sizes_mapping.set("small", "h-1/2");
</script>
