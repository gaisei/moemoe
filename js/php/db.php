<?php

$dsn = 'mysql:dbname=LA01866314-gaisei;host=mysql504.phy.lolipop.jp;charset=utf8';
$user = 'LA01866314';
$password = 'u6gHBK6Y';

try {
	$pdo = new PDO($dsn, $user, $password);
} catch(PDOException $e) {
	exit('データベース接続失敗' . $e->getMessage());
	die();
}