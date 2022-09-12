<template>
  <div>
    <Card />
    <Sale />
    <Observer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/views/dashboard/Card'
import Sale from '@/views/dashboard/Sale'
import Observer from '@/views/dashboard/Observer'
export default {
  name: 'Dashboard',
  components: {
    Card,
    Sale,
    Observer
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted(){
    this.$store.dispatch('getData');
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
