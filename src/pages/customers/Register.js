import { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(3),
  },
}))

const Register = () => {
  const classes = useStyles()

  // o useState 'form' é um exemplo de como devemos fazer para alterar
  //  o estado de vários campos em um único useState

  // forma individual comentada abaixo
  // const [name, setName] = useState('Eduardo')
  // const [job, setJob] = useState('')
  const [form, setForm] = useState({
    name: {
      value: '',
      error: false,
      helperText: '',
    },
    job: {
      value: '',
      error: false,
      helperText: '',
    },
  })
  
  // exemplo de como fazer a validação de campo separadamente
  //  colocando error.name como propriedade no TextField
  // const [error, setError] = useState({
  //   name: true,
  //   job: false,
  // })

  const handleInputChange = (e) => {
    console.log(e)
    const { name, value } = e.target

    setForm({
      // para manter o que já tinha e alterar só o que chegar no momento
      ...form,
      // [name] é nome da propriedade de forma dinâmica que chega no 'target'
      [name]: {
        value,
      },
    })

  }

  const handleRegisterButton = () => {
    let hasError = false

    const newFormState = {
      ...form,
    }

    if(!form.name.value) {
      hasError = true
      
      newFormState.name = {
        value: form.name.value,
        error: true,
        helperText: 'Este campo é obrigatório'
      }
    }
    
    if(!form.job.value) {
      hasError = true
      
      newFormState.job = {
        value: form.job.value,
        error: true,
        helperText: 'Este campo é obrigatório'
      }
    }

    if(hasError) {
      return setForm(newFormState)
    }

    axios.post('https://reqres.in/api/users', {
      name: form.name.value,
      job: form.job.value,
    }).then((response) => {
      console.log('Success', response)
    })
  }

  return (
    <>
      <div className={classes.wrapper}>
        <TextField 
          error={form.name.error}
          helperText={form.name.error ? form.name.helperText : ''}
          label="Nome do cliente" 
          name="name" 
          value={form.name.value} 
          onChange={handleInputChange} 
          variant="outlined" 
          />
      </div>

      <div className={classes.wrapper}>
        <TextField 
          error={form.job.error}
          helperText={form.job.error ? form.job.helperText : ''}
          label="Cargo do cliente" 
          name="job" 
          value={form.job.value} 
          onChange={handleInputChange} 
          variant="outlined"
        />
      </div>

      <div className={classes.wrapper}>
        <Button variant="contained" color="primary" onClick={handleRegisterButton}>
          Cadastrar
        </Button>
      </div>
    </>
  )
}

export default Register