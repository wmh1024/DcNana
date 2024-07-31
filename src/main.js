import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'vant/lib/index.css';
import App from './App.vue'

import router from './router'
import persist from 'pinia-plugin-persistedstate'

import {
    Badge,
    Button,
    Card,
    Cell,
    CellGroup,
    Checkbox,
    CheckboxGroup,
    Empty,
    Field,
    Icon,
    Image as VanImage,
    NavBar,
    NoticeBar,
    Notify,
    Popup,
    Search,
    Space,
    Stepper,
    Tabbar,
    TabbarItem,
    Tag,
    Toast,
    Watermark,
    Tab,
    PullRefresh,
    Tabs
} from 'vant';

const app = createApp(App)
app.use(createPinia())
app.use(VanImage);
app.use(Button);
app.use(PullRefresh);
app.use(router)
app.use(Watermark)
app.use(Checkbox)
app.use(Empty)
app.use(CheckboxGroup)
app.use(Card)
app.use(NavBar)
app.use(Tabbar)
app.use(Field)
app.use(Popup)
app.use(Notify)
app.use(Search)
app.use(TabbarItem)
app.use(Tabs)
app.use(Tab)
app.use(NoticeBar)
app.use(Icon)
app.use(Space)
app.use(Cell)
app.use(CellGroup)
app.use(Tag)
app.use(Stepper)
app.use(Toast)
app.use(Badge)
app.use(createPinia().use(persist))

app.mount('#app')
