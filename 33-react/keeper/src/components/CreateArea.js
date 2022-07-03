import React, {useState} from 'react'

function CreateArea({saveNewNote}) {
	const blankNote = {
		title: '',
		content: ''
	}
	const [newNote, setNewNote] = useState(blankNote)
	
	const handleChange = (e) => {
		const {name, value} = e.target
		setNewNote({
			...newNote,
			[name]: value
		})
	}
	
	const handleSaveNewNote = (e) => {
		e.preventDefault()
		saveNewNote(newNote)
		setNewNote(blankNote)
	}
	
	return <>
		<form className='addArea'>
			<input name="title" placeholder="Title" value={newNote.title} onChange={handleChange} />
			<textarea name="content" placeholder="Take a note..." rows="3" value={newNote.content} onChange={handleChange} />
			<button onClick={handleSaveNewNote}>Add</button>
		</form>
	</>

}

export default CreateArea