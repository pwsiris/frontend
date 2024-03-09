<template>
    <p class="text-5xl font-semibold ">404</p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight">Страница не найдена</h1>
    <div class="mt-2 flex items-center justify-center gap-x-6">
        <router-link to="/" class="px-4 py-3 rounded-md bg-pwsi-1 sm:hover:bg-pwsi-2 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow">
            На главную
        </router-link>
    </div>
</template>


<script setup>
    import { RouterLink} from 'vue-router'
</script>
