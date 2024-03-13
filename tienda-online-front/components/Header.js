import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
;

const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color: #fff;
  text-decoration:none;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  display: flex;
  gap: 15px;
`;
const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
`;


export default function Header() {
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>Tienda Online</Logo>
            <StyledNav>
              <NavLink href={'/'}>Inicio</NavLink>
              <NavLink href={'/products'}>Todos los productos</NavLink>
              <NavLink href={'/categories'}>Categorias</NavLink>
              <NavLink href={'/account'}>Cuenta</NavLink>
              <NavLink  href={'/cart'}>Carrito (0)</NavLink>
            </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}