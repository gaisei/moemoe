<?php

require_once('db.php');

if(isset($_POST['charaid'])) {
	$charaid = $_POST['charaid'];

	// テーブルにデータがあるかチェック
	$sql = 'SELECT * FROM moemoe_vote WHERE chara_id=' . $charaid;
	$stmt = $pdo->query($sql);
	$count = $stmt->rowCount();

	$point;
	$rank;

	if(!empty($count)) {
		// ポイントを取得してjsに返す
		$sql = 'SELECT * FROM moemoe_vote WHERE chara_id=' . $charaid;
		$stmt = $pdo->query($sql);
		foreach ($stmt as $row) {
			$point = $row['point'];
		}

		// 順位を算出する
		$sql = 'SELECT COUNT(*) +1 as rank FROM moemoe_vote WHERE point > ' . $point;
		$stmt = $pdo->query($sql);
		foreach ($stmt as $row) {
			$rank = $row['rank'];
		}

	// テーブルにデータがない場合（まだポイントがない）
	} else {
		$point = 0;
		$rank = '-';
	}

	// jsに返す
	$data_arr = array($rank, $point);
	$data = json_encode($data_arr);
	echo $data;
}