import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


// The Search Bar component
class Search extends Component {
  constructor() {
    super();
    this.state = {
      textValue: 'Wuhan',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange() {
      // two basic functions:
      // 1. Mark "typing" state
      // 2. Update state's value for further data passing

      console.log('changed!!!');
  }

  handleButtonClick() {
    // Dispatch 2 sets of data:
    // 1. State's value,
    // 2. Get Avatar

  }

  render() {
    return (
      <span className="Lora"> I wanna know the weather of
        <TextField
          id="SearchBar"
          className="TextField Lora"
          onChange={this.handleTextChange}
          inputStyle={{ textAlign: 'center',
                        fontFamily: 'Lora',
                        fontSize:20,
                        fontWeight: 'Bold'}}
          hintStyle={{ width: 'auto', textAlign: 'center' }}
          style={{ width: 'auto' }}
          defaultValue={this.state.textValue}/>
        ,
        <FlatButton
          className="SearchButton"
          label="GO!"
          labelStyle={{ fontSize: 20, fontFamily: 'Lora'}}
          />
      </span>
    );
  }
}


export default Search;
