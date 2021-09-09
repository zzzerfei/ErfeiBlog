import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: "/",
    //     name: "index",
    //     component: () =>
    //         import(/* webpackChunkName: "index" */ "../view/Index/index.vue")
    // },
    {
        path: "/blog",
        name: "blog",
        component: () =>
            import(/* webpackChunkName: "home" */ "../view/Home/home.vue")
    },
    {
        path: "/archive",
        name: "archive",
        component: () =>
            import(/* webpackChunkName: "archive" */ "../view/Archive/archive.vue")
    },
    {
        path: "/message",
        name: "message",
        component: () =>
            import(/* webpackChunkName: "message" */ "../view/Message/message.vue")
    },
    {
        path: "/about",
        name: "about",
        component: () =>
            import(/* webpackChunkName: "about" */ "../view/About/about.vue")
    },
    {
        path: "/blogDetail",
        name: "blogDetail",
        component: () =>
            import(/* webpackChunkName: "blogdetail" */ "../view/BlogDetail/blogdetail.vue")
    },
    {
        path: "/project",
        name: "project",
        component: () =>
            import(/* webpackChunkName: "blogdetail" */ "../view/Project/project.vue")
    },
    {
        path: "/course",
        name: "course",
        component: () =>
            import(/* webpackChunkName: "blogdetail" */ "../view/Course/course.vue")
    }

];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;