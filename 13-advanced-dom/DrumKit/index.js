// index.js
//

// store all drums
const drumSounds = {
	'w': 'sounds/tom-1.mp3',
	'a': 'sounds/tom-2.mp3',
	's': 'sounds/tom-3.mp3',
	'd': 'sounds/tom-4.mp3',
	'j': 'sounds/snare.mp3',
	'k': 'sounds/crash.mp3',
	'l': 'sounds/kick-bass.mp3'
}

// play sound helper function
const playSound = (soundURI) => {
	var audio = new Audio(soundURI)
	audio.play()
}

// drum btn listeners

// get all drum btns
const drums = document.querySelectorAll(".drum")
// for all drums
for(var i=0;i<drums.length;i++) {
	// add listeners
	drums[i].addEventListener("click", function () { 
		playSound(drumSounds[this.innerHTML]) 
	})
}

// document.querySelectorAll(".drum").forEach( function(){ 
// 	this.addEventListener("click", function(){ 
// 		playSound(drumSounds[this.innerHTML]) 
// 	})
// })

// keyboard listeners

document.addEventListener("keydown", (e) => playSound(drumSounds[e.key]) )