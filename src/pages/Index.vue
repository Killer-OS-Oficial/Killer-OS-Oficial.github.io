<template>
  <Layout>
    <div class="pt-8 md:pt-16 mx-auto max-w-screen-lg">
      <div class="flex flex-col items-center">
        <!-- <div class="flex flex-col items-center mb-2 text-ui-primary">
          <Logo :width="80" />
          <h2 class="text-3xl text-6xl font-black tracking-tighter border-none">
            KILLER-OS
          </h2>
        </div> -->

        <div class="flex flex-wrap justify-center">
          <div class="text-4xl flex-col mt-8 md:w-2/3">
            <h1 class="text-4xl lg:text-5xl max-w-screen-md">
              <span class="text-ui-primary">Killer-OS Linux</span> — imagen iso basada en Arch Linux.
            </h1>
            <p class="text-xl">
              Creado con <a target="_blank" class="text-ui-primary border-ui-primary transition-all border-b border-dashed" href="https://gitlab.archlinux.org/archlinux/archiso">archiso.</a>
            </p>
            <!-- <p><img src="https://img.shields.io/github/downloads/ctlos/ctlosiso/total.svg?style=social" alt="Descargar Killer-OS""></p> -->

            <div class="flex mt-8">
              <g-link
                to="/wiki/whois"
                class="flex items-center px-6 py-4 text-xl font-bold leading-none text-white border rounded-lg shadow-lg bg-ui-primary border-ui-primary transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
              >
              Descargar
              </g-link>
              <!--<g-link
                to="/wiki/install/install-ctlos"
                class="flex items-center px-6 py-4 ml-4 text-xl font-bold leading-none bg-transparent hover:bg-ui-primary border-ui-primary hover:text-white border rounded-lg shadow-lg transition-all duration-200 ease-out transform hover:shadow-xl hover:-translate-y-1"
              >
              Instalación
              </g-link>-->
            </div>
          </div>

          <div class="flex flex-col md:w-1/3">
            <div class="mt-8">
              <g-image class="mb-8 img" src="../../static/img/killer-os.png" alt="Inicio de Killer-OS" />
            </div>
          </div>
        </div>

      </div>

      <div id="about" class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

      <div class="flex flex-wrap justify-center items-center mx-auto mb-16 max-w-screen-md">
        <div class="flex flex-col md:w-1/3 m-8">
          <g-image src="../../static/img/killer-hacker-oficial.jpg" alt="avatar" class="w-32 h-32 m-auto rounded-full" />
        </div>
        <div class="flex flex-col md:flex-1 md:w-2/3">
          <blockquote class="text-center border-ui-primary">
            <p class="font-normal"><span class="border-b border-dashed">Preguntas frecuentes ¿cuál es la diferencia entre Killer-OS</span>? Aspecto personalizado, con zsh, soporte Aur incluido. Este sistema se ensambló originalmente exclusivamente para sí mismo. Software estándar, como en la mayoría de las distribuciones de Linux.</p>
            <p class="text-2xl text-center">Ver detalles. >> <g-link to="/wiki/whois" class="text-ui-primary border-ui-primary transition-all border-b border-dashed hover:-translate-y-1">Sobre nosotros</g-link></p>
            <p class="text-sm text-ui-primary">Killer-Hacker-Oficial - Desarrollador.</p>
          </blockquote>
        </div>
      </div>

      <div id="contact" class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

      <div class="m-8">
        <p class="text-3xl text-center">Abierto a la comunicación.</p>
        <p class="text-center sm:mx-18">Si encuentra algún problema, no dude en ponerse en contacto. Se agradece cualquier comentario.</p>
        <div class="flex flex-wrap justify-center items-center mx-auto">
          <div class="flex flex-col sm:flex-1 md:w-2/3">
            <g-image src="../../static/img/social.svg" alt="contact" class="m-auto" />
          </div>

          <div class="flex flex-col md:w-1/3 m-8">
            <!-- <p><a target="_blank" href="https://riot.im/app/#/room/#ctlos:matrix.org">Matrix Chat</a></p> -->
            <p class="text-2xl">Links</p>
            <ul>
              <li><a class="text-ui-primary border-ui-primary transition-all border-b border-dashed" target="_blank" href="https://t.me/killer_OS_Info">Telegram</a></li>
              <li><a class="text-ui-primary border-ui-primary transition-all border-b border-dashed" target="_blank" href="https://keybase.io/killerhacker">Keybase</a></li>
              <li><a class="text-ui-primary border-ui-primary transition-all border-b border-dashed" target="_blank" href="https://github.com/Killer-OS-Oficial">Github</a></li>
            </ul>
            <p class="text-2xl">Email</p>
            <p><a class="text-ui-primary border-ui-primary transition-all border-b border-dashed" href="mailto:killer_hacker_oficial_98@protonmail.com">killer_hacker_oficial_98@protonmail.com</a></p>
          </div>
        </div>
      </div>

      <div id="demo" class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

      <p class="text-3xl text-center text-ui-primary mb-8">
        Killer-OS Bspwm >
        <g-link
        to="/wiki/wm/bspwm"
        class="text-ui-primary border-ui-primary transition-all border-b border-dashed hover:-translate-y-1"
        >
        Demostracion
        </g-link>
      </p>

      <div class="responsive-container">
        <iframe class="responsive-iframe w-full h-full top-0 left-0 border-0" src="https://www.youtube.com/watch?v=8qu1Z-FZQ8o" style="border:0;" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

      <div id="footer" class="pt-8 mx-auto mt-8 border-t md:mt-16 md:pt-16 border-top border-ui-border max-w-screen-sm"></div>

    </div>
  </Layout>
</template>

<script>
import Logo from '@/components/Logo';
import { ArrowRightCircleIcon, ZapIcon, CodeIcon, SearchIcon } from 'vue-feather-icons';

export default {
  components: {
    Logo,
    ArrowRightCircleIcon,
    ZapIcon,
    CodeIcon,
    SearchIcon
  },

  metaInfo() {
    const title = 'killer-OS Linux';
    const description = 'El sistema se construye usando archiso, y cuenta con un instalador gráfico.';

    return {
      title: title,
      meta: [
        {
          name: 'description',
          content: description
        },
        {
          key: 'og:title',
          name: 'og:title',
          content: title,
        },
        {
          key: 'twitter:title',
          name: 'twitter:title',
          content: title,
        },
        {
          key: 'og:description',
          name: 'og:description',
          content: description,
        },
        {
          key: 'twitter:description',
          name: 'twitter:description',
          content: description,
        },
      ]
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
.img {
  box-shadow: 1px 1px 5px 0 rgba(0,0,0,.02), 1px 1px 15px 0 rgba(0,0,0,.03);
}
</style>
