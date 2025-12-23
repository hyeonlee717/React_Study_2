import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice.js";

// styled-components
// let Btn = styled.button`
// background: ${props => props.$bg};
// color: ${props => props.$bg == 'blue' ? 'white' : 'black'};
// padding: 10px;
// `
// 장점
// 장점1.CSS 파일 오픈할 필요없이 JS 파일에서 바로 스타일넣을 수 있습니다.
// 장점2.여기 적은 스타일이 다른 JS 파일로 오염되지 않습니다.원래 그냥 CSS파일은 오염됩니다.
// 장점3.페이지 로딩시간 단축됩니다.
// 왜냐면 저기 적은 스타일은 html 페이지의 < style > 태그에 넣어줘서 그렇습니다.
// 단점
// 단점1. JS 파일이 매우 복잡해집니다.
// 그리고 이 컴포넌트가 styled 인지 아니면 일반 컴포넌트인지 구분도 어렵습니다.
// 단점2. JS 파일 간 중복 디자인이 많이 필요하면 어쩌죠?
// 다른 파일에서 스타일 넣은 것들 import 해와서 쓰면 됩니다.
// 근데 그럼 CSS파일 쓰는거랑 차이가 없을 수도요
// 단점3. CSS 담당하는 디자이너가 있다면 협업시 불편할텐데 
// 그 사람이 styled-components 문법을 모른다면 
// 그 사람이 CSS로 짠걸 styled-components 문법으로 다시 바꾸거나 그런 작업이 필요하겠군요.
// 그래서 신기술같은거 도입시엔 언제나 미래를 생각해보아야합니다. 

function Detail(props) {
    let { id } = useParams();
    // url parameter 자리에 있는 정보가 useParams()에 남음
    let 찾은상품 = props.shoes.find(function (x) { return x.id == id; });
    // let [count, setCount] = useState(0);
    // let [showAlert, setShowAlert] = useState(true);
    let [newInput, setNewInput] = useState('')
    let [tap, setTap] = useState(0)

    let [pageFade, setPageFade] = useState('')
    useEffect(function () {
        let timer = setTimeout(() => { setPageFade('end') }, 10);
        return function () {
            clearTimeout(timer)
        }
    }, [])

    useEffect(function () {
        let watchedItems = localStorage.getItem('watched')
        watchedItems = JSON.parse(watchedItems) || []
        watchedItems.push(id)
        watchedItems = Array.from(new Set(watchedItems))
        localStorage.setItem('watched', JSON.stringify(watchedItems))
    }, [id])

    // useEffect(function () {
    //     let timer = setTimeout(function () { setShowAlert(false) }, 2000);
    //     console.log(2)
    //     return function () {
    //         console.log(1)
    //         clearTimeout(timer)
    //     }
    // }, [count])
    // useEffect
    // html요소들을 먼저 다 읽고나서 실행해줌
    // 어려운연산, 서버에서 데이터 가져오는 작업, 타이머 등에 쓰임

    useEffect(function () {
        if (isNaN(newInput) == true) {
            alert('숫자만 입력하셈!')
        }
    }, [newInput])

    let cart = useSelector(state => state.cart)
    let dispatch = useDispatch()

    return (
        <div className={`container start ${pageFade}`}>

            {/* <p>{count}</p>
            <button onClick={function () {
                setCount(count + 1);
            }}>버튼</button>

            {
                showAlert === true ?
                    <div className="alert alert-warning">
                        <p>2초이내 구매시 할인</p>
                    </div>
                    : null
            } */}

            {/* <Btn $bg={'blue'}>버튼</Btn>
            <Btn $bg={'orange'}>버튼</Btn> */}

            <div className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id) + 1}.jpg`} width="100%" />
                </div>
                <input type="text" onChange={function (e) {
                    setNewInput(e.target.value);
                }} />
                <div className="col-md-6">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <button className="btn btn-danger" onClick={function () {
                        dispatch(addItem(
                            { id: 찾은상품.id, name: `${찾은상품.title}`, count: 1 }
                        ))
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={function () {
                        setTap(0)
                    }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={function () {
                        setTap(1)
                    }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={function () {
                        setTap(2)
                    }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tap={tap}></TabContent>

        </div>
    )
}

function TabContent({ tap }) {
    // props 안쓰고 이렇게 { a,b,c }로 사용해도 가능
    // if (tap == 0) {
    //     return <div>내용0</div>
    // } else if (tap == 1) {
    //     return <div>내용1</div>
    // } else if (tap == 2) {
    //     return <div>내용2</div>
    // }

    let [fade, setFade] = useState('')
    useLayoutEffect(() => {
        setFade('') // start 상태 확실히 넣고

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setFade('end') // 다음 프레임에서 end
            })
        })
    }, [tap])
    return (<div key={tap} className={`start ${fade}`}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
        {/* 굳이 if문 안쓰고 이렇게 써도 똑같음 */}
    </div >)


}

export default Detail;
