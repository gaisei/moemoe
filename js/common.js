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
