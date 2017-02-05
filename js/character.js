var AnimeData = [];

var CharaID = '';

/* キャラクター詳細
****************************************************/
var CharaDetail = React.createClass({
	displayName: 'CharaDetail',
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
	getAnimeData: function() {
		$.getJSON('../js/data/anime.json', function(data) {
			AnimeData = data;
		});
	},
	setStorageData: function(cid) {
		var checkedList;
		checkedList = JSON.parse(localStorage.getItem('checkedList'));
		// 空白を削除
		if(!checkedList) checkedList = [];
		checkedList = $.grep(checkedList, function(e) {
			return e !== '';
		});
		// 重複チェック
		if(checkedList.indexOf(CharaID) == -1) checkedList.unshift(CharaID);
		console.log(checkedList.length);
		// 最新5人分のデータにする
		if(checkedList.length > 5) checkedList = checkedList.slice(0, 5);

		localStorage.setItem('checkedList', JSON.stringify(checkedList));
	},
	render: function() {
		// ハッシュ値からアニメ名とキャラのidを分離
		var hash = location.hash;
		hash = hash.replace(/#/g, '').split('/');
		// animeid特定
		var animeId = '';
		var animeName = '';
		var animeNickName = '';
		this.getAnimeData();
		for(var i = 0; i < AnimeData.length; i++) {
			if(AnimeData[i].nickname == hash[0]) {
				animeId = AnimeData[i].id;
				animeName = AnimeData[i].name;
				animeNickName = AnimeData[i].nickname;
			}
		}
		return (
			<div>
				{this.state.data.map(function(result, i) {
					if(result.animeid == animeId && result.charaid == hash[1]) {
						CharaID = result.id;
						var charaThumbnail = "../images/anime/" + result.animeid + "/character/" + result.charaid +  ".jpg";
						var animeUrl = "../anime/#" + animeNickName;
						return (
							<div key={'key_' + i}>
								<h2 className="titleBar"><span>{result.name} ({animeName})</span></h2>
								<p className="charaProfile">{result.profile}</p>
								<div className="voteArea">
									<p><img src={charaThumbnail} alt={result.name} width="150" height="200" /></p>
								</div>
								<table>
									<tr><th>身長</th><td>{result.height}cm</td><th>スリーサイズ</th><td>{result.size}</td></tr>
									<tr><th>血液型</th><td>{result.bloodtype}型</td><th>誕生日</th><td>{result.birthday}</td></tr>
									<tr><th>趣味</th><td>{result.hobby}</td><th>CV</th><td>{result.cv}</td></tr>
								</table>
								<p><a href={animeUrl}>{animeName}のページを見る</a></p>
							</div>
						);
					}
				})}
				{this.setStorageData(CharaID)}
			</div>
		);
	}

});

ReactDOM.render(
	<CharaDetail url="../js/data/character.json" />,
	document.querySelector('.charaDataArea')
);