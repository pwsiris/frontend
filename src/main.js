import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

import './main.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDiscord, faTwitch, faYoutube, faVk, faTelegram, faInstagram, faSteam } from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope, faTrophy, faCircleDollarToSlot, faArrowUpRightFromSquare,
    faXmark, faBars, faAngleDown, faImages, faLanguage, faGamepad,
    faHandshakeAngle, faListCheck, faBook, faCoins, faMessage, faMagnifyingGlassPlus,
    faCaretUp, faCaretLeft, faCaretRight
} from '@fortawesome/free-solid-svg-icons';
import { faBoosty, faDonationAlerts, faMyAnimeList, faRoulette, faGamepadDemo } from "@/icons";

library.add(
    faDiscord, faTwitch, faYoutube, faVk, faTelegram, faInstagram, faSteam,
    faEnvelope, faTrophy, faCircleDollarToSlot, faArrowUpRightFromSquare, faXmark,
    faBars, faAngleDown, faMyAnimeList, faBoosty, faDonationAlerts, faRoulette, faImages,
    faLanguage, faGamepad, faHandshakeAngle, faListCheck, faBook, faCoins, faMessage,
    faMagnifyingGlassPlus, faCaretUp, faCaretLeft, faCaretRight, faGamepadDemo
);

const app = createApp(App);

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
