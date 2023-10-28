import ListProduct from "./pages/product/ListProduct";
import Sidebar from "./components/SideBar";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import { useEffect } from "react";
import { getProducts ,resetQueryProduct } from "./features/product/productSlice";
import { getCategories } from "./features/category/categorySlice";
import { getProviders } from "./features/provider/providerSlice";
import { getColors } from "./features/color/colorSlice";
import { getUsers, resetQueryUser } from "./features/user/userSlice";
import ListCategory from "./pages/category/ListCategory";
import ListProvider from "./pages/provider/ListProvider";
import ListCustomer from "./pages/customer/ListCustomer";

function App() {
  const { isSideBarOpen } = useSelector((store) => store.sideBar);
  const { isSpinner } = useSelector((store) => store.spinner);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const location = useLocation();
  if (location.pathname !== "/admin/customers") {
    dispatch(resetQueryUser());
  }
  if (location.pathname !== "/admin/products") {
    dispatch(resetQueryProduct());
  }
  const variantsSideBar = {
    initial: {
      x: -200,
      opacity: 0.5,
      width: 0,
    },
    animate: { x: 0, opacity: 1, width: "auto" },
    exit: {
      x: -200,
      opacity: 0.5,
      width: 0,
    },
    transition: { duration: 4, ease: "ease-in-out" },
  };
  return (
    <>
      <div className="App">
        <div className="main-content">
          <AnimatePresence>
            {isSideBarOpen && (
              <motion.div
                variants={variantsSideBar}
                initial="initial"
                animate="animate"
                exit="exit"
                transition="transition"
              >
                <Sidebar />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="w-100">
            <NavBar />

            <Routes>
              <Route path="/admin/products" element={<ListProduct />} />
              <Route path="/admin/categories" element={<ListCategory />} />
              <Route path="/admin/providers" element={<ListProvider />} />
              <Route path="/admin/customers" element={<ListCustomer />} />
            </Routes>
          </div>
        </div>

        {/* Toast message */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>

      {/* Loading overlay */}
      {isSpinner && (
        <LoadingOverlay
          active={isSpinner}
          spinner
          text="Waiting for me..."
        ></LoadingOverlay>
      )}
    </>
  );
}

export default App;
