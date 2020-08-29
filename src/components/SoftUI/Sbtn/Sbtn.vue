<template>
  <button
            :color="color"
            class="btn ripple"
            :class="[color ? 'color-'+color : '',{dark_btn:$root.dark}]"
            @click="handleClick"
          >
          <slot></slot>
    </button>
</template>

<script>
export default {
    name:"s-btn",
     props:{
         color:{
            type:String,
           default:"primary"
       }
    },
    mounted(){
      window.document.documentElement.setAttribute("color",this.color);
    },
    methods:{
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
}
</script>

<style lang="scss" scope>
@import "../colors";
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
  transition: 0.5s;
}
.dark_btn {
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.42), -2px -2px 5px rgba(0, 0, 0, 0.6) !important;
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

.ripple:active:after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}
</style>