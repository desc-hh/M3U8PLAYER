<template>
  <div>
    <input type="text" placeholder="请输入验证码" v-model="code" />
    <button @click="go">确认</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { postcode } from '@/api/index'
import { useRouter } from 'vue-router'
const code = ref()
const router = useRouter()
const go = () => {
  if (code.value) {
    const req = {
      code: code.value
    }
    postcode(req).then((res) => {
      console.log('%cApp.vue line:15 res', 'color: #007acc;', res.code)
      if (res.code === 'true') {
        localStorage.setItem('m3u8', true)
        router.push('play')
      } else {
        localStorage.removeItem('m3u8', true)
      }
      // alert(res)
    })
  }
}
</script>

<style lang="less" scoped>
.input {
  width: 80%;
  height: 40px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 10px;
  input {
    width: 80%;
  }
  button {
    width: 80px;
    margin-left: 20px;

    flex: 1;
  }
}
.vedio {
  width: 80%;
  height: 40%;
  border: 1px solid #707070;
  margin: 0 auto;
}
</style>
