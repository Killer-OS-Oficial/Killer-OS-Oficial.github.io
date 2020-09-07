---
layout: default
title: Btrfs перенос
description: Мануал по восстановлению Arch Linux на btrfs.
sidebar: 'wiki'
prev: '/wiki/btrfs/btrfs-part1/'
date_up: 2020-08-13
---

# Btrfs перенос, восстановление

<div class="responsive-container">
  <iframe class="responsive-iframe w-full h-full top-0 left-0 border-0" src="https://www.youtube.com/embed/97ui81gWUcU" style="border:0;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Перенос на раздел btrfs, rsync

```bash
pacman -S rsync btrfs-progs arch-install-scripts
```

`lsblk` - подсветить все разделы что бы определиться что монтировать.

При необходимости разбить диск, -z говорит обнулить таблицу разделов.

```bash
cfdisk -z /dev/sda
```

Монтируем.

```bash
mount /dev/sda6 /mnt
```

Создадим три подтома root, домашний каталог пользователя и подтом для хранения.

```bash
btrfs subvolume create /mnt/@_root
btrfs subvolume create /mnt/@_home
btrfs subvolume create /mnt/@_snapshots

btrfs subvolume list /mnt
```

Для переноса смонтируйте резервную систему и перенесите ее.

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

И отмонтируем корень ФС.

```bash
umount /mnt
rm -rf /mnt/dump
```

Чтобы монтировать подтом подобно обычному разделу диска, команде mount нужно указывать опцию subvol=PATH. PATH - путь относительно корня ФС. Монтируем корень. Сжатие zstd, или lzo.

```bash
mount -o subvol=@,compress=zstd /dev/sda6 /mnt
```

Какие рекомендуемые варианты для установки на SD-карту, или медленный SSD-накопитель? В `/etc/fstab` См. https://wiki.debian.org/Btrfs.

```bash
/dev/sdaX / btrfs x-systemd.device-timeout=0,noatime,compress=lzo,commit=0,ssd_spread,autodefrag 0 0

UUID=<the_device_uuid> /mount/point/ btrfs noauto,compress=lzo,noatime,autodefrag 0 0
```

Создаём директорию и монтируем в неё наш будущий каталог пользователей, если boot раздел отдеольно, нужно его тоже смонтироват в `/mnt/boot`.

Если нужно `mkdir /mnt/home`.

```bash
mount -o subvol=@home,compress=zstd /dev/sda6 /mnt/home
```

Если нужно `mkdir /mnt/snapshots`.

```bash
mount -o subvol=@snapshots,compress=zstd /dev/sda6 /mnt/snapshots

mount -t proc none /mnt/proc
mount -t sysfs none /mnt/sys
mount -o bind /dev /mnt/dev

cp -L /etc/resolv.conf /mnt/etc

swapon /dev/sda3
```

Начиная с ядра 5.0 можно создать swap-файл, swap-файл должен располагаться целиком на одном устройстве, создаваться с отключенным COW и сжатием.

```bash
touch /swap             # создаем пустой файл /swap
chmod go-r /swap        # swap должен иметь права 600
chattr +C /swap         # отключаем COW, сжатие тоже отключается
fallocate /swap -l4g    # файл 4Gb
mkswap /swap
swapon /swap
```

Теперь нужно проинициализировать систему. Редактируем FSTAB, или запускаем genfstab.

```bash
rm /mnt/etc/fstab
genfstab -pU /mnt > /mnt/etc/fstab
```

Переходим в нашу новую систему.

```bash
chroot /mnt /bin/bash
```

Генерация initramfs с помощью mkinicpio.

```bash
mkinitcpio -p linux
```

Установить загрузчик GRUB2 и сконфигурировать его.

```bash
grub-install /dev/sdХ
grub-mkconfig -o /boot/grub/grub.cfg
```

`exit` или "Ctrl + D" выйти из chroot.

Теперь  нужно все размонтировать.

```bash
umount /mnt/home
umount /mnt/snapshots
umount /mnt
reeboot
```

