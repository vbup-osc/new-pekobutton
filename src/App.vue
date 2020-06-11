<template>
  <div id="app">
    <transition name="fab-scale">
    <button v-show="gotop" @click="toTop" class="fabbtn"><svg style="width:36px;height:36px" viewBox="0 0 24 24">
    <path fill="white" d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
</svg></button>
    </transition>
    <Topbar></Topbar>
    <router-view></router-view>
  </div>
</template>
<script>
import Topbar from "./components/Topbar.vue"
export default {
  name: 'App',

  components: {
    Topbar,
  },

  data: () => ({
    gotop:false,
    prompt:false,
    deferred:null,
    //addtoscreendialog:false,
    links:[
      {
        name:"VTuber按钮合集",
        href:"https://vtbbtn.org/",
        color:"orange lighten-1"
      },
      {
        name:"夸按钮/あくあボタン",
        href:"https://aquaminato.moe/",
        color:"purple lighten-2"
      },
      {
        name:"狐按钮/フブキボタン",
        href:"https://sfubuki.moe/",
        color:"blue lighten-2"
      },
      {
        name:"祭按钮/まつりボタン",
        href:"https://natsuiromatsuri.moe/",
        color:"orange darken-1"
      },
      {
        name:"狼按钮/ミオボタン",
        href:"https://ookamimio.org/",
        color:"black"
      },
      {
        name:"余按钮/なきりあやめボタン",
        href:"https://nakiriayame.moe/",
        color:"red darken-1"
      },
      {
        name:"狗按钮/ころねボタン",
        href:"https://korone.icu/",
        color:"brown darken-1"
      },
    ],
    //
  }),
  mounted(){
    let timeNow = new Date();
    let hours = timeNow.getHours();
    if (hours<6||hours>18){//自动触发夜间模式
      
      window.console.log("success")
    }
    window.onbeforeinstallprompt = (e) => {     //当浏览器触发横幅显示事件
                window.console.log(e);
                this.prompt = true;
                this.deferred = e;
                //window.console.log(this.prompt);
                this.showAddToHomeScreen();
            }
    window.addEventListener("scroll", this.handleScroll, true);
    this.$i18n.locale="zhHans";
    // if (this.$cookies.isKey("Lang")){
    //   this.$i18n.locale=this.$cookies.get("Lang");
    
    // }else{
      
    // }
  },
  methods: {
    showAddToHomeScreen(){
        window.console.log("success");
        //this.addtoscreendialog=true;

    },
    addToHomescreen(){
        this.deferred.prompt();
        let _this=this
        this.deferred.userChoice
      .then(function (choiceResult) {
        if (choiceResult.outcome === 'accepted') {
          window.console.log('User accepted the A2HS prompt');
          _this.addtoscreendialog=false;
        } else {
          window.console.log('User dismissed the A2HS prompt');
        }
        // 释放不再有用的deferredPrompt对象
      });
      
    },
    handleScroll() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    See (e) {
        window.location.href = e
      }
    }
}
</script>

<style>
.fabbtn{
  padding: 10px;
  position: fixed;
  bottom: 30px;
  right: 20px;
  border-radius: 999px;
  display: inline-block;
  border: 0pt;
  outline: none;
  background: linear-gradient(200.6deg, #244dff8a 19.14%, #0e9dfc6c 154.68%);
  background-blend-mode: normal, luminosity;
  backdrop-filter: blur(10px);
  box-shadow: 3px 6px 20px rgba(104, 102, 255, 0.44);
  z-index: 9;
}
.fabbtn:after{
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
.fabbtn:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
}
.fabbtn:active{
  box-shadow: inset 3px 3px 10px rgba(0, 4, 54, 0.295), inset -3px -3px 10px rgba(0, 119, 255, 0.705) !important;
}
.fab-scale-enter-active{
  transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  
}
.fab-scale-leave-active{
  transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fab-scale-enter ,.fab-scale-leave-to{
  transform: scale(0,0);
  transform: rotateX(45);
}
</style>