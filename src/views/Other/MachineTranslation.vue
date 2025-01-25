<template>
    <div class="text-lg leading-6 mt-4 text-justify">
        <p>
            <a
                href="https://github.com/killkimno/MORT"
                target="_blank" rel="noreferrer"
                class="text-pwsi-link justify-normal"
            >
                MORT<font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="ml-1 h-3 w-auto align-middle" />
            </a>
            - переводчик, который переводит текст в реальном времени. Он работает с помощью перехвата текста, который отображается в окне игры, и переводит его на нужный вам язык.
        </p>
        <p class="mt-4">
            Можно использовать оверлей перевода на весь экран, который автоматически переводит весь текст на экране, или использовать функцию слоя,
            с помощью которой вы можете выделить и перевести только нужный блок окна.
        </p>

        <p class="mt-4">
            <span class="font-bold">ВАЖНО!</span> Использование автоматического оверлея перевода на весь экран в режиме реального времени требует очень мощного компьютера.
        </p>

        <p class="mt-4">
            Лично я использую обычную функцию слоёв, и этого вполне хватает, и намного удобней, чем общий захват экрана.
        </p>

        <p class="mt-4 text-xl font-bold">
            Установка:
        </p>

        <p class="mt-2">
            <span class="font-bold">1.</span> Скачать последний релиз программы со страницы
            <a
                href="https://github.com/killkimno/MORT/releases"
                target="_blank" rel="noreferrer"
                class="text-pwsi-link"
            >
                Releases<font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="ml-1 h-3 w-auto align-middle" />
            </a>
            (нужен ZIP-архив)
        </p>
        <img :src="images[1]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="mt-2">
            <span class="font-bold">2.</span> Распаковать в любую папку и запустить <span class="font-bold">MORT.exe</span>
        </p>

        <p class="mt-4 text-xl font-bold">
            Настройка:
        </p>

        <p class="mt-2">
            При первом запуске отроется много разных и непонятных окон, но ничего страшного там нет.
        </p>

        <p class="mt-2">
            <span class="font-bold">1.</span> В этом окне будет отображаться перевод (можно изменить под удобный размер)
        </p>
        <img :src="images[2]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="mt-2">
            <span class="font-bold">2.</span> Тут можно поменять область захвата, запустить/остановить перевод
        </p>
        <img :src="images[3]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="mt-2">
            <span class="font-bold">3.</span> Это основное окно со всеми настройками (у меня прога автоматом “перевелась”, поэтому да)
        </p>
        <img :src="images[4]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="mt-2">
            <span class="font-bold">4.</span> Жмём на “Английская игра” или “English game” для запуска быстрой настройки
        </p>

        <p class="mt-2">
            <span class="font-bold">5.</span> В следующем окне выбираем вариант “По умолчанию”
            (если вы точно знаете, как выглядят субтитры в игре, для лучшего перевода выбирайте вариант из предложенных)
        </p>
        <img :src="images[5]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="mt-2">
            <span class="font-bold">6.</span> Далее нужно уже выбрать область перевода (позже можно будет поменять, если что-то пойдёт не так)
        </p>
        <img :src="images[6]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="mt-2">
            <span class="font-bold">7.</span> Появится окошко с подтверждением окончания настройки
        </p>
        <img :src="images[7]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="mt-2">
            <span class="font-bold">8.</span> Идём в настройки перевода и выбираем нужный нам язык
        </p>
        <img :src="images[8]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="sm:hidden mt-2">
            <span class="font-bold">9.</span> После жмакаем на оранжевую кнопочку, чтобы запустить перевод
        </p>
        <img :src="images[9]" class="sm:hidden mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="sm:hidden mt-2">
            <span class="font-bold">10.</span> Изменить область можно по нажатию “Search”
        </p>
        <img :src="images[10]" class="sm:hidden mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />

        <p class="hidden sm:block mt-2">
            <span class="font-bold">9.</span> После жмакаем на оранжевую кнопочку, чтобы запустить перевод. Если необходимо изменить область - жмём “Search”
        </p>
        <div class="hidden mt-2 sm:flex sm:justify-center sm:gap-x-4">
            <img :src="images[9]" class="mx-auto sm:mx-0 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />
            <img :src="images[10]" class="mx-auto sm:mx-0 mt-2 sm:mt-0 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />
        </div>

        <p class="mt-6">
            В конечном итоге должно получиться что-то такое
        </p>
        <img :src="images[11]" class="mx-auto mt-2 p-1 pb-1 bg-pwsi-3 shadow-md ring-1 ring-pwsi-shadow/5 shadow-pwsi-shadow" />
        <p class="mt-4">
            Вот и все настройки) Приятной игры!
        </p>
    </div>

</template>


<script setup>
    import { ref } from 'vue';

    const images = ref({});
    for (let i = 1; i <= 11; i++) {
        images.value[i] = `/static/images/machine-translation/${i}.png`;
    }
</script>
