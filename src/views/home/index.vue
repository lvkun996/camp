<template>
    <div class="home_containe1">
            <el-container class="home_containe">
              <el-header>
                <img src="../../assets/login/logo.png" alt="">
                <i class="el-icon-caret-bottom"></i>
              </el-header>
              <!-- 主体区 -->
              <el-container>
                <!-- 左侧侧边栏 -->
                <el-aside :width="collapse?'64px':'200px'" >
                     <div class="left-box">
                         <div class="title" :style ="{'fontSize':collapse?'12px':'20px'}">
                           {{!collapse?'中德智慧网校':'中德'}}
                         </div>
                     </div>
                    <div class="flex_box" @click="collapse = !collapse">
                      <i class="el-icon-s-unfold" v-if="collapse"></i>
                      <i class="el-icon-s-fold" v-else></i>
                    </div>
                       <el-menu
                          class="el-menu-vertical-demo"
                          background-color="#333744"
                          text-color="#fff"
                          active-text-color="rgb(64, 158, 255)"
                          :default-active="indexStatus"
                          :collapse="collapse"
                          :collapse-transition='false'
                          router
                          >
                             <el-submenu index="1">
                              <template slot="title">
                                <i class="el-icon-folder"></i>
                                <span>资源管理</span>
                              </template>
                              <el-menu-item-group>
                                <el-menu-item index="1-1">
                                  <template slot="title">
                                      <i class="el-icon-video-camera"></i>
                                      <span>视频管理</span>
                                  </template>
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                    <template slot="title">
                                        <i class="el-icon-refresh-left"></i>
                                        <span>情景流程</span>
                                  </template>
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                   <template slot="title">
                                      <i class="el-icon-coordinate"></i>
                                      <span>打卡管理</span>
                                  </template>
                                </el-menu-item>
                              </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                              <template slot="title">
                                <i class="el-icon-date"></i>
                                <span>课程管理</span>
                              </template>
                              <el-menu-item-group>
                                <el-menu-item index="2-1">
                                  <template slot="title">
                                    <i class="el-icon-s-home"></i>
                                    <span>课程管理</span>
                                  </template>
                                </el-menu-item>
                              </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                </el-aside>
                 <!-- 左侧侧边栏 -->
                 <!-- 右侧主题区 -->
                <el-main>
                  <router-view></router-view>
                </el-main>
                <!-- 右侧主题区 -->
              </el-container>
              <!-- 主体区 -->
            </el-container>
    </div>

</template>

<script>

export default {

  name: 'homePage',
  data () {
    return {
      collapse: false
    }
  }
}
</script>

<style lang='less' scoped>
  .home_containe{
     height: 100vh;

      .left-box{
        display: flex;
        align-items: center;
        img{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          padding: 5px;
          background-color: #fff;
          box-sizing: border-box;
          box-shadow: 0 0 5px 0;
        }
        .title{
          font-size: 20px;
          color: #fff;
          width: 100%;
          height: 60px;line-height: 60px;
          text-align: center;

        }
      }
      .right-box{
        height: 40px;
        display: flex;
        flex: 1;
        padding-right: 50px;
        justify-content: flex-end;

      }
    .el-aside{
      margin-top: -60px;
      background-color: #333744;
    }
    .el-main{
      background-color: #eaedf1;
    }
    .el-header{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      img{
         width: 50px;
          height: 50px;
          border-radius: 50%;
          padding: 5px;
          background-color: #fff;
          box-sizing: border-box;
          box-shadow: 0 0 5px 0;
          float: right;
      }
    }
  }
  .el-menu-item-group__title{
  padding: 0;
}
.flex_box{
  height: 30px;
  text-align: center;
  background-color: #4a5064;
  color: #fff;
  line-height: 30px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.el-menu{
  border: 0;
}
 /deep/ .el-menu-item-group__title{
  padding: 0;
}
</style>
