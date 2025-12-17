import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from './data.js';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.jsx';
import axios from 'axios';

function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  // useNavigate를 주로 사용하는 방법
  let [btnClickedCount, setBtnClickedCount] = useState(2);
  let [isLoading, setIsLoading] = useState(false);

  return (

    <div className='App'>

      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={function () { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={function () { navigate('/detail') }}>Detail</Nav.Link>
            <Nav.Link onClick={function () { navigate('/event') }}>Event</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <div>

            <div className="main-bg"></div>

            <div className="container">
              <div className="row">
                {
                  shoes.map(function (a, i) {
                    return (
                      <Card key={i} shoes={shoes[i]} i={i}></Card>
                    )
                  }
                  )
                }
              </div>
            </div>

            {
              btnClickedCount == 5 ?
                <h4>더이상 상품이 없습니다</h4>
                : null
            }

            <button onClick={function () {
              setIsLoading(true)
              axios.get(`https://codingapple1.github.io/shop/data${btnClickedCount}.json`)
                .then(function (result) {
                  let copyShoes = [...shoes, ...result.data]
                  setShoes(copyShoes)
                })
                .catch(function () {
                  console.log('DATA GET ERROR')
                })
                .finally(function () {
                  setIsLoading(false)
                })
              setBtnClickedCount(btnClickedCount + 1);
            }}>버튼</button>


          </div>
        } />
        <Route path='/detail/:id' element={<Detail shoes={shoes}></Detail>} />
        {/* url parameter : :id, :abcd 등 여러방식으로 사용가능 */}

        <Route path='/about' element={<AboutPage></AboutPage>}>
          <Route path='member' element={<div>멤버임</div>} />
          <Route path='location' element={<div>위치임</div>} />
        </Route>

        <Route path='/event' element={<EventPage></EventPage>}>
          <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>} />
          <Route path='two' element={<p>생일기념 쿠폰받기</p>} />
        </Route>

        <Route path='*' element={<div>404 없는 페이지</div>} />

      </Routes>



    </div >
  )
}

function EventPage() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function AboutPage() {
  return (
    <div>
      회사정보임
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  )
}

export default App