---

## Снапшот на другой раздел/диск

- [Incremental_Backup](https://btrfs.wiki.kernel.org/index.php/Incremental_Backup)
- [btrfs-sxbackup](https://github.com/masc3d/btrfs-sxbackup)
- [btrfs-snapshot](https://github.com/YHNdnzj/btrfs-snapshot)

Монтируем основной раздел.

```bash
mkdir /mnt/arch
mount /dev/sda6 /mnt/arch
```

Монтируем раздел/диск для сброса снапшота.

```bash
mkdir /mnt/dump
mount /dev/sda8 /mnt/dump
```

Нужно создавать снапшоты, только для чтения(readonly), требует `send`. Для отправки на другие узлы.

> Сбрасываем все из кэша на диск `sync`, ВАЖНО.

```bash
btrfs subvolume snapshot -r /mnt/arch/@ /mnt/arch/@_BACKUP
sync
btrfs subvolume snapshot -r /mnt/arch/@home /mnt/arch/@home_BACKUP
sync
```

Переносим снапшоты. Можно send в файл `btrfs send /mnt/arch/@_BACKUP -f /dump.sn`, receive из файла `btrfs receive /mnt/dump/ -f /dump.sn`.

```bash
btrfs send /mnt/arch/@_BACKUP | btrfs receive /mnt/dump/
btrfs send /mnt/arch/@home_BACKUP | btrfs receive /mnt/dump/
```

Инкрементальные readonly снимки.

```bash
btrfs subvolume snapshot -r /mnt/arch/@ /mnt/arch/@_BACKUP_new
sync
btrfs subvolume snapshot -r /mnt/arch/@home /mnt/arch/@home_BACKUP_new
sync
```

Создаём разность между снимками.

```bash
btrfs send -p /mnt/arch/@_BACKUP /mnt/arch/@_BACKUP_new | btrfs receive /mnt/dump/
btrfs send -p /mnt/arch/@home_BACKUP /mnt/arch/@home_BACKUP_new | btrfs receive /mnt/dump/
```

Просмотрим листинг.

```bash
btrfs subvolume list /mnt/dump
```

### Отправка по ssh

Локально: генерируем ключи, создаём `~/.ssh/config`.

```bash
# генерация пары ключий, публичный(отправляем на сервер)
# id_rsa.pub
ssh-keygen -t rsa -b 4096 -C "lol@gmail.com"

# nano ~/.ssh/config
Host office
    HostName 192.168.100.51
    Port 22
    User test
```

```bash
PasswordAuthentication yes                 # на сервере /etc/ssh/sshd_config
systemctl restart sshd
ssh-copy-id -i ~/.ssh/id_rsa.pub office    # отправка ключа на сервер
# на сервере /etc/ssh/sshd_config
PermitRootLogin no
PasswordAuthentication no                  # отключим доступ по паролю, всем.
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
systemctl restart sshd
systemctl enable sshd

btrfs send /mnt/arch/@_BACKUP | ssh office "btrfs receive /mnt/backups"
# или
btrfs send /mnt/arch/@_BACKUP | ssh -p 22 test@192.168.100.51 "btrfs receive /mnt/backups"
```

Пример скрипта - инкрементальный, взято с (ubuntu.ru/wiki).

```bash
#!/bin/bash
# точки монтирования
src=$(mktemp -d "${TMPDIR:-/tmp/}$(basename 0).XXXXXXXXXXXX")
dst=$(mktemp -d "${TMPDIR:-/tmp/}$(basename 0).XXXXXXXXXXXX")
#монтируем
mount /dev/sda2 $src
mount /dev/sdb2 $dst
if [ -e $src/root_BCKP ]
then # первый запуск полный бекап
  # Создаем снимок read-only
  btrfs subvolume snapshot -r $src/@ $src/root_BCKP
  sync
  # переносим
  btrfs send $src/root_BCKP | btrfs receive $dst/
else # повторный запуск, инкрементальный
  # Переименовываем
  mv $src/root_BCKP $src/root_BCKP_prev
  mv $dst/root_BCKP $dst/root_BCKP_prev
  # Создаем текущий
  btrfs subvolume snapshot -r $src/@ $src/root_BACKUP
  sync
  # инкрементальный бекап
  btrfs send -p $src/root_BCKP_prev $src/root_BACKUP | btrfs receive $dst/
fi
# В $dst/root_BACKUP копия корня.
umount $src
umount $dst
# Удаляем точки монтирования
rmdir $src
rmdir $dst
```

> Всё это работает и в обратном порядке.

Удаляем или переименовываем `mv`.

```bash
btrfs subvolume delete /mnt/dump/@_BACKUP
btrfs subvolume delete /mnt/dump/@home_BACKUP
```

Переименовываем новые snapshot(ы).

```bash
mv /mnt/dump/@_BACKUP_new /mnt/dump/@
mv /mnt/dump/@home_BACKUP_new /mnt/dump/@home
```

> Свойства. Сейчас они в ro - read-only(только чтение), изменим на rw - read-write(чтение-завись). Значения изменяются так: `ro true`, `ro false`.

```bash
btrfs property get /mnt/dump/@        # посмотр свойств

btrfs property set /mnt/dump/@ ro false
btrfs property set /mnt/dump/@home ro false

btrfs subvolume show /mnt/dump/@      # информация
```

Удаляем, если нужно.

```bash
btrfs subvolume delete /mnt/arch/@_BACKUP
btrfs subvolume delete /mnt/arch/@home_BACKUP
```

Отмонтируем.

```bash
umount /mnt/arch
umount /mnt/dump

rmdir /mnt/{arch,dump}
```

> Восстановление, как и выше, грузимся с live-usb, или с другой системы. Монтируем раздел для восстановления, поврежденный и раздел с backup, восстанавливаем снапшоты.

Монтируем файловую систему, для пересоздания fstab и инициализации.

```bash
mount -o subvol=@,compress=zstd /dev/sda8 /mnt
ls /mnt
mount -o subvol=@home,compress=zstd /dev/sda8 /mnt/home
```

Если boot раздел отдеольно, то нужно его тоже смонтироват в /mnt/boot и все другие subvolume.

```bash
mount /dev/sda2 /mnt/boot

mount -t proc none /mnt/proc
mount -t sysfs none /mnt/sys
mount -o bind /dev /mnt/dev

cp -L /etc/resolv.conf /mnt/etc

swapon /dev/sda3
```

Начиная с ядра 5.0 можно создать swap-файл, swap-файл должен располагаться целиком на одном устройстве, создаваться с отключенным COW и сжатием.

```bash
touch /swap             # создаем пустой файл /swap
chmod go-r /swap        # swap должен иметь права 600
chattr +C /swap         # отключаем COW, сжатие тоже отключается
fallocate /swap -l4g    # файл 4Gb
mkswap /swap
swapon /swap
```

Редактируем FSTAB, или запускаем genfstab.

```bash
rm /mnt/etc/fstab
genfstab -pU /mnt > /mnt/etc/fstab

nano /mnt/etc/fstab
```

Переходим в нашу новую систему.

```bash
chroot /mnt
```

Или zsh.

```bash
chroot /mnt /bin/zsh
```

Перегенерироваь.

```bash
mkinitcpio -p linux
```

Установить загрузчик GRUB2 и сконфигурировать его.

```bash
grub-install /dev/sdХ
grub-mkconfig -o /boot/grub/grub.cfg
```

Инициализируем ключи и обновим, если требуется.

```bash
pacman-key --init && pacman-key --populate && pacman-key --refresh-keys && pacman -Syy
```

`exit` или "Ctrl + D" выйти из chroot.

Теперь  нужно все размонтировать.

```bash
umount -R /mnt
reeboot
```

> Ещё больше разжёвано на [ubuntu.ru/wiki](https://help.ubuntu.ru/wiki/btrfs).
