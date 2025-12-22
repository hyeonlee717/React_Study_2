import { Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { increaseAge, changeName } from "../store/userSlice.js";
import { increaseCount } from "../store/cartSlice.js";

function Cart() {

    let cart = useSelector(state => state.cart)
    let user = useSelector(state => state.user)
    let dispatch = useDispatch()
    // 수정함수 실행 메세지 전송

    return (
        <div>
            {user.name}{user.age}의 장바구니
            <button onClick={() => {
                dispatch(increaseAge(2))
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cart.map(function (item, i) {
                            return (
                                <tr key={i}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.count}</td>
                                    <td><button onClick={() => {
                                        dispatch(increaseCount(item.id))
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;