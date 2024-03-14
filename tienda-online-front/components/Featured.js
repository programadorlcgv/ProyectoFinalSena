import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";

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
  grid-template-columns: 1fr 1fr;
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
`;

export default function Featured() {
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
          <div>
            <Title>Nvidia GeForce Asus RTX-3050</Title>
              <Desc>La GeForce RTX® 3050 se construyó con el rendimiento gráfico de la arquitectura NVIDIA Ampere. Ofrece Núcleos RT de 2.ª generación y Núcleos Tensor de 3.ª generación dedicados, multiprocesadores de transmisión y memoria G6 de alta velocidad para que puedas disfrutar de los juegos más recientes. Sube al nivel de GeForce RTX. </Desc>
              <ButtonsWrapper>
                <Button outline white >Leer mas</Button>
                <Button  primary >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                  </svg>
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