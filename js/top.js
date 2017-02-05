var AnimeData = []; /* anime.jsonのデータ */
var CharaData = []; /* character.jsonのデータ */

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
		AnimeData = this.state.data;
		var newAnime3 = AnimeData.reverse().slice(0, 3);
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
					})
				}
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
		CharaData = this.state.data;
		var newChara3 = CharaData.reverse().slice(0, 5);
		return (
			<ul>
				{newChara3.map(function(result, i) {
					var animeid = result.animeid;
					var animeName;
					for(var j = 0; j < AnimeData.length; j++) {
						if(AnimeData[j].id == animeid) {
							animeName = AnimeData[j].nickname;
						}
					}
					if(result.animeid !== null) {
						var newCharaThumbnail = "images/anime/" + result.animeid + "/character/" + result.charaid + ".jpg";
					} else {
						/* nullにしてるのはアニメ用画像を作るのが面倒だったから。あとでちゃんと作る。 */
						var newCharaThumbnail = "images/anime/null/character/" + result.charaid + ".jpg";
					}
					var charaUrl = "character/#" + animeName + "/" + result.charaid;
					return (
						<li key={'key_' + i}>
							<a href={charaUrl}>
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

/* 最近チェックしたキャラクター
****************************************************/
var CheckedChara = React.createClass({
	displayName: 'CheckedChara',
	getInitialState: function() {
		return {data: []};
	},
	getStorageData: function() {
		return JSON.parse(localStorage.getItem('checkedList'));
	},
	render: function() {
		var checkedList = this.getStorageData();
		{checkedList.map(function(res, i) {
	
		})}

		var list = [];
		for(var i = 0; i < checkedList.length; i++) {
			var charaName = '';
			var animeID = '';
			var charaID = '';
			var animeName = '';
			list.push(
				<li key={'key_' + i}>
					<a href={i}>
						<figure>
							{<img src={i} alt={i} width="150" height="200" />}
							<figcaption>{i}</figcaption>
						</figure>
					</a>
				</li>
			);
		}
		return (
			<ul>
				{list}
			</ul>
		);
		/*for(var i = 0; i < checkedList.length; i++) {
			var charaName = '';
			var animeID = '';
			var charaID = '';
			var animeName = '';
			for(var j = 0; j < CharaData.length; j++) {
				if(checkedList[i] == CharaData[j].id) {
					charaName = CharaData[j].name;
					animeID = CharaData[j].animeid;
					charaID = CharaData[j].charaid;
					for(var k = 0; k < AnimeData.length; k++) {
						if(animeID == AnimeData[k].id) {
							animeName = AnimeData[k].nickname;
						}
					}
					var charaUrl = "character/#" + animeName + "/" + charaID;
					var charaThumbnail = "images/anime/" + animeID + "/character/" + charaID + ".jpg";
					return (
						<li key={'key_' + i}>
							<a href={charaUrl}>
								<figure>
									{<img src={charaThumbnail} alt={charaName} width="150" height="200" />}
									<figcaption>{charaName}</figcaption>
								</figure>
							</a>
						</li>
					);
				}
			}
		}*/
	}
});

ReactDOM.render(
	<CheckedChara />,
	document.querySelector('.checkedCharaList')
);





