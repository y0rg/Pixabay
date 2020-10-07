import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {

  state = {
    termino: 'Cafe',
    imagenes: [],
    pagina : ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {
        //leer el state
        let pagina = this.state.pagina;
        //Si la pagina es 1, no voy más atras
        if (pagina === 1) return null;
        
        //restar 1 a la pagina
        pagina --;
                
        //agregar el cambio
        this.setState({
          pagina
        }, () => {
          this.consultarApi();
          this.scroll();
        })
  }

  paginaSiguiente = () => {
    //leer el state
    let pagina = this.state.pagina;
    //sumar 1 a la pagina
    pagina ++;
    //agregar el cambio
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    })
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${termino}&page=${pagina}`;
    //console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina : 1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="jumbotron">
            <h1 className="lead text-center">Buscador de imagenes</h1>
            <Buscador
              datosBusqueda={this.datosBusqueda}
            />
          </div>
          <div className="row justify-content-center">
            <Resultado
              imagenes={this.state.imagenes}
              paginaAnterior={this.paginaAnterior}
              paginaSiguiente={this.paginaSiguiente}
            />
          </div>

        </header>
      </div>
    );
  }
}

export default App;
