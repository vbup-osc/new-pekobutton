<template>
  <div class="overflowC">
    <transition name="dialog_scale">
      <div v-show="orderdialog" class="orderdialog langmenu" :class="{dark:$root.dark}">
        <button class="closebtn ripple" @click="orderdialog = false,stopplay()">
              <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                <path
                  fill="red"
                  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                />
              </svg>
            </button>
        <p class="cardtext" :class="{dark_text:$root.dark}">{{$t("orderplaymode")}}</p>
        <div v-if="$i18n.locale=='zhHans'">
          <div  v-for="(voice,index11) in orderlist"
            :key="index11"> 
          <s-btn
           
            color="secondary"
            @click="playOnly(voice)"
          >
            {{voice.translation.Chinese}}
            
          </s-btn>
          <button class="deletebtn ripple" @click="deletelist(index)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="white"
                  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="$i18n.locale=='ja'">
          <div  v-for="(voice,index11) in orderlist"
            :key="index11"> 
          <s-btn
           
            color="secondary"
            @click="playOnly(voice)"
          >
            {{voice.translation.Japanese}}
            
          </s-btn>
          <button class="deletebtn ripple" @click="deletelist(index)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="white"
                  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="$i18n.locale=='en'">
          <div  v-for="(voice,index11) in orderlist"
            :key="index11"> 
          <s-btn
           
            color="secondary"
            @click="playOnly(voice)"
          >
            {{voice.translation.English}}
            
          </s-btn>
          <button class="deletebtn ripple" @click="deletelist(index)">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="white"
                  d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <hr class="line" v-if="$root.dark" color="#333" width="95%" />
    <hr class="line" v-else color="#EEE" width="95%" />
        
          <p class="cardtext" style="font-size:15px !important;transform:translate3d(-40%,0,0);overflow: visible !important;width:150%" :class="{dark_text:$root.dark}">
        <label for="toggle1">
          <input type="checkbox" id="toggle1" v-model="repeatmode" />
          <span></span>
        </label>
        {{$t("repeatmode")}}
      </p>
          <p>
          <s-btn color="primary" @click="orderplay">{{$t("playthislist")}}</s-btn>
          <s-btn color="secondary" @click="stopplay">{{$t("stopplay")}}</s-btn>
          <s-btn text color="red" @click="resetorder">{{$t("resetorder")}}</s-btn>
          </p>
      </div>
    </transition>
    <transition name="dialog_scale">
      <div v-show="orderdialog" class="dialog_back"></div>
    </transition>
    <transition name="fab-scale">
      <button
        v-show="arrysize!=0&&orderplaymode"
        class="fabbtn"
        style="bottom:140px !important;width:10px !important;height:10px !important;background:orange!important;z-index:12;padding:10px"
      >
        <div style="color:white;transform:translateY(-50%) translateX(-5px)">{{arrysize}}</div>
      </button>
    </transition>
    <transition name="fab-scale">
      <button
        v-show="orderplaymode"
        @click="orderdialog=true"
        class="fabbtn"
        style="bottom:100px !important;padding=20px !important"
      >
        <svg style="width:36px;height:36px" viewBox="0 0 24 24">
          <path
            fill="white"
            d="M15,6H3V8H15V6M15,10H3V12H15V10M3,16H11V14H3V16M17,6V14.18C16.69,14.07 16.35,14 16,14A3,3 0 0,0 13,17A3,3 0 0,0 16,20A3,3 0 0,0 19,17V8H22V6H17Z"
          />
        </svg>
      </button>
    </transition>
    <transition name="dialog_scale">
      <div v-show="helpdialog" class="dialog_back"></div>
    </transition>
    <transition name="dialog_scale">
      <div v-show="helpdialog" class="helpdialog langmenu" :class="{dark:$root.dark}">
        <p class="cardtext" :class="{dark_text:$root.dark}">{{$t("orderplaymodehelp")}}</p>
        <p class="infotext" :class="{dark_infotext:$root.dark}">{{$t("tips1")}}</p>
        <img src="1.png" width="300" />
        <p class="infotext" :class="{dark_infotext:$root.dark}">{{$t("tips2")}}</p>
        <img src="2.png" width="300" />
        <p class="infotext" :class="{dark_infotext:$root.dark}">{{$t("tips3")}}</p>
        <img src="3.png" width="300" />
        <p>
          <s-btn @click="helpdialog=false">{{$t("gotit")}}</s-btn>
        </p>
      </div>
    </transition>
    <div class="titlediv">
      <p class="title" :class="{dark_text:$root.dark}" @click="easterEgg()" >{{$t("title")}}<br>
      <s-btn v-show="easteregg" color="secondary" @click="playEasteregg()">
          <div>????????.sstv robot36</div>
        </s-btn></p>
      
    </div>
    <div class="topdiv topdivO">
      <div class="card cardM" :class="{dark:$root.dark}">
        <p class="cardtext" :class="{dark_text:$root.dark}">
          <svg
            style="width:42px;height:42px;padding:5px;transform: translate3d(0,30%,0);"
            viewBox="0 0 24 24"
          >
            <path
              fill="orange"
              d="M2.6,10.59L8.38,4.8L10.07,6.5C9.83,7.35 10.22,8.28 11,8.73V14.27C10.4,14.61 10,15.26 10,16A2,2 0 0,0 12,18A2,2 0 0,0 14,16C14,15.26 13.6,14.61 13,14.27V9.41L15.07,11.5C15,11.65 15,11.82 15,12A2,2 0 0,0 17,14A2,2 0 0,0 19,12A2,2 0 0,0 17,10C16.82,10 16.65,10 16.5,10.07L13.93,7.5C14.19,6.57 13.71,5.55 12.78,5.16C12.35,5 11.9,4.96 11.5,5.07L9.8,3.38L10.59,2.6C11.37,1.81 12.63,1.81 13.41,2.6L21.4,10.59C22.19,11.37 22.19,12.63 21.4,13.41L13.41,21.4C12.63,22.19 11.37,22.19 10.59,21.4L2.6,13.41C1.81,12.63 1.81,11.37 2.6,10.59Z"
            />
          </svg>
          {{$t("info")}}
        </p>
        <div class="infotext" :class="{dark_infotext:$root.dark}">{{$t("betainfo")}}</div>
        <!-- <div class="vote">
          <button class="likebtn" >
          <svg style="width:42px;height:42px;padding:3px" viewBox="0 0 24 24">
            <path
              fill="white"
              d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z1"
            />
          </svg>
          </button>
          <button class="dislikebtn" >
          <svg style="width:42px;height:42px;padding:3px" viewBox="0 0 24 24">
            <path
              fill="white"
              d="M19,15H23V3H19M15,3H6C5.17,3 4.46,3.5 4.16,4.22L1.14,11.27C1.05,11.5 1,11.74 1,12V14A2,2 0 0,0 3,16H9.31L8.36,20.57C8.34,20.67 8.33,20.77 8.33,20.88C8.33,21.3 8.5,21.67 8.77,21.94L9.83,23L16.41,16.41C16.78,16.05 17,15.55 17,15V5C17,3.89 16.1,3 15,3Z"
            />
          </svg>
          </button>
        </div>-->
        <s-btn
          color="black"
          class="githubbtn"
          @click="See('https://github.com/Coceki/new-pekobutton')"
        >
          <div>{{$t("helpdevelope")}}</div>
        </s-btn>
        <s-btn color="secondary" @click="playSpecial()">
          <div>Co↘ce↗ki↘お兄ちゃん</div>
        </s-btn>
      </div>
      <!-- 显示直播订阅信息 -->
      <div class="card cardM" :class="{dark:$root.dark}">
        <p class="cardtext" :class="{dark_text:$root.dark}">
          <svg style="width:42px;height:42px;transform: translate3d(0,30%,0);" viewBox="0 0 24 24">
            <path
              fill="red"
              d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
            />
          </svg>
          {{$t("youtubesubs")}}
        </p>
        <div  class="subnum" :class="{dark_infotext:$root.dark}">{{youtubeData.subscriber_count}}</div>
        <div
          :class="{dark_infotext:$root.dark}"
          style="
              letter-spacing: 0.02em;margin-top:40px;margin-left:20px"
        >{{$t("streaming")}}</div>
        <!-- 正在直播列表 -->
        <div class="liveinfo">
          <!-- <p  :class="{dark_infotext:$root.dark}"
          style="
              letter-spacing: 0.02em;margin-top:40px;margin-left:30px" >{{$t("noStreaming")}}{{live_data}}</p> -->
          <div
            v-for="(streaming,index3) in live_data"
            :key="index3"
          >
          <div class="card cardM"
            :class="{dark:$root.dark}"
            style="padding: 5px !important;
                  padding-bottom: 20px !important;
                  margin: 10px !important;"
            v-if="streaming.status === 'live'">
            <!-- <img width="200px" class="liveimg" :src="upcoming.snippet.thumbnails.medium.url"/> -->
            <p  class="livetext" :class="{dark_text:$root.dark}">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="#728bf3"
                  d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z"
                />
              </svg>
              {{new Date(streaming.live_start).toLocaleString()}}{{streaming.title}}
            </p>
            <p :class="{dark_text:$root.dark}">{{streaming.description}}</p>
            <br />
            <button
              class="goto"
              @click="See('https://www.youtube.com/watch?v='+streaming.yt_video_key)"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="white" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            </button>
          </div>
          </div>
        </div>
        <div
          :class="{dark_infotext:$root.dark}"
          style="
              letter-spacing: 0.02em;margin-top:40px;margin-left:20px"
        >{{$t("upcoming")}}</div>
        <!-- 即将直播的列表 -->
        <div class="liveinfo">
           <!-- <p  :class="{dark_infotext:$root.dark}"
          style="
              letter-spacing: 0.02em;margin-top:40px;margin-left:30px" v-if="streaming==null">{{$t("noStreaming")}}</p> -->
          <div
            v-for="(upcoming,index2) in live_data"
            :key="index2"
          >
          <div class="card cardM"
            :class="{dark:$root.dark}"
            style="padding: 5px !important;
                  padding-bottom: 20px !important;
                  margin: 10px !important;"
            v-if="upcoming.status === 'upcoming'">
            <!-- <img width="200px" class="liveimg" :src="upcoming.snippet.thumbnails.medium.url"/> -->
            <p class="livetext" :class="{dark_text:$root.dark}">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path
                  fill="#728bf3"
                  d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12S17.5 2 12 2M17 13H11V7H12.5V11.5H17V13Z"
                />
              </svg>
              {{new Date(upcoming.live_schedule).toLocaleString()}}{{upcoming.title}}
            </p>
            <p :class="{dark_text:$root.dark}">{{upcoming.description}}</p>
            <br />
            <button
              class="goto"
              @click="See('https://www.youtube.com/watch?v='+upcoming.yt_video_key)"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="white" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
              </svg>
            </button>
          </div>
          </div>
        </div>
      </div>
      <div class="card cardM" :class="{dark:$root.dark}">
        <p class="cardtext" :class="{dark_text:$root.dark}">
          <svg style="width:42px;height:42px;transform: translate3d(0,30%,0);" viewBox="0 0 24 24">
            <path
              fill="#728bf3"
              d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z"
            />
          </svg>
          {{$t("helptitle")}}
        </p>
        <div class="infotext" :class="{dark_infotext:$root.dark}">
          {{$t("helpcontent")}}
          <br />
          {{$t("additionalhelp")}}
          <br />
        </div>
        <!-- <s-btn color="red" @click="See('https://www.youtube.com/channel/UC1DCedRgGHBdm81E1llLhOQ')">
          <svg
            style="width:24px;height:24px;position:absolute;left:10px;bottom:50%;transform:translate3d(0,50%,0)"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
            />
          </svg>
          <a style="margin-left:30px">Pekora Ch. 兎田ぺこら</a>
        </s-btn>
        <s-btn color="blue" @click="See('https://twitter.com/usadapekora')">
          <svg
            style="width:24px;height:24px;position:absolute;left:10px;bottom:50%;transform:translate3d(0,50%,0)"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
            />
          </svg>
          <a style="margin-left:30px">@usadapekora</a>
        </s-btn> -->
        <!-- miko和peko贴贴links -->
        <s-btn
          v-for="(link,index) in ttlinks"
          :key="index"
          :color="link.color"
          @click="See(link.href)"
        >{{link.name}}</s-btn>
      </div>
      
    </div>
    <hr class="line" v-if="$root.dark" color="#333" width="95%" />
    <hr class="line" v-else color="#EEE" width="95%" />
    <p class="cardtext" :class="{dark_text:$root.dark}">
        <label for="toggle">
          <input type="checkbox" id="toggle" v-model="orderplaymode" />
          <span></span>
        </label>
        {{$t("orderplaymode")}}
      </p>
    <div class="topdiv">
      <div class="card" :class="{dark:$root.dark}" v-for="(group,index) in voices" :key="index">
        <p
          class="cardtext"
          :class="{dark_text:$root.dark}"
          v-if="$i18n.locale=='zhHans'"
        >{{group.translation.Chinese}}</p>
        <p
          class="cardtext"
          :class="{dark_text:$root.dark}"
          v-else-if="$i18n.locale=='ja'"
        >{{group.translation.Japanese}}</p>
        <p
          class="cardtext"
          :class="{dark_text:$root.dark}"
          v-else-if="$i18n.locale=='en'"
        >{{group.translation.English}}</p>
        <div v-if="$i18n.locale=='zhHans'">
          <s-btn
            class="btn"
            color="secondary"
            v-for="(voice,index1) in group.voicelist"
            :key="index1"
            @click="play($event,voice)"
          >
            <div>{{voice.translation.Chinese}}</div>
          </s-btn>
        </div>
        <div v-else-if="$i18n.locale=='ja'">
          <s-btn
            color="secondary"
            v-for="(voice,index2) in group.voicelist"
            :key="index2"
            @click="play($event,voice)"
          >
            <div>{{voice.translation.Japanese}}</div>
          </s-btn>
        </div>
        <div v-else-if="$i18n.locale=='en'">
          <s-btn
            color="secondary"
            v-for="(voice,index2) in group.voicelist"
            :key="index2"
            @click="play($event,voice)"
          >
            <div>{{voice.translation.English}}</div>
          </s-btn>
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
    volume: 100,
    live_data: {},
    live_data_loading:true,
    youtubeData:{channels: null},
    colors:["rgba(23, 116, 255, 0.575)","rgba(233, 85, 0, 0.555)"],
    colorC:0,
    easteregg:false,
    ec:0,
    ttlinks: [
      {
        name: "樱按钮/みこボタン",
        href: "https://sakuramiko.org/",
        color: "miko_red"
      },
      {
        name: "VTuber按钮合集",
        href: "https://vtbbtn.org/",
        color: "primary"
      }
    ]
  }),
  computed:{

  },
  created() {
    //window.console.log(this.voices); //装载语音包path
    const axios = require("axios");
    axios.get('https://api.holotools.app/v1/channels/youtube/UC1DCedRgGHBdm81E1llLhOQ')
        .then(response => {
        this.youtubeData = response.data
        })
  },
  mounted(){
    const axios = require("axios");
    axios.get('https://api.holotools.app/v1/live')
        .then(response => { 
            let fetched = response.data;
            let lives = [];
            const channel_id = 'UC1DCedRgGHBdm81E1llLhOQ';
            fetched.live.forEach(function(item){
                if (item.channel.yt_channel_id === channel_id){
                    item.status = 'live';
                    lives.push(item);
                }
            });
            fetched.upcoming.forEach(function(item){
                if (item.channel.yt_channel_id === channel_id){
                    item.status = 'upcoming';
                    lives.push(item);
                }
            });
            this.live_data = lives;
            this.live_data_loading = false;
      })
  },
  methods: {
    async play(event,item) {
      if (this.orderplaymode) {
        //判断序列播放
        this.orderlist.push(item);
        //window.console.log(this.orderlist);
      }
      var target=event.currentTarget
      let audio = new Audio();
      audio.preload = true;
      audio.src = "voices/" + item.path;
      this.voice = item;
      var node=document.createElement("a");
      node.classList.add("processing");
      audio.load();
      var time;
      audio.oncanplay=()=>{
        time=audio.duration;
        node.style.backgroundColor=this.colors[this.colorC];
        this.colorChange();
        node.style.animation="playing "+time+"s linear forwards";
        target.appendChild(node);
        audio.play();
      }  
      audio.onended =()=>{
        var childs=target.childNodes;
        target.removeChild(childs[1]);//回收
      };
    },
    playOnly(item) {
      var target=event.currentTarget
      let audio = new Audio();
      audio.src = "voices/" + item.path;
      audio.preload = true;
      this.voice = item;
      var node=document.createElement("a");
      node.classList.add("processing");
      audio.load();
      var time;
      audio.oncanplay=()=>{
        time=audio.duration;
        node.style.backgroundColor=this.colors[this.colorC];
        this.colorChange();
        node.style.animation="playing "+time+"s linear forwards";
        target.appendChild(node);
        audio.play();
      }  
    },
    playSpecial() {
      var target=event.currentTarget
      let audio = new Audio();
      audio.src = "voices/私货.mp3";
      audio.preload = true;
      var node=document.createElement("a");
      node.classList.add("processing");
      audio.load();
      var time;
      audio.oncanplay=()=>{
        time=audio.duration;
        node.style.backgroundColor=this.colors[this.colorC];
        this.colorChange();
        node.style.animation="playing "+time+"s linear forwards";
        target.appendChild(node);
        audio.play();
      }  
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
    See(e) {
      window.location.href = e;
    },
    stopplay() {
      audio.pause();
      i = 0;
    },
    colorChange(){
      if(this.colorC<this.colors.length-1){
        this.colorC++;
      }else{
        this.colorC=0;
      }
    },
    easterEgg(){
      this.ec++;
      if(this.ec==5){
        this.easteregg=true;
      }
    },
    playEasteregg(){
      var target=event.currentTarget
      let audio = new Audio();
      audio.src = "voices/easteregg.mp3";
      audio.preload = true;
      var node=document.createElement("a");
      node.classList.add("processing");
      audio.load();
      var time;
      audio.oncanplay=()=>{
        time=audio.duration;
        node.style.backgroundColor=this.colors[this.colorC];
        this.colorChange();
        node.style.animation="playing "+time+"s linear forwards";
        target.appendChild(node);
        audio.play();
      } 
    }
  },
  watch: {
    orderplaymode: function() {
      //window.console.log(this.orderplaymode);
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

<style lang="scss" scope>
$secondary: linear-gradient(83.54deg, #ff9b53 -7.64%, #e6660a 145.94%);
body {
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(200.6deg, #ffffff 19.14%, #e9e9e9 154.68%);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-perspective: 1000;
  -moz-perspective: 1000;
  -ms-perspective: 1000;
  perspective: 1000;
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
  position: absolute;
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
.dark {
  background: linear-gradient(
    157.73deg,
    #262b2f -0.68%,
    #16191d 74.03%
  ) !important;
  box-shadow: -12px -20px 56px rgba(232, 237, 243, 0.05),
    36px 12px 64px rgba(2, 3, 3, 0.7),
    inset -16px -6px 80px rgba(248, 249, 249, 0.03) !important;
}
.card {
  position: relative;
  padding: 20px;
  padding-bottom: 40px;
  margin: 20px;
  overflow: hidden !important;
  break-inside: avoid;
  max-width: 600px;
  background: linear-gradient(200.6deg, #ffffff 19.14%, #e9e9e9 154.68%);
  box-shadow: 6px 4px 24px rgba(136, 165, 191, 0.36),
    -8px -4px 16px rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  transition: 0.5s;
}
.vote {
  margin: 5px;
  position: relative;
  padding: 10px;
  background: linear-gradient(200.6deg, #ffffff 19.14%, #e9e9e9 154.68%);
  box-shadow: 6px 4px 24px rgba(136, 165, 191, 0.36),
    -8px -4px 16px rgba(255, 255, 255, 0.6);
  border-radius: 16px;
}
.cardM {
  max-width: 100% !important;
  overflow: visible !important;
}
.topdiv {
  
  overflow: visible;
  column-gap: 0px;
  column-rule: 10px;
  column-count: 4;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  .card:first-child {
    margin-top: 0;
  }
}
.topdivO {
  column-count: 2;
}
.cardtext {
  overflow: visible;
  font-family: Helvetica;
  font-weight: bold;
  color: #31456a;
  font-size: 24px;
  letter-spacing: 0.02em;
}
.dark_text {
  color: rgb(255, 255, 255) !important;
}
.githubbtn div:after {
  content: "🔨" !important;
}
.title {
  font-family: Helvetica;
  font-weight: bold;
  font-size: 40px;
  line-height: 100%;
  align-items: center;
  letter-spacing: 0.02em;
  color: #31456a;
  text-align: center;
}
.titlediv {
  margin-top: 100px;
}

.infotext {
  margin: 10px;
  font-family: Helvetica;
  font-size: 16px;
  letter-spacing: 0.02em;
}
.dark_infotext {
  color: #e9e9e9;
}
.overflowC {
  overflow: visible;
}
.liveinfo {
  padding: 5px;
}
.subnum {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 900;
  font-size: 50px;
  line-height: 100%;
  /* identical to box height, or 28px */
  text-shadow: 1px 1px 7px rgba(18, 61, 101, 0.26),
    -2px -1px 6px rgba(255, 255, 255, 0.1);
  text-align: center;
  letter-spacing: 0.02em;
}
.livetext {
  font-weight: bolder;
}
.helpdialog {
  padding: 10px;
  overflow:scroll;
  overflow-x: hidden !important;
  position: fixed;
  min-width: 80%;
  max-height:90%;
  z-index: 14;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
.dialog_back {
  position: fixed;
  margin: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 13;
  background-color: rgba(0, 0, 0, 0.42);
  background-blend-mode: normal, luminosity;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  width: 100%;
  height: 100%;
}
.orderdialog {
  
  padding: 10px;
  overflow:scroll;
  overflow-x: hidden !important;
  position: fixed;
  min-width: 80%;
  max-height:90%;
  z-index: 14;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
/* .likebtn{
  border: 0pt;
  outline: none;
  border-radius: 999px;
  display: inline-block;
  background: rgba(255, 255, 255, 0);
}
.dislikebtn{
  position: relative;
  
  left: 200px;
  border: 0pt;
  outline: none;
  border-radius: 999px;
  display: inline-block;
  background: rgba(255, 255, 255, 0);
}*/
.liveimg {
  transform: scale3d(2, 2, 1) translate3d(-30px, 0, 0);
}
:root {
  --button-width: 55px;
  --button-height: 32px;
  --toggle-diameter: 28px;
  --button-toggle-offset: calc(
    (var(--button-height) - var(--toggle-diameter)) / 2
  );
  --toggle-shadow-offset: 10px;
  --toggle-wider: 35px;
  --color-grey: #e9e9e9;
  --color-dark-grey: #39393d;
  --color-green: #ff9b53;
}

span {
  display: inline-block;
  width: var(--button-width);
  height: var(--button-height);
  background-color: var(--color-grey);
  border-radius: calc(var(--button-height) / 2);
  position: relative;
  transition: 0.3s all ease-in-out;
}

span::after {
  content: "";
  display: inline-block;
  width: var(--toggle-diameter);
  height: var(--toggle-diameter);
  background-color: #fff;
  border-radius: calc(var(--toggle-diameter) / 2);
  position: absolute;
  top: var(--button-toggle-offset);
  transform: translateX(var(--button-toggle-offset));
  box-shadow: var(--toggle-shadow-offset) 0
    calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
  transition: 0.3s all ease-in-out;
}
input[type="checkbox"]:checked + span {
  background-color: var(--color-green);
}

input[type="checkbox"]:checked + span::after {
  transform: translateX(
    calc(
      var(--button-width) - var(--toggle-diameter) - var(--button-toggle-offset)
    )
  );
  box-shadow: calc(var(--toggle-shadow-offset) * -1) 0
    calc(var(--toggle-shadow-offset) * 4) rgba(0, 0, 0, 0.1);
}

input[type="checkbox"] {
  display: none;
}

input[type="checkbox"]:active + span::after {
  width: var(--toggle-wider);
}
label {
  margin-left: 45%;
  margin-right: 20px;
}
input[type="checkbox"]:checked:active + span::after {
  transform: translateX(
    calc(
      var(--button-width) - var(--toggle-wider) - var(--button-toggle-offset)
    )
  );
}

.goto {
  padding: 10px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 999px;
  display: inline-block;
  border: 0pt;
  outline: none;
  background: linear-gradient(200.6deg, #244dff8a 19.14%, #0e9dfc6c 154.68%);
  background-blend-mode: normal, luminosity;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 3px 6px 20px rgba(104, 102, 255, 0.44);
  z-index: 1;
}
.deletebtn{
  
  border: 0pt;
  outline: none;
  border-radius: 999px;

  background: rgba(255, 0, 0, 0);
  transform: translate3d(-80%,-20%,0);

}
.closebtn{
  position: absolute;
  top: 10px;
  right: 10px;
  border: 0pt;
  outline: none;
  border-radius: 999px;
  background: rgba(255, 0, 0, 0);
}
@media (min-width: 1300px) {
  .card:hover {
    box-shadow: 18px 12px 80px rgba(136, 165, 191, 0.36),
      -18px -12px 40px rgba(255, 255, 255, 0.6);
    transform: translate3d(-3px, -3px, 3px);
  }
  .topdiv {
    padding: 50px;
  }
  .topdivO {
    column-count: 2 !important;
  }
}
@media (min-width: 992px) and (max-width: 1300px) {
  .topdiv {
    column-count: 3;
    padding: 50px;
  }
  .card:hover {
    box-shadow: 18px 12px 80px rgba(136, 165, 191, 0.36),
      -18px -12px 40px rgba(255, 255, 255, 0.6);
    transform: translate3d(-3px, -3px, 0px);
  }
  .topdivO {
    column-count: 1 !important;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .topdiv {
    column-count: 2;
  }
  .topdivO {
    column-count: 1 !important;
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
  .topdivO {
    column-count: 1 !important;
  }
  .liveimg {
  }
}
.dialog-scale-enter-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.dialog-scale-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.dialog-scale-enter,
.dialog-scale-leave-to {
  transform: scale3d(0,0,0);;
}
.processing{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(233, 85, 0, 0.555);
  animation: playing 3s linear;
}
@keyframes playing{
  from {width: 0%;}
  to {width: 100%;background-color: rgba(0, 0, 0, 0);}
}
@-webkit-keyframes playing{
  from {width: 0%;}
  to {width: 100%;background-color: rgba(0, 0, 0, 0);}
}

</style>