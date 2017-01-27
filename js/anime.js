/* アニメ詳細
****************************************************/
var AnimeDetail = React.createClass({
	displayName: 'AnimeDetail',
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function() {
		var hash = location.hash;
		hash = hash.replace(/#/g, '');
		return (
			<div>
				{this.state.data.map(function(result, i) {
					if(result.nickname == hash) {
						var animeMainBanner = "../images/anime/" + result.id + "/main.jpg";
						return (
							<div key={'key_' + i}>
								<img src={animeMainBanner} width="860" height="200" alt={result.name} />
								<h2>{result.name}</h2>
								<p>{result.description}</p>
							</div>
						);
						return false;
					}
					
				})}
			</div>
		);
	}
});

ReactDOM.render(
	<AnimeDetail url="../js/data/anime.json" />,
	document.querySelector('.animeMainBanner')
);




