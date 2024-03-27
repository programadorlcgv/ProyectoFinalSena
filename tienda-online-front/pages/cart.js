import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWraper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  paddin: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0,0,0,.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 95px;
    max-height: 95px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;


export default function CartPage() {
  const {cartProducts, addProduct,removeProduct} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', {ids:cartProducts})
      .then(response => {
        setProducts(response.data)
      })
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }
  return (
    <>
      <Header />
      <Center>
      <ColumnsWraper>
        <Box>
        <h2>Carrito de compras</h2>
          {!cartProducts?.length && (
            <div>Tu carrito esta Vacio</div>
          )}
          {products?.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr>
                    <ProductInfoCell>
                      <ProductImageBox>
                        <img src={product.images[0]} alt=""/>
                      </ProductImageBox>
                      {product.title}
                    </ProductInfoCell>
                    <td>
                      <Button 
                        onClick={() => lessOfThisProduct(product._id)}>-</Button>
                      <QuantityLabel>
                      {cartProducts.filter(id => id === product._id).length}
                      </QuantityLabel>
                      <Button 
                        onClick={() => moreOfThisProduct(product._id)}>+</Button>
                    </td> 
                    <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                      </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>${total}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Box>
        {!!cartProducts?.length && (
          <Box>
            <h2>Información del Pedido</h2>
            <form method="post" action="/api/checkout">
              <Input type="text" 
                    placeholder="Nombre" 
                    value={name}
                    name="name" 
                    onChange={ev => setName(ev.target.value)} />
              <Input type="text" 
                    placeholder="Email" 
                    value={email} 
                    name="email" 
                    onChange={ev => setEmail(ev.target.value)} />
              <CityHolder>
                <Input type="text" 
                      placeholder="Ciudad" 
                      value={city} 
                      name="city"
                      onChange={ev => setCity(ev.target.value)} />
                <Input type="number" 
                      placeholder="Codigo Postal" 
                      value={postalCode} 
                      name="postalCode" 
                      onChange={ev => setPostalCode(ev.target.value)} />
              </CityHolder>
              <Input type="text" 
                    placeholder="Dirección del Domicilio" 
                    value={streetAddress} 
                    name="streetAddress"
                    onChange={ev => setStreetAddress(ev.target.value)} />
              <Input type="text" 
                    placeholder="Pais" 
                    value={country} 
                    name="country"
                    onChange={ev => setCountry(ev.target.value)} />
              <Button black block type="submit">Continuar con el Pago</Button>
            </form>
          </Box>
        )}
      </ColumnsWraper>
      </Center> 
    </>
  )
}