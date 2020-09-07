<template>
  <div
    id="app"
    class="font-sans antialiased text-ui-typo bg-ui-background"
  >
    <div class="flex flex-col justify-start min-h-screen">

      <header
        ref="header"
        class="sticky top-0 z-10 w-full border-b border-ui-border"
        @resize="setHeaderHeight"
      >
        <LayoutHeader />
      </header>

      <main class="container relative flex flex-wrap justify-start flex-1 w-full bg-ui-background">

        <div class="w-full pb-24">
          <slot />
        </div>

      </main>

    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import LayoutHeader from "@/components/LayoutHeader";
import { MenuIcon, XIcon } from 'vue-feather-icons';

export default {
  components: {
    LayoutHeader,
    MenuIcon,
    XIcon
  },
  methods: {
    setHeaderHeight() {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight;
      });
    }
  },
  mounted() {
    this.setHeaderHeight();
  },
  metaInfo() {
    return {
      meta: [
        {
          key: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          key: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          key: 'og:image',
          name: 'og:image',
          content: process.env.SITE_URL + '/img/post.png',
        },
        {
          key: 'twitter:image',
          name: 'twitter:image',
          content: process.env.SITE_URL + '/img/post.png',
        },
      ]
    }
  }
};
</script>

