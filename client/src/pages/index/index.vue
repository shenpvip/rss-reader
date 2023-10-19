<template>
  <scroll-view scroll-y="true" class="home_wrap">
    <view class="flex_left mb-30">
      <input
        class="input"
        placeholder="请输入源地址"
        v-model="rssUrl"
        type="text"
      />
      <button type="primary" class="add" @click="onAdd">订阅</button>
    </view>
    <div class="rss_list" v-if="rsslist.length > 0">
      <uni-swipe-action>
        <uni-swipe-action-item
          class="mb-20 ds-b"
          v-for="(item, index) in rsslist"
          :key="item._id"
          :right-options="options"
          @click="bindClick"
          @change="swipeChange($event, index)"
        >
          <navigator
            class="list_item flex_sb"
            :url="`/pages/list/list?url=${item.rssUrl}`"
          >
            <view class="flex_left">
              <image
                mode="aspectFit"
                class="favicon"
                :src="item.favicon"
                v-on:error="onImgError(item.link, index)"
              ></image>
              <text class="title">{{ item.title }}</text>
            </view>
            <view class="flex_left">
              <!-- <view class="update_count">5</view> -->
              <text class="iconfont icon-jiantou fs-38"></text>
            </view>
          </navigator>
        </uni-swipe-action-item>
      </uni-swipe-action>
    </div>
    <uni-popup ref="inputDialog" type="dialog">
      <uni-popup-dialog
        ref="inputClose"
        mode="input"
        title="请输入订阅地址"
        :value="newUrl"
        placeholder="请输入内容"
        @confirm="dialogInputConfirm"
      ></uni-popup-dialog>
    </uni-popup>
  </scroll-view>
</template>

<script>
import { getFavicon } from "@/utils/tool.js"
import { getList, addRss, delRss, editRss } from "@/api/api.js"

export default {
  data() {
    return {
      rsslist: [],
      rssUrl: "",
      options: [
        {
          text: "编辑",
          style: {
            backgroundColor: "#007aff",
          },
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],
      changeIndex: 0,
      newUrl: "",
    }
  },
  onLoad() {
    this.getData()
  },
  methods: {
    async getData() {
      uni.showLoading({
        title: "加载中",
      })
      const res = await getList()
      if (res.result) {
        uni.hideLoading()
        this.rsslist = res.result.list
        return
      }
      uni.showToast({
        icon: "none",
        title: "网络错误",
      })
    },
    async onAdd() {
      if (!this.rssUrl.trim()) {
        uni.showToast({
          icon: "none",
          title: "请输入订阅地址",
        })
        return
      }
      uni.showLoading({
        title: "加载中",
      })
      const res = await addRss({
        data: {
          url: this.rssUrl.trim(),
        },
      })
      if (res.result) {
        uni.showToast({
          icon: "none",
          title: "添加成功",
        })
        this.rsslist = res.result
        this.rssUrl = ""
        return
      }
      uni.showToast({
        icon: "none",
        title: "网络错误",
      })
    },
    onImgError(link, i) {
      // const list = this.rsslist.concat([])
      // list[i].favicon = getFavicon(link)
      // this.rsslist = list
    },
    swipeChange(e, index) {
      if (e === "right") {
        this.changeIndex = index
      }
    },
    bindClick(e) {
      const url = this.rsslist[this.changeIndex].rssUrl
      if (e.content.text === "编辑") {
        this.newUrl = url
        this.$refs.inputDialog.open()
      } else {
        uni.showModal({
          title: "提示",
          content: "是否删除该订阅",
          success: (res) => {
            if (res.confirm) {
              this.delItem()
            }
          },
        })
      }
    },
    async editItem() {
      const url = this.rsslist[this.changeIndex].rssUrl
      const res = await editRss({
        data: {
          url,
          newUrl: this.newUrl,
        },
      })
      if (res.result) {
        this.rsslist = res.result
        uni.showToast({
          icon: "none",
          title: "修改成功",
        })
        return
      }
      uni.showToast({
        icon: "none",
        title: "网络错误",
      })
    },
    async delItem() {
      const url = this.rsslist[this.changeIndex].rssUrl
      const res = await delRss({
        data: {
          url,
        },
      })
      if (res.result) {
        this.rsslist = res.result
        uni.showToast({
          icon: "none",
          title: "删除成功",
        })
        return
      }
      uni.showToast({
        icon: "none",
        title: "网络错误",
      })
    },
    dialogInputConfirm(val) {
      this.newUrl = val
      this.editItem()
    },
  },
}
</script>

<style lang="scss">
.home_wrap {
  padding: 20rpx;

  .list_item {
    background-color: #fff;
    border-left: 10rpx solid #abcfcd;
    padding: 30rpx 20rpx;
  }

  .favicon {
    width: 50rpx;
    height: 50rpx;
    border-radius: 25rpx;
  }

  .title {
    font-size: 32rpx;
    margin-left: 12rpx;
    color: #333;
  }

  .update_count {
    padding: 0 10rpx;
    background-color: #f4f4f5;
    border-radius: 50rpx;
    line-height: 36rpx;
    color: #888783;
    border: 1px solid #888783;
    font-size: 26rpx;
  }

  .icon-jiantou {
    color: #888783;
    margin-left: 8rpx;
  }

  .arrow {
    width: 28rpx;
    height: 32rpx;
    margin-left: 6rpx;
  }

  .input {
    background-color: #fff;
    flex: 1;
    height: 80rpx;
    padding: 0 24rpx;
    border-radius: 40rpx;
    font-size: 30rpx;
  }

  .add {
    width: 120rpx;
    height: 60rpx;
    border-radius: 30rpx;
    background-color: #888783;
    padding: 0;
    font-size: 26rpx;
    line-height: 60rpx;
    margin-left: 20rpx;
  }
}
</style>
