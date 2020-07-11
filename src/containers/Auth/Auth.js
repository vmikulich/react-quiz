import React, { Component } from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'

export default class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validations: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validations: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {

  }

  registerHandler = () => {

  }

  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validations) {
    if (!validations) {
      return true
    }

    let isValid = true

    if (validations.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validations.email) {
      isValid = is.email(value) && isValid
    }

    if (validations.minLength) {
      isValid = value.length >= validations.minLength && isValid
    }

    return isValid
  }

  onChangHandler = (event, controlName) => {
    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validations)

    formControls[controlName] = control
    this.setState({
      formControls
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input 
          key={controlName + index}
          type={control.type}
          value={control.value}
          label={control.label}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validations}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangHandler(event, controlName)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form 
            onSubmit={this.submitHandler}
            className={classes.AuthForm}
          >

            {this.renderInputs()}

            <Button 
              type="success"
              onClick={this.loginHandler}
            >
              Войти
            </Button>
            <Button 
              type="primary"
              onClick={this.registerHandler}
            >
              Зерегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}
