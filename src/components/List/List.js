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
        localStorage.setItem('list'+ Math.random(), JSON.stringify(this.state.list))
        window.location.reload();
    }

    clearAll = () => {
        localStorage.clear()
        window.location.reload();
    }

    checked = (e) =>{
        // if(e.target.checked){
        //     e.target.parentNode.style.color = 'green'
        // }
        e.target.checked ? e.target.parentNode.style.color = 'green' : e.target.parentNode.style.color = 'black'
    }

    render(){
        return(
            <div className="list">
                <input onKeyPress={this.keyPress} type="text" />
                <ul className="list-group">
                    {this.state.list.map((item, index) =>
                        <li className="list-group-item" key={index}>{item} - <button className="btn btn-danger" value={index} onClick={this.delete}>Supprimer</button></li>

                    )}
                </ul>
                <button className="btn btn-success" onClick={this.save}>Save</button>
                <div>
                {Object.keys(localStorage).map(key =>
                    <table key={key}>{key} : {JSON.parse(localStorage[key]).map((underList, i) => 
                        <tbody>
                            <tr key={i}>{underList} <input onChange={this.checked} type="checkbox" /></tr>
                        </tbody>
                    )}
                    <button className="btn btn-danger" value={key} onClick={this.deleteSaved}>Supprimer</button> </table>
                )}
                </div>
                <button className="btn btn-danger" onClick={this.clearAll}>Tout supprimer</button>
            </div>
        )
    }
}

export default List;