---
title: Netcat, ssh, rsync
sidebar: 'wiki'
prev: '/wiki/backup/squashfs/'
date_up: 2020-08-13
---

## Trabajando con Netcat, ssh, rsync

```bash
sudo pacman -S gnu-netcat pv
```

Ejemplos de transferencias.

```bash
cat dump.iso | pv -b | nc -l 3333

dd if=/dev/sdb5 | gzip -9 | nc -l 3333

tar -czf - /etc/ | pv -b | nc -l 3333
```

Ejemplos de recepción.

```bash
nc 187.187.55.18 3333 | pv -b > dump.iso

nc 187.187.55.18 3333 | pv -b > ddsdb5dump.img.gz

nc 187.187.55.18 3333 | pv -b > dump.tar.gz
```

## Un ejemplo de cómo obtener un túnel ssh

Esto es necesario si no hay acceso al puerto "3333". Toda la transmisión está encriptada porque ssh.

Cree un puente (túnel) a ip `127.0.0.1` (localhost), al puerto` 23333`. `-p 22` Este es el puerto ssh estándar y generalmente se cambia.

```bash
ssh -p 22 -f -L 23333:127.0.0.1:3333 name@187.187.55.18 sleep 10; \
nc 127.0.0.1 23333 | pv -b > killer-os.iso

ssh -p 22 -fN -L 23333:127.0.0.1:3333 name@187.187.55.18   # reenvío de puertos
```

## SSH **scp**

De lo local a lo remoto.

```bash
scp -P 2222 file.txt file2.txt name@187.187.55.18:/home/user/dir

scp -P 2222 -r dir1 name@187.187.55.18:/home/user/dir2
```

De remoto a LAN.

```bash
scp -P 2222 name@187.187.55.18:file.txt /home/user/dir

scp -P 2222 name@187.187.55.18:~/\{file1,file2,file3\} .

scp -P 2222 -r name@187.187.55.18:/home/dir/ /home/user/dir/
```

De un servidor a otro.

```bash
scp name@187.187.55.18:/dir/file.txt name@198.198.188.18:/name/dir/
```

## Sincronización Rsync

Instalando  **rsync**.

```bash
sudo pacman -S rsync
```

En el servidor, debe crear un directorio `/dump`, iniciar el servicio (demonio), configurar la configuración y abrir el puerto 873 (tcp).

```bash
sudo systemctl start rsyncd.service
```

uid es el usuario en el servidor, gid es el grupo al que pertenece (usualmente usuarios). Cree `/dump` en el servidor y dele derechos.

```bash
sudo mkdir /dump
sudo chown username:users /dump
```

Configuración: `/etc/rsyncd.conf`. Especifique la ip en `hosts deny` desde la que se está conectando.

```bash
syslog facility=daemon
pid file=/var/run/rsyncd.pid
transfer logging = yes
log file = /var/log/rsyncd.log
max connections = 10
exclude = lost+found/
dont compress = *.gz *.tgz *.zip *.z *.rpm *.deb *.iso *.bz2 *.tbz

[dump]
comment = rsync open for dump
uid = username
gid = users
#auth users = killer
#secrets file = /etc/rsyncd.scrt
path = /dump/
list = yes
read only = no
hosts allow = 188.128.110.170
hosts deny = *
```

Después de cambiar la configuración, reiníciela. No uso autenticación de contraseña, así que comenté dos líneas (#).

```bash
sudo systemctl restart rsyncd.service
```

Según mis pruebas, es mejor transferir datos sin comprimir (Sincronización).

Ejemplo de directorio y carga de archivos.

```bash
rsync -auvz -L -P ~/test.sfs rsync://187.187.55.18/dump

rsync -auvz -L -P ~/dir/* rsync://187.187.55.18/dump
```

Recepción.

```bash
rsync -auvz -L -P rsync://187.187.55.18/dump ~/.dump/
```

Ssh.

```bash
rsync -auvz -L -P -e "ssh -p 2222" name@187.187.55.18:/path/to/copy /local/path

rsync -auvz -L -P -e "ssh -p 2222" /local/path name@187.187.55.18:/path/to/copy
```
