import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HomePage } from './components/Home.page'
import { SuperHeroesPage } from './components/SuperHeroes.page'
import { RQSuperHeroesPage } from './components/RQSuperHeroes.page'
import { RQSuperHeroPage } from './components/RQSuperHero.page'
import { ParallelQueriesPage } from './components/ParallelQueries.page'
import { DynamicParallelPage } from './components/DynamicParallel.page'
import { DependentQueriesPage } from './components/DependentQueries.page'
import { PaginatedQueriesPage } from './components/PaginatedQueries.page'
import { InfiniteQueriesPage } from './components/InfiniteQueries.page'

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/super-heroes'>Traditional Super Heroes</Link>
              </li>
              <li>
                <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/rq-paginated' element={<PaginatedQueriesPage />} />
            <Route path='/rq-parallel' element={<ParallelQueriesPage />} />
            <Route path='/rq-infinite' element={<InfiniteQueriesPage />} />
            <Route path='/rq-dependent' element={<DependentQueriesPage email='vishwas@example.com' />} />
            <Route path='/rq-dynamic-parallel' element={<DynamicParallelPage heroIds={[1,3]} />} />
            <Route path='/super-heroes' element={<SuperHeroesPage />} />
            <Route path='/rq-super-heroes/:id' element={<RQSuperHeroPage />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroesPage />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}

export default App

/* Video 13 Homework - ADD

import { RQSuperHeroesButtonPage } from './components/RQSuperHeroesButton.page'

<li>
  <Link to='/rq-super-heroes-button'>RQ Super Heroes Button</Link>
</li>

<Route path='/rq-super-heroes-button' element={<RQSuperHeroesButtonPage />}/>

*/