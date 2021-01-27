import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../redux/actions/productAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import Paginate from '../components/Paginate';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;
  useEffect(() => {
    //list product akcija nam sadrzava parametar keyword koji je po defaultu empty string, tako da ako ne proslijedimo parametar
    //u keywordu, izlistat ce sve producte, ako proslijedimo, izlistat ce samo trazeni product
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <React.Fragment>
      <Helmet>
        <title>Welcome to ProShop</title>
        <meta name='description' content='We sell best products' />
        <meta name='keywords' content='electronics' />
      </Helmet>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          {/*paginate je react-bootstrap componenta, zato nam ju je bilo lagano napraviti*/}
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
