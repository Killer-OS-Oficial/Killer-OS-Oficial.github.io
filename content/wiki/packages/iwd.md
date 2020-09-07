---
title: Iwd wifi
sidebar: 'wiki'
prev: '/wiki/packages/other-pkg/'
date_up: 2020-08-13
---

# Iwd настройка wifi

## Установка и использование iwd

```bash
sudo pacman -S iwd wpa_supplicant dhclient

iwctl station wlp5s0 scan
iwctl station wlp5s0 get-networks
```

Учетные данные Wi-Fi хранятся в `/var/lib/iwd`, точное имя SSID следует использовать, формат: `SSID.psk`.

```bash
[Security]
PreSharedKey=a2a0bf020727b1ea1c0542d16e1ccbbbab791d933e9b92783540257910a15817
Passphrase=password
```

Для создания зашифрованного **psk** используйте `wpa_passhrase`.

```bash
wpa_passphrase my_ssid password
```

Для подключения к сети.

```bash
iwctl station wlp5s0 connect SSID
dhclient
```

## Автоматическое включение wifi, при загрузке

Через сервис **systemd**, создайте скрипт для подключенияю

```bash
sudo nano /usr/local/wifi.sh
```

```bash
#!/bin/bash
iwctl station wlan0 connect "My SSID"
dhclient
```

Создайте сервис systemd,

```bash
sudo nano /etc/systemd/system/wifi.service
```

```bash
[Unit]
Before=network.target
Wants=network.target

[Service]
ExecStart=/usr/local/wifi.sh

[Install]
WantedBy=default.target
```

## Назначение прав и включение сервиса

```bash
chmod 744 /usr/local/wifi.sh
chmod 664 /etc/systemd/system/wifi.service
systemctl daemon-reload
systemctl enable enable-wifi.service
```
