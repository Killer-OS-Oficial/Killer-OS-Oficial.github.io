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

        <aside
          v-if="hasSidebar"
          class="sidebar"
          :class="{ 'open': sidebarOpen }"
          :style="sidebarStyle"
        >
          <div class="w-full pb-16 bg-ui-background">
            <Sidebar @navigate="sidebarOpen = false" />
          </div>
        </aside>

        <div
          class="w-full pb-24"
          :class="{'pl-0 lg:pl-12 lg:w-4/5': hasSidebar}"
        >
          <slot />
        </div>

      </main>

    </div>

    <div v-if="hasSidebar" class="fixed bottom-0 right-0 z-50 p-8 lg:hidden">
      <button class="p-3 text-white rounded-full shadow-lg bg-ui-primary hover:text-white" @click="sidebarOpen = ! sidebarOpen">
        <XIcon v-if="sidebarOpen" />
        <MenuIcon v-else />
      </button>
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
import Sidebar from "@/components/Sidebar";
import LayoutHeader from "@/components/LayoutHeader";
import { MenuIcon, XIcon } from 'vue-feather-icons';

export default {
  components: {
    Sidebar,
    LayoutHeader,
    MenuIcon,
    XIcon
  },
  data() {
    return {
      headerHeight: 0,
      sidebarOpen: false,
    }
  },
  watch: {
    sidebarOpen: function(isOpen) {
      document.body.classList.toggle('overflow-hidden', isOpen);
    }
  },
  methods: {
    setHeaderHeight() {
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.offsetHeight;
      });
    }
  },
  computed: {
    sidebarStyle() {
      return {
        top: this.headerHeight + 'px',
        height: `calc(100vh - ${this.headerHeight}px)`
      }
    },
    hasSidebar() {
      return this.$page && this.headerHeight > 0;
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

<style lang="scss">
:root {
  --color-ui-background: #161720;
  --color-ui-typo: theme('colors.gray.100');
  --color-ui-sidebar: theme('colors.gray.800');
  --color-ui-border: theme('colors.gray.800');
  --color-ui-primary: #5a74ca;
  --bg-transparent: rgba(22, 23, 32, .8);
}

body[data-theme="dark"] {
  --color-ui-background: theme('colors.white');
  --color-ui-typo: theme('colors.gray.700');
  --color-ui-sidebar: theme('colors.gray.200');
  --color-ui-border: theme('colors.gray.300');
  --color-ui-primary: #5a74ca;
  --bg-transparent: rgba(255, 255, 255, .8);
}

// menu dreopdown
.drop-menu {
  .has-dropdown {
    position: relative;

    &:hover {
      .dropdown {
        pointer-events: inherit;
        visibility: visible;
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }

  .dropdown {
    background-color: var(--color-ui-background);
    pointer-events: none;
    visibility: hidden;
    z-index: 10;
    color: var(--color-ui-typo);
    position: absolute;
    top:100%;
    width: 200px;
    border-radius: 3px;

    box-shadow: 1px 1px 5px rgba(0,0,0,.3);
    transform: translateY(-5px);
    opacity: 0;
    transition: opacity .3s, transform .3s cubic-bezier(0.19, 1, 0.22, 1);

    a {
      justify-content: flex-start;
      font-size: .9rem;
      padding: 8px 15px;

      &:hover {
        background-color: var(--color-ui-primary);
        color: var(--color-ui-background);
      }
    }
  }
}
// web menu
.drop-web {
  .has-dropdown {
    position: relative;

    &:hover {
      .dropdown {
        pointer-events: inherit;
        visibility: visible;
        opacity: 1;
        transform: translateY(0px);
      }
    }
  }

  .dropdown {
    background-color: var(--color-ui-background);
    pointer-events: none;
    visibility: hidden;
    z-index: 10;
    color: var(--color-ui-typo);
    position: absolute;
    top:100%;
    right:0;
    width: 200px;
    border-radius: 3px;

    box-shadow: 1px 1px 5px rgba(0,0,0,.3);
    transform: translateY(-5px);
    opacity: 0;
    transition: opacity .3s, transform .3s cubic-bezier(0.19, 1, 0.22, 1);

    a {
      justify-content: flex-start;
      font-size: .9rem;
      padding: 8px 15px;

      &:hover {
        background-color: var(--color-ui-primary);
        color: var(--color-ui-background);
      }
    }
  }
}
// web end


pre[class*="language-"],
code[class*="language-"] {
  @apply bg-ui-border;
  background-color: theme('colors.gray.800') !important;
}

* {
  transition-property: color, background-color, border-color;
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
}

h1,
h2,
h3,
h4 {
  @apply leading-snug mb-4 text-ui-typo;

  &:hover {
    a::before {
      @apply opacity-100;
    }
  }

  a {
    &::before {
      content: "#";
      margin-left: -1em;
      padding-right: 1em;
      @apply text-ui-primary absolute opacity-0 float-left;
    }
  }
}

h1 {
  @apply text-4xl;
}

h2 {
  @apply text-2xl;
}

h3 {
  @apply text-xl;
}

h4 {
  @apply text-lg;
}

// a:not(.active):not(.text-ui-primary):not(.text-white) { @apply text-ui-typo }

p,
ol,
ul,
pre,
strong,
blockquote {
  @apply mb-4 text-base text-ui-typo;
}
blockquote {
  @apply border-l-4 border-ui-primary p-4;
  background-color: rgba(#5a74ca, 0.1);

  p:last-child {
    @apply mb-0;
  }
}

.content {
  a {
    @apply text-ui-primary underline;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply -mt-12 pt-20;
  }

  h2 + h3,
  h2 + h2,
  h3 + h3 {
    @apply border-none -mt-20;
  }

  h2,
  h3 {
    @apply border-ui-border pb-1 mb-3;
  }

  ul {
    @apply list-disc;

    ul {
      list-style: circle;
    }
  }

  ol {
    @apply list-decimal;
  }

  ol,
  ul {
    @apply pl-5 py-1;

    li {
      @apply mb-2;

      p {
        @apply mb-0;
      }

      &:last-child {
        @apply mb-0;
      }
    }
  }
}

code {
  @apply px-1 py-1 text-ui-typo bg-ui-sidebar font-mono border-b border-r border-ui-border text-sm rounded;
}

pre[class*="language-"] {
  @apply max-w-full overflow-x-auto rounded;

  & + p {
    @apply mt-4;
  }

  & > code[class*="language-"] {
    @apply border-none leading-relaxed;
  }
}

header {
  background-color: var(--bg-transparent);
  backdrop-filter: blur(15px);
}

table {
  @apply text-left mb-6;

  td, th {
    @apply py-3 px-4;
    &:first-child {
      @apply pl-0;
    }
    &:last-child {
      @apply pr-0;
    }
  }

  tr {
    @apply border-b border-ui-border;
    &:last-child {
      @apply border-b-0;
    }
  }
}

.sidebar {
  @apply fixed bg-ui-background px-4 inset-x-0 bottom-0 w-full border-r border-ui-border overflow-y-auto transition-all z-40;
  transform: translateX(-100%);

  &.open {
    transform: translateX(0);
  }

  @screen lg {
    @apply w-1/5 px-0 bg-transparent top-0 bottom-auto inset-x-auto sticky z-0;
    transform: translateX(0);
  }
  .active {
    @apply pl-3;
  }
}
.sidebar::-webkit-scrollbar,
.sidebar-content::-webkit-scrollbar {
  width: 5px;
  position: fixed;
  right:0;
}

.sidebar::-webkit-scrollbar-thumb,
.sidebar-content::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0);
  transition: background-color 2s;
}

.sidebar::-webkit-scrollbar-thumb:hover,
.sidebar:hover::-webkit-scrollbar-thumb,
.sidebar-content::-webkit-scrollbar-thumb:hover,
.sidebar-content:hover::-webkit-scrollbar-thumb {
  background: var(--color-ui-primary);
}

.responsive-container {
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
