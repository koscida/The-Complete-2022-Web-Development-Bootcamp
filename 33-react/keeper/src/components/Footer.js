function Footer() {
	const date = new Date()
	const year = date.getFullYear()
	return <footer className="">
		<div className="container-fluid">
			<div className="col p-2">
				<p className="text-center m-2">koscida &copy; {year}</p>
			</div>
		</div>
	</footer>
}

export default Footer