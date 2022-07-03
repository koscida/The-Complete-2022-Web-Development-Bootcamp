import Note from './Note'
import notes from "../notes";

function Body() {
	return <section className="notes p-2">
		<div className="container-fluid">
			<div className="card-group row row-cols-2 row-cols-sm-4 row-cols-md-5 row-cols-lg-6 g-4">
				{notes.map(cardData => <Note cardData={cardData} /> )}
			</div>
			
		</div>
	</section>
}

export default Body