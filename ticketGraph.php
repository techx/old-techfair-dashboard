<?php

header("Content-type: text/json");

$time = time() * 1000;

$smysql = mysql_connect( "portal.mittechfair.org", "merry", "it02139") or die(mysql_error());
mysql_select_db( "logportal");

//total submit count
$result_count = mysql_query("SELECT COUNT(*) FROM portal_ticket") or die(mysql_error());
$submitCount = mysql_result($result_count, 0);

//total answer count
$result_count = mysql_query("SELECT COUNT(*) FROM portal_ticket WHERE Date_Completed IS NOT NULL") or die(mysql_error());
$answerCount = mysql_result($result_count, 0);

//ave response time - NOT WORKING
$resultOpened = mysql_query("SELECT Date_Opened FROM portal_ticket WHERE Date_Completed IS NOT NULL") or die(mysql_error());
$resultClosed = mysql_query("SELECT Date_Completed FROM portal_ticket WHERE Date_Completed IS NOT NULL") or die(mysql_error());

$openedRow = mysql_fetch_array($resultOpened);
$closedRow = mysql_fetch_array($resultClosed);

$opened = $openedRow['Date_Opened'];
$closed = $closedRow['Date_Completed'];



$submitTotal =  intval($submitCount);
$answerTotal =  intval($answerCount);
$point =  array($time, $submitTotal, $answerTotal,$opened, $closed);

echo json_encode($point);
?>


