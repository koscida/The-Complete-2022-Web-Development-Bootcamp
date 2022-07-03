import React, {useState} from 'react'
import Note from './Note'
import CreateArea from './CreateArea'
import startingNotes from "../notes";

function Body() {
	const [notes, setNotes] = useState(startingNotes)
	
	const handleNewNote = (newNote) => {
		const key = notes.length + 1
		setNotes([...notes, {...newNote, key}])
	}
	const handleDeleteNote = (key) => {
		console.log("key", key)
		const newList = notes.filter(note => note.key !== key)
		setNotes(newList)
	}
	
	return <section className="notes p-2">
		<div className="container-fluid">
			<CreateArea saveNewNote={handleNewNote} />
			<div className="card-group row row-cols-2 row-cols-sm-4 row-cols-md-5 row-cols-lg-6 g-4">
				{notes.map( cardData => <Note cardData={cardData} key={cardData.key} deleteNote={handleDeleteNote} /> )}
			</div>
			
		</div>
	</section>
}

export default Body