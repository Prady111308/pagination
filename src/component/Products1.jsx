import { useEffect, useState } from "react";

//server driven approach
// it will fetch 10 products every time by skipping required products based on page no
const Products1 = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalProducts(data.total);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const hanlePageSelect = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalProducts / 10 &&
      selectedPage != page
    )
      setPage(selectedPage);
  };
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
          <div className="pagination">
            <span className={page == 1 ? "pagination__disable" : ""}
                  onClick={() => hanlePageSelect(page - 1)}>⬅️</span>
            {[...Array(totalProducts / 10)].map((item, index, arr) => {
              return (
                <span
                  key={index}
                  className={page == index + 1 ? "pagination__selelected" : ""}
                  onClick={() => hanlePageSelect(index + 1)}
                >
                  {index + 1}
                </span>
              );
            })}
            <span className={page == totalProducts/10 ? "pagination__disable" : ""}
                  onClick={() => hanlePageSelect(page + 1)}>➡️</span>
          </div>
        </>
      )}
    </>
  );
};

export default Products1;
