---
title: После установки
description: 'обновление ключей и прочие ньюансы'
sidebar: 'wiki'
prev: '/wiki/install/install-ctlos/'
next: '/wiki/install/pkg-manager/'
date_up: 2020-08-13
---

# Рекомендации после установки Ctlos

![После установки Ctlos](../images/install/next-install.svg)

> Всегда помните о существовании **Arch Wiki**, все необходимые ответы уже присутствуют, не ленитесь читать. [Arch Wiki](https://wiki.archlinux.org/index.php/Main_page_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9) "Arch Wiki"), более актуальная информация на англ. языке.

## Обновление ключей

Если возникли проблемы с обновлением, или установкой пакетов выполните данные рекомендации.

```bash
sudo pacman-key --init && sudo pacman-key --populate && sudo pacman-key --refresh-keys && sudo pacman -Syy
```

> Если ошибка с содержанием `hkps.pool.sks-keyservers.net`, не может достучаться до сервера ключей выполните команды ниже. Указываем другой сервер ключей.

```bash
sudo pacman-key --init && sudo pacman-key --populate

sudo pacman-key --refresh-keys --keyserver keys.gnupg.net && sudo pacman -Syy
```

> Если ошибка с содержанием `/var/lib/pacman/sync`, выполните команду ниже и повторите пункт с обновлением ключей.

```bash
sudo rm -rf /var/lib/pacman/sync/*
```

> Если ошибка с содержанием `/var/lib/pacman/db.lck`, выполните команду.

```bash
sudo rm /var/lib/pacman/db.lck
```

[Package_signing_(Русский)#Решение_проблем](https://wiki.archlinux.org/index.php/Pacman_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)/Package_signing_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)#%D0%A0%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC)

---

## Информация о Вашей системе

Краткая информация о Вашей системе.

```bash
neofetch
```

Подробней о железе.

```bash
yay -S inxi
#
inxi -F
```

## Скорость интернета

```bash
speedtest-cli
```

## Смена оболочки

Для смены оболочки на **ZSH** введите в терминале следующее: `chsh -s /bin/zsh`.

Для смены оболочки на **BASH** введите в терминале следующее: `chsh -s /bin/bash`.

## Оптимизирование зеркал **Reflector**

В Ctlos установлен скрипт `~/.bin/mirrors`, отредактируйте его под ближайшие к Вам страны, а затем запустите от обычного пользователя `mirrors`.

Прямой командой.

```bash
sudo reflector -c "Russia" -c "Belarus" -c "Ukraine" -c "Poland" -f 20 -l 20 -p https -p http -n 20 --save /etc/pacman.d/mirrorlist --sort rate
```

Или по одной.

```bash
sudo reflector -c 'Russia' -f 20 -l 20 -p http -n 20 --verbose --save /etc/pacman.d/mirrorlist --sort rate
```

Проверим: `cat /etc/pacman.d/mirrorlist`.

Обновление всей системы.

```bash
sudo pacman -Syu
```

## Обновить закладки в thunar (левое меню)

```bash
xdg-user-dirs-gtk-update
```

## Используйте алиасы

Алиасы в `~/.alias_zsh`.

> **Yay** работает, как **pacman**, т.е. выполняет теже функции, поэтому я в основном использую команды yay для манипуляции с пакетами. Вот данный набор из файла.

- `alias y="yay -S"` установка.
- `alias yn="yay -S --noconfirm"` установка без подтверждения.
- `alias ys="yay"` поиск с дальнейшим выбором по цифре.
- `alias ysn="yay --noconfirm"` поиск с дальнейшим выбором по цифре, без подтверждения.
- `alias yc="yay -Sc"` частичная очистка кэша.
- `alias yy="yay -Syy"` синхронизация баз зеркал.
- `alias yu="yay -Syu"` обновление.
- `alias yun="yay -Syu --noconfirm"` обновление без подтверждения.
- `alias yr="yay -R"` удаление пакет(а,ов).
- `alias yrn="yay -R --noconfirm"` удаление пакет(а,ов) без подтверждения.

Пример удаления: `yrn htop`.

Команда `cache`, для очистки кэша пакетов и оптимизация базы pacman.
Все исполняемые скрипты лежат в `~/.bin`.
