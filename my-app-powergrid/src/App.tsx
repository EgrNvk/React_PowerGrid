import GridWorkspace from './components/GridWorkspace'
import ObjectLibrary from './components/ObjectLibrary'
import './App.css'

function App() {
  return (
    <div className="app">
      <ObjectLibrary />
      <main className="app-map">
        <GridWorkspace />
      </main>
    </div>
  )
}

export default App