var AnimeData = AnimeData || {};
var CharaData = CharaData || {};

/* グローバルリンク
****************************************************/
var local = window.location;
var rootUrl = local.origin;

/* 本番サーバーに対する一次対応 */
if(rootUrl.indexOf('gaisei') !== -1) {
	rootUrl = rootUrl + '/works/moemoe';
}

rootUrl = rootUrl + '/';

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
	getAnimeData: function() {
		$.getJSON(rootUrl + 'js/data/anime.json').done(function(data) {
			AnimeData = data;
		});
	},
	getCharaData: function() {
		$.getJSON(rootUrl + 'js/data/character.json').done(function(data) {
			CharaData = data;
		});
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
		this.getAnimeData();
		this.getCharaData();
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
