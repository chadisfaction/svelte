<script>
	import {db} from './firebase.js'
	import DemoInput from './DemoInput.svelte'
	import Slider from '@smui/slider/bare.js'
	import '@smui/slider/bare.css'
	import FormField from '@smui/form-field/bare.js'
	import '@smui/form-field/bare.css'
	import CboForm from './CboForm.svelte'

// google maps api key = AIzaSyA5SrG4ftLI835oSQWGkm-2Uznmd5oF8v4

	// import Geocodio from 'geocodio-library-node/lib/index.js';
	// //
	// const geocoder = new Geocodio('80a8098505d8ae8f8f8a68d9f5f9886c6df8f8d');


	let cboList = [];

	let diabetesVal = 0;
	let hypertensionVal = 0;
	let cholesterolVal = 0;
	let economicVal = 0;
	let transitCostVal = 0;
	let transitAccessVal = 0;

	let showModal = false;
	let showDemo = true;
	let showCbos = true;
	let showSliders = true;
	let showServiceTags = true;
	let showKroger = false;

	let service_tags = ["emergency food","food pantry","food delivery","government food benefits","meals","nutrition education","help pay for food",
		"help pay for transit","prescription assistance","medication management","help pay for car/gas","bus passes","health education","clothing","shelter"]
	// db.collection('cbos').orderBy('program').onSnapshot((snapshot) => {
	// 	cboList = snapshot.docs;
	// })

	let cbos = [];
	let cbos2 = [];
	let active_service_tags = [];
	let cboFields = [];
	let patientData = {zipcode: ''};


	// let map;
	// const initMap = () => {
	//   map = new google.maps.Map(document.getElementById("map"), {
	//     center: { lat: -34.397, lng: 150.644 },
	//     zoom: 8
	//   });
	// }

	// fetch("cbos.js")
	// .then(res => res.json())
	// .then(data => cbos = data)

	const calcDistances = (origin_zip) => {
		let isgood = false;


		if(isgood) {
			// let url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=45202&destinations=80228|90210&departure_time=now&key=AIzaSyA5SrG4ftLI835oSQWGkm-2Uznmd5oF8v4"

			let base = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&departure_time=now";
	    let origin = "&origins=" + "45202";
	    let destination = "&destinations=" + "80228|90210";
	    let key = "&key=AIzaSyA5SrG4ftLI835oSQWGkm-2Uznmd5oF8v4";
			let url = base + time + origin + destination + key + "&transit_mode=driving";
			fetch(url)
			.then(res => res.json())
			.then(data => console.log(data));
		}else{
			return false;
		}
	};


	const toggleModal = () => {
		showModal = !showModal;
	};

	const handleShowAll = () => {
		diabetesVal = 0;
		hypertensionVal = 0;
		cholesterolVal = 0;
		economicVal = 0;
		transitCostVal = 0;
		transitAccessVal = 0;
		service_tags = ["emergency food","food pantry","food delivery","government food benefits","meals","nutrition education","help pay for food",
			"help pay for transit","prescription assistance","medication management","help pay for car/gas","bus passes","health education","clothing","shelter"];
		db.collection('cbos').orderBy('program').onSnapshot((snapshot) => {
			cboList = snapshot.docs;
		});
	};

	const handleSlider = () => {
		active_service_tags = [];
		if(diabetesVal == 3){
			active_service_tags.push("food delivery", "meals", "prescription assistance", "medication management");
		}
		if(diabetesVal == 2){
			active_service_tags.push("nutrition education", "health education");
		}
		if(diabetesVal == 1){
			active_service_tags.push("nutrition education", "health education");
		}
		if(hypertensionVal == 3){
			active_service_tags.push("food delivery", "meals", "prescription assistance", "medication management");
		}
		if(hypertensionVal == 2){
			active_service_tags.push("nutrition education", "health education");
		}
		if(hypertensionVal == 1){
			active_service_tags.push("nutrition education", "health education");
		}
		if(cholesterolVal == 3){
			active_service_tags.push("food delivery", "meals", "prescription assistance", "medication management");
		}
		if(cholesterolVal == 2){
			active_service_tags.push("nutrition education", "health education");
		}
		if(cholesterolVal == 1){
			active_service_tags.push("nutrition education", "health education");
		}
		if(economicVal == 3){
			active_service_tags.push("emergency food","food pantry","government food benefits","meals","help pay for food","help pay for transit","prescription assistance","medication management","help pay for car/gas","bus passes");
		}
		if(economicVal == 2){
			active_service_tags.push("government food benefits","meals","nutrition education", "help pay for car/gas","bus passes","health education");
		}
		if(economicVal == 1){
			active_service_tags.push("nutrition education", "health education");
		}
		if(transitCostVal == 2){
			active_service_tags.push("help pay for transit", "help pay for car/gas", "bus passes");
		}
		if(transitCostVal == 1){
			// active_service_tags.push();
		}
		if(transitAccessVal == 2){
			active_service_tags.push("food delivery", "meals", "help pay for transit", "bus passes");
		}
		if(transitAccessVal == 1){
			active_service_tags.push("prescription assistance", "help pay for car/gas");
		}
		service_tags = active_service_tags;

		if (service_tags.length > 0){
			db.collection('cbos').where("service_tags", "array-contains-any", service_tags).orderBy('program').onSnapshot((snapshot) => {
				cboList = snapshot.docs;
			})
		}else{
			cboList= [];
		}

		console.log(active_service_tags);
	};

	const handleAdd = (e) => {
		const cboData = e.detail;
		// console.log(cboData);
		toggleModal();
	}

	const editCbo = (id, cbo) => {
		cboFields = cbo;
		cboFields.id = id;
		if (cboFields.service_tags && !Array.isArray(cboFields.service_tags)){
		  cboFields.service_tags = cboFields.service_tags.split(',').map(s => s.trim());
		}else if (typeof cboFields.service_tags == "undefined" ) {
			cboFields.service_tags = [];
		}
		toggleModal();
	}


	// .then(data => console.log(data))

	// fetch("cbos_cincinnati2.js")
	// .then(res => res.json())
	// .then(data => cbos2 = data)
	// .then(data => addCbosToDb(data))
	// .then(data => console.log(data))

	// function addCbosToDb() {
	// 	cbos2.forEach(function(obj) {
	// 		//console.log(obj);
	// 		db.collection("cbos").add({
	// 				program: obj.program,
	// 				description: obj.description,
	// 				url: obj.url,
	// 				address: obj.address,
	// 				zipcode: obj.zipcode
	// 		}).then(function(docRef) {
	// 				console.log("Document written with ID: ", docRef.id);
	// 		})
	// 		.catch(function(error) {
	// 				console.error("Error adding document: ", error);
	// 		});
	// 	});
	// }

