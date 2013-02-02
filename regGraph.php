<?php

header("Content-type: text/json");

$time = time() * 1000;

mysql_connect("sql.mit.edu", "techfair", "02139techfair") or die(mysql_error());
mysql_select_db("techfair+dayof") or die(mysql_error());

//total count
$result_count = mysql_query("SELECT COUNT(*) FROM registration2013") or die(mysql_error());
$count = mysql_result($result_count, 0);

$result_last_time = mysql_query("SELECT * FROM registration2013 ORDER BY id DESC LIMIT 1") or die(mysql_error());
$last_time = mysql_fetch_array($result_last_time);

$result_first_time = mysql_query("SELECT * FROM registration2013") or die(mysql_error());
$first_time = mysql_fetch_array($result_first_time);

$time_diff = strtotime($last_time['timestamp']) - strtotime($first_time['timestamp']);

$rate = $count / $time_diff *  3600;

$total =  intval($count);
$point = array($time, $total, $rate);
echo json_encode($point);

?>