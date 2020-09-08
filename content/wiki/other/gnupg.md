---
title: Gnupg
sidebar: 'wiki'
date_up: 2020-08-13
---

# Uso de GnuPG

## Firmas digitales

[wiki.archlinux.org](https://wiki.archlinux.org/index.php/GnuPG).

Generación, creación de un par de llaves.

```bash
gpg --full-gen-key
```

Ver una lista de claves.

```bash
gpg --list-keys
gpg --list-secret-keys
gpg --list-public-keys
```

Identificación de clave.

```bash
gpg --list-public-keys --keyid-format LONG
gpg --list-secret-keys --keyid-format LONG
```

Eliminar clave.

```bash
gpg --delete-secret-keys 98F76D97B786E6A3
gpg --delete-keys 98F76D97B786E6A3
```

Editar clave.

```bash
gpg --expert --edit-key killer_hacker_oficial_98@protonmail.com
```

Exporta la clave pública en forma de texto.

```bash
gpg --armor --output pubkey.txt --export 98F76D97B786E6A3
```

Exporta la clave privada como texto.

```bash
gpg --armor --output privkey.txt --export-secret-keys 98F76D97B786E6A3
```

Certificado de exportación.

```bash
gpg -a --gen-revoke 98F76D97B786E6A3 > rev_cert.gpg
```

Exportar la clave pública al servidor de claves.

```bash
gpg --keyserver keys.gnupg.net --send-keys 8123459
```

Importar una clave pública de un archivo.

```bash
gpg --import key.txt
```

O por número.

```bash
gpg --recv-keys 98F76D97B786E6A3
```

Importación de clave privada.

```bash
gpg --allow-secret-key-import --import privkey.txt
```

Importación de una clave pública desde el servidor de claves.

```bash
gpg --keyserver keys.gnupg.net --recv-keys 98F76D97B786E6A3
```

Buscar.

```bash
gpg --keyserver keys.gnupg.net --search-keys mail@example.com
```

Actualizar.

```bash
gpg --keyserver keys.gnupg.net --refresh-keys
```

Un ejemplo de firma y verificación de firma.

```bash
gpg --detach-sign --no-armor killer-os.iso
gpg --verify killer-os.iso.sig killer-os.iso
```

Cifre el archivo.

```bash
gpg --encrypt-files -r 98F76D97B786E6A3 secret.tar
```

Descifra el archivo.

```bash
gpg -d secret.tar.asc

gpg -d secret.tar.asc > secret.tar

gpg -o secret.tar --decrypt secret.tar.asc
```

Cifre el directorio.

```bash
gpgtar --encrypt --output secret.tar -r 98F76D97B786E6A3 dir/

gpgtar -c -o secret.tar dir/
```

Ver.

```bash
gpgtar -t secret.tar
```

Descifrar directorio.

```bash
gpgtar -d secret.tar
```
