import React from 'react'
import { Redirect } from 'react-router-dom'


const JM404 = React.lazy(() => import('../pages/404'))
const DisCover = React.lazy(() => import('../pages/discover'))
const Recommend = React.lazy(() => import('../pages/discover/recommend'))
const Songs = React.lazy(() => import('../pages/discover/songs'))
const Album = React.lazy(() => import('../pages/discover/album'))
const TopList = React.lazy(() => import('../pages/discover/toplist'))
const Mine = React.lazy(() => import('../pages/mine'))
const Friend = React.lazy(() => import('../pages/friend'))
const Search = React.lazy(() => import('../pages/search'))
const SearchSingle = React.lazy(() => import('../pages/search/pages/single'))
const SearchSinger = React.lazy(() => import('../pages/search/pages/singer'))
const User = React.lazy(() => import('../pages/user'))
const SongList = React.lazy(() => import('../pages/songlist'))
const SongDetail = React.lazy(() => import('../pages/player'))


const routes = [
  { path: '/', exact: true, render: () => <Redirect to="/discover" /> },
  {
    path: '/discover',
    component: DisCover,
    routes: [
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to="/discover/recommend" />
      },
      { path: '/discover/recommend', component: Recommend },
      { path: '/discover/songs', component: Songs },
      { path: '/discover/album', component: Album },
      { path: '/discover/ranking', component: TopList },
      { path: '/discover/song', component: SongDetail }
    ]
  },
  {
    path: '/mine',
    component: Mine
  },
  {
    path: '/friend',
    component: Friend
  },
  {
    path: '/search',
    component: Search,
    routes: [
      {
        path: '/search',
        exact: true,
        render: () => <Redirect to="/search/single?song=&type=1" />
      },
      { path: '/search/single', component: SearchSingle },
      { path: '/search/singer', component: SearchSinger }
    ]
  },
  {
    path: '/user',
    exact: true,
    component: User
  },
  {
    path: '/songlist',
    exact: true,
    component: SongList

  },
  {
    component: JM404,
  },
]

export default routes
