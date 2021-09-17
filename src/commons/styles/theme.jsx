import { createMuiTheme } from '@material-ui/core/styles';
//despues tengo que agregar estilos y los incluire en archivos jsx dentro de esta carpeta xd
const theme = createMuiTheme({      
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;