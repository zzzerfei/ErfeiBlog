<!--  -->
<template>
  <div class="regandlog">
    <!-- <el-button type="text" @click="state.dialogVisible = true">登录</el-button> -->
    <!-- <el-button type="text" @click="state.dialogVisible = true">注册</el-button> -->

    <el-dialog title="登录" v-model="state.dialogVisible" width="30%" :before-close="handleClose">
      <el-form>
        <el-formItem label="邮箱">
          <el-input v-model="state.params.email" placeholder="邮箱" autocomplete="off"> </el-input>
        </el-formItem>
        <el-formItem label="密码">
          <el-input
            type="password"
            v-model="state.params.password"
            placeholder="密码"
            autocomplete="off"
          >
          </el-input>
        </el-formItem>
        <!-- 注册需要的信息 -->
        <el-formItem label="昵称" v-if="handleFlag === 'register'">
          <el-input v-model="state.params.name" placeholder="用户名或昵称" autocomplete="off">
          </el-input>
        </el-formItem>
        <el-formItem label="手机" v-if="handleFlag === 'register'">
          <el-input v-model="state.params.phone" placeholder="手机号码" autocomplete="off">
          </el-input>
        </el-formItem>
        <el-formItem label="简介" v-if="handleFlag === 'register'">
          <el-input v-model="state.params.desc" placeholder="个人简介" autocomplete="off">
          </el-input>
        </el-formItem>
      </el-form>

      <!-- 注册或登录按钮 -->
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="success" @click="handleOAuth">github 授权登录</el-button> -->
        <el-button
          v-if="handleFlag === 'login'"
          :loading="state.btnLoading"
          type="primary"
          @click="handleOk"
          >登 录</el-button
        >
        <el-button
          v-if="handleFlag === 'register'"
          :loading="state.btnLoading"
          type="primary"
          @click="handleOk"
          >注 册</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, watch } from 'vue'
import { useStore } from "vuex";
import { key } from '../../store'
import { ElMessageBox, ElMessage } from 'element-plus'
import { RegAndLogParams, UserInfo } from '../../types/index'
import service from '../../network/http'
import url from '../../network/url'

export default {
  name: 'RegisterAndLogin',
  props: {
    // 是否弹出dialog
    visible: {
      type: Boolean,
      default: false
    },
    // 判断是登录还是注册
    handleFlag: {
      type: String,
      default: false
    }
  },
  emits: ['ok', 'cancel'],
  setup(props, context) {
    const store = useStore(key);
    console.log('props', props)
    const state = reactive({
      dialogVisible: props.visible,
      params: {
        email: '',
        name: '',
        password: '',
        phone: '',
        desc: ''
      } as RegAndLogParams
    })

    // const handleClose = (done) => {
    //   ElMessageBox.confirm('确认关闭？')
    //     .then((_) => {
    //       done()
    //     })
    //     .catch((_) => {
    //       // catch
    //     })
    // }

    const handleOk = (): void => {
      const reg = new RegExp(
        '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
      ) //正则表达式
      if (!state.params.email) {
        ElMessage({
          message: '邮箱不能为空！',
          type: 'warning'
        })
        return
      } else if (!reg.test(state.params.email)) {
        ElMessage({
          message: '请输入格式正确的邮箱！',
          type: 'warning'
        })
        return
      }
      if (props.handleFlag === 'register') {
        if (!state.params.password) {
          ElMessage({
            message: '密码不能为空！',
            type: 'warning'
          })
          return
        } else if (!state.params.name) {
          ElMessage({
            message: '用户名不能为空！',
            type: 'warning'
          })
          return
        }
        const re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/
        if (state.params.phone && !re.test(state.params.phone)) {
          ElMessage({
            message: '请输入正确的手机号!',
            type: 'warning'
          })
          return
        }
      }
      submit();
    }

    // 提交注册或者登录信息
    const submit = async (): Promise<void> => {
      let data: any = ""
      if(props.handleFlag === "register") {
        data = await service.post(url.register, state.params)
      } else {
        data = await service.post(url.login, state.params)
      }
      // 注册登录功能实现
      console.log(data)

      const userInfo: UserInfo = {
        _id: data._id,
        name: data.name,
        avatar: data.avatar
      }
      // 
      store.commit("SAVE_USER", {
        userInfo
      })
      // 
      window.sessionStorage.userInfo = JSON.stringify(userInfo)
      context.emit('ok', false)
      ElMessage({
        message: "操作成功",
        type: "success"
      })
    }

    // 监听xxxx实现弹出框
    watch(props, (val, oldVal) => {
      state.dialogVisible = val.visible
    })

    return {
      state,
      // handleClose,
      handleOk,
      submit
    }
  }
}
</script>

<style  scoped>
</style>
