---
title: Видео драйвера
sidebar: 'wiki'
next: '/wiki/config/recomend/'
date_up: 2020-08-13
---

# Видео драйвера

Узнать информацию о видео карте.

```bash
lspci -k | grep -A 2 -E "(VGA|3D)"
```

- xf86-video-amdgpu — новый, свободный драйвер для видеокарт AMD;
- xf86-video-ati — старый свободный драйвер для AMD;
- xf86-video-intel — драйвер для встроенной графики Intel;
- xf86-video-nouveau — свободный драйвер для карт NVIDIA;
- xf86-video-vesa — свободный драйвер, поддерживающий все карты, но с очень ограниченной функциональностью. Для виртуальной машины.
- nvidia — проприетарный драйвер для NVIDIA.

Проприетарные драйвера увеличивают производительность.

Пакеты lib32-* нужно устанавливать только на x86_64 системы, пердварительно раскомментировать репозиторий multilib в `/etc/pacman.conf`.

## Intel

```bash
sudo pacman -S xf86-video-intel lib32-intel-dri
```

## Nvidia

```bash
yay -S nvidia nvidia-settings nvidia-utils opencl-nvidia opencl-headers lib32-nvidia-utils lib32-opencl-nvidia
```

Драйвер nvidia может иметь префикс nvidia-390xx, конкретно для вашей карты, уточняйте на сайте производителя и в Арч-вики.

```bash
yay -S lib32-opencl-nvidia-390xx lib32-nvidia-390xx-utils opencl-nvidia-390xx nvidia-390xx-utils nvidia-390xx-settings nvidia-390xx
```

Создание xorg файла `/etc/X11/xorg.conf`.

```bash
sudo nvidia-xconfig
```

Убираем тиринг.

```bash
sudo nvidia-settings
```

Переходим.

1. X Server Display Configuration
2. Advanced
3. Force Full Composition Pipeline
4. Save to X Configuration File
5. Exit
6. Reboot

## AMD

```bash
sudo pacman -S xf86-video-ati lib32-ati-dri
```

Убираем тиринг.

- [ATI](https://wiki.archlinux.org/index.php/ATI)
- [AMDGPU](https://wiki.archlinux.org/index.php/AMDGPU)

Если **ATI** `xf86-video-ati`.

```bash
sudo nano /etc/X11/xorg.conf.d/20-radeon.conf
```

```bash
Section "Device"
    Identifier "Radeon"
    Driver "radeon"
    Option "TearFree" "true"
EndSection
```

Если **AMDGPU** `xf86-video-amdgpu`.

```bash
sudo nano /etc/X11/xorg.conf.d/20-amdgpu.conf
```

```bash
Section "Device"
    Identifier "AMD"
    Driver "amdgpu"
    Option "TearFree" "true"
EndSection
```

## Для виртуальной машины

```bash
sudo pacman -S xf86-video-vesa
```
