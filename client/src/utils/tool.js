import dayjs from 'dayjs';

export function formatDate(val) {
	if (!val) return '-'
	if (dayjs().isSame(dayjs(val).format('YYYY-MM-DD'), 'day')) {
		return dayjs(val).format('HH:mm')
	}
	return dayjs(val).format('YYYY-MM-DD HH:mm')
}

export function getFavicon(val) {
	if (!val) return
	const url = val.replace(/^https?\:\/\//i, '')
	return `https://statics.dnspod.cn/proxy_favicon/_/favicon?domain=${url}`
}


/**
 * 登录
 */
let isShowAuthorized;
export function getAuthorized() {
	if (isShowAuthorized) return;
	uni.hideLoading();
	isShowAuthorized = true;
	uni.showModal({
		title: '请登录!',
		content: '您需要登录才可以使用该功能!',
		success: res => {
			isShowAuthorized = false;
			if (res.confirm) {
				// uni.navigateTo({
				// 	url: '/pages/login/login'
				// });
			}
		}
	});
}