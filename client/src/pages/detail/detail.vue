<template>
  <view class="article_container">
    <view class="title">{{ title }}</view>
    <view class="info">{{ author }}&nbsp;|&nbsp;{{ publicDate }}</view>
    <mp-html :content="content" class="rich_text" />
    <!-- <rich-text class="rich_text" :nodes="content"></rich-text> -->
  </view>
</template>

<script>
import mpHtml from "mp-html/dist/uni-app/components/mp-html/mp-html"
export default {
  components: {
    mpHtml,
  },
  data() {
    return {
      title: "",
      author: "",
      publicDate: "",
      content: "",
    }
  },
  onLoad() {
    if (uni.getStorageSync("content")) {
      const con = JSON.parse(uni.getStorageSync("content"))
      console.log(con)
      this.title = con.title
      this.author = con.author
      this.publicDate = con.pubDate
      this.content = con.content
      this.content = this.content.replace(
        /\<img/gi,
        '<img class="article_image"'
      )
      this.content = this.content.replace(/\<h2/gi, '<h2 class="h2_title"')
      this.content = this.content.replace(/\<p/gi, '<p class="section"')
      this.content = this.content.replace(/\<a/gi, '<a class="link"')
      this.content = this.content.replace(/\<ul/gi, '<ul class="list"')
      this.content = this.content.replace(/\<li/gi, '<li class="list_item"')
    }
  },
}
</script>

<style lang="scss">
page {
  background-color: #fff;
}

.article_container {
  padding: 30rpx 24rpx;

  .title {
    font-size: 42rpx;
    color: #333;
  }

  .info {
    color: #7f7f7f;
    font-size: 28rpx;
    margin-top: 32rpx;
    margin-bottom: 60rpx;
  }

  .rich_text {
    line-height: 60rpx;
    box-sizing: border-box;
    color: #575757;

    .section {
      font-size: 32rpx;
    }

    .article_image {
      max-width: 100%;
      margin: 20rpx 0;
    }

    .h2_title {
      margin: 30rpx 0 20rpx;
    }

    .link {
      color: #223472;
    }

    .list {
      background-color: #f6f6f6;
      margin: 20rpx 0;
      padding: 20rpx 0;
      border-radius: 16rpx;
      color: #575757;
    }

    .list_item {
      list-style-type: square;
      margin-left: 80rpx;
    }
  }
}
</style>
