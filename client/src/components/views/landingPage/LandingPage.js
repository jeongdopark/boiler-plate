import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function LandingPage() {
    const navigate = useNavigate();
    useEffect(() => {   // landingPage에 들어오자마자 실행한다.
        axios.get('/api/hello') // get response를 서버에 보낸다
        .then(response => {console.log(response)}) // response를 콘솔창에 띄운다
    }, []) 

    const onClickHandler = () => {
        axios.get(`/api/users/logout`)
        .then(response => {
            if(response.data.success){
                navigate('/LoginPage')
            }else{
                alert('로그아웃 하는데 실패 했습니다')
            }
        })
    }
    return (
        <div style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', width : '100%', height : '100vh'}}>
            <h2>시작 페이지</h2>

            <button onClick = {onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage


