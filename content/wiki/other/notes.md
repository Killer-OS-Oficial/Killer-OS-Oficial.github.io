---
title: Заметки
sidebar: 'wiki'
date_up: 2020-08-13
---

# Заметки

## Загрузка и запись на usb

[https://github.com/ctlos/ctlosiso/releases](https://github.com/ctlos/ctlosiso/releases)

Прописать полную ссылку к файлу.

Wget.

```bash
sudo wget -O - https://github.com/ctlos/ctlosiso/releases/download/v1.0.0/*.iso > /dev/sdX && sync
```

Curl.

```bash
sudo curl -L https://github.com/ctlos/ctlosiso/releases/download/v1.0.0/*.iso > /dev/sdX && sync
```

Curl + dd.

```bash
sudo curl -L https://github.com/ctlos/ctlosiso/releases/download/v1.0.0/*.iso | dd bs=4M of=/dev/sdX status=progress && sync
```

---

## Arch установка без носителя (usb)

[wiki.archlinux.org/index.php/Install_from_existing_Linux](https://wiki.archlinux.org/index.php/Install_from_existing_Linux).
