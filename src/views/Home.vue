<template>
  <div class="overflowC">
    <div class="titlediv">
      <p class="title">{{$t("title")}}</p>
    </div>
    <!-- <div class="topdiv">
      <div class="card">
        <p class="cardtext">{{$t("info")}}
        </p>
        <div class="infotext">{{$t("betainfo")}}</div>
      </div>
      <div class="card">
        <p class="cardtext">{{$t("info")}}
        </p>
        <div class="infotext">{{$t("betainfo")}}</div>
      </div>
      <div class="card">
        <p class="cardtext">{{$t("info")}}
        </p>
        <div class="infotext">{{$t("betainfo")}}</div>
      </div>
      <div class="card">
        <p class="cardtext">{{$t("info")}}
        </p>
      </div>
    </div>
    <hr color="#EEE" width="95%" /> -->
    <div class="topdiv">
      <div class="card" v-for="(group,index) in voices" :key="index">
        <p class="cardtext" v-if="$i18n.locale=='zhHans'">{{group.translation.Chinese}}</p>
        <p class="cardtext" v-else-if="$i18n.locale=='ja'">{{group.translation.Japanese}}</p>
        <div v-if="$i18n.locale=='zhHans'">
          <button
            class="btn ripple"
            v-for="(voice,index1) in group.voicelist"
            :key="index1"
            @click="play(voice)"
          ><div>{{voice.translation.Chinese}}</div></button>
        </div>
        <div v-else-if="$i18n.locale=='ja'">
          <button
            class="btn ripple"
            v-for="(voice,index2) in group.voicelist"
            :key="index2"
            @click="play(voice)"
          ><div>{{voice.translation.Japanese}}</div></button>
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
.card {
  padding: 20px;
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
.topdiv {
  overflow:visible;
  column-gap: 0px;
  column-rule: 10px;
  column-count: 4;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
}
.cardtext {
  overflow: visible;
  font-family: Helvetica;
  font-weight: bold;
  color: #31456A;
  font-size: 24px;
  letter-spacing: 0.02em;
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