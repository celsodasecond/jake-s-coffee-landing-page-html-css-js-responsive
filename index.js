// Confirmation when "Find us Here is Clicked"
confirmRedirect = (url) => {
	if (
		confirm(
			"A new window will pop-up showing the location of Jake's Coffee, do you wish to proceed?"
		)
	) {
		window.open(url);
	}
};

// Back to top Logic

let backToTopBtn = document.querySelector(".back-to-top");

window.onscroll = () => {
	if (
		document.body.scrollTop > 200 ||
		document.documentElement.scrollTop > 200
	) {
		backToTopBtn.style.display = "flex";
	} else {
		backToTopBtn.style.display = "none";
	}
};

// Top Navigation Highlight Logic

// let menuItems = document.getElementsByClassName("menu-item");

// Array.from(menuItems).forEach((item, index) => {
// 	item.onclick = (e) => {
// 		let currMenu = document.querySelector(".menu-item.active");
// 		currMenu.classList.remove("active");
// 		item.classList.add("active");
// 	};
// });

// Food Category Logic

let foodMenuList = document.querySelector(".food-item-wrap");

let foodCategory = document.querySelector(".food-category");

let categories = foodCategory.querySelectorAll("button");

Array.from(categories).forEach((item, index) => {
	item.onclick = (e) => {
		let currCat = foodCategory.querySelector("button.active");
		currCat.classList.remove("active");
		e.target.classList.add("active");
		foodMenuList.classList =
			"food-item-wrap " + e.target.getAttribute("data-food-type");
	};
});

// On-scroll Animation Logic

let scroll =
	window.requestAnimationFrame ||
	function (callback) {
		window.setTimeout(callback, 1000 / 60);
	};

let elToShow = document.querySelectorAll(".play-on-scroll");

isElInViewPort = (el) => {
	let rect = el.getBoundingClientRect();

	return (
		(rect.top <= 0 && rect.bottom >= 0) ||
		(rect.bottom >=
			(window.innerHeight || document.documentElement.clientHeight) &&
			rect.top <=
				(window.innerHeight || document.documentElement.clientHeight)) ||
		(rect.top >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight))
	);
};

loop = () => {
	elToShow.forEach((item, index) => {
		if (isElInViewPort(item)) {
			item.classList.add("start");
		} else {
			item.classList.remove("start");
		}
	});

	scroll(loop);
};

loop();

// Mobile Nav Logic
let bottomNavItems = document.querySelectorAll(".mb-nav-item");

let bottomMove = document.querySelector(".mb-move-item");

bottomNavItems.forEach((item, index) => {
	item.onclick = (e) => {
		console.log("object");
		let crrItem = document.querySelector(".mb-nav-item.active");
		crrItem.classList.remove("active");
		item.classList.add("active");
		bottomMove.style.left = index * 25 + "%";
	};
});

