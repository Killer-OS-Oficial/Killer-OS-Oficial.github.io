<template>
  <div class="border-t-2 border-ui-primary">
    <div class="container">

      <div class="flex items-center justify-between -mx-2 sm:-mx-4">
        <div class="flex items-center px-2 sm:px-4">
          <g-link
            to="/"
            class="flex items-center text-ui-primary"
            title="Killer-OS Linux"
          >
            <Logo :width="40" class="text-ui-primary" />
            <!-- <span class="hidden ml-2 text-xl font-black tracking-tighter uppercase sm:block">
              {{ meta.siteName }}
            </span> -->
          </g-link>
        </div>

        <div v-if="settings.nav.links.length > 0" class="flex items-center hidden md:flex">
          <g-link
            v-for="link in settings.nav.links"
            :key="link.path"
            :to="link.path"
            class="p-4 font-medium nav-link text-ui-typo hover:text-ui-primary"
            :title="link.title"
          >
            {{ link.title }}
          </g-link>
        </div>

        <div class="drop-menu flex items-center block md:hidden">
          <div class="has-dropdown p-4 cursor-pointer">
            <span class="font-medium nav-link text-ui-typo hover:text-ui-primary" rel="noopener noreferrer" target="_blank">MENU</span>
            <div v-if="settings.nav.links.length > 0" class="dropdown flex flex-col">
              <g-link
                v-for="link in settings.nav.links"
                :key="link.path"
                :to="link.path"
                class="p-4 font-medium nav-link text-ui-typo hover:text-ui-primary"
                :title="link.title"
              >
                {{ link.title }}
              </g-link>
            </div>
          </div>
        </div>

        <div class="w-full px-2 sm:px-4">
          <ClientOnly>
            <Search />
          </ClientOnly>
        </div>

        <div class="flex items-center px-2 sm:px-4">

          <div class="drop-web">
            <div class="has-dropdown py-4 cursor-pointer">
              <GlobeIcon size="1.5x" />
              <div class="dropdown flex flex-col">
                <a href="https://t.me/Killer_OS_Info" rel="noopener noreferrer" target="_blank">
                  Telegram
                </a>
                <!-- <a href="https://github.com/killer-os/killer-os/issues" rel="noopener noreferrer" target="_blank">
                  Core Issues
                </a> -->
                <a href="https://github.com/Killer-OS-Oficial/Killer-OS-Oficial.github.io" rel="noopener noreferrer" target="_blank">
                  Repositorio del Sitio
                </a>
              </div>
            </div>
          </div>

          <!-- <a v-if="settings.github" :href="settings.github" class="sm:ml-3" target="_blank" rel="noopener noreferrer" title="Github" name="Github">
            <GithubIcon size="1.5x" />
          </a> -->
          <ToggleTheme />

        </div>
      </div>
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    settings {
      web
      nav {
        links {
          path
          title
        }
      }
    }
  }
}
</static-query>

<script>
import Logo from '@/components/Logo';
import { GlobeIcon } from "vue-feather-icons";
import ToggleTheme from '@/components/ToggleTheme.vue';

const Search = () => import(/* webpackChunkName: "search" */ "@/components/Search").catch(error => console.warn(error));

export default {
  components: {
    Logo,
    Search,
    GlobeIcon,
    ToggleTheme
  },
  computed: {
    meta() {
      return this.$static.metadata;
    },
    settings() {
      return this.meta.settings;
    }
  }
};
</script>

<style lang="scss">
header {
  svg:not(.feather-search) {
    &:hover {
      @apply text-ui-primary;
    }
  }
}

.nav-link {
  &.active--exact {
    @apply text-ui-primary font-bold border-ui-primary;
    border-bottom: 1px solid var(--color-ui-primary);
  }
}
</style>
