import {createInertiaApp} from '@inertiajs/inertia-vue3';
import createServer from '@inertiajs/server';
import {renderToString} from '@vue/server-renderer';
import {createSSRApp, h} from 'vue';

createServer(page =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: name => resolvePageComponent(`/resources/views/pages/${name}.vue`, import.meta.glob('/resources/views/pages/**/*.vue')),
        setup({app, props, plugin}) {
            return createSSRApp({render: () => h(app, props)}).use(plugin);
        },
    })
);


async function resolvePageComponent(name, pages, defaultLayout) {
    const path = pages[name];
    if (!path) {
        throw new Error(`Page component "${name}" could not be found.`);
    }
    let component = typeof path === "function" ? await path() : path;
    component = component.default ?? component;
    component.layout ?? (component.layout = defaultLayout);
    return component;
}



