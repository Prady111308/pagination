import Products from './component/Products'
import './App.css'
import Products1 from './component/Products1'
import Products2 from './component/Products2'

function App() {

  return (
    <>
     {/* <Products/> */} {/* pagination with client side driven */}
     {/* <Products1/>  */} {/* pagination with server side driven */}
     <Products2/> {/* infinite scrolling */}
    </>
  )
}

export default App
