function Note({cardData: {key, title, content}, deleteNote}) {
	
	const handleDeleteNote = () => {
		console.log("key", key)
		deleteNote(key)
	}	
	
	return <div className="col">
		<div className="card note">
			<div className="card-body">
				<h5 className="card-title">{title}</h5>
				<p className="card-text">{content}</p>
				<button onClick={handleDeleteNote}>DELETE</button>
			</div>
		</div>
	</div>
}

export default Note