---
title: Notas
sidebar: 'wiki'
date_up: 2020-08-13
---

# Notas

## Descarga y escribe en usb

[https://github.com/Killer-OS-Oficial/Killer-OS-Oficial/releases](https://github.com/Killer-OS-Oficial/Killer-OS-Oficial/releases)

Registre un enlace completo al archivo.

Wget.

```bash
sudo wget -O - https://github.com/Killer-OS-Oficial/Killer-OS-Oficial/releases/download/v1.0/*.iso > /dev/sdX && sync
```

Curl.

```bash
sudo curl -L https://github.com/Killer-OS-Oficial/Killer-OS-Oficial/releases/download/v1.0.0/*.iso > /dev/sdX && sync
```

Curl + dd.

```bash
sudo curl -L https://github.com/Killer-OS-Oficial/Killer-OS-Oficial/releases/download/v1.0.0/*.iso | dd bs=4M of=/dev/sdX status=progress && sync
```

---

## Arch instalar sin medios (usb)

[wiki.archlinux.org/index.php/Install_from_existing_Linux](https://wiki.archlinux.org/index.php/Install_from_existing_Linux).