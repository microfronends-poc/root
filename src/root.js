import { registerApplication, start } from 'single-spa';

registerApplication({
	name: '@mf/navbar',
	app: () => System.import('@mf/navbar'),
	activeWhen: '/'
});

registerApplication({
	name: '@mf/app1',
	app: () => System.import('@mf/app1'),
	activeWhen: ['/app1', locatioon => locatioon.pathname === '/']
});

registerApplication({
	name: '@mf/app2',
	app: () => System.import('@mf/app2'),
	activeWhen: ['/app2']
});

start();