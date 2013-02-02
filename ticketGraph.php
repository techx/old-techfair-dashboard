<?php

include('assets/libs/phpseclib0.3.1/Math/BigInteger.php');
include('assets/libs/phpseclib0.3.1/Crypt/Random.php');
include('assets/libs/phpseclib0.3.1/Crypt/Hash.php');
include('assets/libs/phpseclib0.3.1/Crypt/TripleDES.php');
include('assets/libs/phpseclib0.3.1/Crypt/RC4.php');
include('assets/libs/phpseclib0.3.1/Crypt/AES.php');
include('assets/libs/phpseclib0.3.1/Net/SSH2.php');
include('assets/libs/phpseclib0.3.1/Crypt/RSA.php');

$key = new Crypt_RSA();

$key->loadKey(file_get_contents('assets/techfair_ec2_keys.pem'));


$ssh = new Net_SSH2('portal.mittechfair.org');
if ($ssh->login(ubuntu, $key)) {

echo "Successful connection";

//this part isn't working.
mysql_connect('portal.mittechfair.org', "root", "02139techfair") or die(mysql_error());

echo @mysql_ping() ? 'true' : 'false';

};


?>