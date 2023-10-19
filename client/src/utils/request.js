import config from './config';
import {
	getAuthorized
} from './tool';

const urlServer = {
	ApiHost: `${process.env.NODE_ENV === 'production' ? config.prodHost : config.testHost}`
}; // 全局处理wx.request请求方法

const checkResponse = (response) => {
	const {
		code,
		msg
	} = response;
	if (code === '4004') {
		getAuthorized();
		return Promise.reject();
	}
	if (
		code !== '1'
	) {
		uni.showToast({
			title: msg || '网络异常',
			icon: 'none'
		});
		return Promise.reject({
			code,
			msg
		});
	}
	return Promise.resolve(response);
}
const httpService = (url, params, isFile) => {
	if (isFile) {
		return uni.uploadFile({
			url: urlServer.ApiHost + url,
			method: "POST",
			header: {
				'User_Token': getApp().globalData.token || '',
				...params.header
			},
			...params
		}).then(async data => {
			const [err, res] = data
			if (err) {
				uni.showToast({
					title: err.errMsg,
					icon: 'none'
				});
				return Promise.reject(err);
			}
			return await checkResponse(JSON.parse(res.data));
		}).catch(error => {
			const errMsg = error.retmsg || error.errMsg || '异常';
			uni.showToast({
				title: errMsg,
				icon: 'none'
			});
			return Promise.reject(error);
		})
	} else {
		return uni.request({
			url: urlServer.ApiHost + url,
			method: params.method || 'POST',
			data: params.data,
			timeout: 120000,
			header: {
				'User_Token': getApp().globalData.token || '',
				// 'Content-Type': 'application/x-www-form-urlencoded',
				...params.header
			}
		}).then(async res => {
			return await checkResponse(res.data);
		}).catch(error => {
			if (error) {
				const errMsg = error.retmsg || error.errMsg || '网络异常';
				uni.showToast({
					title: errMsg,
					icon: 'none'
				});
				return Promise.reject(error);
			}
			return Promise.reject('网络异常');
		})
	}
};

export default httpService;
