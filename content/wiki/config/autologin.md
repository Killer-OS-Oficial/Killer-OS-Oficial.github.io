---
title: Автологин
sidebar: 'wiki'
prev: '/wiki/config/trouble/'
next: '/wiki/config/ssh/'
date_up: 2020-08-13
---

# Автологин

## Автологин с помощью .xinitrc и автозапуск Х после логина.

В `~/.xinitrc` необходимо прописать запуск DE, WM. В самом конце файла.

```bash
exec openbox-session
```

Добавить в `~/.bashrc`, Если используем Zsh, то `~/.zshrc`. Узнать какой у вас шелл, команда: `echo $SHELL`.

```bash
nano ~/.zshrc
```

Добавить наверх, после первой строки `#!/usr/bin/env zsh`
```bash
if [[ ! $DISPLAY && $XDG_VTNR -eq 1 ]]; then
  exec startx
fi
```

Выполнить.
```bash
sudo systemctl enable getty@.service
```

Данная команда создаст файл и запустит systemd сервис, просмотреть.

```bash
cat /etc/systemd/system/getty@tty1.service.d/override.conf
```

Если нет, то создайте вручную.

```bash
sudo mkdir /etc/systemd/system/getty@tty1.service.d
```

Должно быть так, где user - имя вашего пользователя.

```bash
[Service]
ExecStart=
ExecStart=-/usr/bin/agetty --autologin user --noclear %I $TERM
```

Отключите login менеджер (lightdm, gdm, lxdm).

```bash
systemctl disable gdm
```

И удалите, если нужно.

```bash
sudo pacman -R gdm
```

### Автологин через Lightdm.

Замените st на имя вашего пользователя.

```bash
groupadd -r autologin
gpasswd -a st autologin

groupadd -r nopasswdlogin
gpasswd -a st nopasswdlogin
```

Отредактируйте конфиг.

```bash
nano /etc/lightdm/lightdm.conf
```

И преведите к такому виду. Замените st на имя вашего пользователя.

```bash
pam-service=lightdm
pam-autologin-service=lightdm-autologin
autologin-user=st
autologin-user-timeout=0
session-wrapper=/etc/lightdm/Xsession
```
