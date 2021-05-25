import Vue from "vue";
import VueRouter from "vue-router";
// import Home from '../views/Home.vue'
import Main from "../views/Main.vue";
import CategoryEdit from "../views/CategoryEdit.vue";
import CategoryList from "../views/CategoryList.vue";

import ItemsEdit from "../views/ItemsEdit.vue";
import ItemsList from "../views/ItemsList.vue";

import HeroEdit from "../views/HeroEdit.vue";
import HeroList from "../views/HeroList.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Main,
    children: [
      {
        path: "/categories/create",
        component: CategoryEdit
      },
      {
        path: "/categories/list",
        component: CategoryList
      },
      {
        path: "/categories/edit/:id",
        component: CategoryEdit,
        props: true
      },
      {
        path: "/items/create",
        component: ItemsEdit
      },
      {
        path: "/items/list",
        component: ItemsList
      },
      {
        path: "/items/edit/:id",
        component: ItemsEdit,
        props: true
      },
      {
        path: "/heroes/create",
        component: HeroEdit
      },
      {
        path: "/heroes/list",
        component: HeroList
      },
      {
        path: "/heroes/edit/:id",
        component: HeroEdit,
        props: true
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
