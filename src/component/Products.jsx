import { useEffect, useState } from "react";


//front end driven approach
//fetch data from server and display data one by one as per requirement 

const Products = () => {
  const [length, setLimite] = useState(10);

  const [page,setPage] = useState(1);

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    // console.log(data);
    if (data && data.products) {
      setProducts(data.products);
      setTotalPage(data.total);
      console.log(data.total);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const hanlePageSelect = (selectedPage) =>{
    if(selectedPage >=1 && selectedPage <= products.length/10 && selectedPage!=page)
    {
      setPage(selectedPage);
    }
  }

  return (
    <>

      {products.length > 0 && (
        <>
        <h1>Product List</h1>
        <div className="products">
          {products.slice(page*10-10,page*10).map((product) => {
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
        <div className="pagination">
          <span  className={page==1 ? 'pagination__disable':''}  onClick={()=>hanlePageSelect(page-1)}>⬅️</span>
           {
              
              [...Array(products.length/10)].map((item,index,arr)=>{
                return <span key={index} className={page==index+1 ? 'pagination__selelected':''} onClick={()=>hanlePageSelect(index+1)}>{index+1}</span>
              })
           }
           <span className={page==products.length/10 ? 'pagination__disable':''} onClick={()=>hanlePageSelect(page+1)}>➡️</span>
        </div>
        </>
        
      )}
    </>
  );
};

export default Products;
