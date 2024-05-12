<template>
    <header>
        <nav class="mx-auto flex items-center justify-between max-w-screen-2xl p-6 lg:px-8" aria-label="Global">
            <router-link to="/" class="flex md:flex-1 z-30">
                <img class="h-10 sm:h-12 lg:h-14 w-auto rounded-full" :src="'/static/images/avatar.png'" alt="" />
            </router-link>

            <div class="flex z-10 lg:hidden">
                <button type="button" class="-m-2.5 p-2.5 rounded-md inline-flex items-center justify-center" @click="mobileMenuOpen = true">
                    <font-awesome-icon icon="fa-solid fa-bars" class="h-8 w-8 sm:h-12 sm:w-12" aria-hidden="true" />
                </button>
            </div>

            <PopoverGroup class="hidden lg:flex lg:gap-x-8 xl:gap-x-12 text-lg font-semibold leading-6 z-10">
                <div v-for="link in header_links" :key="link.name">
                    <router-link v-if="link.url" :key="link.url" :to="link.url">{{ link.name }}</router-link>
                    <Popover v-else class="relative">
                        <PopoverButton class="flex items-center gap-x-1 pointer-events-auto">
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
                            <PopoverPanel v-slot="{ close }" class="absolute -right-0 top-full max-w-md z-10 mt-3 overflow-hidden rounded-lg bg-pwsi-1 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow">
                                <div class="p-2 flex flex-col">
                                    <router-link @click="close()" v-for="sublink in link.submenu_links" :key="sublink.url" :to="sublink.url" class="p-4 flex items-center">
                                        <font-awesome-icon :icon="sublink.icon" class="w-5 h-5 mr-2" />{{ sublink.name }}
                                    </router-link>
                                </div>
                            </PopoverPanel>
                        </transition>
                    </Popover>
                </div>
            </PopoverGroup>

            <!-- <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 z-10"></div> -->
        </nav>

        <Dialog as="div" class="lg:hidden text-pwsi-text" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel class="fixed inset-y-0 right-0 z-10 overflow-y-auto px-6 py-6 w-1/2 sm:max-w-sm ring-1 ring-pwsi-text/10 bg-pwsi-2 sm:bg-gradient-to-t sm:from-pwsi-2 sm:to-pwsi-1">
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
                                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                                >
                                    {{ link.name }}
                                </router-link>
                                <Disclosure v-else as="div" class="-mx-3 px-3 py-2" v-slot="{ open }">
                                    <DisclosureButton class="flex w-full items-center rounded-lg text-base font-semibold leading-7">
                                        {{ link.name }}<font-awesome-icon icon="fa-solid fa-angle-down" class="h-4 w-4 flex-none ml-2" :class="open ? 'rotate-180 transform' : ''" aria-hidden="true"/>
                                    </DisclosureButton>
                                    <DisclosurePanel v-slot="{ close }" class="mt-2 rounded-lg bg-pwsi-1">
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
        <div class="flex flex-col w-full text-center mb-6">
            <RouterView />
        </div>
    </main>

    <footer>
        <div class="text-center mb-2">
            <a href="https://github.com/pwsiris" target="_blank" rel="noreferrer">
                <b>Iris_ti website</b><br>by mirakzen
            </a>
        </div>
    </footer>

    <button id="scrollTopButton" @click="scrollToTop" class="fixed bottom-0 right-0 z-20 m-3 invisible">
        <font-awesome-icon icon="fa-solid fa-circle-up" class="h-12" />
    </button>
</template>


<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
    import {
        Dialog,
        DialogPanel,
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Popover,
        PopoverButton,
        PopoverGroup,
        PopoverPanel,
        Switch,
    } from '@headlessui/vue'

    const header_links = [
        {
            name: "Обо мне",
            url: "/lore"
        },
        {
            name: "Ссылки",
            url: "/links"
        },
        {
            name: "Игры",
            url: "/games"
        },
        {
            name: "Челенжи",
            url: "/challenges"
        },
        {
            name: "Марафоны",
            url: "/marathons"
        },
        {
            name: "Ня анимесса",
            url: "/anime"
        },
        {
            name: "Всякое",
            submenu_links: [
                {
                    name: "Рулетка",
                    url: "/roulette",
                    icon: "fa-solid fa-roulette"
                },
                {
                    name: "Галерея",
                    url: "/gallery",
                    icon: "fa-solid fa-images"
                }
            ]
        }
    ]

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
