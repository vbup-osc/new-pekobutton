<template>
  <div class="overflowC">
    <div class="titlediv">
      <p class="title" :class="{dark_text:$root.dark}" >{{$t("title")}}</p>
    </div>
    <div class="topdiv topdivO">
      <div class="card cardM" :class="{dark:$root.dark}">
        <p class="cardtext" :class="{dark_text:$root.dark}"><svg style="width:42px;height:42px;padding:3px" viewBox="0 0 24 24">
    <path fill="red" d="M14.53 1.45L13.45 2.53L15.05 4.13C15.27 4.38 15.38 4.67 15.38 5S15.27 5.64 15.05 5.86L11.5 9.47L12.5 10.55L16.13 6.94C16.66 6.35 16.92 5.7 16.92 5C16.92 4.3 16.66 3.64 16.13 3.05L14.53 1.45M10.55 3.47L9.47 4.55L10.08 5.11C10.3 5.33 10.41 5.63 10.41 6S10.3 6.67 10.08 6.89L9.47 7.45L10.55 8.53L11.11 7.92C11.64 7.33 11.91 6.69 11.91 6C11.91 5.28 11.64 4.63 11.11 4.03L10.55 3.47M21 5.06C20.31 5.06 19.67 5.33 19.08 5.86L13.45 11.5L14.53 12.5L20.11 6.94C20.36 6.69 20.66 6.56 21 6.56S21.64 6.69 21.89 6.94L22.5 7.55L23.53 6.47L22.97 5.86C22.38 5.33 21.72 5.06 21 5.06M7 8L2 22L16 17L7 8M19 11.06C18.3 11.06 17.66 11.33 17.06 11.86L15.47 13.45L16.55 14.53L18.14 12.94C18.39 12.69 18.67 12.56 19 12.56C19.33 12.56 19.63 12.69 19.88 12.94L21.5 14.53L22.55 13.5L20.95 11.86C20.36 11.33 19.7 11.06 19 11.06Z" />
</svg>{{$t("info")}}
        </p>
        <div class="infotext" :class="{dark_infotext:$root.dark}">{{$t("betainfo")}}</div>
        <button
            class="btn ripple"
            :class="{dark_btn:$root.dark}"
            @click="playSpecial()"
          ><div>Co↘ce↗ki↘お兄ちゃん</div></button>
      </div>
      <div class="card cardM" :class="{dark:$root.dark}">
        <p class="cardtext" :class="{dark_text:$root.dark}"><svg style="width:42px;height:42px" viewBox="0 0 24 24">
    <path fill="#728bf3" d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
</svg>{{$t("helptitle")}}
        </p>
        <div class="infotext" :class="{dark_infotext:$root.dark}">{{$t("helpcontent")}}<br>{{$t("additionalhelp")}}</div>
      </div>
     
    </div>
    <hr class="line" v-if="$root.dark" color=#333 width=95% />
    <hr class="line" v-else color=#EEE width=95% />
    <div class="topdiv">
      <div class="card" :class="{dark:$root.dark}" v-for="(group,index) in voices" :key="index">
        <p class="cardtext" :class="{dark_text:$root.dark}" v-if="$i18n.locale=='zhHans'">{{group.translation.Chinese}}</p>
        <p class="cardtext" :class="{dark_text:$root.dark}" v-else-if="$i18n.locale=='ja'">{{group.translation.Japanese}}</p>
        <p class="cardtext" :class="{dark_text:$root.dark}" v-else-if="$i18n.locale=='en'">{{group.translation.English}}</p>
        <div v-if="$i18n.locale=='zhHans'">
          <button
            class="btn ripple"
            :class="{dark_btn:$root.dark}"
            v-for="(voice,index1) in group.voicelist"
            :key="index1"
            @click="play(voice)"
          ><div>{{voice.translation.Chinese}}</div></button>
        </div>
        <div v-else-if="$i18n.locale=='ja'">
          <button
            class="btn ripple"
            :class="{dark_btn:$root.dark}"
            v-for="(voice,index2) in group.voicelist"
            :key="index2"
            @click="play(voice)"
          ><div>{{voice.translation.Japanese}}</div></button>
        </div>
        <div v-else-if="$i18n.locale=='en'">
          <button
            class="btn ripple"
            :class="{dark_btn:$root.dark}"
            v-for="(voice,index2) in group.voicelist"
            :key="index2"
            @click="play(voice)"
          ><div>{{voice.translation.English}}</div></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import voicelist from "../assets/voices.json";
var audio = new Audio();
var i = 0;
export default {
  data: () => ({
    voices: voicelist.groups,
    orderplaymode: false,
    orderdialog: false,
    orderlist: [],
    helpdialog: false,
    repeatmode: false,
    arrysize: 0,
    volume: 100
  }),
  created() {
    //window.console.log(this.voices); //装载语音包path
  },
  methods: {
    play(item) {
      if (this.orderplaymode) {
        //判断序列播放
        this.orderlist.push(item);
        //window.console.log(this.orderlist);
      }
      let audio = new Audio();
      audio.preload = true;
      audio.src = "voices/" + item.path;
      this.voice = item;
      audio.volume = this.volume / 100;
      audio.play();
    },
    playOnly(item) {
      let audio = new Audio();
      audio.src = "voices/" + item.path;
      audio.preload = true;
      this.voice = item;
      audio.play();
    },
    playSpecial() {
      let audio = new Audio();
      audio.src = "voices/私货.mp3";
      audio.preload = true;
      audio.play();
    },
    deletelist(i) {
      //删除序列中的一个值
      this.orderlist.splice(i, 1);
    },
    orderplay() {
      i = 0;
      audio = new Audio();
      let arry = this.orderlist;
      let repeat = this.repeatmode;
      audio.preload = true;
      audio.loop = false;
      audio.src = "voices/" + arry[i].path;
      audio.volume = this.volume / 100;
      audio.play();
      audio.addEventListener("ended", playEndedHandler, false);
      function playEndedHandler() {
        //序列播放实现
        i++;
        if (i < arry.length) {
          audio.src = "voices/" + arry[i].path;
          //window.console.log(i);
          audio.play();
        } else {
          if (repeat == true) {
            //不要停不下来啊
            i = 0;
            audio.src = "voices/" + arry[i].path;
            audio.play();
          }
        }
      }
    },
    resetorder() {
      this.orderlist = [];
    },
    stopplay() {
      audio.pause();
      i = 0;
    }
  },
  watch: {
    orderplaymode: function() {
      //启动序列播放
      if (this.orderplaymode) {
        this.helpdialog = true;
      }
    },
    orderlist: function() {
      this.arrysize = this.orderlist.length;
    }
  }
};
</script>

