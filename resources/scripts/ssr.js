import {createInertiaApp} from '@inertiajs/inertia-vue3';
import createServer from '@inertiajs/server';
import {renderToString} from '@vue/server-renderer';
import {resolvePageComponent} from 'vite-plugin-laravel';
import {createSSRApp, h} from 'vue';

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => resolvePageComponent(`../views/pages/${name}.vue`, import.meta.glob('../views/pages/**/*.vue')),
        setup({app, props, plugin}) {
            return createSSRApp({render: () => h(app, props)}).use(plugin);
        },
    })
);
