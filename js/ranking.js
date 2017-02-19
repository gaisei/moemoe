var AnimeData = AnimeData || {};
var CharaData = CharaData || {};

/* ランキング
****************************************************/
var Ranking = React.createClass({
	displayName: 'Ranking',
	getInitialState: function() {
		return {data: []};
	},
	getAnimeData: function() {
		$.getJSON('../js/data/anime.json').done(function(data) {
			AnimeData = data;
		});
	},
	getCharaData: function() {
		$.getJSON('../js/data/character.json').done(function(data) {
			CharaData = data;
		});
	},
	componentDidMount: function() {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {type: 'all'},
			url: '../js/php/ranking.php',
		})
		.done(function(data) {
			this.setState({data: data});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
	},
	render: function() {
		this.getAnimeData();
		this.getCharaData();
		var rankObj = this.state.data;
		return (
			<ul>
				{this.state.data.map(function(result, i) {

					var charaName, charaId, animeId, animeNickName;
					var result = parseInt(result.id);
					var point = rankObj[i].point;

					for(var j = 0; j < CharaData.length; j++) {
						if(result == CharaData[j].id) {
							charaName = CharaData[j].name;
							charaId = CharaData[j].charaid;
							animeId = CharaData[j].animeid;
						}
					}
					for(var k = 0; k < AnimeData.length; k++) {
						if(animeId == AnimeData[k].id) {
							animeNickName = AnimeData[k].nickname;
						}
					}
					var charaThumbnail = "../images/anime/" + animeId + "/character/" + charaId +  ".jpg";
					var charaUrl = "../character/#" + animeNickName + "/" + charaId;
					return (
						<li key={'key_' + i}>
							<a href={charaUrl}>
								<figure>
									<img src={charaThumbnail} alt={charaName} width="150" height="200" />
									<figcaption>{charaName}</figcaption>
								</figure>
							</a>
							<p className="rankPoint">{point}pt</p>
						</li>
					);
				})}
			</ul>
		);
	}
});

ReactDOM.render(
	<Ranking />,
	document.querySelector('.rankingAll')
);