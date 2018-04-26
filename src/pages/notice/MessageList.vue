<template>
  <div>
    <template v-if="false">
      <ul class="ob_msg_list">
        <li v-for="n in 10">
          <a href="/msg_content">
            <p>
              <span class="ob_msg_name">消息名称</span>
              <span class="ob_msg_time">消息时间</span>
            </p>
            <p class="ob_msg_content">
              尊敬的会员朋友，由于支付通信受阻，元首款微信红包和支付宝红包测试一簇隐藏
            </p>
          </a>
        </li>
      </ul>
    </template>
    <!--暂无消息的样式-->
    <template>
      <div class="ob_no_data">喔唷，这里还没有任何消息哦~</div>
    </template>

  </div>
</template>

<script>
  export default {
    name: 'msgList',
    data() {
      return {}
    },
    methods: {},
    computed: {},
    created() {
      const vm = this
    },
  }
</script>

<style>
</style>
