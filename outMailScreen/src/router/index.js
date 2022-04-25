import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);
var router;
export default (router = new Router({
    routes: [
        {
            path: "/main",
            component: () => import("@/views/layout"),
            meta: {
                requireAuth: true, // 只要此字段为true，必须做鉴权处理
                title: "首页",
                icon: "home"
            },
            children: [
                {
                    path: "",
                    name: "main",
                    component: () => import("@/views/primary"),
                    meta: {}
                },

                /* {
                   path: "datashow",
                   name: "datashow",
                   component: () => import("@/views/datashow"),
                   meta: {    //元数据
                     title: "数据展示",
                     icon: "cloud"
                   }
                 },*/

                // {
                //   path: "eccShowRed",
                //   name: "eccShowRed",
                //   component: () => import("@/views/eccShowRed"),
                //   meta: {
                //     title: "模板",
                //     icon: "cloud"
                //   }
                // },

                {
                    path: "user",
                    name: "user",
                    component: () => import("@/views/user"),
                    meta: {
                        title: "用户管理",
                        icon: "setting"
                    }
                },
                {
                    path: "role",
                    name: "role",
                    component: () => import("@/views/role"),
                    meta: {
                        title: "角色管理",
                        icon: "setting"
                    }
                },

                {
                    path: "menu",
                    name: 'menu',
                    component: () => import('@/views/menu'),
                    meta: {
                        title: '菜单管理',
                        icon: 'setting'
                    }
                },

                {
                    path: "timeTask",
                    name: 'timeTask',
                    component: () => import('@/views/timeTask'),
                    meta: {
                        title: '定时任务管理',
                        icon: 'shopping-cart'
                    }
                },
                {
                    path: "systemInfo",
                    name: 'systemInfo',
                    component: () => import('@/views/systemInfo'),
                    meta: {
                        title: '系统信息维护',
                        icon: 'setting'
                    }
                },

                {
                    path: "staffInfo",
                    name: 'staffInfo',
                    component: () => import('@/views/staffInfo'),
                    meta: {
                        title: '员工信息管理',
                        icon: 'setting'
                    }
                },
                {
                    path: "mailCfgInfo",
                    name: 'mailCfgInfo',
                    component: () => import('@/views/mailCfgInfo'),
                    meta: {
                        title: "邮箱信息配置",
                        icon: 'setting'
                    }
                },
                {
                    path: "textStyleInfo",
                    name: 'textStyleInfo',
                    component: () => import('@/views/textStyleInfo'),
                    meta: {
                        title: "邮件内容配置",
                        icon: 'setting'
                    }
                },
                {
                    path: "mailLogInfo",
                    name: 'mailLogInfo',
                    component: () => import('@/views/mailLogInfo'),
                    meta: {
                        title: "邮件流水查询",
                        icon: 'mail'
                    }
                },
            ]
        },
        {
            path: "/404",
            name: "404",
            component: () => import("@/views/notFind")
        },
        {
            path: "",
            redirect: "/main"
        },
        {
            path: "*",
            redirect: "/404"
        },
        {
            path: "/login",
            component: () => import("@/views/login")
        }
    ]
}));

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        if (store.state.token == "" || store.state.token == undefined) {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});
