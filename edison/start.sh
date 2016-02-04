#!/bin/sh
/usr/sbin/rfkill unblock bluetooth
sleep 1
/usr/bin/killall bluetoothd
sleep 1
/usr/bin/hciconfig hci0 up
sleep 1
/usr/bin/forever start /home/root/asobeat/main.js
