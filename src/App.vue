<template>
    <header>
        <nav class="mx-auto flex items-center justify-between max-w-screen-2xl p-6 lg:px-8" aria-label="Global">
            <div class="flex md:flex-1 z-30">
                <router-link to="/">
                    <img class="h-10 sm:h-12 w-auto" :src="'/static/images/iris_ti_logo.png'" alt="" />
                </router-link>
            </div>

            <div class="flex z-10 lg:hidden">
                <button type="button" class="-m-2.5 p-2.5 rounded-md inline-flex items-center justify-center" @click="mobileMenuOpen = true">
                    <font-awesome-icon icon="fa-solid fa-bars" class="h-8 w-8 sm:h-12 sm:w-12" aria-hidden="true" />
                </button>
            </div>

            <PopoverGroup class="hidden lg:flex lg:gap-x-8 xl:gap-x-12 text-lg font-semibold leading-6 z-20">
                <div v-for="link in header_links" :key="link.name">
                    <router-link v-if="link.url" :key="link.url" :to="link.url" class="hover:text-pwsi-link focus:outline-none">{{ link.name }}</router-link>
                    <Popover v-else class="relative">
                        <PopoverButton class="flex items-center gap-x-1 pointer-events-auto hover:text-pwsi-link focus:outline-none">
                            {{ link.name }}<font-awesome-icon icon="fa-solid fa-angle-down" class="h-3 w-3 flex-none" aria-hidden="true"/>
                        </PopoverButton>

                        <transition 
                            enter-active-class="transition ease-out duration-200"
                            enter-from-class="opacity-0 translate-y-1"
                            enter-to-class="opacity-100 translate-y-0"
                            leave-active-class="transition ease-in duration-150"
                            leave-from-class="opacity-100 translate-y-0"
                            leave-to-class="opacity-0 translate-y-1"
                        >
                            <PopoverPanel v-slot="{ close }" :class="link.menu_style" class="absolute top-full max-w-md z-20 mt-3 overflow-hidden rounded-md bg-pwsi-1 border-2 border-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow">
                                <div class="p-2 flex flex-col">
                                    <router-link @click="close()" v-for="sublink in link.submenu_links" :key="sublink.url" :to="sublink.url" class="p-2 my-2 flex items-center hover:text-pwsi-link">
                                        <font-awesome-icon :icon="sublink.icon" class="w-5 h-5 mr-2" />{{ sublink.name }}
                                    </router-link>
                                </div>
                            </PopoverPanel>
                        </transition>
                    </Popover>
                </div>
            </PopoverGroup>
        </nav>

        <Dialog as="div" class="lg:hidden text-pwsi-text" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-20" />
            <DialogPanel class="fixed inset-y-0 right-0 z-20 overflow-y-auto px-6 py-6 w-2/3 sm:max-w-sm ring-1 ring-pwsi-1 bg-pwsi-2 sm:bg-gradient-to-t sm:from-pwsi-2 sm:to-pwsi-1">
                <div class="flex flex-row-reverse h-10">
                    <button type="button" class="-m-2.5 p-2.5 rounded-md" @click="mobileMenuOpen = false">
                        <font-awesome-icon icon="fa-solid fa-xmark" class="h-8 w-8 sm:h-12 sm:w-12" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-pwsi-text/5">
                        <div class="space-y-2 py-6">
                            <div v-for="link in header_links" :key="link.name">
                                <router-link
                                    v-if="link.url"
                                    :key="link.url"
                                    :to="link.url"
                                    @click="mobileMenuOpen = false"
                                    class="-mx-3 block rounded-md px-3 py-2 text-base font-semibold leading-7"
                                >
                                    {{ link.name }}
                                </router-link>
                                <Disclosure v-else as="div" class="-mx-3 px-3 py-2" v-slot="{ open }">
                                    <DisclosureButton class="flex w-full items-center rounded-md text-base font-semibold leading-7">
                                        {{ link.name }}<font-awesome-icon icon="fa-solid fa-angle-down" class="h-4 w-4 flex-none ml-2" :class="open ? 'rotate-180 transform' : ''" aria-hidden="true"/>
                                    </DisclosureButton>
                                    <DisclosurePanel v-slot="{ close }" class="mt-2 rounded-md bg-pwsi-1 border-2 border-pwsi-3">
                                        <router-link
                                            v-for="sublink in link.submenu_links"
                                            :key="sublink.url"
                                            :to="sublink.url"
                                            @click="mobileMenuOpen = false; close()"
                                            class="p-4 text-base font-semibold leading-7 flex items-center"
                                        >
                                            <font-awesome-icon :icon="sublink.icon" class="w-5 h-5 mr-2" />{{ sublink.name }}
                                        </router-link>
                                    </DisclosurePanel>
                                </Disclosure>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>

    <main class="overflow-hidden mx-auto w-full max-w-screen-2xl px-3 sm:px-6 lg:px-8 grow shrink-0 flex place-items-center">
        <div class="flex flex-col w-full text-center mb-2">
            <RouterView />
        </div>
    </main>

    <footer>
        <div class="mx-auto flex flex-col sm:flex-row items-center justify-between max-w-screen-2xl pt-8 pb-4 px-4 sm:px-6 lg:px-8 w-full">
        <!-- <div class="mx-auto flex flex-col sm:flex-row items-center justify-around max-w-screen-2xl pt-8 pb-4 px-4 sm:px-6 lg:px-8 w-full"> -->
            <div class="text-lg font-semibold leading-6">
                Сайт <span class="text-pwsi-link">Iris_ti</span>, 2023-2025
            </div>
            <div class="mt-2 sm:mt-0 text-lg font-semibold leading-6">
                Made by
                <a class="text-pwsi-link " href="https://mirakzen.com" target="_blank" rel="noreferrer">
                    mirakzen
                    <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="h-3 w-auto font-bold align-middle" />
                </a>
                and still WIP
            </div>
        </div>
    </footer>

    <button id="scrollTopButton" @click="scrollToTop" class="fixed bottom-0 right-0 z-20 m-4 invisible">
        <div class="rounded-md border-2 border-pwsi-text h-14 w-14 flex flex-col text-center">
            <font-awesome-icon icon="fa-solid fa-caret-up" class="h-14 my-auto" />
        </div>
    </button>
