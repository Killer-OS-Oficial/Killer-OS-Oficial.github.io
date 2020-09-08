---
title: Screencast
sidebar: 'wiki'
date_up: 2020-08-13
---

# Screencast, trabajar con video/audio

## Opciones de grabación

- Pavucontrol, 46% micrófono.
- Grabación con simplescreenrecorder: MKV, H.264, rate 20, superfast, vorbis 128.
- Audacity: eliminar el ruido (dos veces), mejorar el sonido.
- ffmpeg: reemplazar la pista de audio.
- ffmpeg: recodificar a mp4, 1080p, 30 Fps, bit rate 128k, si es necesario, lo aceleramos en un 20%.
- ffmpeg: superponga 2 pistas de audio, haga un bucle y baje el sonido.
- Cortar si es necesario.


## Audacity

- Seleccione un fragmento sin sonido, Efectos-Noise Reduction-crear un modelo de ruido.
- Haga doble clic en la pista (seleccionar todo), Efectos-Noise Reduction-ok (en 2 pasos).
- Normalización.
- Si es necesario, amplificamos el sonido de dB.

### Cambiar la voz

- Haga doble clic en la pista (seleccionar todo), Efectos-Cambio de tono. -15, aprox.
- Exportación de archivos como wav.

## Reemplazar ffmpeg de audio

```bash
ffmpeg -i input.mp4 -i good.wav -map 0:0 -map 1:0 -c copy output.mp4

ffmpeg -i input.mp4 -i input.wav -c:a aac -vcodec copy -map 0:0 -map 1:0 output.mp4
```

AvidemuxQT.

- Video abierto.
- Pista de selección de audio.
- Desactiva 1 pista por defecto.
- Agrega el archivo editado en Audacity a la pista 2.
- Utilice turno si es necesario.

## Ffmpeg

Tiempo de grabacion `-t`.

Cortar 5 min.

```bash
ffmpeg -ss 01:09:00 -t 00:05:00 -i arch.mkv -c:v copy -c:a copy out.mkv
```

Corta los últimos 2 segundos. desde la fuente en 8 seg.(00:00:08).

```bash
ffmpeg -ss 00:00:00 -i test.mkv -c copy -t 00:00:06 test2.mkv
```

Del primer minuto al segundo (un fragmento del medio).

```bash
ffmpeg -ss 00:01:00 -i video.mp4 -to 00:02:00 -c copy -copyts out.mp4
```

Primeros 4 seg.

```bash
ffmpeg -i video.mp4 -ss 00:00:04 -c copy out.mp4
```

Aceleración.

- Aceleración 2x: `ffmpeg -i arch.mp4 -vf "setpts=0.5*PTS" speed.mp4`
- Aceleración 3x `ffmpeg -i arch.mp4 -vf "setpts=1/3*PTS" speed.mp4`
- Aceleración 5x: `ffmpeg -i arch.mp4 -vf "setpts=1/5*PTS" speed.mp4`
- Reducir la velocidad 5x:`ffmpeg -i arch.mp4 -vf "setpts=1*5*PTS" out.mp4`

- Eliminar audio: -an
- Quitar video: -vn
- Conservar los códecs originales: -c copy
- Tasa de bits de audio: -b:a (-b:a 320k)
- Bitrate de vídeo: -b:v (-b:v 16M)
- Numero de cuadros fps: -r (-r 25)
- Resolución de video: -s (-s 1280x720)

Eliminar audio antes de la aceleración `-an`.

```bash
ffmpeg -i arch.mkv -r 30 -s 1920x1080 out.mp4

ffmpeg -i out.mp4 -vf "setpts=0.8*PTS" speed.mp4
```

O complejo, alrededor del 20% `atempo=1/setpts`.

```bash
ffmpeg -i arch.mkv -filter_complex "[0:v]setpts=0.8*PTS[v];[0:a]atempo=1.25[a]" -map "[v]" -map "[a]" -b:a 128k -r 30 -s 1920x1080 speed.mp4
```

Mosaico.

