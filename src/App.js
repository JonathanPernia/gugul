import React, { Component } from 'react';
import './App.css';
import Buscador from './component/Buscador';
import Resultado from './component/Resultado';

class App extends Component {

  state = {
    termino : '',
    imagenes : [],
    pagina: ''
  }

  scroll = () =>{
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start ')
  }

  paginaAnterior = () =>{

    
     // leer el state de la pag actual
     let pagina = this.state.pagina;

     //validar que la pagina no de negativos

     if(pagina === 1) return null;
     //Sumar uno a la pagina actual
     pagina -= 1;
     // Agregar el cambio al state
     this.setState({
       pagina
     },()=>{
       this.consultarApi();
       this.scroll();
     })
 
    // console.log(pagina);
  }

  paginaSiguiente = () =>{
    // leer el state de la pag actual
    let pagina = this.state.pagina;
    //Sumar uno a la pagina actual
    pagina += 1;
    // Agregar el cambio al state
    this.setState({
      pagina
    },()=>{
      this.consultarApi();
      this.scroll();
    })

   // console.log(pagina);
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=10535157-7fa27ee731288b4981a20c3bb&q=${termino}&per_page=30&page=${pagina}`
//    console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes : resultado.hits}))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino : termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="container app">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          <Buscador datosBusqueda={this.datosBusqueda}/>
        </div>

        <div className="row justify-content-center">
             <Resultado 
              imagenes={this.state.imagenes}
              paginaAnterior={this.paginaAnterior}
              paginaSiguiente={this.paginaSiguiente}
              />
        </div>
   
      </div>
    );
  }
}

export default App;
