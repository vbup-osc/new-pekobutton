<template>
  <div class="topbar" :class="{dark_topbar:$root.dark}">
    <button class="languagebtn ripple" @click="showlangmenu=true" >
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="white"
          d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z"
        />
      </svg>
    </button>
    <button alt="黑夜模式" class="themebtn ripple" @click="DarkMode()">
      <svg style='width:24px;height:24px' viewBox='0 0 24 24'><path fill='white' :d="darkmodeicon" /></svg>
    </button>
    <p alt="peko按钮">{{$t("title")}}</p>
    <transition name="langmenu-scale">
    <div v-show="showlangmenu" class="langmenu" :class="{dark:$root.dark}" @click="showlangmenu=false">
          <button class="menubtn" :class="{dark_text:$root.dark}" v-for="(lang,index) in langs" :key="index" @click="ChangeLang(lang.src)"><div>{{lang.title}}</div></button>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    langs: [
      { title: "简体中文", src: "zhHans", isready: true },
      { title: "English", src: "en", isready: true },
      { title: "日本語", src: "ja", isready: true }
    ],
    showlangmenu:false,
  }),
  methods: {
    ChangeLang(e) {
      this.$i18n.locale = e;
      this.$cookies.set("Lang", e);
    },
    DarkMode() {
      this.$store.commit("change_dark_mode");
      this.$root.dark=this.$store.state.dark_mode;
      
    },
    See(e) {
      window.location.href = e;
    }
  },
  computed: {
    darkmodeicon: {
      get: function() {
        return this.$store.state.dark_icon;
      }
    },
    darkmode:{
      get: function() {
        return this.$store.state.darkmode;
      }
    }
  }
};
</script>

<style lang="scss">

.topbar {
  position: fixed;
  align-items: flex-start;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(200.6deg, #244dff8a 19.14%, #0e9dfc6c 154.68%);
  background-blend-mode: normal, luminosity;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 3px 6px 20px rgba(104, 102, 255, 0.44),
    -3px -6px 10px rgba(255, 255, 255, 0.6);
  outline: rgba(104, 102, 255, 1);
  /* background: linear-gradient(200.6deg, #00aeff8a 19.14%, #188fff6c 154.68%);
  background-blend-mode: normal, luminosity;
  backdrop-filter: blur(10px);
    box-shadow: 3px 6px 20px rgba(35, 174, 255, 0.514), -3px -6px 10px rgba(255, 255, 255, 0.6);
    outline: rgb(0, 102, 255); */
  z-index: 10;
}
.dark_topbar{
  background: linear-gradient(200.6deg, #3131318a 19.14%, #2727276c 154.68%) !important;
  box-shadow: 3px 6px 20px rgba(37, 37, 37, 0.44),
    -3px -6px 10px rgba(0, 0, 0, 0.6) !important;
  outline: rgb(0, 0, 0) !important;
}
.topbar p {
  position: absolute;
  left: 5px;
  color: #fff;
  margin-left: 10px;
  font-family: Helvetica;
  font-weight: bold;
  font-size: 20px;
  line-height: 100%;
  letter-spacing: 0.02em;
  text-shadow: 1px 1px 2px rgba(20, 44, 73, 0.31),
    -1px -1px 2px rgba(151, 153, 255, 0.9);
}
.languagebtn {
  position: absolute;
  width: 55px;
  height: 55px;
  bottom: -25px;
  right: 5px;
  border: 0pt;
  outline: none;
  border-radius: 999px;
  display: inline-block;
  background: rgba(255, 255, 255, 0);
  transform: translateY(-50%);
}
.themebtn {
  position: absolute;
  width: 55px;
  height: 55px;
  bottom: -25px;
  right: 45px;
  border: 0pt;
  outline: none;
  border-radius: 999px;
  display: inline-block;
  background: rgba(255, 255, 255, 0);
  transform: translateY(-50%);
}
.langmenu{
  padding: 10px;
  position: fixed;
  right: 10px;
  top:70px;
  background: linear-gradient(200.6deg, #ffffff 19.14%, rgba(255, 255, 255, 0.692) 154.68%);
  background-blend-mode: normal, luminosity;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 3px 6px 20px rgba(139, 139, 139, 0.507);
  outline: rgb(255, 255, 255);
  border-radius: 16px;
  z-index: 10;
}
.dark_langmenu{
  background: linear-gradient(200.6deg, #1a1a1a 19.14%, rgba(255, 255, 255, 0.692) 154.68%);
}
.langmenu-scale-enter-active{
  transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.langmenu-scale-leave-active{
  transition: all 0.2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.langmenu-scale-enter ,.langmenu-scale-leave-to{
  opacity: 0;
  transform: skew(45deg, 45deg);
}
.menubtn{
  margin: 5px;
  display: block;
  padding: 10px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 15px;
  text-align: center;  
  border: 0pt;
  outline: none;
  line-height: 100%;
  align-items: center;
  letter-spacing: 0.02em;
  color: #31456A;
  background: rgba(255, 255, 255, 0);
  transition: 0.2s;
}
.menubtn div{
  transition: 0.5s;
  text-align: center;
  padding-left: 11px;
  padding-right: 11px;
  display: inline-block;
}
  
.menubtn div:after {
  content: "●";
  color: #728bf3;
  font-size: 20px;
  position:absolute;
  right: -12px;
  opacity: 0;
  transition: 0.5s;
}
.menubtn:hover div {
  padding-left: 0;
  padding-right: 22px;
}
.menubtn:hover div:after {
  right: 10px;
  opacity: 1;
  transition: 0.5s;
  text-align: center;
}
</style>