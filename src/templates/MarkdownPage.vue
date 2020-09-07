<template>
  <Layout>
      <div class="flex flex-wrap items-start justify-start">

        <div class="sidebar-content order-2 w-full md:w-1/4 sm:pl-4 md:pl-6 lg:pl-8 sticky overflow-y-auto overflow-x-hidden" style="top: 4rem;height: calc(100vh - 4rem);">
          <OnThisPage />
        </div>

        <div class="order-1 w-full md:w-3/4">
          <p class="inline-block mt-8 border-b border-dashed border-ui-primary text-ui-primary" v-if="$page.markdownPage.date">{{ $page.markdownPage.date }}</p>
          <p class="inline-block mt-8 border-b border-dashed border-ui-primary text-ui-primary" v-if="$page.markdownPage.date_up">
             Fecha de modificación: {{ $page.markdownPage.date_up }}
          </p>
          <div class="content" v-html="$page.markdownPage.content" />

          <div class="mt-8 pt-8 lg:mt-12 lg:pt-12 border-t border-ui-border">
            <NextPrevLinks />
          </div>
        </div>

      </div>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  markdownPage(id: $id) {
    id
    title
    description
    date (format: "DD.MM.Y")
    date_up (format: "DD.MM.Y")
    path
    timeToRead
    content
    sidebar
    next
    prev
    headings {
      depth
      value
      anchor
    }
  }
  allMarkdownPage{
    edges {
      node {
        path
        title
      }
    }
  }
}
</page-query>

<script>
import OnThisPage from '@/components/OnThisPage.vue';
import NextPrevLinks from '@/components/NextPrevLinks.vue';

export default {
  components: {
    OnThisPage,
    NextPrevLinks
  },

  metaInfo() {
    const title = this.$page.markdownPage.title;
    const description = this.$page.markdownPage.description || this.$page.markdownPage.excerpt;

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
@import 'prism-themes/themes/prism-material-oceanic.css';
</style>