<style>
body {
  background: linear-gradient(200.6deg, #ffffff 19.14%, #e9e9e9 154.68%);
}
.dark{
  background: linear-gradient(157.73deg, #262B2F -0.68%, #16191D 74.03%) !important;
  box-shadow: -12px -20px 56px rgba(232, 237, 243, 0.05), 36px 12px 64px rgba(2, 3, 3, 0.7), inset -16px -6px 80px rgba(248, 249, 249, 0.03) !important;
}
.card {
  padding: 20px;
  padding-bottom: 40px;
  margin:15px;
  overflow:visible;
  break-inside: avoid;
  max-width: 600px;
  background: linear-gradient(200.6deg, #ffffff 19.14%, #e9e9e9 154.68%);
  box-shadow: 6px 4px 24px rgba(136, 165, 191, 0.36),
    -8px -4px 16px rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  transition: 0.5s;
}
.cardM{
  max-width: 100% !important;
}
.topdiv {
  overflow:visible;
  column-gap: 0px;
  column-rule: 10px;
  column-count: 4;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
}
.topdivO{
  column-count: 1;
}
.cardtext {
  overflow: visible;
  font-family: Helvetica;
  font-weight: bold;
  color: #31456A;
  font-size: 24px;
  letter-spacing: 0.02em;
}
.dark_text{
  color:rgb(255, 255, 255) !important;
}
.btn {
  position: relative;
  border-radius: 16px;
  display: inline-block;
  margin: 5px;
  padding: 10px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: #fff;
  font-size: 15px;
  align-items: center;
  text-align: center;  
  border: 0pt;
  outline: none;
  background: linear-gradient(83.54deg, #ff9b53 -7.64%, #e6660a 145.94%);
  box-shadow: 2px 3px 5px rgba(244, 102, 0, 0.42), -2px -2px 5px rgba(255, 255, 255, 0.6);
  transition: 0.5s;
}
.dark_btn{
  box-shadow: 2px 3px 5px rgba(244, 102, 0, 0.42), -2px -2px 5px rgba(0, 0, 0, 0.6) !important;
}
.btn div{
  transition: 0.5s;
  text-align: center;
  padding-left: 11px;
  padding-right: 11px;
  display: inline-block;
}
  
.btn div:after {
  content: "🥕";
  position:absolute;
  right: -12px;
  opacity: 0;
  transition: 0.5s;
}
.btn:hover div {
  padding-left: 0;
  padding-right: 22px;
}
.btn:hover div:after {
  right: 5px;
  opacity: 1;
  transition: 0.5s;
  text-align: center;
}
.btn:active{
  box-shadow: inset 3px 3px 10px rgba(54, 23, 0, 0.295), inset -3px -3px 10px rgba(255, 94, 0, 0.705) !important;
}
.btn:hover{
  box-shadow: 2px 3px 40px rgba(244, 102, 0, 0.42), -2px -2px 16px rgba(255, 255, 255, 0.6);
}
.title{
  font-family: Helvetica;
  font-weight: bold;
  font-size: 40px;
  line-height: 100%;
  align-items: center;
  letter-spacing: 0.02em;
  color: #31456A;
}
.titlediv{
  margin-top: 100px;
  align-items: center;
  text-align: center;
}

.ripple {
    
    overflow: hidden;
}
.ripple:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, rgb(255, 255, 255) 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .4s, opacity .6s;
}

.ripple:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
}
.infotext{
  margin: 10px;
  font-family: Helvetica;
  font-size: 16px;
  letter-spacing: 0.02em;
}
.dark_infotext{
  color: #e9e9e9;
}
.overflowC{
  overflow: visible;
}
@media (min-width: 1300px){
  .card:hover{
    box-shadow: 18px 12px 80px rgba(136, 165, 191, 0.36),
    -18px -12px 40px rgba(255, 255, 255, 0.6);
    transform: translate(-5px,-5px);
  }
  .topdiv {
    padding: 50px;
  }
}
@media (min-width: 992px) and (max-width: 1300px) {
  .topdiv {
    column-count: 3;
    padding: 50px;
  }
  .card:hover{
    box-shadow: 18px 12px 80px rgba(136, 165, 191, 0.36),
    -18px -12px 40px rgba(255, 255, 255, 0.6);
    transform: translate(-3px,-3px);
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .topdiv {
    column-count: 2;
  }
}
@media (max-width: 767px) {
  .topdiv {
    column-count: 1;
    padding: 0px;
    margin: 2px;
  }
  .card {
    margin-right: 5px;
    margin-left: 5px;
  }
  
}
</style>