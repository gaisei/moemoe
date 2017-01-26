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

/* サイドバー
****************************************************/
/* 広告 */
var Ad = React.createClass({
	displayName: 'Ad',
	adList: ['strikewitches', 'lovelivesunshine', 'fatestaynight'],
	render: function() {
		var pathname = location.pathname;
		var adImageDir = '';
		if(pathname.length > 1) adImageDir = '../'; 
		var adImage = this.adList[Math.floor(Math.random() * this.adList.length)]; /* もっとうまいやりかたないだろうか */
		var adImageSrc = adImageDir + 'images/ad/' + adImage + '.jpg';
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
