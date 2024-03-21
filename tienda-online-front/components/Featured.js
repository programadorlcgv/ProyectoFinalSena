import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 20px 0;
  display: flex;
  align-items: center;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2.5rem;
`;
const Desc = styled.p`
 color: #aaa;
 font-size: .8rem;
`;
const ColumnsWrapper = styled.div`
  display: grid; 
  grid-template-columns: 1.1fr .9fr;
  gap: 40px;
  img{
    width: 100%;
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
 display: flex;
 gap: 10px;
 margin-top: 25px;
 align-items: center;
`;

export default function Featured({product}) {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
          <div>
            <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink href={'/products/'+product._id} outline={1} white={1} >Leer mas</ButtonLink>
                <Button  white >
                  <CartIcon />
                  Añadir al carrito
                </Button>
              </ButtonsWrapper>
          </div>
          </Column>
          <Column>
            <img src="https://lcgv-next-ecommerce.s3.amazonaws.com/1709741460434-.png"></img>
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  )
}