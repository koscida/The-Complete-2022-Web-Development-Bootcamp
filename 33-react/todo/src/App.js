import React, {useState} from 'react'
import './App.css';

function App() {
	const [list, setList] = useState([])
	const [newItem, setNewItem] = useState('')
	
	const handleChange = (e) => {
		setNewItem(e.target.value)
	}
	
	const handleAdd = () => {
		setList([...list, newItem])
		setNewItem('')
	}
	
	return (
		<div className="container">
			<div className="heading">
				<h1>To-Do List</h1>
			</div>
			<div className="form">
				<input type="text" name="newItem" onChange={handleChange} value={newItem} />
				<button onClick={handleAdd}>
					<span>Add</span>
				</button>
			</div>
			<div>
				<ul>
					{list.map( (listItem, i) => <li key={i}>{listItem}</li>)}
				</ul>
			</div>
		</div>
	);
}

export default App;
