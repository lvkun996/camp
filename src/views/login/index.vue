<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="attr_img">
                <img src="../../assets/login/logo.png" alt="">
            </div>
            <!-- /头像区域 -->
            <!-- 表单区域 -->
            <el-form class="myForm" :model="user" ref="myForm" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="user.username" prefix-icon="el-icon-user-solid">11</el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="user.password" show-password prefix-icon="el-icon-lock">11</el-input>
                </el-form-item>
                <!-- 登录区域 -->
                <el-form-item style="display:flex;justify-content:flex-end">
                    <el-button type="primary" @click="userRegister">登录</el-button>
                    <el-button type="info" @click="resetForm">重置</el-button>
                </el-form-item>
                <!-- /登录区域 -->
            </el-form>
            <!-- 表单区域 -->

        </div>
    </div>
</template>

<script>

// import { getUserInfo } from '@/API/login'

// import { setItem } from '@/utils/storeage.js'

export default {
  name: 'loginPage',
  data () {
    return {
      user: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {

    async userRegister () {
      this.$router.push({ path: '/home' })
    }

    // async userRegister () {
    //   const loginMessage = await this.$refs.myForm.validate()
    //   if (loginMessage) {
    //     try {
    //       const { data } = await getUserInfo(this.user)
    //       console.log(data)
    //       if (data.meta.status === 400) {
    //         this.$message.error(`${data.meta.msg}`)
    //         return
    //       }
    //       this.$message.success('登录成功')
    //       console.log(data.data.token)

    //       setItem('token', data.data.token)
    //       console.log(1)

    //       this.$router.push('/home')
    //     } catch (error) {
    //       this.$message.error('操作失败')
    //     }
    //   }
    // },
    // // 重置表单
    // resetForm () {
    //   this.$refs.myForm.resetFields()
    // }
  }
}
</script>

<style lang="less" scoped>
.login_container{
    width: 100%;
    height: 100vh;
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #ccc;
    .login_box{
        width: 450px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .attr_img{
            width: 130px;
            height: 130px;
            border:3px solid #eee;
            border-radius: 50%;
            padding: 10px;
            box-shadow: 0 0 10px #ddd;
            position: absolute;
            left: 50%;
            transform: translate(-50%,-50%);
            background-color: #fff;
            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #eee;
            }
        }
    }
    .myForm{
        margin-top:100px;
        padding: 0 20px;
    }
}
</style>
