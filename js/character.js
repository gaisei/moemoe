var AnimeData = [];

var CharaID = '';
var CharaName = '';
var CharaType = '';

var CharaData;

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
						CharaName = result.name;
						CharaType = result.type;
						var charaThumbnail = "../images/anime/" + result.animeid + "/character/" + result.charaid +  ".jpg";
						var animeUrl = "../anime/#" + animeNickName;
						return (
							<div key={'key_' + i}>
								<h2 className="titleBar"><span>{CharaName} ({animeName})</span></h2>
								<div className="charaDescription">{result.profile}</div>
								<div className="voteArea">
									<p><img src={charaThumbnail} alt={CharaName} width="150" height="200" /></p>
								</div>
								<table>
									<tr><th>身長</th><td>{result.height}</td><th>スリーサイズ</th><td>{result.size}</td></tr>
									<tr><th>血液型</th><td>{result.bloodtype}型</td><th>誕生日</th><td>{result.birthday}</td></tr>
									<tr><th>趣味</th><td>{result.hobby}</td><th>CV</th><td>{result.cv}</td></tr>
								</table>
								<p className="linkBtn"><a href={animeUrl}>「{animeName}」のページを見る</a></p>
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

/* 似たタイプのキャラクター
****************************************************/
var SimilarChara = React.createClass({
	displayName: 'SimilarChara',
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
		var similars = this.state.data;
		var similarTypeCnt = 0;
		for(var i = 0; i < similars.length; i++) {
			if(similars[i].type == CharaType) similarTypeCnt++;
		}
		if(similarTypeCnt <= 1) {
			return(
				<div>
					<h2>{CharaName}に似たタイプのキャラクター</h2><p>いません。</p>
				</div>
			);
		} else {
			return (
			<div>
				<h2>{CharaName}に似たタイプのキャラクター</h2>
				<ul>
					{this.state.data.map(function(result, i) {
						if(result.type == CharaType && result.id != CharaID) {
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
						}
					})}
				</ul>
			</div>
			);	
		}
	}

});

ReactDOM.render(
	<SimilarChara url="../js/data/character.json" />,
	document.querySelector('.charaSimilarArea')
);