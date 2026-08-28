import { SiteHeader } from "./components/global/SiteHeader"
import { MultiStepForm } from "./components/registration/MultiStepForm"

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <SiteHeader />
      <MultiStepForm />
    </main>
  )
}

export default App
