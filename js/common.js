/* ヘッダー
****************************************************/
var Header = React.createClass({
	displayName: 'Header',
	//menuList: [{'TOP':'', 'アニメ':'animelist', 'キャラクター':'characterlist', 'ランキング':'ranking', 'お問い合わせ':'contact'}],
	render: function() {
		var local = window.location;
		var rootUrl = local.origin;
		var menuList = [['TOP',''], ['アニメ','animelist'], ['キャラクター','characterlist'], ['ランキング','ranking'], ['お問い合わせ','contact']];
		var menuLists = menuList.map(function(val, i) {
			var url = rootUrl + '/' + val[1];
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
		var rootpath = 'http://gaisei.net/works/moemoe/'; /* 苦肉の策。もっとスマートなやり方を考えたい */
		var adImage = this.adList[Math.floor(Math.random() * this.adList.length)];
		var adImageSrc = rootpath + 'images/ad/' + adImage + '.jpg';
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
