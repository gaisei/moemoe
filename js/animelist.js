/* アニメリスト
****************************************************/
var AnimeList = React.createClass({
	displayName: 'AnimeList',
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false
		})
		.done(function(data) {
			this.setState({data: data});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
	},
	render: function() {
		var stateData = this.state.data;
		var animeList = stateData.reverse().slice(0, 16); /* 初期表示 登録順16件 */
		return (
			<ul>
				{animeList.map(function(result, i) {
				var animeThumbnail = "../images/anime/" + result.id + "/thumbnail.jpg";
				var animeUrl = "../anime/#" + result.nickname;
					return (
						<li key={'key_' + i}>
							<a href={animeUrl}>
								<figure>
									<img src={animeThumbnail} alt={result.name} width="250" height="250" />
									<figcaption>{result.name}</figcaption>
								</figure>
							</a>
						</li>
					);
				})}
			</ul>
		);
	}
});

ReactDOM.render(
	<AnimeList url="../js/data/anime.json" />,
	document.querySelector('.animeListArea')
);