</script>
<nav class="navbar" role="navigation" aria-label="main navigation">
	<div class="navbar-brand">
		<!-- navbar items, navbar burger... -->
		<h2>Social Vulnerability Assistance</h2>
	</div>
	<div class="navbar-item has-dropdown is-hoverable navbar-end">
    <a class="navbar-link">
      Settings
    </a>
    <div class="navbar-dropdown is-right">
			<label class="checkbox navbar-item">
				<input type="checkbox" bind:checked={showDemo} >
				Show demographic inputs
			</label>
			<label class="checkbox navbar-item">
				<input type="checkbox" bind:checked={showCbos}>
				Show filtered CBOs
			</label>
			<label class="checkbox navbar-item">
				<input type="checkbox" bind:checked={showServiceTags}>
				Show service tags
			</label>
			<label class="checkbox navbar-item">
				<input type="checkbox" bind:checked={showSliders}>
				Show vulnerability indicators
			</label>
			<hr class="dropdown-divider">
			<label class="checkbox navbar-item">
				<input type="checkbox" bind:checked={showKroger}>
				Show Kroger Interventions
			</label>
			<hr class="dropdown-divider">
			<button class="button showcbos is-link is-light ml-5" on:click={handleShowAll}>Show all CBOs</button>
			<!-- <label class="checkbox navbar-item">
				<input type="checkbox" bind:checked={showAllCBOs}>
				Show all CBOs
			</label> -->
    </div>
  </div>
