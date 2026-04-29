import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Collections from './sections/Collections'
import Philosophy from './sections/Philosophy'
import Contact from './sections/Contact'

function App() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navigation />
      <Hero />
      <About />
      <Collections />
      <Philosophy />
      <Contact />
    </div>
  )
}

export default App
