<?php

require_once('db.php');

// ポイントが多い順に5人分抽出
$sql = "SELECT * FROM moemoe_vote ORDER BY point DESC LIMIT 5";
$stmt = $pdo->query($sql);

$top5 = array();
foreach ($stmt as $row) {
	//array_push($top5, $row['chara_id']);
	$top5[] = array('id' => $row['chara_id'], 'point' => $row['point']);
}

$top5 = json_encode($top5);
header('Content-Type: application/json; charset=utf-8');
echo $top5;