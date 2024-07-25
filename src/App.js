import { Route, Routes } from 'react-router-dom'

import ArticleListPage from './pages/articleListPage'
import { Layout } from './components/layout'
import FullArticlePage from './pages/fullArticlePage'
import SignUpPage from './pages/sign-up'
import SignInPage from './pages/sign-in'
import Profile from './pages/profile'
import NewArticlePage from './pages/new-article'
import EditArticlePage from './pages/editArticlePage'
import PrivateRoute from './router/privateRoute'
import AuthorRoute from './router/authorRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleListPage />} />
        <Route path="/fullArticlePage/:slug" element={<FullArticlePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/new-article" element={<NewArticlePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<AuthorRoute />}>
            <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
