import axios from './axios';

/*
*博客首页-列表
*@query page-页码
*/
export function fetchContentArticle(query){
	return axios.post('/main/queryList',{
			params: query
	})
}

/**
*博客首页-列表
*@id id-博客id
**/
export function fetchArticle(query){
	return axios.post('/main/listDetail',{
			params: query
	})
}
