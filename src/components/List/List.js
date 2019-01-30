import React from 'react';

class List extends React.Component{

    constructor(){
        super();
        this.state = {list: []}
    }

    
    keyPress = (e) =>{
        if(e.key === 'Enter'){
            if(!this.state.list.includes(e.target.value)){
                this.setState({ list: [...this.state.list, e.target.value] })
                e.target.value = ''
            }else{
                window.alert('vous avez déja ajouté ette article')
            }
        }
    }

    delete = (e) =>{
        this.state.list.splice(e.target.value, 1)
        this.setState({list: this.state.list})
    }

    deleteSaved = (e) =>{
        localStorage.removeItem(e.target.value)
        window.location.reload();
        
    }

    save = (e) =>{
        localStorage.setItem('list'+ Math.random(), this.state.list)
        window.location.reload();
    }

    clearAll = () => {
        localStorage.clear()
        window.location.reload();
    }

    render(){
            console.log(localStorage)
            console.log(this.state.list)
        
        return(
            <div className="list">
                <input onKeyPress={this.keyPress} type="text" />
                <ul class="list-group">
                    {this.state.list.map((item, index) =>

                        <li class="list-group-item" key={index}>{item} - <button class="btn btn-danger" value={index} onClick={this.delete}>Supprimer</button></li>

                    )}
                </ul>
                <button class="btn btn-success" onClick={this.save}>Save</button>
                <div>
                {Object.keys(localStorage).map(key =>
                    <p key={key}>{key} : {localStorage[key]} <button class="btn btn-danger" value={key} onClick={this.deleteSaved}>Supprimer</button> </p>
                )}
                </div>
                <button class="btn btn-danger" onClick={this.clearAll}>Tout supprimer</button>
            </div>
        )
    }
}

export default List;