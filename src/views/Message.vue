<template>
    <div class="mx-auto text-lg font-bold mt-4 mb-4 text-justify">
        Тут можно передать сообщение стримеру, которое она когда-нибудь обязательно прочитает)
    </div>

    <input
        type="text"
        id="title"
        placeholder="Заголовок"
        :value="title_data.text"
        class="focus:outline-none mb-4 p-2 rounded-lg text-pwsi-text bg-pwsi-1 border-2 border-pwsi-2 placeholder:text-pwsi-text"
        :disabled="!title_data.editable"
    />
    <textarea
        type="text"
        id="description"
        placeholder="Сообщение"
        rows="4"
        class="focus:outline-none mb-4 p-2 rounded-lg text-pwsi-text bg-pwsi-1 border-2 border-pwsi-2 placeholder:text-pwsi-text"
        required
    />
    <button 
        v-on:click="send_message"
        class="px-4 py-3 rounded-md bg-pwsi-1 sm:hover:bg-pwsi-2 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
    >
        Отправить
    </button>

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
                        >
                            <div class="flex flex-col p-5 mx-auto">
                                <span class="font-bold mb-4">{{ dataModal.message }}</span>
                                <button
                                    type="button"
                                    class="px-4 py-3 rounded-md bg-pwsi-1 sm:hover:bg-pwsi-2 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow"
                                    @click="closeModal"
                                >
                                    OK
                                </button>
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
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
    } from '@headlessui/vue'
    import send_to_api from '@/utils/send_to_api'
    import get_from_api from '@/utils/get_from_api'

    const isOpen = ref(false)
    const emptyModel = {
        message: '',
        padding: ''
    }
    const dataModal = ref(emptyModel)
    const title_data = ref({text: '', editable: false})

    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        dataModal.value.padding = "";
    }

    function openModal(message) {
        isOpen.value = true;
        dataModal.value.message = message;

        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';
    }

    async function send_message() {
        const title = document.getElementById('title').value
        const description = document.getElementById('description').value

        var modal_message = "Произошла ошибка";

        if (!description) {
            modal_message = "Нельзя отправить пустое сообщение"
        } else {
            const answer = (await send_to_api('/site/message', {"title": title, "description": description})).value
            if (answer == "Sended") {
                modal_message = "Сообщение отправлено";
            } else if (answer == "DISABLED") {
                modal_message = "Отправка сообщений отключена"
            }
        }
        openModal(modal_message)
    }

    onBeforeMount(async () => {
        title_data.value = (await get_from_api('/site/message/title')).value || {text: '', editable: false}
    })

</script>