</nav>
<main>


	<!-- <div class="tile is-ancestor">
		<div class="tile is-4 is-parent is-vertical"> -->

	<div class="columns is-desktop">
	 <div class="column is-one-third">
	 <!-- <button class="button" on:click={taco} >distances</button> -->
	 	{#if showSliders}
			<div class="box sliders ">
				<!-- <button class="button" on:click={addCbosToDb}>Add to DB</button> -->
				<label>Nutrition</label>
				<Slider bind:value={diabetesVal} min={0} max={3} step={1}  displayMarkers on:click={handleSlider}/>
				<label>Hypertension</label>
				<Slider bind:value={hypertensionVal} min={0} max={3} step={1}  displayMarkers on:click={handleSlider} />
				<label>Cholesterol</label>
				<Slider bind:value={cholesterolVal} min={0} max={3} step={1}  displayMarkers on:click={handleSlider}/>
				<label>Economic Hardship</label>
				<Slider bind:value={economicVal} min={0} max={3} step={1}  displayMarkers on:click={handleSlider} />
				<label>Transit Economic Challenges</label>
				<Slider bind:value={transitCostVal} min={0} max={2} step={1}  displayMarkers on:click={handleSlider} />
				<label>Transit Access Challenges</label>
				<Slider bind:value={transitAccessVal} min={0} max={2} step={1}  displayMarkers on:click={handleSlider} />
			</div>
		{/if}

			{#if showDemo}
				<div class="box">
					<DemoInput {patientData} />
				</div>
			{/if}
		</div>

	  <!-- <div class="tile is-parent is-vertical"> -->
		<div class="column">
			{#if showServiceTags}
				<div class="box">
					<div class="tags">
						{#each service_tags as t}
							<span class="tag">{t}</span>
						{/each}
					</div>
				</div>
			{/if}
			{#if showCbos}
				{#each cboList as c(c.id)}
					<div class="box cbo_wrap">
						<h4>{c.data().program}</h4>
						<p>{c.data().description}</p>
						{#if !! c.data().address}
							<p><span class="material-icons">location_on</span>{c.data().address}</p>
						{/if}
						{#if !! c.data().url}
							<p><span class="material-icons">computer</span><a href={c.data().url} target=”_blank”>Website</a></p>
						{/if}
						{#if !! c.data().phone }
							<p><span class="material-icons">local_phone</span>{c.data().phone}</p>
						{/if}
						{#if !! c.data().service_tags }
							<div class="tags service">
								{#each c.data().service_tags as stag}
									<span class="tag">{stag}</span>
								{/each}
							</div>
						{/if}
						<a class="cbo_edit" on:click={editCbo(c.id, c.data())}><span class="material-icons">settings</span></a>
					</div>
				{/each}
			{/if}
		</div>
	</div>

	<div class="modal" class:is-active={showModal}>
	  <div class="modal-background"></div>
	  <div class="modal-content box">
	    <!-- Any other Bulma elements you want -->
			<CboForm on:add={handleAdd} cboFields={cboFields} serviceTagsList={service_tags} />
	  </div>
	  <button class="modal-close is-large" aria-label="close" on:click={toggleModal}></button>
	</div>
	<!-- {#each cbos2 as co}
		<p>{co.program}</p>
	{/each} -->
</main>


<style>
	main {
		text-align: left;
		padding: 1em;
		/* max-width: 240px; */
		margin: 0 auto;
		height: auto !important;
    min-height: 100%;
		background-color: #eee;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	.navbar h2 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
		padding-left:20px
	}
	.cbo_wrap h4{
		font-size: 16px;
		font-weight: 600;
		color: #666;
		/* padding-bottom: 2px; */
	}
	.cbo_wrap{
		position: relative;
	}
	.cbo_wrap p {
		padding:2px 0;
		color: #999;
	}
	.cbo_wrap .material-icons {
		color: #ccc;
		position: relative;
    top: 6px;
		padding-right:4px
	}
	.cbo_wrap a{
		text-decoration:underline;
		color: #999;
	}
	.cbo_edit{
		position: absolute;
		bottom:10px;
		right:10px;
	}
	.sliders label{
		margin-bottom:-10px;
		color: #666;
	}
	.checkbox input {
		margin-right: 6px;
	}
	.tags.service{
		margin:10px 0 0 0;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
