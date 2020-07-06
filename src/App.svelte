<script>
	import {db} from './firebase.js'
	import DemoInput from './DemoInput.svelte'
	import Slider from '@smui/slider/bare.js'
	import '@smui/slider/bare.css'

	let cboList = [];
	let NutritionVal = 0;

	db.collection('cbos').onSnapshot((snapshot) => {
		cboList = snapshot.docs;
		// snapshot.docs.forEach((doc, i) => {
		// 	console.log(doc.data())
		// });
	})

	export let name;
	let cbos = [];

	fetch("cbos.js")
	.then(res => res.json())
	.then(data => cbos = data)
	// .then(data => console.log(data))

</script>

<main>
	<div class="columns">
		<div class="column">
			<h1>Hello {name}!</h1>
		</div>
		<div class="column">
			<Slider bind:NutritionVal />
			<DemoInput />
		</div>
	</div>



	{#each cboList as c(c.id)}
		<p>{c.data().program}</p>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
