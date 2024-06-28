import React, { useEffect, useState } from 'react'
import { LoginBg, Logo } from '../../../assets/images'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AuthLogin, clearUserAuthLogin } from '../../../Redux/Slices/AuthSlice'
import { toast } from 'react-toastify'
import ErrorMessage from '../../../utils/ErrorMessage'
import {ValidateLogin} from "../../../utils/Validation"
import { addAccessToken } from '../../../Apis/Api'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState({ isValid: false });
  //state for input
  const [Inp, setInp] = useState({
    email: "",
    password: ""
  })

  const OnInputChanged = ({ target }) => {
    const { name, value } = target

    setError(p => {
      const obj = { ...p }
      obj?.errors && delete obj?.errors[name]
      return obj
    })

    setInp(p => ({ ...p, [name]: value }))
  }

  const OnLogInClicked = () => {
    const Values = {
      ...Inp,
    }
    const errorMessage = ValidateLogin(Values);
    setError(errorMessage);
    console.log(Values)
    if (errorMessage?.isValid) {
      dispatch(AuthLogin(Values))
    }

  }

  const AuthLoggedIn = useSelector(state => state.Authentication.UserAuthLogin)


  useEffect(() => {
    if (AuthLoggedIn.data) {
      addAccessToken(AuthLoggedIn.accessToken)
      navigate('/')
    }
  }, [AuthLoggedIn.data])

  
  useEffect(() => {
    if (AuthLoggedIn.error) {
      toast.error(AuthLoggedIn.error.message)
      clearUserAuthLogin()
    }
  }, [AuthLoggedIn.error])


  return (
    <>
      <div class="login-bg" style={{ backgroundImage: `url(${LoginBg})` }}>
        <div className="auth-wraper">
          <div className="auth-wraper-inner">
            <div className="auth-card">
              <div class="auth-top">
                <div class="login-logo">
                  <img alt="Logo" src={Logo} />
                </div>
                <h3>Admin Panel</h3>
              </div>
              <div className='auth-main'>
                <div className="form-inputs">
                  <label className="form-label">
                    Email<i>*</i>
                  </label>
                  <input
                    className={`${error.errors?.email ? "alert-input" : ""}`} type="text" name="email" value={Inp.email} onChange={OnInputChanged}
                    placeholder="Enter email here"
                  />
                </div>
                <ErrorMessage error={error} title={'email'} />

                <div className="form-inputs">
                  <label className="form-label">
                    Password<i>*</i>
                  </label>
                  <input
                    className={`${error.errors?.password ? "alert-input" : ""}`} type="password" name="password" value={Inp.password} onChange={OnInputChanged} placeholder="*********"

                  />
                </div>
                <ErrorMessage error={error} title={'password'} />
                <div className="auth-btn">
                  {/* <Link to="/" className="btn primary-btn" onClick={OnLogInClicked}>Login</Link> */}
                  <a onClick={OnLogInClicked} to="/" class="btn primary-btn">
                          Login
                        </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
