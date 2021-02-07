import React from "react";

import logo from "./AppBar.logo.svg";

import "./AppBar.css";
import "./App.css";


import spinner from "./components/Spinner";



export default class Convertisseur extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputVal: 0,
            inputDevise: "EUR",
            outputDevise: "USD",
            resultat: [], 
            displayResult: 0,
            className: ''
        };
        this.handleMontantChange = this.handleMontantChange.bind(this);
        this.handleOutPutDevisesChange = this.handleOutPutDevisesChange.bind(this);
        this.handleInPutDevisesChange = this.handleInPutDevisesChange.bind(this);
    }


    handleMontantChange(event) {    
        this.state.inputVal = event.target.value; 
        this.ChangementDevise(this.state.inputDevise,this.state.outputDevise);
    }
    handleOutPutDevisesChange(event) {    
        this.state.outputDevise = event.target.value; 
        this.ChangementDevise(this.state.inputDevise,this.state.outputDevise);
    }
    handleInPutDevisesChange(event) {    
        this.state.inputDevise = event.target.value;   
        this.ChangementDevise(this.state.inputDevise,this.state.outputDevise);
    }

    

    ChangementDevise = (i,o) => {
        if(this.state.outputDevise !== this.state.inputDevise){
            this.setState({displayResult: 0});
            if(this.state.inputVal.match(/^([0-9]+)$/) != null){
                this.setState({className: "valid"});
                console.log("bon"); 
                fetch("https://api.exchangeratesapi.io/latest?symbols="+this.state.outputDevise+"&base="+this.state.inputDevise)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                        resultat: result
                    });
                    this.setState({displayResult: this.state.inputVal * result["rates"][this.state.outputDevise]})
                })
            }
            else{
                this.setState({displayResult: "N'entrez que des chiffres"});
                this.setState({className: "invalid"});
            }
        }
        else{
            this.setState({displayResult: "Devise identique !"});
            this.setState({className: "invalid"});
        }
};
        

    
    render(){
        return(
            
            <div className="App">
            <header>
                <nav className="AppBar">
                <img
                    className="AppBar-logo"
                    src={logo}
                    aria-label="people"
                    alt="People"
                />
                </nav>
            </header>
            <main>
                <div className="container">
                <div className="row">
                    <h3>Convertisseur</h3>
                    <div className="col s8">
                    <div className="row">
                        <div className="col s6">
                        <select
                            defaultValue="EUR"
                            className="browser-default"
                            name="inputDevises"
                            id="inputDevises" 
                            onChange={this.handleInPutDevisesChange}>
                            <option value="EUR">EUR</option>
                            <option value="CHF">CHF</option>
                            <option value="GBP">GBP</option>
                            <option value="USD">USD</option>
                        </select>
                        </div>
                        <div className="col s6">
                        <select
                            defaultValue="USD"
                            className="browser-default"
                            name="outputDevises"
                            id="outputDevises" onChange={this.handleOutPutDevisesChange}>
                            <option value="EUR">EUR</option>
                            <option value="CHF">CHF</option>
                            <option value="GBP">GBP</option>
                            <option value="USD">USD</option>
                        </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="amount" type="text" className={this.state.className} value={this.state.inputVal} onChange={this.handleMontantChange}/>
                        <span
                            className="helper-text"
                            data-error="Erreur"
                            data-success="Valide"
                        ></span>
                        <label htmlFor="amount">Montant</label>
                        </div>
                        
                        <div className="input-field col s12">
                        <h5>Résultat : {this.state.displayResult}</h5>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </main>
            </div>
            
        )
    }
}