<template>
  <div id="app">
    <transition name="fab-scale">
      <button v-show="gotop" @click="toTop" class="fabbtn">
        <svg style="width:36px;height:36px" viewBox="0 0 24 24">
          <path
            fill="white"
            d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z"
          />
        </svg>
      </button>
    </transition>
    <Topbar></Topbar>
    <router-view></router-view>
    <hr class="line" v-if="$root.dark" color="#333" width="95%" />
    <hr class="line" v-else color="#EEE" width="95%" />
    <div style="padding:10px;margin-bottom:10px;">
      <p class="footertext" :class="{dark_infotext:$root.dark}">{{$t("developer")}}</p>
      <p class="footertext" :class="{dark_infotext:$root.dark}">{{$t("credits")}}</p>
      <p class="footertext" :class="{dark_infotext:$root.dark}">{{$t("translationCredits")}}</p>
      <p class="footertext" :class="{dark_infotext:$root.dark}">{{$t("friendlinks")}}</p>
      <s-btn
        v-for="(link,index) in links"
        :key="index"
        :color="link.color"
        @click="See(link.href)"
      >{{link.name}}</s-btn>
      <p class="footertext" :class="{dark_infotext:$root.dark}">{{$t("developerinfo")}}</p>
      <p class="footertext" :class="{dark_infotext:$root.dark}">
        Powered by
        <a href="https://www.vercel.com/?utm_source=vbuposc&utm_campaign=oss" target="_blank" rel="noreferrer">
          <img v-bind:src="vercel_logo" alt="vercel" height="24px"/>
        </a>
      </p>
    </div>
  </div>
