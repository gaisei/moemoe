var AnimeData = AnimeData || {};
var CharaData = CharaData || {};

var CharaID = '';
var CharaName = '';
var CharaType = '';

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
	vote: function() {
		$.ajax({
			type: 'POST',
			url: this.props.vote,
			data: {charaid: CharaID}
		})
		.done(function(data) {
			var data = JSON.parse(data);
			$('.voteRank span').hide().text(data[0]).fadeIn(1500);
			$('.votePoint span').hide().text(data[1]).fadeIn(1500);
		});
		return false;
	},
	getPoint: function(cid) {
		$.ajax({
			type: 'POST',
			url: this.props.getpoint,
			data: {charaid: cid}
		})
		.done(function(data) {
			var data = JSON.parse(data);
			$('.voteRank span').text(data[0]);
			$('.votePoint span').text(data[1]);
		});
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
		var _this = this;
		return (
			<div>
				{this.state.data.map(function(result, i) {
					if(result.animeid == animeId && result.charaid == hash[1]) {
						CharaID = result.id;
						CharaName = result.name;
						CharaType = result.type;
						var charaThumbnail = "../images/anime/" + result.animeid + "/character/" + result.charaid +  ".jpg";
						var animeUrl = "../anime/#" + animeNickName;
						Object.keys(result).forEach(function(key) {
							if(result[key] == '') result[key] = '-';
						});
						return (
							<div key={'key_' + i}>
								<h2 className="titleBar"><span>{CharaName} ({animeName})</span></h2>
								<div className="charaDescription">{result.profile}</div>
								<div className="charaVoteArea">
									<div className="charaThumb"><img src={charaThumbnail} alt={CharaName} width="150" height="200" /></div>
									<div className="vote">
										<p className="voteMsg">私に投票してね！</p>
										<div>
											<table>
												<tr><th>現在のランク</th><th>現在のポイント</th></tr>
												<tr><td className="voteRank"><span></span>位</td><td className="votePoint"><span></span>pt</td></tr>
											</table>
											<p className="voteBtn" onClick={_this.vote}><span>投票する</span></p>
										</div>
									</div>
								</div>
								<table className="charaProfile">
									<tr><th>身長</th><td>{result.height}cm</td><th>スリーサイズ</th><td>{result.size}</td></tr>
									<tr><th>血液型</th><td>{result.bloodtype}型</td><th>誕生日</th><td>{result.birthday}</td></tr>
									<tr><th>趣味</th><td>{result.hobby}</td><th>CV</th><td>{result.cv}</td></tr>
								</table>
								<p className="linkBtn"><a href={animeUrl}>「{animeName}」のページを見る</a></p>
							</div>
						);
					} else {
						return;
					}
				})}
				{this.getPoint(CharaID)}
				{this.setStorageData(CharaID)}
			</div>
		);
	}

});

ReactDOM.render(
	<CharaDetail url="../js/data/character.json" vote="../js/php/vote.php" getpoint="../js/php/getpoint.php" />,
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
			cache: false
		})
		.done(function(data) {
			this.setState({data: data});
		}.bind(this))
		.fail(function(xhr, status, err) {
			console.error(this.props.url, status, err.toString());
		}.bind(this));
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