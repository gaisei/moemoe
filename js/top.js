var AnimeData = AnimeData || {};
var CharaData = CharaData || {};

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
			async: false /*これは使いたくないので対策を考える*/
		})
		.done(function(data) {
			this.setState({data: data});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
	},
	getAnime: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			/*async: false*/ /*これは使いたくないので対策を考える*/
		})
		.done(function(data) {
			this.setState({data: data});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
	},
	render: function() {
		console.log("新着アニメ情報");
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
			async: false /*これは使わないので対策を考える*/
		})
		.done(function(data) {
			this.setState({data: data});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
	},
	render: function() {
		console.log("新着キャラクター情報");
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
					var newCharaThumbnail = "images/anime/" + result.animeid + "/character/" + result.charaid + ".jpg";
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
		console.log("最近チェックした");
		var checkedList = this.getStorageData();
		if(checkedList == null) {
			return (<p>まだないです。</p>);
		} else {
			return (
				<ul>
				{checkedList.map(function(result, i) {
					for(var j = 0; j < CharaData.length; j++) {
						if(checkedList[i] == CharaData[j].id) {
							var charaName = CharaData[j].name;
							var animeID = CharaData[j].animeid;
							var charaID = CharaData[j].charaid;
							for(var k = 0; k < AnimeData.length; k++) {
								if(animeID == AnimeData[k].id) {
									var animeName = AnimeData[k].nickname;
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
						}
					}
				})}
				</ul>
			);
		}
	}
});

ReactDOM.render(
	<CheckedChara />,
	document.querySelector('.checkedCharaList')
);

/* 今月が誕生日のキャラクター
****************************************************/
var BirthdayChara = React.createClass({
	displayName: 'BirthdayChara',
	render: function() {
		// 現在の月
		var date = new Date();
		var thisMonth = date.getMonth() + 1;

		var birthdayCharas = [];
		for(var i = 0; i < CharaData.length; i++) {
			var birthMonth = CharaData[i].birthday;
			birthMonth = birthMonth.substring(0, birthMonth.indexOf('月'));
			if(birthMonth == thisMonth) birthdayCharas.unshift(CharaData[i]);
		}
		if(!birthdayCharas.length) {
			return (<p>いません。</p>);
		} else {
			return (
				<ul>
					{birthdayCharas.map(function(result, i) {
						var charaName = result.name;
						var animeID = result.animeid;
						var charaID = result.charaid;
						for(var j = 0; j < AnimeData.length; j++) {
							if(animeID == AnimeData[j].id) {
								var animeName = AnimeData[j].nickname;
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
					})}
				</ul>
			);
		}
	}
});

ReactDOM.render(
	<BirthdayChara />,
	document.querySelector('.birthdayCharaList')
);