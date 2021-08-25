import Container from '@material-ui/core/Container'

import Header from "../partials/Header/Header"
import useStyles from './Default.style'

const Default = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <Header />
      <Container className={classes.container}>
        {children}
      </Container>
    </>
  )
}

export default Default