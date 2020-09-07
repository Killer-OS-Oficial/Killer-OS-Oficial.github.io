---
title: Instalación de btrfs
description: Manual para instalar Arch Linux en btrfs.
sidebar: 'wiki'
next: '/wiki/btrfs/btrfs-part2/'
date_up: 2020-08-13
---

# Instalación y uso de Btrfs

## comenzando

Instale el paquete de utilidades personalizadas.

```bash
pacman -S btrfs-progs arch-install-scripts
```

`lsblk` - lista todas las secciones para decidir qué montar.

```bash
# disco de partición, -z dice poner a cero la tabla de particiones
cfdisk -z /dev/sda
```

Dado que Btrfs no puede contener un archivo de intercambio, debe ocuparse de la partición de intercambio con anticipación si la necesita.

```bash
mkswap /dev/sda2
```

Creamos un sistema de archivos en la partición. Para particiones de 1GB y más pequeñas, para usar el espacio de manera más eficiente, se recomienda pasar el interruptor -M a los parámetros `mkfs.btrfs`.

Opcionalmente, puede configurar la etiqueta con la tecla -L.

```bash
mkfs.btrfs /dev/sda<número>
mkfs.btrfs -L "root" /dev/sda<número>
```

Ahora montamos.

```bash
mount /dev/sdb1 /mnt
```

Luego crearemos dos subvolúmenes para los directorios de inicio de usuario y raíz.

```bash
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
```
Visualización de subvolúmenes.

```bash
btrfs subvolume list /mnt
```

Desmontemos la raíz FS.

```bash
umount /mnt
```

Para montar un subvoltaje como una partición de disco normal, el comando mount necesita especificar la opción subvol.

Monte la raíz. Compresión zstd o lzo.

```bash
mount -o subvol=@,compress=zstd /dev/sdb1 /mnt
```

Cree un directorio y monte nuestro futuro directorio de usuarios en él.

```bash
mkdir /mnt/home
mount -o subvol=@home,compress=zstd /dev/sdb1 /mnt/home
```

Luego actuamos en la wiki, es decir elija espejos e instale el sistema base. Al generar initramfs, mkinitcpio se quejará de la ausencia de fsck.btrfs; esto es normal. Eliminemos este gancho fsck de la configuración, porque no es necesario para Btrfs.

```bash
nano /etc/mkinitcpio.conf
```

Aquí está la línea dada en el archivo.

```bash
HOOKS="base udev autodetect modconf block filesystems keyboard"
```

Y vuelva a crear initramfs.

```bash
mkinitcpio -p linux
```

Y una cosa más sobre el gestor de arranque, no sé cómo otros, pero grub definitivamente sabe cómo arrancar desde Btrfs, así que es mejor elegirlo. Además, no olvide instalar el paquete btrfs-progs y hacerse cargo de las copias de seguridad.

---

## Usando btrfs

Monte la raíz FS.

```bash
mount /dev/sdb1 /mnt
```

Crea instantáneas.

```bash
btrfs subvolume snapshot /mnt/@ /mnt/@_bac
btrfs subvolume snapshot /mnt/@home /mnt/@home_bac

btrfs subvolume list /mnt
```

Los directorios son absolutamente idénticos y, hasta que empezamos a cambiar los archivos, las instantáneas no ocupan espacio.

Eliminando.

```bash
btrfs subvolume delete /mnt/@
```

Rollback: arranque desde el Live CD, monte la raíz FS y cambie el nombre de los subvolúmenes. Los subvolúmenes también se pueden renombrar directamente en el sistema de producción si la descarga se realiza correctamente.

```bash
mount /dev/sdb1 /mnt
mv /mnt/@ /mnt/@_bad
mv /mnt/@_bac /mnt/@

mv /mnt/@home /mnt/@home_bad
mv /mnt/@home_bac /mnt/@home
```

O arrancamos como de costumbre, y en el menú de grub especificamos el subvolumen con la copia de seguridad `rootflags=subvol=backup`.

Copia en escritura (CoW). Si usa el comando `cp` con llave `--reflink=auto`, entonces la copia del archivo no ocupará espacio en disco. Y más tarde, por ejemplo, cuando se cambia el archivo copiado, solo se escribirán en el disco los bloques modificados.

"Online" - Comprobación de FS. En el que todos los datos / metadatos se leen con la verificación de sumas de verificación, si hay errores, se detectan y corrigen si es posible.

```bash
btrfs scrub start -B /
```

Si omite el modificador `-B`, el proceso pasará a segundo plano y el comando podrá averiguar sobre el progreso de la ejecución.

```bash
btrfs scrub status /
```

Salida de muestra.

```bash
scrub status for 56edc366-a153-4eee-b2a6-471b7066b93d
scrub started at Sat Dec 14 06:37:19 2013 and finished after 3242 seconds
total bytes scrubbed: 222.45GB with 0 errors
```

Se recomienda verificarlo regularmente (semanalmente). "Fuera de línea": comprobación de FS (en la partición desmontada). Si no hay errores, la utilidad devolverá 0.