</template>
<script>
import Topbar from "./components/Topbar.vue";
export default {
  name: "App",

  components: {
    Topbar
  },

  data: () => ({
    gotop: false,
    prompt: false,
    deferred: null,
    //addtoscreendialog:false,
    links: [
      {
        name: "VTuber按钮合集",
        href: "https://vtbbtn.org/",
        color: "primary"
      },
      {
        name: "樱按钮/みこボタン",
        href: "https://sakuramiko.org/",
        color: "miko_red"
      },
      {
        name: "夸按钮/あくあボタン",
        href: "https://aquaminato.moe/",
        color: "purple"
      },
      {
        name: "狐按钮/フブキボタン",
        href: "https://sfubuki.moe/",
        color: "blue"
      },
      {
        name: "祭按钮/まつりボタン",
        href: "https://natsuiromatsuri.moe/",
        color: "secondary"
      },
      {
        name: "狼按钮/ミオボタン",
        href: "https://ookamimio.org/",
        color: "black"
      },
      {
        name: "余按钮/なきりあやめボタン",
        href: "https://nakiriayame.moe/",
        color: "red"
      },
      {
        name: "狗按钮/ころねボタン",
        href: "https://korone.icu/",
        color: "brown"
      }
    ]
    //
  }),
  computed: {
    vercel_logo() {
      const mode = this.$root.dark ? 'dark' : 'light';
      return '/img/vercel/' + mode + '.svg';
    }
  },
  created() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      //不会还有人在用IE吧，不会吧不会吧
      window.console.log("IE警察出动！");
      alert("Sorry but IE is not supported on this page");
      this.See("https://www.google.cn/intl/zh-CN/chrome/");
    }
    window.console.log("%c%s","color:#9AAACC","@@@@@@@@@@@@@&#**,,,,**/%@@@@@@%(*,.   .,/%@@@@@@@@@@@@@%/..\n@&%%####%&@@@@@@%*,,,,,*#@@@@#/,.    .,#@@@@@@@@@#*,.       \n%%%%%%%%%%%(*,,,,,.....*#@@@&/      ,#&@@@@@%(/,..  ..  .,,,\n@@@@&&#((%@%*.........,,,,,,..    .,(&@@@&#/,   ..,.  .,/%@@\n#*.       ./%&%#&@@@@@@&/......  ./%&@@@@%/...,,,.  .,(@@@@@\n.          /%%/ ..,,,.          ....,,**/*...,,.   ,(&&@@@@@\n*,     ..*(#&@%(*.      ...             ....... .*(%&@@@@@@@\n@&#(//*,,/((/*,...    ..                  ..,,**,. .*(%@@@@@\n@@@&/    ,**,,...,,.....   .....            .*,.      ,/#&@@\n@@@&/ ..,,,,,,,...,***,....,***,               .,.      *%@@\n@@@&/ .,**,,,,,,..,*/*,.,,,,,*/*,.......  ..  ..,.  ....,*//\n@@@&(,*/*,..,....,*,,....,....,,,...,,*,,,,,,.,**,,,,,,,,*//\n@@@@%#(*,,..  .,,,,**,. .....,,,*,,..,,,,,,,,,,,,,**,,,,,***\n@%((#%(*,,,,,,.    .,,. ....,,*,.......,**,,...,,,**,,,,,,**\n@&%(/,,**///////,. .,,....         ....,**,,...,,***,,,,,,,,\n@%*,,,/##/,. ./&#*,.  ...,.   .,/(//*,...,,,...,,,*,....,***\n@#*,,*(%#* *#%(*,.         .,#@#*..     ..,,...,******,,,***\n@@@&#////,                   .,/(#*     .......,**/*,,,**/((\n@@@&#//**.      ....   ..,.    .,,..   .,.  ,**,.,**//((((//\n@@@&#*///,      ,*/*,...,,,,,.         ..,,*/(/,..,*(###(///\n@&%#(//*/((*.   .,*,,,,,,,,,..      ..,..   .**,,..*#&#(/*,,\n@&%#(/***/((//*,.     ....              .,/((#(/*,.*#@@@&(//\n@&%%##/,,/#(**//(((/****,..     ..,******,..*/(#(*.*#&@@@@@@\n@@@@@&(**/#(/*,.     ..,*/*,,,..           ...*(#/*/#&%#%&@@");
    //document.body.removeChild(document.getElementById('loader-wrapper'));
  },
  mounted() {
    let timeNow = new Date();
    let hours = timeNow.getHours();
    if (hours < 6 || hours > 18) {
      //自动触发夜间模式
      this.$store.commit("change_dark_mode");
      this.$root.dark = this.$store.state.dark_mode;

      //window.console.log(this.$root.dark);
    }

    window.onbeforeinstallprompt = e => {
      //当浏览器触发横幅显示事件
      window.console.log(e);
      this.prompt = true;
      this.deferred = e;
      //window.console.log(this.prompt);
      this.showAddToHomeScreen();
    };
    window.addEventListener("scroll", this.handleScroll, true);
    if (this.$cookies.isKey("Lang")) {
      this.$i18n.locale = this.$cookies.get("Lang");
    } else {
      let lang = navigator.language;
      if (lang === "zh" || lang === "zh-CN") {
        this.$i18n.locale = "zhHans";
        localStorage.setItem("lang", "zhHans");
      } else if (lang === "ja" || lang === "ja-JP") {
        this.$i18n.locale = "ja";
        localStorage.setItem("lang", "ja");
      } else {
        this.$i18n.locale = "en";
        localStorage.setItem("lang", "en");
      }
    }
  },
  methods: {
    showAddToHomeScreen() {
      window.console.log("success");
      //this.addtoscreendialog=true;
    },
    addToHomescreen() {
      this.deferred.prompt();
      let _this = this;
      this.deferred.userChoice.then(function(choiceResult) {
        if (choiceResult.outcome === "accepted") {
          window.console.log("User accepted the A2HS prompt");
          _this.addtoscreendialog = false;
        } else {
          window.console.log("User dismissed the A2HS prompt");
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
    See(e) {
      window.location.href = e;
    }
  }
};
</script>

<style>
.footertext {
  margin: 10px;
  font-family: Helvetica;
  font-size: 16px;
  letter-spacing: 0.02em;
  color: #4646468a;
}
.fabbtn {
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
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 3px 6px 20px rgba(104, 102, 255, 0.44);
  z-index: 9;
}
.fabbtn:after {
  content: "";
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle,
    rgb(255, 255, 255) 10%,
    transparent 10.01%
  );
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.4s, opacity 0.6s;
}
.fabbtn:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}
.fabbtn:active {
  box-shadow: inset 3px 3px 10px rgba(0, 4, 54, 0.295),
    inset -3px -3px 10px rgba(0, 119, 255, 0.705) !important;
}
.fab-scale-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.fab-scale-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.fab-scale-enter,
.fab-scale-leave-to {
  transform: rotateY(90deg);
}
</style>