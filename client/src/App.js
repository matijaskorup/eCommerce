import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <main className='py-3'>
          <Container>
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            {/*ovaj upitnik znaci da ce id biti optional, mozemo ga staviti i ne moramo,
            zato sto imamo link koji vodi direktno na cart i zato sto imamo link koji vodi na cart
            sa produktima koje smo odabrali za kupnju*/}
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route
              exact
              path='/admin/productlist'
              component={ProductListScreen}
            />
            <Route
              path='/admin/productlist/:pageNumber'
              component={ProductListScreen}
            />

            <Route
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
            <Route path='/admin/orderlist' component={OrderListScreen} />
            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route exact path='/page/:pageNumber' component={HomeScreen} />
            <Route
              exact
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
            />
            <Route exact path='/' component={HomeScreen} />
          </Container>
        </main>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
