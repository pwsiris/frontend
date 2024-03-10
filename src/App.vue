<template>
    <header>
        <nav class="mx-auto flex items-center justify-between max-w-screen-2xl p-6 lg:px-8" aria-label="Global">
            <router-link to="/" class="flex md:flex-1 z-30 -m-1.5 p-1.5">
                <img class="h-10 sm:h-12 lg:h-14 w-auto rounded-full" :src="'/static/images/avatar.png'" alt="" />
            </router-link>

            <div class="flex z-10 lg:hidden">
                <button type="button" class="-m-2.5 p-2.5 rounded-md inline-flex items-center justify-center" @click="mobileMenuOpen = true">
                    <font-awesome-icon icon="fa-solid fa-bars" class="h-8 w-8 sm:h-12 sm:w-12" aria-hidden="true" />
                </button>
            </div>

            <PopoverGroup class="hidden lg:flex lg:gap-x-12 text-lg font-semibold leading-6 z-10">
                <router-link v-for="link in links" :key="link.url" :to="link.url">{{ link.name }}</router-link>
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
                            <router-link
                                v-for="link in links"
                                :key="link.url"
                                :to="link.url"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7"
                                @click="mobileMenuOpen = false"
                            >{{ link.name }}</router-link>
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
        <div class="text-center">
            <span><b>Iris_ti website</b></span><br>
            <span>by mirakzen</span><br>
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

    const links = [
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
            name: "Ня анимесса",
            url: "/anime"
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