</template>


<script setup>
    import { RouterLink, RouterView } from 'vue-router';
    import { onMounted, onUnmounted, ref } from 'vue';
    import {
        Dialog,
        DialogPanel,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Popover,
        PopoverButton,
        PopoverGroup,
        PopoverPanel
    } from '@headlessui/vue';

    const header_links = [
        {
            name: "Игры",
            menu_style: "-left-0",
            submenu_links: [
                {
                    name: "Игры",
                    url: "/games",
                    icon: "fa-solid fa-gamepad"
                },
                {
                    name: "Демо",
                    url: "/demos",
                    icon: "fa-solid fa-gamepaddemo"
                },
                {
                    name: "Челенжи",
                    url: "/challenges",
                    icon: "fa-solid fa-handshake-angle"
                },
                {
                    name: "Марафоны",
                    url: "/marathons",
                    icon: "fa-solid fa-list-check"
                }
            ]
        },
        {
            name: "Ня Анимесса",
            url: "/anime"
        },
        {
            name: "Мерч",
            url: "/merch"
        },
        {
            name: "Благодарности",
            url: "/credits"
        },
        {
            name: "Ещё",
            menu_style: "-right-0",
            submenu_links: [
                {
                    name: "Аукционы",
                    url: "/auctions",
                    icon: "fa-solid fa-coins"
                },
                {
                    name: "Лор",
                    url: "/lore",
                    icon: "fa-solid fa-book"
                },
                {
                    name: "Сообщение стримеру",
                    url: "/message",
                    icon: "fa-solid fa-message"
                },
                {
                    name: "Рулетка",
                    url: "/roulette",
                    icon: "fa-solid fa-roulette"
                },
                // {
                //     name: "Галерея",
                //     url: "/gallery",
                //     icon: "fa-solid fa-images"
                // },
                {
                    name: "Машинный перевод",
                    url: "/machine-translation",
                    icon: "fa-solid fa-language"
                }
            ]
        }
    ];

    const mobileMenuOpen = ref(false);

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    onMounted(() => {
        window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener("scroll", handleScroll);
    });

    function handleScroll() {
        const scrollBtn = document.getElementById("scrollTopButton");

        if (window.scrollY > 40) {
            scrollBtn.classList.remove("invisible");
        } else {
            scrollBtn.classList.add("invisible");
        }
    };
</script>
