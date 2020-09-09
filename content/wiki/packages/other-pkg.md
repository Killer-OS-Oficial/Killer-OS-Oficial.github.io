---
title: Añadir. programas
sidebar: 'wiki'
next: '/wiki/packages/iwd/'
date_up: 2020-08-13
---

# Instalación adicional programas

> Algunas explicaciones y recomendaciones de uso.

## Construyendo paquetes desde la fuente.

Cree un directorio `~ /.build` y acceda a él.

```bash
mkdir ~/.build && cd ~/.build
```

Busque el paquete que desee en [aur.archlinux.org](https://aur.archlinux.org) y descargue la instantánea.

```bash
wget https://aur.archlinux.org/cgit/aur.git/snapshot/gtk3-mushrooms.tar.gz
```

Descomprímalo, vaya al directorio, compile el paquete e instálelo.

```bash
tar -xvzf gtk3-mushrooms.tar.gz
cd gtk3-mushrooms
makepkg -sri
```

Si surgen errores clave, puede ignorarlos.

```bash
makepkg -s --skipinteg
```

Después del ensamblaje habrá un paquete con la extensión `nombre.pkg.tar.xz` Instale con el comando.

```bash
sudo pacman -U nombre.pkg.tar.xz
```

---

## Virtualbox

Virtual desde GNOME.

```bash
sudo pacman -S gnome-boxes
```

[Arch Wiki Virtualbox](https://wiki.archlinux.org/index.php/VirtualBox_(Español)).

```bash
sudo pacman -S virtualbox
sudo pacman -S virtualbox-host-modules-arch
sudo pacman -S linux-headers

sudo modprobe vboxdrv
sudo gpasswd -a nombre de usuario vboxusers
```

Carpeta compartida.

```bash
mkdir ~/vboxshare
```

Carpeta compartida en una máquina virtual.

```bash
mkdir ~/vboxshare
sudo mount -t vboxsf -o rw,uid=1000,gid=1000 vboxshare vboxshare
```

Configurar adiciones de invitados en una máquina virtual.

```bash
sudo pacman -S virtualbox-guest-utils linux-headers
sudo pacman -S virtualbox-guest-modules-arch
sudo pacman -S virtualbox-guest-iso
```

---

## Steam

Es necesario descomentar el repositorio ** multilib ** en`/etc/pacman.conf`.

```bash
sudo pacman -S steam ttf-liberation lib32-alsa-plugins lib32-curl
```

[wiki.archlinux.org](https://wiki.archlinux.org/index.php/Steam).

O instala Steam a través de [Flatpak](#).

---

## Instalar y ejecutar Tor

```bash
sudo pacman -S tor torsocks
```

Iniciar, detener el servicio.

```bash
sudo systemctl start tor
sudo systemctl stop tor
```

Corriendo a través de tor.

```bash
torify zsh
torify ssh user@blabla -p 22
```

Compruebe ip.

```bash
curl --max-time 10 -w '\n' http://ident.me
```

En firefox, use la extensión FoxyProxy.

> En la configuración de la extensión, Agregar nuevo SOCKS4, ip: 127.0.0.1, port: 9050

Inicie Chromium con una bandera.

```bash
chromium --proxy-server='socks://127.0.0.1:9050' &
```

Edite el servicio si es necesario.

```bash
sudo nano /usr/lib/systemd/system/tor.service
```

```bash
[Service]
User=root
Group=root
Type=simple
```

```bash
sudo chown -R root:root /var/lib/tor/
sudo systemctl daemon-reload
sudo systemctl restart tor
```

---

## Bluetooth

```bash
sudo pacman -S blueman bluez-utils pulseaudio-bluetooth
sudo systemctl enable bluetooth.service
```

---

## Paquetes de Office

Wps office.

```bash
yay -S wps-office ttf-wps-fonts wps-office-mui-es-mx wps-office-extension-spanish-dictionary --noconfirm
```

Libre office.

```bash
yay -S libreoffice-fresh libreoffice-fresh-es papirus-libreoffice-theme --noconfirm
```

Openoffice.

```bash
yay -S openoffice --noconfirm
```

Onlyoffice.

```bash
yay -S onlyoffice-bin --noconfirm
```

---

## Impresoras

```bash
sudo pacman -S cups cups-pdf cups-pk-helper system-config-printer
sudo systemctl enable org.cups.cupsd.service
```
