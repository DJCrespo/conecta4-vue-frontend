<template>
<div>
  <section class="section">
    <b-table></b-table>
  </section>

  <b-loading :is-full-page="true" v-model="loading" :can-cancel="true">
  </b-loading>
</div>
</template>

<script>
export default {
  name: 'score',
  data () {
    return {
      loading: false
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      try {
        this.loading = true
        const res = await this.$store.dispatch('modules/users/getUsers')
        console.log(res)
        this.loading = false
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
}
</script>
