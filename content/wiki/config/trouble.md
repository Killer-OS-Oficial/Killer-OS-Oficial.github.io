---
title: Решение проблем
sidebar: 'wiki'
prev: '/wiki/config/recomend/'
next: '/wiki/config/autologin/'
date_up: 2020-08-13
---

# Решение проблем

## Изменить размер /tmp

Иногда при установки больших прог из Aur возникает ошибка (Недостаточно места). Смотрим, сколько места.

```bash
df -h /tmp
```

Изменяем размер.

```bash
mount -o remount,size=4G /tmp
```

Теперь стало 4G.

```bash
df -h /tmp
```

---

## Ассоциации файлов

Это нужно, если у вас открывается файл, или каталог не в той программе. Например, директория в музыкальном проигрывателе.

Распознаем файл.

```bash
xdg-mime query filetype wallpaper.jpg
```

Проверяем дефолтные настройки.

```bash
xdg-mime query default inode/directory
```

Переопределяем.

```bash
xdg-mime default org.gnome.Nautilus.desktop inode/directory
```

Еще пример.

```bash
xdg-mime default vlc.desktop video/mp4
```

---

## Проблема с win кодировкой

Решение: установить `gedit`, выполнить в терминале команду ниже, радуемся.

```bash
gsettings set org.gnome.gedit.preferences.encodings candidate-encodings "['UTF-8', 'WINDOWS-1251', 'KOI8-R', 'CURRENT', 'ISO-8859-15', 'UTF-16']"
```

---

## Проблема с windows time (сброс системного времени)

Решение: Создать и применить рег.файл с таким содержанием.

```bash
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation]
"RealTimeIsUniversal"=dword:00000001
```

---

## Расширяем контекстное меню thunar

Добавляем дополнительные пункты для создания файлов.

```bash
XDG_TEMPLATES_DIR=$(xdg-user-dir TEMPLATES)
cd "$XDG_TEMPLATES_DIR"
touch 'New Text File.txt' && touch 'New Word File.doc' && touch 'New Excel Spreadsheet.xls'
```

---

## Сброс пароля, root [Reset_root_password](https://wiki.archlinux.org/index.php/Reset_root_password_(%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9)).
