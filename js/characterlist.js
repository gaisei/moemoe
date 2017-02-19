var AnimeData = [];

/* キャラクターリスト
****************************************************/
var CharaList = React.createClass({
	displayName: 'CharaList',
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
	getAnimeData: function() {
		$.getJSON('../js/data/anime.json').done(function(data) {
			AnimeData = data;
		});
	},
	render: function() {
		var stateData = this.state.data;
		var charaList = stateData.reverse()/*.slice(0, 20)*/; /* 初期表示 登録順20件 */
		this.getAnimeData();
		return (
			<ul>
				{charaList.map(function(result, i) {
					var animeid = result.animeid;
					var animeName;
					for(var j = 0; j < AnimeData.length; j++) {
						if(AnimeData[j].id == animeid) {
							animeName = AnimeData[j].nickname;
						}
					}
					var charaThumbnail = "../images/anime/" + result.animeid + "/character/" + result.charaid +  ".jpg";
					var charaUrl = "../character/#" + animeName + "/" + result.charaid;
						return (
							<li key={'key_' + i}>
								<a href={charaUrl}>
									<figure>
										<img src={charaThumbnail} alt={result.name} width="150" height="200" />
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
	<CharaList url="../js/data/character.json" />,
	document.querySelector('.charaListArea')
);




