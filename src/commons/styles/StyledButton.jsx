import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
//despues tengo que agregar estilos y los incluire en archivos jsx dentro de esta carpeta xd
const StyledButton = withStyles({
  disabled:{
    background:'#808080',
    backgroundColor:'#FFFFFF'
  },
  root: {
    background: '#ADD8E6',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    width:'100px',
    alignItems:'center',
    marginTop: '10px',
    padding: '0 20px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
})(Button);

export default StyledButton;