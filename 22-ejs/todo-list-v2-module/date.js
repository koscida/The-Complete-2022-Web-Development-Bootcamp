//jshint esversion:6

exports.getDate = () => {
	const today = new Date();
	const options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};
	return today.toLocaleDateString("en-US", options);
}

exports.getWeekday = () => {
	const today = new Date();
	const options = {
		weekday: "long",
	};
	return today.toLocaleDateString("en-US", options);
}


// starting
// module.exports = {getDate}
// function getDate() {
// //
// }


// this also works
// module.exports.getDate = getDate
// const getDate = function() {
// //
// }


// shortened
// exports.getDate = () => {
// //
// }

//console.log(module)