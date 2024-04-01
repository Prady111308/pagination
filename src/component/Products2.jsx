import { useEffect, useState } from "react";
import Loader from "./Loader";

//server driven approach
// infinite scrolling
const Products2 = () => {
  const [products, setProducts] = useState([]);
  const [showLoader,setShowLoader] = useState(false);

  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts([...products,...data.products]);
      setTotalProducts(data.total);
      console.log(data.total);
      setShowLoader(false);
    }
  };

  const handleScrollEvent = () =>{
    // console.log('scrollHeight : '+document.documentElement.scrollHeight);
    // console.log('innerHeight : '+window.innerHeight);
    // console.log('scrolltop : '+document.documentElement.scrollTop);

    try {
        let scrollHeight = document.documentElement.scrollHeight;
        let innerHeight = window.innerHeight;
        let scrollTop = document.documentElement.scrollTop;
       
        if(innerHeight + scrollTop + 3 >= scrollHeight)
        {
            
            setPage((prev) => prev+1);
            setShowLoader(true);
           
        }
        

    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  useEffect (()=>{
    window.addEventListener('scroll',handleScrollEvent)
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  },[])

  

  return (
    <>
      {products.length > 0 && (
        <>
          <div className="products">
            {products.map((product) => {
              return (
                <div key={product.id} className="product">
                  <div>
                    <img src={product.images[0]} alt={product.title} />
                  </div>
                  <span>{product.title}</span>
                </div>
              );
            })}
          </div>
          {showLoader && <Loader /> }
          
        </>
      )}
    </>
  );
};

export default Products2;
