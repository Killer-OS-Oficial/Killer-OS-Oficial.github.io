---
title: Рекомендации
sidebar: 'wiki'
prev: '/wiki/config/videocfg/'
next: '/wiki/config/trouble/'
date_up: 2020-08-13
---

# Рекомендации

## Установка ядра Linux-zen [Kernels](https://wiki.archlinux.org/index.php/Kernels)

Если у вас nvidia карта, драйвер также нужно заменить `sudo pacman -S nvidia-390xx-dkms`.

```bash
sudo pacman -S linux-zen linux-zen-headers
sudo mkinitcpio -p linux-zen
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

***

## Уменьшение размера журнала логов Systemd

```bash
sudo nano /etc/systemd/journald.conf
```

Расскомментировать и изменить строку.

```bash
SystemMaxUse=5M
```

***

## Отключаем переодическое увеличение загрузки из-за man-db.service

```bash
sudo systemctl disable man-db.service
sudo systemctl disable man-db.timer
```

***

## Удаление особых скриптов live-среды

Существуют некоторые скрипты, установленные скриптами archiso в live-системе, которые не нужны для новой системы.

```bash
rm /etc/systemd/system/getty@tty1.service.d/autologin.conf
rm /root/{.automated_script.sh,.zlogin}
rm /etc/mkinitcpio-archiso.conf
rm -r /etc/initcpio
systemctl disable pacman-init.service
```

## Подробнее

[Offline installation (Русский)](https://wiki.archlinux.org/index.php/Offline_installation_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9))
