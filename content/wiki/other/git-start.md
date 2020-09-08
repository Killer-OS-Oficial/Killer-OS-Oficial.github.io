---
title: Git Start
sidebar: 'wiki'
date_up: 2020-08-13
---

# Configurando git y usando

## Configurar

Configuración.

```bash
git config --global user.name "Killer-Hacker-Oficial"
git config --global user.email "killer_hacker_oficial_98@protonmail.com"
```

Generando claves ssh.

```bash
ssh-keygen -t rsa -b 4096 -C "killer_hacker_oficial_98@protonmail.com"
```

Recoge la llave`~/.ssh` nombre `id_rsa.pub`.

## Utilizando

Inicialización.

```bash
git init
```

Estado.

```bash
git status
```

Ignorar archivos y directorios `.gitignore`.

Añadiendo cambios.

```bash
git add .
git commit -m "Upload"
```

## Trabajando con github

Creando un repositorio en github.com.

```bash
git remote add origin https://github.com/Killer-OS-Oficial/Killer-OS
git remote add origin git@github.com:Killer-OS-Oficial/Killer-OS.git
```

Anule el registro del repositorio remoto.

```bash
git remote rm origin
```

Enviar a github.com.

```bash
git push -u origin master
git push --set-upstream origin master
```

Clonación.

```bash
git clone https://github.com/Killer-OS-Oficial/Killer-OS
```

Ssh.

```bash
git clone git@github.com:Killer-OS-Oficial/Killer-OS.git
```

O una rama.

```bash
git clone -b I3 git@github.com:Killer-OS-Oficial/Killer-OS.git
```

Lista de repositorios.

```bash
git remote
```

Enviar a github.

```bash
git push Killer-OS master
```

Etiqueta de versión del proyecto.

```bash
git tag -f v0.1.0

git push origin v0.1.0

git tag -a 1.0.0 -m "Lanzamiento de versión 1.0"
git push --tags
```

Lanzamiento con creación de etiqueta.

```bash
pacman -S hub
# sequía
hub release create -d -a Killer-OS.iso -m "release" -t "BSPWM" tag-test
# publicación vinculada a una rama y creación de una etiqueta
hub release create -a out/Killer-OS.iso -m "Killer-OS BSPWM 1.0" -t "BSPEM" v1.0
# script ~/.bin/grel.sh
grel.sh 1.o BSPWM
```

Nueva rama.

```bash
git branch work
```

Explore las ramas localmente.

```bash
git branch
```

Ver ramas y eliminar.

```bash
git branch -a
```

Creando ramas locales a partir de las remotas.

```bash
git branch I3 origin/I3
git branch work origin/work
git branch Dev origin/Dev
```

Enviar una rama a github.

```bash
git push origin Dev
```

Moviéndose a través de las ramas.

```bash
git checkout work
```

Consigue una rama remota.

```bash
git checkout -b bspwm origin/bspwm
```

Fusión de ramas. Antes de eso, cambie a la rama en la que nos fusionamos.

```bash
git merge work
```

Eliminando ramas.

```bash
git branch -D work

git push origin -d work
```

Ver cambios.

```bash
git log
```

Revertir (anteriormente, obtener un hash).

```bash
git reset --hard a3775a5485af0af20375cedf46112db5f813322a
git push --force
```
