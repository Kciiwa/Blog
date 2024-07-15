import { Route, Routes } from 'react-router-dom'

// import ArticleListPage from './pages/articleListPage'
import ArticleListPage from './pages/articleListPage'
import { Layout } from './components/layout'
import FullArticlePage from './pages/fullArticlePage'
import SignUpPage from './pages/sign-up'
import SignInPage from './pages/sign-in'
import Profile from './pages/profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleListPage />} />
        <Route path="/fullArticlePage/:slug" element={<FullArticlePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
