import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// ready: false
	}
});

// we need to create this callback function so that
// the Google Maps script can announce itself
// window.initMap = function ready() {
// 	app.$set({ ready: true });
// }

export default app;
