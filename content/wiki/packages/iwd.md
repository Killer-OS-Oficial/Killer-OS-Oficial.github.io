---
title: Iwd wifi
sidebar: 'wiki'
prev: '/wiki/packages/other-pkg/'
date_up: 2020-08-13
---

# Configuración de wifi iwd

## Instalación y uso de iwd

```bash
sudo pacman -S iwd wpa_supplicant dhclient

iwctl station wlp5s0 scan
iwctl station wlp5s0 get-networks
```

Las credenciales de Wi-Fi se almacenan en `/var/lib/iwd`, se debe utilizar el SSID exacto, formatear: `SSID.psk`.

```bash
[Security]
PreSharedKey=a2a0bf020727b1ea1c0542d16e1ccbbbab791d933e9b92783540257910a15817
Passphrase=password
```

Para crear **psk** cifrado, utilice `wpa_passhrase`.

```bash
wpa_passphrase my_ssid password
```

Para conectarse a la red.

```bash
iwctl station wlp5s0 connect SSID
dhclient
```

## Enciende automáticamente el wifi en el arranque

A través del servicio **systemd**, cree un script para conectarse

```bash
sudo nano /usr/local/wifi.sh
```

```bash
#!/bin/bash
iwctl station wlan0 connect "My SSID"
dhclient
```

Crea un servicio systemd,

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

## Asignar derechos y habilitar el servicio

```bash
chmod 744 /usr/local/wifi.sh
chmod 664 /etc/systemd/system/wifi.service
systemctl daemon-reload
systemctl enable enable-wifi.service
```
