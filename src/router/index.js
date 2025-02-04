import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: "/test",
        //     name: 'TestView',
        //     component: () => import('../views/Tests.vue'),
        //     meta: {
        //         title: 'TESTS | Iris_ti'
        //     }
        // },
        {
            path: '/',
            name: 'MainView',
            component: () => import('../views/Main.vue'),
            meta: {
                title: 'Iris_ti'
            }
        },
        {
            path: "/games",
            name: 'GamesView',
            component: () => import('../views/Games/Games.vue'),
            meta: {
                title: 'Игры | Iris_ti',
                description: 'Игры Iris_ti'
            }
        },
        {
            path: "/demos",
            name: 'DemosView',
            component: () => import('../views/Games/Demos.vue'),
            meta: {
                title: 'Демо | Iris_ti'
            }
        },
        {
            path: "/challenges",
            name: 'ChallengesView',
            component: () => import('../views/Games/Challenges.vue'),
            meta: {
                title: 'Челенжи | Iris_ti'
            }
        },
        {
            path: "/marathons",
            name: 'MarathonsView',
            component: () => import('../views/Games/Marathons.vue'),
            meta: {
                title: 'Марафоны | Iris_ti'
            }
        },
        {
            path: "/anime",
            name: 'AnimeView',
            component: () => import('../views/Anime.vue'),
            meta: {
                title: 'Аниме | Iris_ti'
            }
        },
        {
            path: "/merch",
            name: 'MerchView',
            component: () => import('../views/Merch.vue'),
            meta: {
                title: 'Мерч | Iris_ti'
            }
        },
        {
            path: "/credits",
            name: 'CreditsView',
            component: () => import('../views/Credits.vue'),
            meta: {
                title: 'Благодарности | Iris_ti'
            }
        },
        {
            path: "/auctions",
            name: 'AuctionsView',
            component: () => import('../views/Other/Auctions.vue'),
            meta: {
                title: 'Аукционы | Iris_ti'
            }
        },
        {
            path: "/lore",
            name: 'LoreView',
            component: () => import('../views/Other/Lore.vue'),
            meta: {
                title: 'Обо мне | Iris_ti'
            }
        },
        {
            path: "/message",
            name: 'MessageView',
            component: () => import('../views/Other/Message.vue'),
            meta: {
                title: 'Сообщение стримеру | Iris_ti'
            }
        },
        {
            path: "/roulette",
            name: 'RouletteView',
            component: () => import('../views/Other/Roulette.vue'),
            meta: {
                title: 'Рулетка | Iris_ti'
            }
        },
        {
            path: "/gallery",
            name: 'GalleryView',
            component: () => import('../views/Other/Gallery.vue'),
            meta: {
                title: 'Рулетка | Iris_ti'
            }
        },
        {
            path: "/machine-translation",
            name: 'MachineTranslationView',
            component: () => import('../views/Other/MachineTranslation.vue'),
            meta: {
                title: 'Машинный перевод | Iris_ti'
            }
        },
        {
            path: "/:pathMatch(.*)*",
            name: 'ErrorView',
            component: () => import('../views/NotFound.vue'),
            meta: {
                title: 'Iris_ti'
            }
        }
    ]
});

router.beforeEach((to, from, next) => {
    const title = to.meta.title;
    if (title) {
        document.title = title;
    }
    // const description = to.meta.description;
    // if (description) {
    //     Array.from(document.querySelectorAll('[meta-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
    //     const tag = document.createElement('meta');
    //     tag.setAttribute('name', 'description');
    //     tag.setAttribute('content', description);
    //     tag.setAttribute('meta-vue-router-controlled', '');

    //     console.log(document.head)

    //     document.head.appendChild(tag);
    // }
    next();
})

export default router;
