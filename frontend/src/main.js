import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'


import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faCalculator,
    faLayerGroup,
    faPlus,
    faInbox,
    faPlay,
    faSquareRootVariable,
    faShapes,
    faCodeBranch,
    faListOl,
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faCalculator,
    faLayerGroup,
    faPlus,
    faInbox,
    faPlay,
    faSquareRootVariable,
    faShapes,
    faCodeBranch,
    faListOl,
)
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(Vue3Toastify, {
    transition: toast.TRANSITIONS.SLIDE,
    position: toast.POSITION.BOTTOM_RIGHT,
    theme: toast.THEME.COLORED,
    pauseOnFocusLoss: false,
    multiple: true,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
