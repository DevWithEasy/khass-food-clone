import { Route, Routes } from "react-router-dom";
import {
  UpdateCategory,
  AddCategory,
  AddProduct,
  AdminLayout,
  AllCategory,
  AllProducts,
  Blog,
  Blogs,
  Cart,
  CheckOut,
  Dashboard,
  Find,
  Forget,
  Home,
  MyOders,
  Offers,
  Order,
  Orders,
  Outlet,
  Outlets,
  Product,
  Products,
  Profile,
  Protected,
  SignIn,
  SignUp,
  TrackOrder,
  UpdateProduct,
  UpdateProfile,
  Layout,
  Users,
  Verification,
  ProductsByCategory,
  Success,
  Cancel,
  UserAccountLayout,
} from "./pages/Index";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/verification"
          element={
            <Layout>
              <Verification />
            </Layout>
          }
        />
        <Route
          path="/find"
          element={
            <Layout>
              <Find />
            </Layout>
          }
        />
        <Route
          path="/forget"
          element={
            <Layout>
              <Forget />
            </Layout>
          }
        />
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        />
        <Route
          path="/category/:id"
          element={
            <Layout>
              <ProductsByCategory />
            </Layout>
          }
        />
        <Route
          path="/outlets"
          element={
            <Layout>
              <Outlets />
            </Layout>
          }
        />
        <Route
          path="/outlet/:id"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        />
        <Route
          path="/blogs"
          element={
            <Layout>
              <Blogs />
            </Layout>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <Layout>
              <Blog />
            </Layout>
          }
        />
        <Route
          path="/offers"
          element={
            <Layout>
              <Offers />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <UserAccountLayout>
                <Profile />
              </UserAccountLayout>
            </Protected>
          }
        />
        <Route
          path="/profile/update"
          element={
            <Protected>
              <UserAccountLayout>
                <UpdateProfile />
              </UserAccountLayout>
            </Protected>
          }
        />
        <Route
          path="/cart"
          element={
            <Protected>
              <Layout>
                <Cart />
              </Layout>
            </Protected>
          }
        />
        <Route
          path="/checkout"
          element={
            <Protected>
              <Layout>
                <CheckOut />
              </Layout>
            </Protected>
          }
        />
        <Route
          path="/success/:id"
          element={
            <Layout>
              <Success />
            </Layout>
          }
        />
        <Route
          path="/cancel/:id"
          element={
            <Layout>
              <Cancel />
            </Layout>
          }
        />
        <Route
          path="/failed/:id"
          element={
            <Layout>
              <Cancel />
            </Layout>
          }
        />
        <Route
          path="/myorders"
          element={
            <Protected>
              <UserAccountLayout>
                <MyOders />
              </UserAccountLayout>
            </Protected>
          }
        />
        <Route
          path="/order_status"
          element={
            <Protected>
              <Layout>
                <TrackOrder />
              </Layout>
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/orders"
          element={
            <Protected>
              <AdminLayout>
                <Orders />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Protected>
              <AdminLayout>
                <Order />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/users"
          element={
            <Protected>
              <AdminLayout>
                <Users />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/products/all"
          element={
            <Protected>
              <AdminLayout>
                <AllProducts />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/products/add"
          element={
            <Protected>
              <AdminLayout>
                <AddProduct />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/products/update/:id"
          element={
            <Protected>
              <AdminLayout>
                <UpdateProduct />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/categories/"
          element={
            <Protected>
              <AdminLayout>
                <AllCategory />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/category/add"
          element={
            <Protected>
              <AdminLayout>
                <AddCategory />
              </AdminLayout>
            </Protected>
          }
        />
        <Route
          path="/category/update/:id"
          element={
            <Protected>
              <AdminLayout>
                <UpdateCategory />
              </AdminLayout>
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

export default App;
