/* グローバルリンク
****************************************************/
var local = window.location;
var rootUrl = local.origin;

/* 本番サーバーに対する一次対応 */
if(rootUrl.indexOf('gaisei') !== -1) {
	rootUrl = rootUrl + '/works/moemoe';
}

rootUrl = rootUrl + '/';

/* データ
****************************************************/
var AnimeData;
var CharaData;

$(function() {

	/* アニメデータ */
	$.ajax({
		url: rootUrl + 'js/data/anime.json',
		dataType: 'json',
		cache: false,
		async: false 
	})
	.done(function(data) {
		AnimeData = data;
	})
	.fail(function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	});

	/* キャラデータ */
	$.ajax({
		url: rootUrl + 'js/data/character.json',
		dataType: 'json',
		cache: false,
		async: false 
	})
	.done(function(data) {
		CharaData = data;
	})
	.fail(function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
	});

});

/* ヘッダー
****************************************************/
var Header = React.createClass({
	displayName: 'Header',
	render: function() {
		var menuList = [['TOP',''], ['アニメ','animelist/'], ['キャラクター','characterlist/'], ['ランキング','ranking/'], ['お問い合わせ','contact/']];
		var menuLists = menuList.map(function(val, i) {
			var url = rootUrl + val[1];
			return (
				<li key={'key_' + i}><a href={url}>{val[0]}</a></li>
			);
		});
		return (
			<div className="headerContainer">
				<div className="headerID">
					<h1><a href={rootUrl}>{this.props.title}</a></h1>
					<p>{this.props.concept}</p>
				</div>
				<nav className="headerMenu">
					<ul>{menuLists}</ul>
				</nav>
			</div>
		);
	}
});

ReactDOM.render(
	<Header title="萌え萌えランキング" concept="コミュ障の親父が萌えキャラをひとりじめするバカみたいなサイトです...死ねばいいのに！" />,
	document.getElementById('header')
);

/* 新着アニメ情報
****************************************************/
var NewAnimeInfo = React.createClass({
	displayName: 'NewAnimeInfo',
	render: function() {
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
	render: function() {
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
	getStorageData: function() {
		return JSON.parse(localStorage.getItem('checkedList'));
	},
	render: function() {
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

/* サイドバー
****************************************************/
/* 広告 */
var Ad = React.createClass({
	displayName: 'Ad',
	adList: ['strikewitches', 'lovelivesunshine', 'fatestaynight'],
	render: function() {
		var adImage = this.adList[Math.floor(Math.random() * this.adList.length)];
		var adImageSrc = rootUrl + 'images/ad/' + adImage + '.jpg';
		return (
			<img src={adImageSrc} width="280" height="280" alt="広告" />
		);
	}
});

ReactDOM.render(
	<Ad />,
	document.querySelector('.ad')
);

/* ランキングTOP5 */
var RankingTop5 = React.createClass({
	displayName: 'RankingTop5',
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		$.ajax({
			type: 'POST',
			dataType: 'json',
			data: {type: 'top5'},
			url: rootUrl + 'js/php/ranking.php',
		})
		.done(function(data) {
			this.setState({data: data});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
	},
	render: function() {
		var top5Obj = this.state.data;
		return (
			<ul>
				{this.state.data.map(function(result, i) {

					var charaName, charaId, animeId, animeNickName;
					var result = parseInt(result.id);
					var point = top5Obj[i].point;

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
					var charaThumbnail = rootUrl + "images/anime/" + animeId + "/character/" + charaId +  ".jpg";
					var charaUrl = rootUrl + "character/#" + animeNickName + "/" + charaId;
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
	<RankingTop5 />,
	document.querySelector('.rankingTop5')
);

/* フッター
****************************************************/
var Footer = React.createClass({
	displayName: 'Footer',
	render: function() {
		return (
			<small>{this.props.copyright}</small>
		);
	}
});

ReactDOM.render(
	<Footer copyright="&copy; 2017　萌え萌えランキング製作委員会" />,
	document.getElementById('footer')
);
