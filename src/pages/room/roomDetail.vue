<template>
    <div class="mr-root">
      <van-nav-bar
        title="房间详情"
        @click-left="onClickLeft"

      />
      <h1>66666</h1>
    </div>
</template>
<script>
    export default{
        name: 'roomDetail',
        data () {
            return {
              roomId:null,
              userToken:null,
              roomData:null,
            }
        },
      methods: {
        onClickLeft() {
          this.$router.go(-1)
        },
      },
        created () {
            const vm = this
          vm.roomId = vm.$route.params.id
          vm.userData =  JSON.parse(sessionStorage.getItem('userInfo'))
          vm.userToken =  vm.userData.accessToken
          let params = {
            roomnumber:vm.roomId,
            accessToken:vm.userToken,
          }
          vm.$axios.get(`/api/RoomController/queryRoomByRoomNo`, {params})
            .then(response => {
              if (response.status == 200&&response.data) {
                vm.roomData = response.data.rows
                console.log(response)
              } else {
                vm.$toast('获取房间信息失败');
              }
            }).catch(response => {

          })
        },
        components: {},
    }
</script>
<style>
</style>
