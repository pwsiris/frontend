<template>
    <div class="w-full sm:w-1/2 xl:w-1/4">
        <Listbox v-model="selected_page" @update:model-value="change_page">
            <div class="relative mt-1 text-pwsi-text">
                <ListboxButton
                    class="relative w-full cursor-default bg-pwsi-1 rounded-md border-2 border-pwsi-3 py-2 pl-3 pr-10 text-left sm:text-sm font-bold"
                >
                    <span class="block truncate">{{ selected_page.name }}</span>
                    <span
                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                    >
                        <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="h-5 w-auto font-bold align-middle" />
                    </span>
                </ListboxButton>

                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ListboxOptions
                        class="z-30 absolute mt-1 max-h-60 w-full overflow-auto bg-pwsi-1 rounded-md border-2 border-pwsi-3 py-1 text-base sm:text-sm"
                    >
                        <ListboxOption
                            v-slot="{ active, selected }"
                            v-for="page in content_pages"
                            :key="page.name"
                            :value="page"
                            as="template"
                        >
                            <li
                                class="text-left"
                                :class="[
                                active ? 'bg-pwsi-2 text-pwsi-link' : 'text-pwsi-text',
                                'relative cursor-default select-none py-2 pl-10 pr-4',
                                ]"
                            >
                                <span
                                    :class="[
                                        selected ? 'font-medium' : 'font-normal',
                                        'block truncate',
                                    ]"
                                >{{ page.name }}</span>
                                <span
                                    v-if="selected"
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 text-pwsi-done"
                                >
                                    <font-awesome-icon icon="fa-solid fa-check" class="h-5 w-auto font-bold align-middle" />
                                </span>
                            </li>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>

    <div class="w-full flex flex-col sm:flex-row mt-5 ">
        <div class="w-full sm:w-1/3 xl:w-1/4 sm:mr-4">
            <Listbox v-model="selected_field" @update:model-value="search_reset">
                <div class="relative mt-1 text-pwsi-text">
                    <ListboxButton
                        class="relative w-full cursor-default bg-pwsi-1 rounded-md border-2 border-pwsi-3 py-2 pl-3 pr-10 text-left font-bold"
                    >
                        <span class="block truncate">{{ selected_field }}</span>
                        <span
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                        >
                            <font-awesome-icon icon="fa-solid fa-ellipsis-vertical" class="h-5 w-auto font-bold align-middle" />
                        </span>
                    </ListboxButton>

                    <transition
                        leave-active-class="transition duration-100 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                    >
                        <ListboxOptions
                            class="absolute mt-1 max-h-60 w-full overflow-auto bg-pwsi-1 rounded-md border-2 border-pwsi-3 py-1 text-base sm:text-sm"
                        >
                            <ListboxOption
                                v-slot="{ active, selected }"
                                v-for="field in selected_page_fields"
                                :key="field"
                                :value="field"
                                as="template"
                            >
                                <li
                                    class="text-left"
                                    :class="[
                                    active ? 'bg-pwsi-2 text-pwsi-link' : 'text-pwsi-text',
                                    'relative cursor-default select-none py-2 pl-10 pr-4',
                                    ]"
                                >
                                    <span
                                        :class="[
                                            selected ? 'font-medium' : 'font-normal',
                                            'block truncate',
                                        ]"
                                    >{{ field }}</span>
                                    <span
                                        v-if="selected"
                                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-pwsi-done"
                                    >
                                        <font-awesome-icon icon="fa-solid fa-check" class="h-5 w-auto font-bold align-middle" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
            </Listbox>
        </div>

        <div class="w-full mt-2 sm:mt-1">
            <input
                @input="update_search"
                @keyup.enter="fake_submit()"
                placeholder="Поиск..."
                id="search_input"
                class="focus:outline-none w-full p-2 pr-8 rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3"
            />
                <button @click="search_reset()">
                    <font-awesome-icon icon="fa-solid fa-xmark" class="h-6 w-auto align-middle -ml-9" />
                </button>
        </div>

        <button @click="openModal(emptyModel)" class="sm:ml-4 w-full sm:w-1/3 xl:w-1/4 mt-2 sm:mt-1 px-2 py-2 rounded-md bg-pwsi-1 sm:hover:bg-pwsi-2 border-2 border-pwsi-3 font-bold">
            Добавить
        </button>
    </div>

    <div class="w-full overflow-x-auto mt-8 rounded-md">
        <table class="table-auto w-full">
            <thead class="text-center">
                <tr class="border-b-2 border-separate-2 border-pwsi-3 divide-x-2 divide-pwsi-3">
                    <th class="px-1">
                        <button class="flex flex-col items-center justify-center" @click="reset_sort()" title="Сброс сортировки">
                            <font-awesome-icon icon="fa-solid fa-arrow-down-up-across-line" class="h-5 w-auto align-middle" />
                        </button>
                    </th>
                    <th v-for="field in selected_page_fields" class="px-1">
                        <button class="inline-flex" @click="trigger_sort(field)">
                            <span class="my-auto text-center">{{ field.toUpperCase() }}</span>
                            <div class="ml-2 flex flex-col items-center justify-center">
                                <font-awesome-icon :icon="sorting_icons[field] ?? 'fa-solid fa-arrows-up-down'" class="h-4 w-auto align-middle" />
                            </div>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody class="divide-y divide-pwsi-3">
                <tr v-for="item in data_filtered" :class="((selected_page.path == 'auctions' && !item.auction_id) || (selected_page.path == 'marathons' && !item.marathon_id)) ? 'font-bold' : ''">
                    <td v-for="field in [''].concat(selected_page_fields)" class="py-2 px-1" :class="get_text_mode(field)">
                        <button v-if="field == ''" class="flex flex-col text-pwsi-link" @click="openModal(item)">
                            <font-awesome-icon icon="fa-solid fa-gear" class="h-4 w-auto align-middle" />
                        </button>
                        <span v-else>{{ item[field] }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
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
                            class="transform overflow-hidden rounded-md text-pwsi-text bg-pwsi-1 border-2 border-pwsi-3 shadow-xl transition-all w-4/5 "
                        >
                            <div class="p-2 text-sm sm:text-base w-full overflow-auto">
                                <button className="absolute h-0 w-0 overflow-hidden" /> <!-- for focus-trap -->
                                <table class="table-auto w-full">
                                    <tbody>
                                        <tr v-for="field in fields[selected_page.path]" class="border-b-2 border-pwsi-3">
                                            <td class="py-1 pr-1 text-left">{{ field.toUpperCase() }}:</td>
                                            <td class="py-1 pl-1 text-left">
                                                <textarea
                                                    v-if="field == 'records' || field == 'creators' || field == 'rules'"
                                                    :placeholder="selected_page_fields_types[field]?.placeholder || ''"
                                                    :disabled="(field == 'id' && !dataModal.new) ? true : false"
                                                    @keyup.enter="fake_submit()"
                                                    :value="dataModal[field]"
                                                    :id="`input__${field}`"
                                                    :rows="dataModal[field] ? 3 : 1"
                                                    class="block focus:outline-none w-full p-1 text-pwsi-text bg-pwsi-1 rounded-md border-2 border-pwsi-3"
                                                />
                                                <input
                                                    v-else
                                                    :title="selected_page_fields_types[field]?.placeholder || ''"
                                                    :placeholder="selected_page_fields_types[field]?.placeholder || ''"
                                                    :disabled="(
                                                        !dataModal.new && (field == 'id' || selected_page_fields_types[field]?.primary)
                                                        ||
                                                        dataModal.new && field == 'id' && !selected_page_fields_types[field]?.nullable
                                                    ) ? true : false"
                                                    @keyup.enter="fake_submit()"
                                                    :value="dataModal[field]"
                                                    :id="`input__${field}`"
                                                    class="focus:outline-none w-full p-1 text-pwsi-text bg-pwsi-1 rounded-md border-2 border-pwsi-3"
                                                />
                                            </td>
                                        </tr>
                                        <tr v-if="!dataModal.new && Object.hasOwn(selected_page_fields_types, 'new_id')">
                                            <td class="py-1 pr-1 text-left">NEW_ID:</td>
                                            <td class="py-1 pl-1 text-left">
                                                <input
                                                    @keyup.enter="fake_submit()"
                                                    :placeholder="selected_page_fields_types?.new_id?.placeholder || ''"
                                                    :value="dataModal?.new_id || ''"
                                                    id="input__new_id"
                                                    class="focus:outline-none w-full p-1 text-pwsi-text bg-pwsi-1 rounded-md border-2 border-pwsi-3"
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button v-if="dataModal.new" id="button_create" @click="create_item" class="w-full mt-2 px-2 py-2 rounded-md text-pwsi-done bg-pwsi-1 sm:hover:bg-pwsi-2 border-2 border-pwsi-3 font-bold">Добавить</button>
                                <div v-else class="flex flex-row w-full gap-2">
                                    <button id="button_delete" @click="delete_item" class="w-full mt-2 px-2 py-2 rounded-md text-pwsi-dropped bg-pwsi-1 sm:hover:bg-pwsi-2 border-2 border-pwsi-3 font-bold">Удалить</button>
                                    <button id="button_update" @click="update_item" class="w-full mt-2 px-2 py-2 rounded-md text-pwsi-in-progress  bg-pwsi-1 sm:hover:bg-pwsi-2 border-2 border-pwsi-3 font-bold">Изменить</button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>


