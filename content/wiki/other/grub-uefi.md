---
title: Grub UEFI
sidebar: 'wiki'
date_up: 2020-08-13
---

# Instalación Grub UEFI

## Formación

Información del disco.

```bash
parted /dev/sda print
```

Cree una tabla GPT. Cree la partición de arranque 512M, elija el tipo de EFI.

```bash
cfdisk
```

```bash
parted /dev/sda print
```

Formateemos.

```bash
mkfs.fat -F32 /dev/sda1
```

Montamos la raíz y otras, si es necesario.

```bash
mount /dev/sda2 /mnt
```

Creamos un directorio efi y otros, si es necesario.

```bash
mkdir -p /mnt/boot/efi
```

Monte el maletero EFI.

```bash
mount /dev/sda1 /mnt/boot/efi
```

## Instalación

Hacemos chroot.

```bash
arch-chroot /mnt
```

Instale Grub.

```bash
pacman -S grub efibootmgr dosfstools os-prober
```

Instalar grub en `/boot/efi`.

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=Arch --force
```

Configuremos Grub.

```bash
grub-mkconfig -o /boot/grub/grub.cfg
```
