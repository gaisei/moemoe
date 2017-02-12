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

	if(empty($count)) {
		// なかったら作ってポイント1を付与する
		$stmt = $pdo->prepare('INSERT INTO moemoe_vote (chara_id, point) VALUES (:chara_id, :value)');
		$stmt->bindValue(':chara_id', $charaid, PDO::PARAM_INT);
		$stmt->bindValue(':value', 1, PDO::PARAM_INT);
		$stmt->execute();
	} else {
		// あったらポイントを1追加する
		$sql = 'UPDATE moemoe_vote set point = point + 1 WHERE chara_id = :charaid';
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':charaid', $charaid, PDO::PARAM_INT);
		$stmt->execute();
	}

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

	// jsに返す
	$data_arr = array($rank, $point);
	$data = json_encode($data_arr);
	echo $data;

}