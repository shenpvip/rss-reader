import request from '../utils/request';

export const getList = params => request('getList', {
	...params,
	method: 'GET'
});

export const getDetail = params => request('getDetail', {
	...params,
	method: 'GET'
});


export const addRss = params => request('add', {
	...params,
	method: 'GET'
});

export const delRss = params => request('del', {
	...params,
	method: 'GET'
});

export const editRss = params => request('edit', {
	...params,
	method: 'GET'
});
