/* ヘッダー
****************************************************/
var Header = React.createClass({
	displayName: 'Header',
	menuList: ['TOP', 'アニメ', 'キャラクター', 'ランキング', 'お問い合わせ'],
	render: function() {
		var menuLists = this.menuList.map(function(val, i) {
			return (
				<li key={'key_' + i}><a href="#">{val}</a></li>
			);
		});
		return (
			<div className="headerContainer">
				<div className="headerID">
					<h1>{this.props.title}</h1>
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
		var newAnime3 = stateData.reverse().slice(0, 3);
		return (
			<ul>
				{newAnime3.map(function(result, i) {
				var newAnimeThumbnail = "images/anime/" + result.id + "/thumbnail.jpg";
					return (
						<li key={'key_' + i}>
							<a href="#">
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



/* サイドバー
****************************************************/
/* 広告 */
var Ad = React.createClass({
	displayName: 'Ad',
	adList: ['strikewitches', 'lovelivesunshine', 'fatestaynight'],
	render: function() {
		var adImage = this.adList[Math.floor(Math.random() * this.adList.length)];
		var adImageSrc = 'images/ad/' + adImage + '.jpg';
		return (
			<a href="#"><img src={adImageSrc} width="280" height="280" alt="広告" /></a>
		);
	}
});

ReactDOM.render(
	<Ad />,
	document.querySelector('.ad')
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

