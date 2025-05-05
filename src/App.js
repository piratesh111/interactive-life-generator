import AlternativeVersionGenerator from "./components/AlternativeVersionGenerator"


function App() {
  return (
    <main className="app-container">
      <div className="container">
        <header className="header">
          <h1 className="title">Wersja Alternatywna</h1>
          <p className="subtitle">Odkryj swoją alternatywną wersję w równoległym świecie</p>
        </header>

        <AlternativeVersionGenerator />
      </div>
    </main>
  )
}

export default App
