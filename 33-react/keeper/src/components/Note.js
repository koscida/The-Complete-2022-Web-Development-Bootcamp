function Note({cardData: {title, content}}) {
	return <div class="col">
		<div className="card note">
			<div className="card-body">
				<h5 class="card-title">{title}</h5>
				<p class="card-text">{content}</p>
			</div>
		</div>
	</div>
}

export default Note