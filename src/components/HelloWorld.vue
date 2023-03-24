<template>
  <div class="input">
    <input type="url" placeholder="请输入m3u8" v-model="Purl" />
    <button @click="playUrl">播放</button>
  </div>
  <div class="vedio">
    <video
      id="valveVideogj"
      class="video-js vjs-default-skin"
      autoplay
      style="width: 100%; height: 100%; object-fit: fill"
    ></video>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'
const videoUrl = ref()
const Purl = ref()
const player = ref({})
if (!localStorage.getItem('m3u8')) {
  location.href(-1)
}
const options = (src) => {
  return {
    autoplay: false, // true,浏览器准备好时开始播放。
    muted: true, // 默认情况下将会消除音频。
    loop: true, // 导致视频一结束就重新开始。
    controls: true, // 取消视频中的进度条
    preload: 'auto', // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: 'zh-CN', // 汉化
    fluid: true, // 当true时，将按比例缩放以适应其容器。
    controlBar: {
      // 设置控制条组件
      /* 设置控制条里面组件的相关属性及显示与否
       */
      currentTimeDisplay: false,
      timeDivider: false,
      durationDisplay: false,
      remainingTimeDisplay: true, // 倒计时显示
      volumePanel: {
        inline: false
      },
      /* 使用children的形式可以控制每一个控件的位置，以及显示与否 */
      children: [
        { name: 'playToggle' }, // 播放按钮
        { name: 'currentTimeDisplay' }, // 当前已播放时间
        { name: 'progressControl' }, // 播放进度条
        { name: 'durationDisplay' }, // 总时间
        {
          // 倍数播放
          name: 'playbackRateMenuButton',
          playbackRates: [0.5, 1, 1.5, 2, 2.5]
        },
        {
          name: 'volumePanel', // 音量控制
          inline: false // 不使用水平方式
        },
        { name: 'FullscreenToggle' } // 全屏
      ]
    },
    sources: [
      {
        type: 'application/x-mpegURL',
        src // 视频播放地址
      }
    ],

    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 无法播放媒体源时显示的默认信息。
    textTrackDisplay: false
  }
}

const playUrl = async () => {
  videoUrl.value = await Purl.value
  try {
    player.value = videojs('valveVideogj', options(videoUrl.value), () => {
      player.value.play()
    })
  } catch (error) {
    console.log(error)
  }
}

onUnmounted(() => {
  // 离开页面时销毁video
  player.value.dispose()
})
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