<script setup>
    import { useRouter } from 'vue-router';
    import { onBeforeMount, ref } from 'vue';
    import {
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel
    } from '@headlessui/vue';
    import api_delete from '@/utils/api_delete';
    import api_get from '@/utils/api_get';
    import api_post from '@/utils/api_post';
    import api_put from '@/utils/api_put';
    import fields from '@/views/Admin/fields';
    import fields_types from '@/views/Admin/fields_types';
    import sleep from '@/utils/sleep';
    import remove_prefix from '@/utils/remove_prefix';

    const content_pages = [
        {
            name: "Аниме",
            path: "anime"
        },
        {
            name: "Аукционы",
            path: "auctions"
        },
        {
            name: "Челенжи",
            path: "challenges"
        },
        {
            name: "Кинозал",
            path: "cinema"
        },
        {
            name: "Благодарности",
            path: "credits"
        },
        {
            name: "Параметры",
            path: "data_params"
        },
        {
            name: "Игры",
            path: "games"
        },
        {
            name: "Лор",
            path: "lore"
        },
        {
            name: "Марафоны",
            path: "marathons"
        },
        {
            name: "Мерч",
            path: "merch"
        },
        {
            name: "Рулетка",
            path: "roulette"
        },
        {
            name: "Соцсети",
            path: "socials"
        }
    ];
    const selected_page = ref(content_pages[0]);

    const search_string = ref('');
    const selected_page_fields = ref(fields[selected_page.value.path]);
    const selected_page_fields_types = ref(fields_types[selected_page.value.path]);
    const selected_field = ref(selected_page_fields.value[0]);

    function update_search(event) {
        search_string.value = event.target.value;

        if (search_string.value) {
            data_filtered.value = filter_function();
        } else {
            search_string.value = '';
            data_filtered.value = JSON.parse(JSON.stringify(data.value));
        }
    };

    function filter_function() {
        const filtered_data = [];
        const data_copy = JSON.parse(JSON.stringify(data.value));
        for (const item of data_copy) {
            if (!item[selected_field.value]) {
                if (search_string.value === "" || search_string.value === "null") {
                    filtered_data.push(item);
                }
            } else if (selected_field.value == "records" || selected_field.value == "creators") {
                if (JSON.stringify(item[selected_field.value]).toLowerCase().includes(search_string.value.toLowerCase())) {
                    filtered_data.push(item);
                };
            } else if (String(item[selected_field.value]).toLowerCase().includes(search_string.value.toLowerCase())) {
                filtered_data.push(item);
            };
        };
        return filtered_data;
    };

    function search_reset() {
        document.getElementById("search_input").value = "";
        search_string.value = '';
        data_filtered.value = JSON.parse(JSON.stringify(data.value));
    };

    function fake_submit() {
        document.getElementById("search_input").blur();
    };

    const router = useRouter();
    const data = ref([]);
    const data_filtered = ref([]);
    const dataModal = ref({padding: ''});
    const oldModel = ref({});
    const updModel = ref({});
    const newModel = ref({});
    const emptyModel = ref({new: true});
    const isOpen = ref(false);

    async function change_page() {
        data.value = (await api_get(`/${selected_page.value.path}?raw=true`)).value;
        data_filtered.value = JSON.parse(JSON.stringify(data.value));
        search_reset();
        selected_page_fields.value = fields[selected_page.value.path];
        sorting_icons.value = {id: "fa-arrow-down-short-wide"};
        sorting_fields.value = [JSON.parse(JSON.stringify(default_sort))];
        selected_page_fields_types.value = fields_types[selected_page.value.path];
        selected_field.value = selected_page_fields.value[0];
        const pairs = selected_page_fields.value.map((key) => [key, null]);
        emptyModel.value = Object.fromEntries(pairs);
        emptyModel.value.new = true;
    };

    function closeModal() {
        isOpen.value = false;
        document.getElementById('dialog-all').style.paddingRight = "";
        dataModal.value.padding = "";

        const [errors, object] = parse_input(true);
        if (dataModal.value.new) {
            if (!empty_object(object)) {
                newModel.value = object;
            };
        } else {
            updModel.value = object;
        };
    };

    function parse_into_datamodal(item) {
        const item_parsed = JSON.parse(JSON.stringify(item));
        if (Object.hasOwn(item_parsed, "records")) {
            if (item_parsed.records) {
                item_parsed.records = JSON.stringify(item_parsed.records, null, 4);
            }
        };
        if (Object.hasOwn(item_parsed, "creators")) {
            if (item_parsed.creators) {
                item_parsed.creators = JSON.stringify(item_parsed.creators, null, 4);
            }
        };
        if (Object.hasOwn(item_parsed, "rules")) {
            if (item_parsed.rules) {
                item_parsed.rules = JSON.stringify(item_parsed.rules, null, 4);
            }
        };
        return item_parsed;
    }

    function openModal(item) {
        dataModal.value = parse_into_datamodal(item);
        var scroller = window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth);
        dataModal.value.padding = 'padding-right: ' + scroller + 'px !important;';
        isOpen.value = true;

        if (dataModal.value.new) {
            if (!empty_object(newModel.value)) {
                Object.assign(dataModal.value, newModel.value);
            };
        } else {
            if (dataModal.value.id == updModel.value.id) {
                Object.assign(dataModal.value, updModel.value);
            } else {
                updModel.value = JSON.parse(JSON.stringify(dataModal.value));
                oldModel.value = JSON.parse(JSON.stringify(dataModal.value));
            };
        };
    };

    onBeforeMount(async () => {
        const admin = (await api_get('/admin/me')).value || "";
        if (admin == "") {
            router.push({ path: '/' });
        };
        data.value = (await api_get(`/${selected_page.value.path}?raw=true`)).value;
        data_filtered.value = JSON.parse(JSON.stringify(data.value));
        const pairs = selected_page_fields.value.map((key) => [key, null]);
        emptyModel.value = Object.fromEntries(pairs);
        emptyModel.value.new = true;
    });

    function get_text_mode(field) {
        return ['', 'id', 'episodes', 'score', 'order', 'auction_id', 'marathon_id', 'steam_id'].includes(field) ? 'text-center' : 'text-left';
    };

    function empty_object(object) {
        for (const field of selected_page_fields.value) {
            if (typeof object[field] !== 'undefined') {
                return false;
            }
        };
        return false;
    };

    async function create_item() {
        const button_create = document.getElementById("button_create");
        button_create.disabled = true;

        const [errors, new_object] = parse_input(false);
        if (errors) {
            return;
        };

        const answer = (await api_post(`/${selected_page.value.path}`, [new_object], "data")).value;
        if (answer.error) {
            button_create.textContent = JSON.stringify(answer.content || "Неизвестная ошибка!");
        } else {
            button_create.textContent = answer.content[0] != -1 ? "Добавлено" : "Уже присутствует";
            if (answer.content[0] != -1) {
                data.value = (await api_get(`/${selected_page.value.path}?raw=true`)).value;
                if (search_string.value) {
                    data_filtered.value = filter_function();
                } else {
                    data_filtered.value = JSON.parse(JSON.stringify(data.value));
                }
                clear_input();
                newModel.value = {};
            };
        };
        await sleep(5000);
        button_create.textContent = "Добавить";
        button_create.disabled = false;
    };

    async function update_item() {
        const button_update = document.getElementById("button_update");
        const button_delete = document.getElementById("button_delete");
        button_update.disabled = true;
        button_delete.disabled = true;

        const [err, upd_object_str] = parse_input(true);
        const [errors, upd_object] = parse_input(false);
        if (errors) {
            return;
        };

        var is_updated = false;
        const updated_object = {};
        for (const field of selected_page_fields.value) {
            if (String(oldModel.value[field] || "") != String(upd_object_str[field] || "")) {
                is_updated = true;
                updated_object[field] = upd_object[field] || null;
                if (!updated_object[field]) {
                    const field_type = selected_page_fields_types.value[field];
                    switch (field_type.type) {
                        case "str":
                            updated_object[field] = "";
                            break;
                        case "int":
                            updated_object[field] = -1;
                            break;
                        case "float":
                            updated_object[field] = -1.0;
                            break;
                        case "json":
                            updated_object[field] = [];
                            break;
                        case "datetime":
                            updated_object[field] = "1969-12-31 23:59:59+00:00";
                            break;
                        case "date":
                            updated_object[field] = "1969-12-31";
                            break;
                    };
                };
            };
        };

        var is_new_id = false; 
        if (upd_object?.new_id) {
            updated_object["new_id"] = upd_object["new_id"];
            is_new_id = true;
            is_updated = true;
        }

        if (is_updated) {
            const primary_field_data = get_primary_field();
            updated_object[primary_field_data.field] = primary_field_data.value
            const answer = (await api_put(`/${selected_page.value.path}`, [updated_object])).value;
            if (answer.error) {
                button_update.textContent = JSON.stringify(answer.content || "Неизвестная ошибка!");
            } else {
                button_update.textContent = answer.content.info[0].toLowerCase() == "updated" ? "Обновлено" : answer.content.info[0];
                if (answer.content.info[0].toLowerCase() == "updated") {
                    data.value = (await api_get(`/${selected_page.value.path}?raw=true`)).value;
                    if (search_string.value) {
                        data_filtered.value = filter_function();
                    } else {
                        data_filtered.value = JSON.parse(JSON.stringify(data.value));
                    }
                    
                    for (const element of data_filtered.value) {
                        if (!is_new_id && element[primary_field_data.field] == primary_field_data.value) {
                            Object.assign(dataModal.value, parse_into_datamodal(element));
                            break;
                        };
                        if (is_new_id && element["id"] == parseInt(updated_object["new_id"], 10)) {
                            Object.assign(dataModal.value, parse_into_datamodal(element));
                            document.getElementById("input__new_id").value = null;
                            break;
                        }
                    };
                    oldModel.value = JSON.parse(JSON.stringify(dataModal.value));
                    updModel.value = JSON.parse(JSON.stringify(dataModal.value));
                };
            }
        } else {
            button_update.textContent = "Изменений не зафиксировано";
        };

        await sleep(5000);
        button_update.textContent = "Изменить";
        button_delete.disabled = false;
        button_update.disabled = false;

        // oldModel.value = {};
        // updModel.value = {};
    };

    async function delete_item() {
        const button_update = document.getElementById("button_update");
        const button_delete = document.getElementById("button_delete");
        button_update.disabled = true;
        button_delete.disabled = true;

        const primary_field_data = get_primary_field();
        const delete_data = {};
        delete_data[primary_field_data.field] = primary_field_data.value

        const answer = (await api_delete(`/${selected_page.value.path}`, [delete_data])).value;
        if (answer.error) {
            button_delete.textContent = JSON.stringify(answer.content || "Неизвестная ошибка!");
            await sleep(5000);
            button_delete.textContent = "Удалить";
            button_delete.disabled = false;
            button_update.disabled = false;
        } else {
            button_delete.textContent = answer.content.info[0] ? "Удалено" : "Отсутствует";
            if (answer.content.info[0]) {
                data.value = (await api_get(`/${selected_page.value.path}?raw=true`)).value;
                if (search_string.value) {
                    data_filtered.value = filter_function();
                } else {
                    data_filtered.value = JSON.parse(JSON.stringify(data.value));
                }
            };
        };
    };

    function get_primary_field() {
        var primary_field = null;
        var primaty_field_value = null;
        for (const field of selected_page_fields.value) {
            if (selected_page_fields_types.value[field]?.primary) {
                primary_field = field;
                break
            }
        };
        const primary_field_element = document.getElementById(`input__${primary_field}`);
        switch (selected_page_fields_types.value[primary_field].type) {
            case "str":
                primaty_field_value = primary_field_element.value;
                break;
            case "int":
                primaty_field_value = parseInt(primary_field_element.value, 10);
                break;
        };
        return {field: primary_field, value: primaty_field_value};
    }

    function parse_input(raw) {
        var errors = false;
        const elements_input = document.querySelectorAll('input[id^="input__"]');
        const elements_textarea = document.querySelectorAll('textarea[id^="input__"]');
        const input_object = {};
        for (const element of elements_input) {
            if (!element.value) {
                continue;
            };
            // anime - "added_time", "completed_time"
            // auctions
            // challenges
            // cinema
            // credits
            // games - type when from ordered
            // lore
            // marathons
            // merch
            // roulette
            // socials
            input_object[remove_prefix(element.id, "input__")] = element.value;
        };
        for (const element of elements_textarea) {
            if (!element.value) {
                continue;
            };
            // challenges - records (json)
            // credits - creators (json)
            // games - records (json)
            // marathons - rules (json-list[str]), records (json)
            if (raw) {
                input_object[remove_prefix(element.id, "input__")] = element.value;
            } else {
                try {
                    input_object[remove_prefix(element.id, "input__")] = JSON.parse(element.value);
                } catch (error) {
                    alert("JSON schema error!");
                    errors = true;
                };
            };
        };
        return [errors, input_object];
    };

    function clear_input() {
        const elements_input = document.querySelectorAll('input[id^="input__"]');
        const elements_textarea = document.querySelectorAll('textarea[id^="input__"]');
        for (const element of elements_input) {
            element.value = null;
        };
        for (const element of elements_textarea) {
            element.value = null;
        };
    };

    const sorting_icons = ref({id: "fa-arrow-down-short-wide"});
    const default_sort = {name: "id", direction: "asc"};
    const sorting_fields = ref([JSON.parse(JSON.stringify(default_sort))]);

    function reset_sort() {
        sorting_icons.value = {id: "fa-arrow-down-short-wide"};
        sorting_fields.value = [JSON.parse(JSON.stringify(default_sort))]
        sort_function();
    };

    function trigger_sort(field) {
        if (!Object.hasOwn(sorting_icons.value, field)) {
            sorting_icons.value[field] = "fa-solid fa-arrows-up-down"
        };

        switch (sorting_icons.value[field]) {
            case "fa-solid fa-arrows-up-down":
                sorting_icons.value[field] = "fa-arrow-down-short-wide";
                var field_item = sorting_fields.value.find(item => item.name === field);
                if (field_item) {
                    field_item["direction"] = "asc";
                } else {
                    sorting_fields.value.push({name: field, direction: "asc"});
                };
                break;
            case "fa-arrow-down-short-wide":
                sorting_icons.value[field] = "fa-arrow-down-wide-short";
                var field_item = sorting_fields.value.find(item => item.name === field);
                if (field_item) {
                    field_item["direction"] = "desc";
                } else {
                    sorting_fields.value.push({name: field, direction: "desc"});
                };
                break;
            case "fa-arrow-down-wide-short":
                sorting_icons.value[field] = "fa-solid fa-arrows-up-down";
                sorting_fields.value = sorting_fields.value.filter(item => item.name !== field);
                break;
        };

        sort_function();
    };

    function sort_function() {
        if (!sorting_fields.value.length) {
            if (search_string.value) {
                data_filtered.value = filter_function();
            } else {
                data_filtered.value = JSON.parse(JSON.stringify(data.value));
            }
            return;
        };

        for (const field of sorting_fields.value.slice().reverse()) {
            const field_type = selected_page_fields_types.value[field.name];
            const field_direction = field?.direction || "asc";
            switch (field_type.type) {
                case "str":
                case "datetime":
                case "date":
                    data_filtered.value.sort(
                        (a, b) =>
                        field_direction == "asc"
                        ?
                        (a[field.name] || "").localeCompare((b[field.name] || ""))
                        :
                        (b[field.name] || "").localeCompare((a[field.name] || ""))
                    );
                    break;
                case "int":
                case "float":
                    data_filtered.value.sort(
                        (a, b) =>
                        a[field.name] === null ? -1 : b[field.name] === null ?  1 :
                        field_direction == "asc"
                        ?
                        a[field.name] - b[field.name]
                        :
                        b[field.name] - a[field.name]
                    );
                    break;
                case "json":
                    data_filtered.value.sort(
                        (a, b) =>
                        field_direction == "asc"
                        ?
                        JSON.stringify((a[field.name] || "")).localeCompare(JSON.stringify((b[field.name] || "")))
                        :
                        JSON.stringify((b[field.name] || "")).localeCompare(JSON.stringify((a[field.name] || "")))
                    );
                    break;
            };
        }
    };
</script>
