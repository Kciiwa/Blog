import { Route, Routes } from 'react-router-dom'

// import ArticleListPage from './pages/articleListPage'
import ArticleListPage from './pages/articleListPage'
import { Layout } from './components/layout'
import FullArticlePage from './pages/fullArticlePage'
import SignUpPage from './pages/signUpPage'
import SignInPage from './pages/signInPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticleListPage />} />
        <Route path="/fullArticlePage/:slug" element={<FullArticlePage />} />
        <Route path="/signUpPage" element={<SignUpPage />} />
        <Route path="/signInPage" element={<SignInPage />} />
      </Route>
    </Routes>
  )
}

export default App
