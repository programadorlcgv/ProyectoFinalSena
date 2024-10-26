import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductBox from "@/components/ProductBox";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import axios from "axios";
import {signIn, signOut, useSession} from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ColsWrapper = styled.div`
  display:grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0;
  p{
    margin: 5px;
  }
`
const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`

export default function AccountPage() {
  const {data:session} = useSession();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded,setAddressLoaded] = useState(true);
  const [wishlistLoaded,setWishlistLoaded] = useState(true);
  const [wishedProducts,setWishedProducts] = useState([]);
  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn('google')
  } 
  function saveAddress() {
    const data = {name,email,city,streetAddress,postalCode,country};
    axios.put('/api/address', data);
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    axios.get('/api/address').then(response => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setPostalCode(response.data.postalCode);
      setStreetAddress(response.data.streetAddress);
      setCountry(response.data.country);
      setAddressLoaded(true);
    });
    axios.get('/api/wishlist').then(response => {
      setWishedProducts(response.data.map(wp => wp.product));
      setWishlistLoaded(true);
    })
  }, [session]);
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts(products => {
      return[...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }
  return(
    <>
      <Header />
      <Center>
        <ColsWrapper>
        <div>
        <RevealWrapper delay={0}>
          <WhiteBox>
            <h2>Favoritos</h2>
            {!wishlistLoaded && (
              <Spinner fullWidth={true} />
            )}
            {wishlistLoaded && (
              <>
              <WishedProductsGrid>
               {wishedProducts.length > 0 && wishedProducts.map(wp => (
                 <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
               ))}
              </WishedProductsGrid>
                 {wishedProducts.length === 0 && (
                <>
                  {session && (
                    <p>Lista de favoritos Vacía</p>
                  )}
                  {!session && (
                    <p>Inicia Sesión para agregar productos a la lista de favoritos</p>
                  )}
                </>
               )}
              </> 
            )}
          </WhiteBox>
        </RevealWrapper>
        </div>
        <div>
          <RevealWrapper delay={100}>
          <WhiteBox>
            <h2>{session ? 'Detalles de la cuenta' : 'Iniciar Sesión'}</h2>
            {!addressLoaded && (
              <Spinner fullWidth={true}/>
            )}
            {addressLoaded && session && (
              <>
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
                <Button black block 
                        onClick={saveAddress}>
                  Guardar
                </Button>
                <hr />
              </>
            )}
              {session && (
              <Button primary onClick={logout}>Cerrar Sesión </Button>
              )}
              {!session && (
              <Button primary onClick={login}>Iniciar Sesión con Google</Button>
              ) }
          </WhiteBox>
          </RevealWrapper>
        </div>
        </ColsWrapper>
      </Center>
    </>
  )
}