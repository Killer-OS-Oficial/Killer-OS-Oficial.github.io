---
title: Squashfs
sidebar: 'wiki'
prev: '/wiki/backup/timeshift-rsync/'
next: '/wiki/backup/netcat/'
date_up: 2020-08-13
---

# Copia de seguridad de Squashfs

## Reducir una partición con mksquashfs

```bash
pacman -S squashfs-tools arch-install-scripts
```

Observamos las particiones del disco.

```bash
lsblk
```

Monte para leer root, arranque (inicio) y cree una imagen, comprima xz.

```bash
mount /dev/sda5 -o ro /mnt
mount /dev/sda2 -o ro /mnt/boot
mount /dev/sda7 -o ro /mnt/home
```

Archivado.

```bash
mksquashfs /mnt ~/backup/myarch.sfs -comp xz
```

Una excepción: `-e /dir/file`.

Lo desmontaremos al finalizar.

```bash
umount -R /mnt
```

##  Recuperación

Desde un sistema en funcionamiento o Live-usb. Formateamos y montamos una partición dañada o nueva, arrancamos si es necesario, etc.

```bash
mkfs.ext4 -L "root" -U "$(blkid -o value -s UUID /dev/sda5)" /dev/sda5
mkfs.ext2 -L "boot" -U "$(blkid -o value -s UUID /dev/sda2)" /dev/sda2
mkfs.ext4 -L "home" -U "$(blkid -o value -s UUID /dev/sda7)" /dev/sda7
mkswap /dev/sda3

mount /dev/sda5 /mnt
mount /dev/sda2 /mnt/boot
mount /dev/sda7 /mnt/home
```

Desempaquete la imagen comprimida.

```bash
unsquashfs -d /mnt -f ~/backup/myarch.sfs
```

Revisemos y desmontemos la partición.

```bash
ls /mnt
umount /dev/sda2
umount /dev/sda7
umount /dev/sda5
```

Monte la partición raíz (dev/sda5), arranque, etc., si es necesario.

```bash
mount /dev/sda5 /mnt
mount /dev/sda2 /mnt/boot
mount /dev/sda7 /mnt/home
swapon /dev/sda3
```

Editar / generar si es necesario `/etc/fstab`, `/etc/mkinitcpio.conf`.

```bash
rm /mnt/etc/fstab
genfstab -pU /mnt > /mnt/etc/fstab
```

Chroot en el nuevo sistema.

```bash
arch-chroot /mnt /bin/zsh
```

o `chroot /mnt /bin/bash` Le gusta a Debian.

Creamos imágenes initramfs.

```bash
mkinitcpio -p linux
```

Configurando claves de pacman.

```bash
pacman-key --init
pacman-key --populate archlinux
```

Actualizar el menú del cargador de arranque es de mala educación, os-prober (para buscar otro sistema operativo).

```bash
pacman -S os-prober
grub-install /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```

¡Salga de **chroot** , desmonte las particiones y reinicie el sistema restaurado!

```bash
umount /mnt/boot
umount /mnt/home
umount /mnt
reboot
```

## Montar una imagen

```bash
mount ~/backup/myarch.sfs -t squashfs -o loop /mnt
```

Ahora puede copiar cualquier archivo `cp -p` que desee de la imagen.

No podrá agregar nada de esta manera, para ello tendrá que usar `mksquashfs` nuevamente.
