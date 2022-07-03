import {useState, useEffect} from 'react'
import './App.css';

function App() {
	const [manuelTime, setManuelTime] = useState(new Date())
	const [autoTime, setAutoTime] = useState(new Date())
	
	const getTime = () => {
		setManuelTime(new Date())
	}
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			setAutoTime(new Date());
		}, 1000);

		return () => clearTimeout(timeout);
	},[autoTime]);
	
	return (
		<div className="container-fluid">
			<div className='row'>
				<div className='col'>
					<h1>{manuelTime.toLocaleTimeString()}</h1>
					<h2>{manuelTime.toLocaleDateString()}</h2>
					<button onClick={getTime}>Get Time</button>
				</div>
				<div className='col'>
					<h1>{autoTime.toLocaleTimeString()}</h1>
					<h2>{autoTime.toLocaleDateString()}</h2>
					<p>(Automatic time)</p>
				</div>
			</div>
		</div>
	)
}

export default App;
