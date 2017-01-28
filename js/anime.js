var Animeid;
var Nickname;

/* アニメ詳細
****************************************************/
var AnimeDetail = React.createClass({
	displayName: 'AnimeDetail',
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
	insertSlash: function(str, index, insert) {
		return str.slice(0, index) + insert + str.slice(index, str.length);
	}.bind(this),
	render: function() {
		var hash = location.hash;
		hash = hash.replace(/#/g, '');
		return (
			<div>
				{this.state.data.map(function(result, i) {
					if(result.nickname == hash) {
						Animeid = result.id;
						Nickname = result.nickname;
						var animeMainBanner = "../images/anime/" + result.id + "/main.jpg";
						var youtube = "https://www.youtube.com/embed/" + result.youtube + "?rel=0&amp;showinfo=0";
						var start = result.start + '';
						start = start.slice(0, 4) + '/' + start.slice(4, start.length);
						return (
							<div key={'key_' + i}>
								<p className="mainBanner"><img src={animeMainBanner} width="860" height="200" alt={result.name} /></p>
								<h2>{result.name}</h2>
								<p className="animeDescription">{result.description}</p>
								<div className="animeDatailInfo">
									<iframe width="500" height="281" src={youtube} frameborder="0" allowfullscreen></iframe>
									<dl>
										<dt>放送開始</dt><dd>{start}</dd>
										<dt>原作</dt><dd>{result.gensaku}</dd>
										<dt>監督</dt><dd>{result.kantoku}</dd>
										<dt>脚本</dt><dd>{result.kyakuhon}</dd>
										<dt>アニメーション制作</dt><dd>{result.production}</dd>
									</dl>
								</div>
							</div>
						);
						return false;
					}
				})}
			</div>
		);
	}
});

ReactDOM.render(
	<AnimeDetail url="../js/data/anime.json" />,
	document.querySelector('.animeDataArea')
);

/* 登場キャラ紹介
****************************************************/
var AnimeChara = React.createClass({
	displayName: 'AnimeChara',
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
		var charaList = this.state.data.map(function(result, i) {
			if(result.animeid == Animeid) {
				var charaThumbnail = "../images/anime/" + Animeid + "/character/" + result.charaid + ".jpg";
				var charaUrl = "../character/#" + Nickname + "/" + result.engname;
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
			}
		});
		return (
			<div>
				<h2>{this.props.title}</h2>
				<ul>{charaList}</ul>
			</div>
		);
	}
});

ReactDOM.render(
	<AnimeChara title="キャラクター" url="../js/data/character.json" />,
	document.querySelector('.animeCharaArea')
);