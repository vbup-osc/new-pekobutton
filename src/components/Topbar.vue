<template>
  <div class="topbar">
    <button class="languagebtn ripple">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="white" d="M12.87,15.07L10.33,12.56L10.36,12.53C12.1,10.59 13.34,8.36 14.07,6H17V4H10V2H8V4H1V6H12.17C11.5,7.92 10.44,9.75 9,11.35C8.07,10.32 7.3,9.19 6.69,8H4.69C5.42,9.63 6.42,11.17 7.67,12.56L2.58,17.58L4,19L9,14L12.11,17.11L12.87,15.07M18.5,10H16.5L12,22H14L15.12,19H19.87L21,22H23L18.5,10M15.88,17L17.5,12.67L19.12,17H15.88Z" />
</svg>
    </button>
    <button class="themebtn ripple">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="white" d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20,12.5H23V10.5H20M17.24,18.16L19.04,19.95L20.45,18.54L18.66,16.74M20.45,4.46L19.04,3.05L17.24,4.84L18.66,6.26M13,0.55H11V3.5H13M4,10.5H1V12.5H4M6.76,4.84L4.96,3.05L3.55,4.46L5.34,6.26L6.76,4.84Z" />
</svg>
    </button>
    <p>{{$t("title")}}</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    langs: [
      { title: "简体中文", src: "zhHans", isready: true },
      { title: "English", src: "en", isready: true },
      { title: "日本語(ベータ版)", src: "ja", isready: true }
    ]
  }),
  methods: {
    ChangeLang(e) {
      this.$i18n.locale = e;
      this.$cookies.set("Lang", e);
    },
    DarkMode() {
      this.$store.commit("change_dark_mode");
      this.$vuetify.theme.dark = this.$store.state.dark_mode;
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
    }
  }
};
</script>

<style>
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
  top: 30px;
  right: 5px;
  bottom: 0;
  border: 0pt;
  outline: none;
  border-radius: 999px;
  display: inline-block;
  background: rgba(255, 255, 255, 0);
  transform: translateY(-50%);
  
}
.themebtn{
    position: absolute;
    width: 55px;
  height: 55px;
  top: 30px;
  right: 45px;
  bottom: 0;
  border: 0pt;
  outline: none;
  border-radius: 999px;
  display: inline-block;
  background: rgba(255, 255, 255, 0);
  transform: translateY(-50%);
}
</style>