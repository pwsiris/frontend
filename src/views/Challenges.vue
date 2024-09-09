<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Иногда стример может выполнять различный игровые (и не только) челенжи,
        либо просто так, либо по предложениям, либо по заказам (в данном случае цена оговаривается индивидуально).
    </div>
    <div
        v-if="challenges_ordered.length !== 0"
        class="mb-10"
    >
        <p class="text-2xl sm:text-3xl font-bold tracking-tight text-center sm:text-left">Заказы:</p>
        <div
            v-for="challenge in challenges_ordered" :key="challenge.id"
            class="rounded-lg mt-2 bg-pwsi-1 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
            :class="status_mapping.has(challenge.status) ? status_mapping.get(challenge.status) : ''"
        >
            <button 
                type="button"
                @click="openModal(challenge)"
                class="flex w-full justify-between place-items-center p-2"
            >
                <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ challenge.name }}</span>
                <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="challenge.status">{{ challenge.status }}</span>
            </button>
        </div>
    </div>
    
    <div
        v-for="challenge in challenges_main" :key="challenge.id"
        class="rounded-lg mt-2 bg-pwsi-1 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
        :class="status_mapping.has(challenge.status) ? status_mapping.get(challenge.status) : ''"
    >
        <button 
            type="button"
            @click="openModal(challenge)"
            class="flex w-full justify-between place-items-center p-2"
        >
            <span class="px-1 text-lg sm:text-xl font-bold text-left">{{ challenge.name }}</span>
            <span class="hidden sm:inline px-1 text-sm sm:text-base font-bold text-end" v-if="challenge.status">{{ challenge.status }}</span>
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
                            class="transform overflow-hidden rounded-2xl bg-pwsi-1 text-pwsi-text shadow-xl transition-all"
                            :class="dataModal.name !== '' ? 'w-full sm:w-2/5' : ''"
                        >
                            <img v-if="dataModal.picture" :src="dataModal.picture" class="w-full h-auto" />
                            <div class="flex flex-col justify-center mx-auto p-2 text-sm sm:text-base">
                                <p class="text-base sm:text-lg font-bold leading-4 sm:leading-5 mx-auto mt-1 sm:mt-2 mb-4 sm:mb-3">{{ dataModal.name }}</p>
                                <p v-if="dataModal.status"><span class="font-bold">Статус: </span>{{ dataModal.status }}</p>
                                <p v-if="dataModal.order_by"><span class="font-bold">Заказчик: </span>{{ dataModal.order_by }}</p>
                                <p v-if="dataModal.description"><span class="font-bold">Описание: </span>{{ dataModal.description }}</p>
                                <p v-if="dataModal.price"><span class="font-bold">Стоимость: </span>{{ dataModal.price }}</p>
                                <p v-if="dataModal.comment"><span class="font-bold">Комментарий: </span>{{ dataModal.comment }}</p>
                                <a v-if="dataModal.records" :href="dataModal.records" class="font-bold text-pwsi-link" target="_blank" rel="noreferrer">
                                    Записи <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="h-3 w-auto align-middle" />
                                </a>
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
        picture: '',
        order_by: '',
        description: '',
        comment: '',
        status: '',
        type: '',
        price: '',
        records: ''
    }
    const dataModal = ref(emptyModel)
    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        dataModal.value.padding = "";
    }
    function openModal(challenge_info) {
        isOpen.value = true;
        dataModal.value = JSON.parse(JSON.stringify(challenge_info));
    
        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';
    }

    const challenges_main = ref([])
    const challenges_ordered = ref([])
    onBeforeMount(async () => {
        const challenges = await get_from_api('/challenges?types=main&types=ordered')
        if (challenges.value !== null && "main" in challenges.value && "ordered" in challenges.value) {
            challenges_main.value = challenges.value.main
            challenges_ordered.value = challenges.value.ordered
        }
    })

    const status_mapping = new Map();
    status_mapping.set("Сделано", "text-pwsi-done");
    status_mapping.set("В процессе", "text-pwsi-in-progress");
    status_mapping.set("Заброшено", "text-pwsi-dropped");
</script>
