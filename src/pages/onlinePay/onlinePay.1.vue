<template>
  <div>
    <p>{{minute}}:{{second}}</p>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
    data () {
      return {
        minutes: 15,
        seconds: 0
      }
    },
    mounted () {
    //   this.add()
    },
    methods: {
      num: function (n) {
        return n < 10 ? '0' + n : '' + n
      },
      add: function () {
        var _this = this
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59
            _this.minutes -= 1
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0
            window.clearInterval(time)
          } else {
            _this.seconds -= 1
          }
        }, 1000)
      }
    },
    watch: {
      second: {
        handler (newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler (newVal) {
          this.num(newVal)
        }
      }
    },
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    }
}
</script>

<style></style>