<template>
        <div>
            <m-header title="demo" fixed>
                <a href="javascript:;" slot="left" @click="fun">返回</a>
                <a href="javascript:;" slot="right"><img class="m-icon-img" src="../../assets/images/ic_chat_green.png"/></a>
            </m-header>
        </div>
      </template>
      
      <script>
        import mHeader from '../../components/header'
        
        export default {
          name: 'group',
          components: {
            mHeader
          },
          methods : {
            fun(){
                this.$router.go(-1);
            }
          }
        }

      </script>
      
      
      <style lang="less">
      
      </style>