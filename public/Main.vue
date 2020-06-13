<template>
  <v-container>
    
      <v-menu id="volumeM" open-on-hover offset-x>
      <template v-slot:activator="{ on }">
      <v-btn
        id="volumestyle"
        color="secondary"
        dark
        fixed
        bottom
        left
        fab
        v-on="on"
      >
      <v-icon>mdi-volume-high</v-icon>
      </v-btn>
      </template>
      <v-card
        min-height="100"
        min-width="250"
        flat
      >
      <v-slider
        class="pl-5 pr-5 pt-8 mb-0"
        v-model="volume"
        :label="this.$t('ui.volume')"
        thumb-label
        max=100
        min=0
        dense
        prepend-icon="mdi-volume-high"
      ></v-slider>
      </v-card>
    </v-menu>
    <v-fab-transition>
      <v-btn
        class="mb-12 mr-12"
        v-show="orderplaymode"
        color="primary"
        dark
        fixed
        bottom
        right
        fab
        @click="orderdialog=true"
      >
      <v-badge
        color="secondary"
        :content="arrysize"
        :value="arrysize"
        overlap
        >
        <v-icon>mdi-reorder-horizontal</v-icon>
      </v-badge>
      </v-btn>
      
    </v-fab-transition>
    
    <!---标题--->
    <v-row class="mt-5" align="center" justify="center">
      <div class="text-center display-1 font-weight-bold">{{$t("ui.title")}}</div>
    </v-row>
    
    <v-row align="center" justify="center">
      <v-switch v-model="orderplaymode" inset color="secondary" :label="$t('ui.openorderplaymode')"></v-switch>
      <!-- <v-badge
        color="primary"
        :content="this.$t('ui.beta')"
        overlap
        offset-x=40
        offset-y=20
      > -->
      <!-- <router-link to="/pekolanguage" class="a"> -->
      <!-- <v-btn disabled class="ma-2" raised color="secondary">{{$t("ui.pekolanguage")}}</v-btn> -->
      <!-- </router-link> -->
      <!-- </v-badge> -->
    </v-row>
    <v-row class="pa-1">

      <div id="fluntUIcoming" class="pa-5">
        
        <p class="font-weight-blod" id="fluntUItext"><v-icon large color="primary" class="mr-4">mdi-git</v-icon>{{$t("ui.newversion")}}</p>
      </div>
     
    </v-row>
    <!---帮助文本--->
    <v-row>
      <v-col cols="12" class="ma-0 pa-0">
        <v-card class="ma-1 pa-4">
          <p class="headline font-weight-blod">
            <v-icon large color="red">mdi-party-popper</v-icon>
            {{$t("ui.info")}}
          </p>
          <p>{{$t("ui.betainfo")}}</p>
          <v-btn class="ma-2 pa-1" raised color="secondary" @click="playSpecial()">Co↘ce↗ki↘お兄ちゃん</v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="ma-0 pa-0">
        <v-card class="ma-1 pa-4" >
          <p class="headline font-weight-blod">
            <v-icon large color="primary">mdi-help-circle</v-icon>
            {{$t("ui.helptitle")}}
          </p>
          <p>{{$t("ui.helpcontent")}}</p>
          <p>{{$t("ui.additionalhelp")}}</p>
        </v-card>
      </v-col>
    </v-row>
    <!---展示按钮--->
    <v-row v-for="group in voices" :key="group">
      <v-col cols="12" class="ma-0 pa-0">
        <v-card class="ma-1 pa-0">
          <v-card-title v-if="$i18n.locale=='zhHans'">{{group.translation.Chinese}}</v-card-title>
          <v-card-title v-else-if="$i18n.locale=='ja'">{{group.translation.Japanese}}</v-card-title>
          <v-card-title v-else-if="$i18n.locale=='en'">{{group.translation.English}}</v-card-title>
          <v-container>
            <v-row no-gutters v-if="$i18n.locale=='zhHans'">
              <v-btn
                class="ma-2 btn"
                v-for="voice in group.voicelist"
                :key="voice.name"
                raised
                color="secondary"
                @click="play(voice)"
              >{{voice.translation.Chinese}}</v-btn>
            </v-row>
            <v-row no-gutters v-else-if="$i18n.locale=='ja'">
              <v-btn
                class="ma-1 btn"
                v-for="voice in group.voicelist"
                :key="voice.name"
                raised
                color="secondary"
                @click="play(voice)"
              >{{voice.translation.Japanese}}</v-btn>
            </v-row>
            <v-row no-gutters v-else-if="$i18n.locale=='en'">
              <v-btn
                class="ma-1 btn"
                v-for="voice in group.voicelist"
                :key="voice.name"
                raised
                color="secondary"
                @click="play(voice)"
              >{{voice.translation.English}}</v-btn>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!--序列播放-->
    <v-dialog v-model="orderdialog" persistent max-width=800>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="orderdialog = false,stopplay()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{$t("ui.orderplaymode")}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card v-if="$i18n.locale=='zhHans'" class="pa-2">
        <p class="title font-weight-blod">{{$t("ui.orderlistnow")}}</p>
        <v-chip v-for="(selected,index) in orderlist" :key="selected" class="ma-2" close color="secondary" text-color="white" @click:close="deletelist(index)" @click="playOnly(selected)">{{selected.translation.Chinese}}</v-chip>
        <v-switch class="ml-3 mt-2" v-model="repeatmode" inset color="secondary" :label="$t('ui.repeatmode')"></v-switch>
        <v-card-actions v-if="orderlist.length>0">
          <v-btn raised color="primary" @click="orderplay">{{$t("ui.playthislist")}}</v-btn>
          <v-btn text color="secondary" @click="stopplay">{{$t("ui.stopplay")}}</v-btn>
          <v-divider></v-divider>
          <v-btn text color="red" @click="resetorder">{{$t("ui.resetorder")}}</v-btn>
        </v-card-actions> 
        <p v-else>{{$t("ui.listempty")}}</p>     
      </v-card>
      <v-card v-if="$i18n.locale=='ja'" class="pa-1">
        <p class="title font-weight-blod">{{$t("ui.orderlistnow")}}</p>
        <v-chip v-for="(selected,index) in orderlist" :key="selected" class="ma-2" close color="secondary" text-color="white" @click:close="deletelist(index)" @click="playOnly(selected)">{{selected.translation.Japanese}}</v-chip>
        <v-switch class="ml-3 mt-2" v-model="repeatmode" inset color="secondary" :label="$t('ui.repeatmode')"></v-switch>
        <v-card-actions v-if="orderlist.length>0">
          <v-btn raised color="primary" @click="orderplay">{{$t("ui.playthislist")}}</v-btn>
          <v-btn text color="secondary" @click="stopplay">{{$t("ui.stopplay")}}</v-btn>
          <v-divider></v-divider>
          <v-btn text color="red" @click="resetorder">{{$t("ui.resetorder")}}</v-btn>
        </v-card-actions> 
        <p v-else>{{$t("ui.listempty")}}</p>     
      </v-card>
      <v-card v-if="$i18n.locale=='en'" class="pa-1">
        <p class="title font-weight-blod">{{$t("ui.orderlistnow")}}</p>
        <v-chip v-for="(selected,index) in orderlist" :key="selected" class="ma-2" close color="secondary" text-color="white" @click:close="deletelist(index)" @click="playOnly(selected)">{{selected.translation.English}}</v-chip>
        <v-switch class="ml-3 mt-2" v-model="repeatmode" inset color="secondary" :label="$t('ui.repeatmode')"></v-switch>
        <v-card-actions v-if="orderlist.length>0">
          <v-btn raised color="primary" @click="orderplay">{{$t("ui.playthislist")}}</v-btn>
          <v-btn text color="secondary" @click="stopplay">{{$t("ui.stopplay")}}</v-btn>
          <v-divider></v-divider>
          <v-btn text color="red" @click="resetorder">{{$t("ui.resetorder")}}</v-btn>
        </v-card-actions> 
        <p v-else>{{$t("ui.listempty")}}</p>     
      </v-card>
    </v-dialog>
    <!--序列播放说明-->
    <v-dialog v-model="helpdialog" persistent max-width=600>
      <v-toolbar dark color="primary">
        <v-toolbar-title>{{$t("ui.orderplaymodehelp")}}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card class="pa-5">
        <p class="title">{{$t("ui.tips1")}}</p>
        <v-img src="1.png" width=300>
        <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
        </template>
        </v-img>
        <p class="title">{{$t("ui.tips2")}}</p>
        <v-img src="2.png" width=300>
        <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
        </template>
        </v-img>
        <p class="title">{{$t("ui.tips3")}}</p>
        <v-img src="3.png" width=300>
        <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </v-row>
        </template>
        </v-img>
      </v-card>
        <v-btn raised color="primary" @click="helpdialog=false">{{$t("ui.gotit")}}</v-btn>
    </v-dialog>
  </v-container>
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
    orderlist:[],
    helpdialog:false,
    repeatmode:false,
    arrysize:0,
    volume:100,
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
      audio.src="voices/"+item.path;
      this.voice = item;
      audio.volume=this.volume/100;
      audio.play();
    },
    playOnly(item){
      let audio = new Audio();
      audio.src="voices/"+item.path;
      audio.preload = true;
      this.voice = item;
      audio.play();
    },
    playSpecial(){
      let audio = new Audio();
      audio.src="voices/私货.mp3";
      audio.preload = true;
      audio.play();
    },
    deletelist(i){//删除序列中的一个值
      this.orderlist.splice(i,1);
    },
    orderplay(){
      
      i=0;
      audio = new Audio();
      let arry = this.orderlist;
      let repeat = this.repeatmode;
      audio.preload = true;
      audio.loop = false;
      audio.src="voices/"+arry[i].path;
      audio.volume=this.volume/100;
      audio.play();
      audio.addEventListener('ended', playEndedHandler, false); 
      function playEndedHandler(){//序列播放实现
        i++;   
        if(i < arry.length){
          audio.src = "voices/"+arry[i].path;
          //window.console.log(i);
          audio.play();
          
        }else{
          if(repeat==true){//不要停不下来啊
            i=0;
            audio.src = "voices/"+arry[i].path;
            audio.play();
          }
        }
      }
    },
    resetorder(){
      this.orderlist=[];
    },
    stopplay(){
      audio.pause();
      i=0;
    }
  },
  watch:{
    orderplaymode:function(){
       if(this.orderplaymode){
         this.helpdialog=true;
       }
    },
    orderlist:function(){
      this.arrysize=this.orderlist.length;
    }
  },
};
</script>

<style>
.a{
  text-decoration: none;
}
#volumestyle{
  z-index:201;
}
#volumeM{
  z-index: 999;
}
#fluntUIcoming{
  border-radius: 10px;
  width: 100%;
background: linear-gradient(135deg,rgba(246,246,246,1)0%,rgba(255,255,255,1)100%);
box-shadow: -4px -4px 10px -8px rgba(255,255, 255, 1),4px 4px 10px -8px rgba(0,0,0, .3);
}
#fluntUItext{
  font-family: Helvetica;
  font-weight: normal;
  color: #999;
  font-size: 24px;
}
#fluntinfo{
  font-family: Helvetica;
  font-weight: normal;
  color: #999;
  font-size: 16px;
}
.btn{
    max-width: 100%;
  word-wrap: break-word !important;
  word-break: break-all !important;
  white-space: normal !important;
  text-transform: none !important;
  display: inline-block;
}
</style>