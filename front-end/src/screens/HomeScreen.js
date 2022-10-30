import { useEffect, useReducer } from 'react'
import axios from 'axios'
// import logger from 'use-reducer-logger'
import { Row, Col } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
// import data from '../data.js'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

const HomeScreen = () => {
  /**use logger */
  // const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
  //   products: [],
  //   loading: true,
  //   error: ''
  // })
  const [{ loading, error, products }, dispatch] = useReducer((reducer), {
    products: [],
    loading: true,
    error: ''
  })
  // const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const res = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })
      }
      // setProducts(res.data)
    }
    fetchData()
  }, [])
  return (
    <div>
      <Helmet>
        <title>
          Amazona
        </title>
      </Helmet>
      <h1>Feature products</h1>
      <div className="products">
        {
          loading ? <LoadingBox /> :
            error ? <MessageBox variant="danger">{error}</MessageBox> :
              <Row>
                {products.map((product) =>
                  <Col sm={6} md={4} lg={3} className="mb-3" key={product.slug}>
                    <Product product={product} />
                  </Col>
                )}</Row>
        }
      </div>
    </div>
  )
}
export default HomeScreen