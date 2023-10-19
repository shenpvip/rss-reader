<template>
	<view class="article_list" v-if="articleList.length > 0">
		<view class="list_item flex_sb" v-for="item in articleList" :key="item.id" v-on:click="toDetail(item)">
			<image v-if="item.img" :src="item.img" mode="aspectFill"></image>
			<view class="flex_1">
				<view class="article_title wes_2">{{item.title}}</view>
				<view class="flex_left info">
					<text>{{item.author}}</text>&nbsp;|&nbsp;
					<text>{{item.pubDate}}</text>
				</view>
				<view class="des wes_2">{{item.summary}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from '@/utils/tool'
	import {
		getDetail
	} from '@/api/api'

	export default {
		data() {
			return {
				articleList: []
			};
		},
		onLoad(options) {
			if (options.url) {
				this.getData(options.url)
			}
		},
		methods: {
			async getData(url) {
				uni.showLoading({
					title: "加载中"
				})
				const res = await getDetail({
					data: {
						url
					}
				})
				if (res.code === '1') {
					uni.setNavigationBarTitle({
						title: res.result.title
					})
					res.result.items.forEach(val => {
						val.author = val.author || val.creator || res.result.title
						val.pubDate = formatDate(val.pubDate)
						val.summary = val.summary || val.contentSnippet
					})
					this.articleList = res.result.items
					uni.hideLoading()
					return
				}
				uni.showToast({
					icon: 'none',
					title: '网络错误'
				})
			},
			toDetail(content) {
				wx.setStorageSync('content', JSON.stringify(content))
				uni.navigateTo({
					url: '/pages/detail/detail'
				})
			}
		},

	}
</script>

<style lang="scss">
	.article_list {
		padding: 0 20rpx;

		.list_item {
			background-color: #fff;
			border-radius: 16rpx;
			padding: 20rpx 24rpx;
			margin-bottom: 20rpx;
		}

		.article_title {
			font-size: 32rpx;
			color: #333;
			font-weight: bold;
		}

		.info {
			color: #7f7f7f;
			font-size: 26rpx;
			margin-top: 12rpx;
		}

		.des {
			color: #7f7f7f;
			font-size: 28rpx;
			margin-top: 14rpx;
		}
	}
</style>