```bash
btrfs check /dev/sda
```

---

## Instalar desde un sistema existente o desde un usb en vivo

```bash
pacman -S btrfs-progs arch-install-scripts
```

`lsblk` - resalte todas las secciones para decidir qué montar.

Dado que Btrfs no puede contener un archivo de intercambio, debe ocuparse de la partición de intercambio con anticipación si la necesita.

```bash
mkswap /dev/sda2
```

¡Atención! esto formateará todo su disco, ¡con pérdida de datos! En este ejemplo, la instalación va a todo el disco, no a las particiones, si necesita un intercambio, considere este punto.

```bash
mkfs.btrfs -f -L WD /dev/sdb
```

Montamos.

```bash
mount /dev/sdb /mnt
```

Creemos dos subvolúmenes bajo la raíz `@` y el directorio de inicio del usuario `@ home`.

```bash
btrfs subvolume create /mnt/@
btrfs subvolume create /mnt/@home
```

Y desmonte la raíz FS.

```bash
umount /mnt
```

Monte la raíz.

```bash
mount -o subvol=@,compress=zstd /dev/sdb /mnt
```

Cree un directorio y monte nuestro futuro directorio de usuarios en él.

```bash
mkdir /mnt/home
mount -o subvol=@home,compress=zstd /dev/sdb /mnt/home
```

Instale paquetes básicos.

```bash
pacstrap /mnt base base-devel linux linux-headers xorg-xinit xorg-server grub zsh mc nano netctl wpa_supplicant dialog dhcpcd btrfs-progs
```

Creamos fstab.

```bash
genfstab -pU /mnt >> /mnt/etc/fstab
```

Comprobación.

```bash
cat /mnt/etc/fstab
```

Cree un directorio y monte el arranque si es necesario.

```bash
mount -t proc none /mnt/proc
mount -t sysfs none /mnt/sys
mount -o bind /dev /mnt/dev

cp -L /etc/resolv.conf /mnt/etc

swapon /dev/sda2
```

A partir del kernel 5.0, puede crear un archivo de intercambio, el archivo de intercambio debe estar ubicado completamente en un dispositivo, creado con COW deshabilitado y compresión.

```bash
touch /swap             # crear un archivo / intercambio vacío
chmod go-r /swap        # el intercambio debe ser 600
chattr +C /swap         # apagar COW, la compresión también se apaga
fallocate /swap -l4g    # Archivo 4Gb
mkswap /swap
swapon /swap
```

Vamos a revisar.

```bash
btrfs subvolume list /mnt
```

Entramos en el sistema.

```bash
chroot /mnt /bin/zsh
```

Asignamos un anfitrión.

```bash
echo ctlos > /etc/hostname
```

Selección de zona horaria.

```bash
ln -sf /usr/share/zoneinfo/UTC /etc/localtime
hwclock --systohc --utc
timedatectl set-ntp true
# o
timedatectl set-timezone America/Mexico
```

Elija una configuración regional para el sistema.

```bash
sed -i "s/#\(es_MX\.UTF-8\)/\1/" /etc/locale.gen

locale-gen         # Generar locales
```

Registrarse en`/etc/locale.conf`.

```bash
echo "LANG=es_MX.UTF-8" > /etc/locale.conf
echo "LC_COLLATE=C" >> /etc/locale.conf
```

Fuente en Español en la consola.

```bash
echo "KEYMAP=es" > /etc/vconsole.conf
```

Cree un disco de marco mkinitcpio.

```bash
nano /etc/mkinitcpio.conf
```

En `/ etc / mkinitcpio.conf`, en la sección **HOOKS**, el` mapa de teclas` del teclado del gancho debe estar registrado, elimine` fsck`.

En la sección **MÓDULOS **, debe registrar el controlador de su tarjeta de video: i915 para Intel, radeon para AMD, nouveau para Nvidia.

```bash
HOOKS=(base udev autodetect modconf block filesystems keyboard keymap)
```

```bash
mkinitcpio -p linux
```

Establecer contraseña de root.

```bash
passwd
```

Crear usuario.

```bash
useradd -m -g users -G wheel,audio,video,storage -s /bin/zsh killer
```

Y pídale una contraseña.

```bash
passwd killer
```

Descomente en `/ etc / pacman.conf`.

```bash
[multilib]
Include = /etc/pacman.d/mirrorlist
```

Luego ejecuta.

```bash
pacman-key --init
pacman-key --populate
pacman -Syy
```

Instalación del cargador de arranque.

```bash
grub-install /dev/sdb
grub-mkconfig -o /boot/grub/grub.cfg
```

Configuración de sudo.

```bash
EDITOR=nano visudo
```

Otorgue al usuario privilegios de superusuario o grupo cuando escriba sudo.

```bash
malody ALL=(ALL) ALL
```
O un grupo.

```bash
%wheel ALL=(ALL) ALL
```
Para no solicitar una contraseña al usuario.

```bash
Defaults:malody      !authenticate
```
