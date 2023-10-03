import React from "react";
import logo from "./logo.svg";
import "./App.css";
//Importamos boostrap y reactstrap para utilizar los complementos
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";


//Creamos una pequeña BD para tener algo de contenido en la tabla
const data = [
  { id: 1, Nombre: "Mario", Apellido: "Cortez", Direccion:"Av. Granito #281", Cumpleaños:"2018-07-22" },
  { id: 2, Nombre: "Miguel", Apellido: "Cruz", Direccion:"Av. Ruinas de Tonina #43", Cumpleaños:"2018-07-22" },
  { id: 3, Nombre: "Daniel", Apellido: "Santana", Direccion:"Av. Dolores #63", Cumpleaños:"2018-07-22" },
  { id: 4, Nombre: "Raul", Apellido: "Perea", Direccion:"Av. Prince #123", Cumpleaños:"2018-07-22" },
  { id: 5, Nombre: "Cesar", Apellido: "Perez", Direccion:"Av. Arriaga #411", Cumpleaños:"2018-07-22"},
  { id: 6, Nombre: "Adrian", Apellido: "Luna" , Direccion:"San Pedro Garza, MTY", Cumpleaños:"2018-07-22"},
];
//Cambie el function App -> Class App para que pueda meter logica en la funcion
class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      Nombre: "",
      Apellido: "",
      Direccion:"",
      Cumpleaños:""
    },
  };
//Utilzaremos Modales
  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };
//Funciones de los botones para el CRUD
  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].Nombre = dato.Nombre;
        arreglo[contador].Apellido = dato.Apellido;
        arreglo[contador].Direccion = dato.Direccion;
        arreglo[contador].Cumpleaños = dato.Cumpleaños;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Pintamos la tabla en esta vista
  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Direccion</th>
                <th>Cumpleaños</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.Nombre}</td>
                  <td>{dato.Apellido}</td>
                  <td>{dato.Direccion}</td>
                  <td>{dato.Cumpleaños}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="Apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Apellido}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Direccion: 
              </label>
              <input
                className="form-control"
                name="Direccion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Apellido}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Cumpleaños: 
              </label>
              <input
                className="form-control"
                name="Cumpleaños"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.Apellido}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Nombre</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                className="form-control"
                name="Apellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Direccion: 
              </label>
              <input
                className="form-control"
                name="Direccion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Cumpleaños: 
              </label>
              <input
                className="form-control"
                name="Cumpleaños"
                type="date"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;