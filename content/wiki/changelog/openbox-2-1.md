---
title: Openbox,i3 v2.1
sidebar: 'changelog'
description: 'Обновление Openbox,i3 v2.1'
date: 2019-04-21
tags: [minor]
---

# Релиз Ctlos Linux — Openbox,i3 v2.1

Переход на sddm. Удалил atril(pdf-просмотрщик), т.к. появилась зависимость от caja(файловый менеджер). Альтернатива Evince тянет за собой gnome, поэтому тож не то. Оставляю выбор для вас). По некоторым просьбам добавил раскладку в трэй gxkb. Ядро linux 5.0.7.

Благодарю за интересный обзор), пользователя под ником: debianeach. [Краткий обзор установочного livecd Ctlos Xfce v1.2.0](http://auriz.ru/blogs/kratkii-obzor-ustanovochnogo-livecd-ctlos-xfce-v1-2-0)

## Добавлено (added)

- sddm
- sddm-config-editor-git
- grub-customizer
- gxkb

## Удалено (removed)

- atril
- lightdm

## Полный список пакетов

- [packages.both](https://github.com/ctlos/ctlosiso/blob/5e603fbb600c36a7161bd6fb51dd5c50bcd62741/packages.both).
