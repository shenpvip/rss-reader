<script>
export default {
  onLaunch: function () {},
  onShow: function () {
    console.log("App Show")
  },
  onHide: function () {
    console.log("App Hide")
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
@import "@/static/iconfont/iconfont.css";
@import "@/style/mixins/interval.scss";
@import "@/style/mixins/fontSize.scss";

view,
text,
scroll-view,
button {
  box-sizing: border-box;
}

page {
  background-color: #f8f8f8;
}

.flex_left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.flex_c {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex_sb {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex_1 {
  flex: 1;
}

.wes_1 {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  align-content: center;
  white-space: normal;
  word-break: break-all;
}

.wes_2 {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  align-content: center;
  white-space: normal;
  word-break: break-all;
}

.ds-b {
  display: block;
}
</style>