```bash
ffmpeg
  -i 1.avi -i 2.avi -i 3.avi -i 4.avi
  -filter_complex "
    nullsrc=size=640x480 [base];
    [0:v] setpts=PTS-STARTPTS, scale=320x240 [upperleft];
    [1:v] setpts=PTS-STARTPTS, scale=320x240 [upperright];
    [2:v] setpts=PTS-STARTPTS, scale=320x240 [lowerleft];
    [3:v] setpts=PTS-STARTPTS, scale=320x240 [lowerright];
    [base][upperleft] overlay=shortest=1 [tmp1];
    [tmp1][upperright] overlay=shortest=1:x=320 [tmp2];
    [tmp2][lowerleft] overlay=shortest=1:y=240 [tmp3];
    [tmp3][lowerright] overlay=shortest=1:x=320:y=240
  "
  -c:v libx264 output.mkv

ffmpeg -i 1.avi -i 2.avi -i 3.avi -i 4.avi -filter_complex "nullsrc=size=640x480 [base]; [0:v] setpts=PTS-STARTPTS, scale=320x240 [upperleft]; [1:v] setpts=PTS-STARTPTS, scale=320x240 [upperright]; [2:v] setpts=PTS-STARTPTS, scale=320x240 [lowerleft]; [3:v] setpts=PTS-STARTPTS, scale=320x240 [lowerright]; [base][upperleft] overlay=shortest=1 [tmp1]; [tmp1][upperright] overlay=shortest=1:x=320 [tmp2]; [tmp2][lowerleft] overlay=shortest=1:y=240 [tmp3]; [tmp3][lowerright] overlay=shortest=1:x=320:y=240" -c:v libx264 output.mkv
```

### Sobregrabación de audio

Más fácil de reemplazar la pista o superponer en`avidemux`, si es necesario, aplique un cambio en milisegundos (-2000), 2 segundos.

Opción `shortest` — si las entradas de audio y video tienen diferentes duraciones en el tiempo, el resultado será la duración del componente más corto.

```bash
ffmpeg -i vídeo.mp4 -i audio.wav -c:v copy -c:a copy -shortest resultado.mkv

mencoder -audiofile audio.wav vídeo.mp4 -o resultado.mp4 -ovc copy -oac copy
```

Superponga una segunda pista de audio y baje el volumen.

```bash
ffmpeg -i video4.mp4 -i wave.mp3 -filter_complex "[0:a]volume=1[a1];[1:a]volume=0.2[a2];[a1][a2]amerge=inputs=2" -c:v copy -c:a libmp3lame -shortest out_mp3.mp4
```

Зацикливаем 2 аудио дорожку и понижаем звук, т.к. применили `-stream_loop`, то и `-shortest` нужен.

```bash
ffmpeg -i video4.mp4 -stream_loop -1 -i bla.mp3 -filter_complex "[0:a]volume=1[a1];[1:a]volume=0.03[a2];[a1][a2]amerge=inputs=2" -c:v copy -c:a libmp3lame -shortest out_mp3.mp4
```

## Stream. restream.io

```bash
Live Stream (3000kbps)
rtmp://live.restream.io/live/key
flv, libx264, b/rate 3000, mp3 128
```

## Scripts `~/.bin`

- stream - streaming atraves de restream.io.
- castm - entrada.
- cast - grabación sin audio.

## Kdenlive

- Proyecto Set-Parameters por silencio-HD 1080i 30fps.

O.

- Proyecto Set-Parameters por silent-HD 1080p 60fps.
- Flujos de procesamiento de entorno de configuración - 2.
- Montaje. Generic, MP4 (H264/AAC).

Aceleramos el montaje al MP4 (H264/AAC). `Construir-crear script`. Edite el script. Editar `preset=faster` sobre el `preset=ultrafast`. Compruebe la velocidad del script antes y después.

```bash
time ./script001.sh
```

Tamaño del archivo de salida.

```bash
du -h video.mp4
```

Resultado de la prueba. (fuente video.mkv 1:21 2,5Mb).

- HD 1080i 30fps MP4 (H264/AAC) - 7:46 4,2 Mb
- HD 1080p 60fps MP4 (H264/AAC) faster - 14:22 5,6Mb
- HD 1080p 30fps MP4 (H264/AAC) faster - 8:24 4,1Mb
- +HD 1080p 30fps MP4 (H264/AAC) ultrafast - 6:34 8.2Mb
- HD 1080p 30fps webm - 7:58 9.9Mb
