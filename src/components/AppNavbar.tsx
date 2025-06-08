import { Navbar, Container } from 'react-bootstrap';

export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">MetaPeek</Navbar.Brand>
      </Container>
    </Navbar>
  );
}