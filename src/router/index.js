import { createRouter, createWebHistory } from 'vue-router'

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
            path: "/lore",
            name: 'LoreView',
            component: () => import('../views/Lore.vue'),
            meta: {
                title: 'Обо мне | Iris_ti'
            }
        },
        {
            path: "/links",
            name: 'LinksView',
            component: () => import('../views/Links.vue'),
            meta: {
                title: 'Ссылки | Iris_ti'
            }
        },
        {
            path: "/games",
            name: 'GamesView',
            component: () => import('../views/Games.vue'),
            meta: {
                title: 'Игры | Iris_ti'
            }
        },
        {
            path: "/challenges",
            name: 'ChallengesView',
            component: () => import('../views/Challenges.vue'),
            meta: {
                title: 'Челенжи | Iris_ti'
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
            path: "/:pathMatch(.*)*",
            name: 'ErrorView',
            component: () => import('../views/NotFound.vue'),
            meta: {
                title: 'Iris_ti'
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    const title = to.meta.title
    if (title) {
        document.title = title
    }
    next()
})

export default router
