import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import axios from 'axios'
import Rating from './Rating'
import { Store } from '../Store'
const Product = ({ product }) => {
  const { state, dispatch: cxtDispatch } = useContext(Store)
  const { cart: { cartItems } } = state
  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((item) => item._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${item._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry,product is out of stock')
      return
    }
    cxtDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity }
    })
  }
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0
          ? <Button variant="light" disabled>out of stock</Button>
          : <Button onClick={() => addToCartHandler(product)}>add to cart</Button>
        }

      </Card.Body>
    </Card>
  )
}
export default Product