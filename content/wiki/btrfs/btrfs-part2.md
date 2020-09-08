---
layout: default
title: Btrfs Continuar
description: Cómo restaurar Arch Linux a btrfs.
sidebar: 'wiki'
prev: '/wiki/btrfs/btrfs-part1/'
date_up: 2020-08-13
---

# Transferencia Btrfs, recuperación


## Transferir a la partición btrfs, rsync

```bash
pacman -S rsync btrfs-progs arch-install-scripts
```

`lsblk` - resalte todas las secciones para decidir qué montar.

Si es necesario, particione el disco, -z dice que ponga a cero la tabla de particiones.

```bash
cfdisk -z /dev/sda
```

Montamos.

```bash
mount /dev/sda6 /mnt
```

Creemos tres subvolúmenes raíz, un directorio de inicio de usuario y un subvolumen de almacenamiento.

```bash
btrfs subvolume create /mnt/@_root
btrfs subvolume create /mnt/@_home
btrfs subvolume create /mnt/@_snapshots

btrfs subvolume list /mnt
```

Para transferir, monte el sistema de respaldo y transfiéralo.

```bash
mkdir /mnt/dump
mount /dev/sdb1 /mnt/dump
```

```bash
rsync -avAXHP --delete --delete-excluded --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found","/var/lib/pacman/sync/*","/var/cache/*","/var/tmp/*","/boot/*","/home/*"} /mnt/dump/@/* /mnt/@_root/
```

```bash
rsync -avAXHP --delete --delete-excluded --exclude={"/dev/*","/proc/*","/sys/*","/tmp/*","/run/*","/mnt/*","/media/*","/lost+found","/var/lib/pacman/sync/*","/var/cache/*","/var/tmp/*","/boot/*","/home/*"} /mnt/dump/@home/* /mnt/@_home/
```

Y desmonte la raíz FS.

```bash
umount /mnt
rm -rf /mnt/dump
```

Para montar un subvolumen como una partición de disco normal, el comando de montaje debe especificar la opción subvol=PATH. PATH: ruta relativa a la raíz FS. Monte la raíz. Compresión zstd o lzo.

```bash
mount -o subvol=@,compress=zstd /dev/sda6 /mnt
```

¿Cuáles son las opciones recomendadas para instalar en una tarjeta SD o una unidad SSD lenta? en `/etc/fstab` . https://wiki.debian.org/Btrfs.

```bash
/dev/sdaX / btrfs x-systemd.device-timeout=0,noatime,compress=lzo,commit=0,ssd_spread,autodefrag 0 0

UUID=<the_device_uuid> /mount/point/ btrfs noauto,compress=lzo,noatime,autodefrag 0 0
```

Creamos un directorio y montamos nuestro directorio de usuario futuro en él, si la partición de arranque está separada, debe montarlo en `/mnt/boot`.

Si es necesario`mkdir /mnt/home`.

```bash
mount -o subvol=@home,compress=zstd /dev/sda6 /mnt/home
```

Si es necesario `mkdir /mnt/snapshots`.

```bash
mount -o subvol=@snapshots,compress=zstd /dev/sda6 /mnt/snapshots

mount -t proc none /mnt/proc
mount -t sysfs none /mnt/sys
mount -o bind /dev /mnt/dev

cp -L /etc/resolv.conf /mnt/etc

swapon /dev/sda3
```

A partir del kernel 5.0, puede crear un archivo de intercambio, el archivo de intercambio debe estar ubicado completamente en un dispositivo, creado con COW deshabilitado y compresión.

```bash
touch /swap             # crear un archivo /swap
chmod go-r /swap        # el intercambio debe ser 600
chattr +C /swap         # apagar COW, la compresión también se apaga
fallocate /swap -l4g    # Archivo 4Gb
mkswap /swap
swapon /swap
```

Ahora necesitamos inicializar el sistema. Edite FSTAB o ejecute genfstab.

```bash
rm /mnt/etc/fstab
genfstab -pU /mnt > /mnt/etc/fstab
```

Vayamos a nuestro nuevo sistema.

```bash
chroot /mnt /bin/bash
```

Generando initramfs con mkinicpio.

