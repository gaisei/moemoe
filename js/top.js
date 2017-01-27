/* 新着アニメ情報
****************************************************/
var NewAnimeInfo = React.createClass({
	displayName: 'NewAnimeInfo',
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
		var stateData = this.state.data;
		var newAnime3 = stateData.reverse().slice(0, 3);
		return (
			<ul>
				{newAnime3.map(function(result, i) {
				var newAnimeThumbnail = "images/anime/" + result.id + "/thumbnail.jpg";
				var animeUrl = "anime/#" + result.nickname;
					return (
						<li key={'key_' + i}>
							<a href={animeUrl}>
								<figure>
									<img src={newAnimeThumbnail} alt={result.name} width="250" height="250" />
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
	<NewAnimeInfo url="js/data/anime.json" />,
	document.querySelector('.newAnimeList')
);



/* 新着キャラクター情報
****************************************************/
var NewCharaInfo = React.createClass({
	displayName: 'NewCharaInfo',
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
		var stateData = this.state.data
		var newChara3 = stateData.reverse().slice(0, 5);
		return (
			<ul>
				{newChara3.map(function(result, i) {
					if(result.animeid !== null) {
						var newCharaThumbnail = "images/anime/" + result.animeid + "/character/" + result.charaid + ".jpg";
					} else {
						/* nullにしてるのはアニメ用画像を作るのが面倒だったから。あとでちゃんと作る。 */
						var newCharaThumbnail = "images/anime/null/character/" + result.charaid + ".jpg";
					}
					return (
						<li key={'key_' + i}>
							<a href="#">
								<figure>
									<img src={newCharaThumbnail} alt={result.name} width="150" height="200" />
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
	<NewCharaInfo url="js/data/character.json" />,
	document.querySelector('.newCharaList')
);
