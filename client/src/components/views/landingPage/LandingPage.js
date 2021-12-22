import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {
    useEffect(() => {   // landingPage에 들어오자마자 실행한다.
        axios.get('/api/hello') // get response를 서버에 보낸다
        .then(response => {console.log(response)}) // response를 콘솔창에 띄운다
    }, []) 
    return (
        <div style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center', width : '100%', height : '100vh'}}>
            <h2>시작 페이지</h2>
        </div>
    )
}

export default LandingPage


