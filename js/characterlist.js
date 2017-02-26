var AnimeData = [];

/* キャラクターリスト
****************************************************/
var CharaList = React.createClass({
	displayName: 'CharaList',
	getInitialState: function() {
		return {
			data: [],
			page: 1
		};
	},
	componentDidMount: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false
		})
		.done(function(data) {
			this.setState({data: data});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
	},
	getAnimeData: function() {
		$.getJSON('../js/data/anime.json').done(function(data) {
			AnimeData = data;
		});
	},
	pageLink: function(num) {
		var pageLinkNum = Math.ceil(+num / 20);
		var pageLinks = [];
		for(var i = 1; i <= pageLinkNum; i++) {
			if(this.state.page == i) {
				pageLinks.push(<li key={i} value={i} className="active" onClick={this.moveLink}>{i}</li>);
			} else {
				pageLinks.push(<li key={i} value={i} onClick={this.moveLink}>{i}</li>);
			}
		}
		return pageLinks;
	},
	moveLink: function(e) {
		var pageNum = e.target.value;
		location.hash = '#page' + pageNum;
	},
	render: function() {
		var stateData = this.state.data;
		var charaTotalNum = Object.keys(stateData).length;

		var hash = location.hash;
		var page = hash.replace(/#page/g, '').split('/')[0];
		if(page == '') page = 1;
		this.state.page = page;
		
		var pageStart = page == 1 ? 0 : (page-1) * 20;
		var pageEnd = page * 20;
		var charaList = stateData.reverse().slice(pageStart, pageEnd); /* 初期表示 登録順20件 */

		this.getAnimeData();
		return (
			<div>
				<ul>
					{charaList.map(function(result, i) {
						var animeid = result.animeid;
						var animeName;
						for(var j = 0; j < AnimeData.length; j++) {
							if(AnimeData[j].id == animeid) {
								animeName = AnimeData[j].nickname;
							}
						}
						var charaThumbnail = "../images/anime/" + result.animeid + "/character/" + result.charaid +  ".jpg";
						var charaUrl = "../character/#" + animeName + "/" + result.charaid;
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
					})}
				</ul>
				<ul className="pageLink">{this.pageLink(charaTotalNum)}</ul>
			</div>
		);
	}
});

ReactDOM.render(
	<CharaList url="../js/data/character.json" />,
	document.querySelector('.charaListArea')
);
