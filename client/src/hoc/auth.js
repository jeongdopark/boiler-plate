import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom';
export default function(SpecificComponent, option, adminRoute = null){
    // null => 아무나 출입
    // true => 로그인한 유저만
    // flase => 로그인한 유저 출입 불가
    function AuthenticatinoCheck(props){
        const navigate = useNavigate()
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                if(!response.payload.isAuth){
                    // 로그인 안한 상태
                    if(option){
                        navigate('/LoginPage')
                    }
                }else{
                    // 로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/')
                    }else{
                        if(option === false){
                            navigate('/')
                        }
                    }
                }
            })

        }, [])

        return(
            <SpecificComponent/>
        )
    }

    return <AuthenticatinoCheck/>
}