#!/bin/sh

/usr/sbin/rfkill unblock bluetooth
/usr/bin/killall bluetoothd
/usr/bin/hciconfig hci0 up

/usr/bin/node /home/root/asobeat/main.js
