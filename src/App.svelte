<script>
	// import {db} from '/firebase.js'
	// db.settings({timestampsInSnapshots: true});

	// Your web app's Firebase configuration
	var firebaseConfig = {
	  apiKey: "AIzaSyC8Yb45f3suXbaMFOnak9if7062WRs-h4s",
	  authDomain: "sdoh-d42df.firebaseapp.com",
	  databaseURL: "https://sdoh-d42df.firebaseio.com",
	  projectId: "sdoh-d42df",
	  storageBucket: "sdoh-d42df.appspot.com",
	  messagingSenderId: "963007919921",
	  appId: "1:963007919921:web:b9a6246439613f915da210"
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	const db = firebase.firestore();

	db.collection('cbos').get().then((snapshot) => {
		snapshot.docs.forEach((doc, i) => {
			console.log(doc.data())
		});

	})
	export let name;
	let cbos = [];

	fetch("cbos.js")
	.then(res => res.json())
	.then(data => cbos = data)
	// .then(data => console.log(data))

</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>

	{#each cbos as c(c.id)}
		<p>{c.name}</p>
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
