---
title: Репозиторий ctlos
sidebar: 'wiki'
prev: '/wiki/install/pkg-manager/'
date_up: 2020-08-13
---

# Установка и настройка репозиториев ctlos

## Добавление ключа, 1 способ

```bash
# инициализация gpg
pacman-key --init

pacman -Sy wget && wget git.io/ctlos.gpg
pacman-key --add ctlos.gpg
# или с key сервера
pacman-key --recv-keys 98F76D97B786E6A3
```

### Проверить отпечаток

```bash
pacman-key --finger 98F76D97B786E6A3
```

### Подписываем ключ gpg локально

```bash
pacman-key --lsign-key 98F76D97B786E6A3
# список
pacman-key --list-keys
```

### Загружаем и обновляем ключи

```bash
pacman-key --populate
# up key server
pacman-key --refresh-keys
```

### Сортируем arch зеркала reflector-ом

```bash
pacman -S reflector

reflector --verbose -a1 -f10 -l70 -p https -p http --sort rate --save /etc/pacman.d/mirrorlist
```

### Устанавливаем зеркала ctlos

```bash
nano /etc/pacman.conf

[ctlos_repo]
Server = https://github.com/ctlos/$repo/raw/master/$arch
```
