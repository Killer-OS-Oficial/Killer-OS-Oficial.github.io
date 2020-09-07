<template>
  <Layout>
    <div class="content mx-auto max-w-screen-lg">
      <VueRemarkContent />
    </div>
  </Layout>
</template>

<page-query>
query VueRemarkPage ($id: ID!) {
  mdPage(id: $id) {
    title
    description
  }
}
</page-query>

<script>
import Layout from '~/layouts/MdpageLayout.vue'

export default {
  components: {
    Layout
  },

  metaInfo() {
    const title = this.$page.mdPage.title;
    const description = this.$page.mdPage.description;

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
        }
      ]
    }
  }
}
</script>

<style>
@import 'prism-themes/themes/prism-material-oceanic.css';
</style>