```bash
mkinitcpio -p linux
```

Instale el cargador de arranque GRUB2 y configúrelo.

```bash
grub-install /dev/sdХ
grub-mkconfig -o /boot/grub/grub.cfg
```

`exit` o "Ctrl + D" para salir de chroot.

Ahora necesitas desmontar todo.

```bash
umount /mnt/home
umount /mnt/snapshots
umount /mnt
reeboot
```

---

## Instantánea a otra partición/disco

- [Incremental_Backup](https://btrfs.wiki.kernel.org/index.php/Incremental_Backup)
- [btrfs-sxbackup](https://github.com/masc3d/btrfs-sxbackup)
- [btrfs-snapshot](https://github.com/YHNdnzj/btrfs-snapshot)

Montamos la sección principal.

```bash
mkdir /mnt/arch
mount /dev/sda6 /mnt/arch
```

Monte la partición/disco para volcar la instantánea.

```bash
mkdir /mnt/dump
mount /dev/sda8 /mnt/dump
```

Es necesario crear instantáneas, solo lectura, requiere `enviar`. Para enviar a otros nodos.

> Volcamos todo, desde la caché hasta el disco `sync`, IMPORTANTE.

```bash
btrfs subvolume snapshot -r /mnt/arch/@ /mnt/arch/@_BACKUP
sync
btrfs subvolume snapshot -r /mnt/arch/@home /mnt/arch/@home_BACKUP
sync
```

Transferimos instantáneas. Puede enviar a archivo`btrfs send /mnt/arch/@_BACKUP -f /dump.sn`, recibir de archivo`btrfs receive /mnt/dump/ -f /dump.sn`.

```bash
btrfs send /mnt/arch/@_BACKUP | btrfs receive /mnt/dump/
btrfs send /mnt/arch/@home_BACKUP | btrfs receive /mnt/dump/
```

Instantáneas incrementales de solo lectura.

```bash
btrfs subvolume snapshot -r /mnt/arch/@ /mnt/arch/@_BACKUP_new
sync
btrfs subvolume snapshot -r /mnt/arch/@home /mnt/arch/@home_BACKUP_new
sync
```

Crea una diferencia entre las imágenes.

```bash
btrfs send -p /mnt/arch/@_BACKUP /mnt/arch/@_BACKUP_new | btrfs receive /mnt/dump/
btrfs send -p /mnt/arch/@home_BACKUP /mnt/arch/@home_BACKUP_new | btrfs receive /mnt/dump/
```

Echemos un vistazo a la lista.

```bash
btrfs subvolume list /mnt/dump
```

### Envío de SSH

Localmente: generar claves, crear `~/.ssh/config`.

```bash
# generación de un par de claves, públicas (enviar al servidor)
# id_rsa.pub
ssh-keygen -t rsa -b 4096 -C "lol@gmail.com"

# nano ~/.ssh/config
Host office
    HostName 192.168.100.51
    Port 22
    User test
```

```bash
PasswordAuthentication yes                 # en el servidor /etc/ssh/sshd_config
systemctl restart sshd
ssh-copy-id -i ~/.ssh/id_rsa.pub office    # enviando la clave al servidor
# en el servidor /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no                  # deshabilitar el acceso con contraseña, todos.
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
systemctl restart sshd
systemctl enable sshd

btrfs send /mnt/arch/@_BACKUP | ssh office "btrfs receive /mnt/backups"
# o
btrfs send /mnt/arch/@_BACKUP | ssh -p 22 test@192.168.100.51 "btrfs receive /mnt/backups"
```

Пример скрипта - инкрементальный, взято с (ubuntu.ru/wiki).

```bash
#!/bin/bash
# puntos de montaje
src=$(mktemp -d "${TMPDIR:-/tmp/}$(basename 0).XXXXXXXXXXXX")
dst=$(mktemp -d "${TMPDIR:-/tmp/}$(basename 0).XXXXXXXXXXXX")
# montamos
mount /dev/sda2 $src
mount /dev/sdb2 $dst
if [ -e $src/root_BCKP ]
then # primer lanzamiento de copia de seguridad completa
  # Crea una instantánea de solo lectura
  btrfs subvolume snapshot -r $src/@ $src/root_BCKP
  sync
  # Continuar
  btrfs send $src/root_BCKP | btrfs receive $dst/
else # reiniciar, incremental
  # Rebautizar
  mv $src/root_BCKP $src/root_BCKP_prev
  mv $dst/root_BCKP $dst/root_BCKP_prev
  # Crea la corriente
  btrfs subvolume snapshot -r $src/@ $src/root_BACKUP
  sync
  # respaldo incremental
  btrfs send -p $src/root_BCKP_prev $src/root_BACKUP | btrfs receive $dst/
fi
# en $dst/root_BACKUP copia de la raíz.
umount $src
umount $dst
# Eliminar puntos de montaje
rmdir $src
rmdir $dst
```

> Todo funciona al revés también.

Eliminar o cambiar el nombre `mv`.

```bash
btrfs subvolume delete /mnt/dump/@_BACKUP
btrfs subvolume delete /mnt/dump/@home_BACKUP
```

Cambie el nombre de las nuevas instantáneas.

```bash
mv /mnt/dump/@_BACKUP_new /mnt/dump/@
mv /mnt/dump/@home_BACKUP_new /mnt/dump/@home
```

> Propiedades. Ahora están en ro - solo lectura (solo lectura), cambian a rw - lectura-escritura (lectura-escritura). Los valores cambian así: `ro true`,` ro false`.

```bash
btrfs property get /mnt/dump/@        # ver propiedades

btrfs property set /mnt/dump/@ ro false
btrfs property set /mnt/dump/@home ro false

btrfs subvolume show /mnt/dump/@      # información
```

Eliminar si es necesario.

```bash
btrfs subvolume delete /mnt/arch/@_BACKUP
btrfs subvolume delete /mnt/arch/@home_BACKUP
```

Desmontar.

```bash
umount /mnt/arch
umount /mnt/dump

rmdir /mnt/{arch,dump}
```

> La recuperación, como arriba, se carga desde live-usb o desde otro sistema. Monte la partición para recuperación, la dañada y la partición con copia de seguridad, restaure instantáneas.

Monte el sistema de archivos para reconstruir fstab e inicializar.

```bash
mount -o subvol=@,compress=zstd /dev/sda8 /mnt
ls /mnt
mount -o subvol=@home,compress=zstd /dev/sda8 /mnt/home
```

Si la partición de arranque está separada, entonces debe montarla en /mnt/boot y en todos los demás subvolúmenes.

```bash
mount /dev/sda2 /mnt/boot

mount -t proc none /mnt/proc
mount -t sysfs none /mnt/sys
mount -o bind /dev /mnt/dev

cp -L /etc/resolv.conf /mnt/etc

swapon /dev/sda3
```

A partir del kernel 5.0, puede crear un archivo de intercambio, el archivo de intercambio debe estar ubicado completamente en un dispositivo, creado con COW deshabilitado y compresión.

```bash
touch /swap             # crear un archivo vacío/swap
chmod go-r /swap        # el intercambio debe ser 600
chattr +C /swap         # apagar COW, la compresión también se apaga
fallocate /swap -l4g    # Archivo 4Gb
mkswap /swap
swapon /swap
```

Edite FSTAB o ejecute genfstab.

```bash
rm /mnt/etc/fstab
genfstab -pU /mnt > /mnt/etc/fstab

nano /mnt/etc/fstab
```

Vayamos a nuestro nuevo sistema.

```bash
chroot /mnt
```

O zsh.

```bash
chroot /mnt /bin/zsh
```

Regenerado.

```bash
mkinitcpio -p linux
```

Instale el cargador de arranque GRUB2 y configúrelo.

```bash
grub-install /dev/sdХ
grub-mkconfig -o /boot/grub/grub.cfg
```

Inicializamos las claves y las actualizamos si es necesario.

```bash
pacman-key --init && pacman-key --populate && pacman-key --refresh-keys && pacman -Syy
```

`exit` o "Ctrl + D" para salir de chroot.

Ahora necesitas desmontar todo.

```bash
umount -R /mnt
reeboot
```

