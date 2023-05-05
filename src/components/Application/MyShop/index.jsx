import { useCallback, useEffect, useState } from "react";
import CategoriesBtn from "./Component/CategoriesBtn";
import Product from "./Component/ProductTag";
import Payment from "./Component/PaymentTag";

function MyShop() {
  const [categories, setCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [isActive, setActiveCategory] = useState("jewelery");
  const [productOnShow, setProductOnShow] = useState("");
  const [cart, setCart] = useState([]);
  const [quantity, setQuatity] = useState(0);
  const [showCart,setShowCart] = useState(false)
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((cateFetch) => setCategories(cateFetch));
  }, []);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${isActive}`)
      .then((res) => res.json())
      .then((product) => setProductList(product));
  }, [isActive]);

  const handleClick = useCallback((cate) => setActiveCategory(cate), []);
  const handleShowPd = useCallback((payload) => setProductOnShow(payload), []);
  const handleQuatity = (e) => {
    if (/\d{0,3}/.test(e.target.value)) {
      setQuatity(e.target.value);
    }
  };
  const handleAddCart = () => {
    if (quantity&&productOnShow) {
      setCart((prev) => [
        ...prev,
        {
          title: productOnShow.title,
          quantity: quantity,
          price: productOnShow.price * quantity,
        },
      ]);
      setQuatity(0)
    }
  };
  const handleRemoveCart=useCallback((payload)=>setCart(payload),[])
  return (
    <div className=" max-h-fitScreen max-w-screen-lg w-screen h-screen bg-brownLayout-0 overflow-x-scroll ">
      <div className="nav bg-black bg-opacity-70 p-2 flex">
        <div>
        {categories.map((category) => (
          <CategoriesBtn
            handleClick={handleClick}
            key={category}
            isActive={isActive === category ? true : false}
          >
            {category}
          </CategoriesBtn>
        ))}
        </div>
        <button
          className=" text-white flex-grow flex justify-center items-center relative "
          onClick={()=>setShowCart(true)}
          onBlur={()=>setShowCart(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" w-12 h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <span
            className={` -translate-x-2 -translate-y-2 flex justify-center items-center h-5 w-5 ${
              cart.length === 0 ? "hidden relative" : "relative"
            }`}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-xs justify-center items-center">
              {cart.length >= 10 ? "x" : cart.length}
            </span>
          </span>
          <Payment cart={cart} handleRemoveCart={handleRemoveCart} show={showCart} />
        </button>
      </div>
      <div className="body w-full flex">
        <div className="des bg-shopDesLayout-0 w-1/3 h-full m-5 rounded-md p-5 border-red-300 border-4 shadow-xl shadow-yellow-950 box-border">
          <div className="productName text-yellow-500 text-center mb-4">
            {productOnShow.title}
          </div>
          <div className="script mb-3 text-sm">
            {productOnShow.description || "Pick Your Products"}
          </div>
          <div className="text-3xl text-center text-lime-600">
            {productOnShow.price && `${productOnShow.price}$`}
          </div>
          <div className="flex h-10">
            <input
              type="text"
              onChange={handleQuatity}
              value={quantity}
              className=" w-14 h-full p-2"
            />
            <div className="flex flex-col ml-3 gap-0 text-xs items-center justify-between h-full">
              <button
                className=" w-6 h-1/2 border border-black bg-vintagePaper-0"
                onClick={() => setQuatity((prev) => prev + 1)}
              >
                &#9650;
              </button>
              <button
                className=" w-6 h-1/2 border border-black bg-vintagePaper-0"
                onClick={() => setQuatity((prev) => prev - 1)}
              >
                &#9660;
              </button>
            </div>
          </div>
          <button
            className="w-full h-10 text-center text-white bg-red-700 border border-white mt-4 active:opacity-60"
            onClick={handleAddCart}
          >
            Add to cart
          </button>
        </div>
        <div className="flex gap-2 flex-wrap m-5 w-2/3">
          {productList.map((product) => (
            <Product
              key={product.id}
              product={product}
              handleClick={handleShowPd}
              id={productOnShow.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyShop;
