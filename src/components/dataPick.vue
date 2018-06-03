<template>
    <div>
      <van-datetime-picker
        v-model="currentDate"
        type="date"
      />
    </div>
</template>
<script>
    export default{
        name: 'datePick',
        data () {
            return {
              currentDate: new Date()
            }
        },
        created () {
            const vm = this
        },
        components: {},
    }
</script>
<style>
</style>