// Music Logic
const playBtn = document.querySelector(".play-btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const progressBar = document.querySelector(".progress");
const artistName = document.querySelector(".artist");
const songTitle = document.querySelector(".song-title");
const songDetails = document.querySelector(".song-details");
const showSongsBtn = document.querySelector(".show-songs-btn");
const songList = document.querySelector(".song-list");

let songs = [];

fetch("assets/data/songs.json")
	.then((response) => response.json())
	.then((data) => {
		songs = data.songs;
		initializeAudio();
		populateSongList();
	})
	.catch((error) => {
		console.error("Failed to fetch songs data:", error);
	});

let currentSongIndex = 0;
let audio = null;

function initializeAudio() {
	audio = new Audio(songs[currentSongIndex].source);

	playBtn.addEventListener("click", () => {
		songDetails.classList.add("show");
		if (audio.paused) {
			audio.play();
			playBtn.innerHTML = '<i class="bx bx-pause-circle"></i>';
		} else {
			audio.pause();
			playBtn.innerHTML = '<i class="bx bx-play-circle"></i>';
		}
		updateSongDetails();
	});

	nextBtn.addEventListener("click", () => {
		currentSongIndex = (currentSongIndex + 1) % songs.length;
		changeSong();
	});

	prevBtn.addEventListener("click", () => {
		currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
		changeSong();
	});

	audio.addEventListener("timeupdate", () => {
		const progressPercent = (audio.currentTime / audio.duration) * 100;
		progressBar.style.width = `${progressPercent}%`;
	});
}

function updateSongDetails() {
	const currentSong = songs[currentSongIndex];
	artistName.textContent = currentSong.artist;
	songTitle.textContent = currentSong.title;

	// Remove the active class from all song items
	const songItemsList = document.querySelectorAll(".song-item");
	songItemsList.forEach((songItem) => {
		songItem.classList.remove("active");
	});

	// Add the active class to the current song item
	const currentSongItem = songItemsList[currentSongIndex];
	currentSongItem.classList.add("active");
}

function changeSong() {
	audio.pause();
	audio.currentTime = 0;
	audio.src = songs[currentSongIndex].source;
	updateSongDetails();
	audio.play();
	songDetails.classList.add("show");
	playBtn.innerHTML = '<i class="bx bx-pause-circle"></i>';
}

function populateSongList() {
	const songItems = songs.map((song, index) => {
		return `<li data-index="${index}" class="song-item">${song.title}</li>`;
	});
	songList.innerHTML = songItems.join("");

	const songItemsList = document.querySelectorAll(".song-item");
	songItemsList.forEach((songItem) => {
		songItem.addEventListener("click", () => {
			const selectedIndex = songItem.dataset.index;
			currentSongIndex = parseInt(selectedIndex);
			changeSong();
		});
	});
}

// Show song list on button click
showSongsBtn.addEventListener("click", () => {
	songList.classList.toggle("show");
});

// Modal for Email Subscription
function validateEmail(email) {
	// Regular expression for email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function subscribe() {
	const emailInput = document.getElementById("email-input");
	const email = emailInput.value;

	if (validateEmail(email)) {
		// Show the modal
		const modal = document.getElementById("modal");
		modal.style.display = "block";
		// Clear the input field
		emailInput.value = "";

		// Automatically hide the modal after 3 seconds
		setTimeout(() => {
			modal.style.display = "none";
		}, 3000);
	} else {
		// Show the invalid email banner
		const invalidEmailBanner = document.getElementById("invalid-email-banner");
		invalidEmailBanner.style.display = "block";

		// Automatically hide the banner after 3 seconds
		setTimeout(() => {
			invalidEmailBanner.style.display = "none";
		}, 3000);
	}
}

function closeModal() {
	const modal = document.getElementById("modal");
	modal.style.display = "none";
}

function closeBanner() {
	const invalidEmailBanner = document.getElementById("invalid-email-banner");
	invalidEmailBanner.style.display = "none";
}

const subscribeButton = document.getElementById("subscribe-button");
subscribeButton.addEventListener("click", subscribe);

const closeButton = document.querySelectorAll(".close-button");
closeButton.forEach((button) => {
	button.addEventListener("click", closeModal);
	button.addEventListener("click", closeBanner);
});

// Fetch job data from JSON file
fetch("assets/data/jobs.json")
	.then((response) => response.json())
	.then((data) => {
		// Process the fetched data
		var jobData = data.jobs;

		// Get the job list container
		var jobListContainer = document.getElementById("jobList");

		// Loop through the job data and create HTML elements dynamically
		for (var i = 0; i < jobData.length; i++) {
			var job = jobData[i];

			// Create list item element
			var listItem = document.createElement("li");
			listItem.className = "job-preview";

			// Create content div
			var contentDiv = document.createElement("div");
			contentDiv.className = "content";

			// Create job title element
			var jobTitle = document.createElement("h4");
			jobTitle.className = "job-title";
			jobTitle.textContent = job.jobTitle;

			// Create job details element
			var jobDetails = document.createElement("p");
			jobDetails.className = "job-details";
			jobDetails.textContent = job.jobDetails;

			// Append job title and job details to the content div
			contentDiv.appendChild(jobTitle);
			contentDiv.appendChild(jobDetails);

			// Create apply button
			var applyButton = document.createElement("a");
			applyButton.className = "job-btn";
			applyButton.href = "#";
			applyButton.textContent = "Apply";

			applyButton.addEventListener("click", function (event) {
				event.preventDefault(); // Prevent the default link behavior

				// Show the modal
				var modal = document.getElementById("apply-modal");
				modal.style.display = "block";

				// Automatically hide the modal after 3 seconds
				setTimeout(() => {
					modal.style.display = "none";
				}, 3000);
			});

			// Append content div and apply button to the list item
			listItem.appendChild(contentDiv);
			listItem.appendChild(applyButton);

			// Append the list item to the job list container
			jobListContainer.appendChild(listItem);
		}
	})
	.catch((error) => {
		console.error("Failed to fetch jobs data:", error);
	});
