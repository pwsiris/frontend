<template>
    <p class="text-8xl font-semibold text-pwsi-link">404</p>
    <h1 class="mt-2 text-3xl font-bold tracking-tight">Страница не найдена</h1>
    <div class="mt-4 flex items-center justify-center">
        <router-link to="/" class="px-4 py-3 text-lg md:text-xl rounded-md bg-pwsi-1 sm:hover:bg-pwsi-2 border-2 border-pwsi-3">
            На главную
        </router-link>
    </div>
</template>


<script setup>
    import { RouterLink } from 'vue-router';
</script>
