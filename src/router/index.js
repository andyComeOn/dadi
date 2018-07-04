import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index/Index'
import HotelDetail from '../pages/HotelDetail/HotelDetail'
import Nearby from '../pages/Nearby/Nearby'
import SearchResult from '../pages/SearchResult/SearchResult'
import Group from '../pages/Group/Group'
import Mine from '../pages/Mine/Mine'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/searchResult',
			name: 'SearchResult',
			component: SearchResult
		},
		
		
		{
			path: '/hotelDetail',
			name: 'HotelDetail',
			component: HotelDetail
		},
		{
			path: '/nearby',
			name: 'Nearby',
			component: Nearby
		},
		{
			path: '/group',
			name: 'Group',
			component: Group
		},
		{
			path: '/mine',
			name: 'Mine',
			component: Mine
		},
		{
			path: '/Index',
			redirect: '/'
		},
		{
			path: '*',
			redirect: '/'
		},
	]
})
