import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';


class NoteItem extends Component {

  render() {
    const { item, handleRemove } = this.props;

    return (
      <li>
        <span className="notes__item">{item.id} - { item.value }</span>
        <span
          className="notes__delete-button"
          onClick={(e) => {
            e.preventDefault();
            handleRemove(item.id);
          }}>x
        </span>
      </li>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     notes: [],
     text: '',
     loading: false,
    };
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    const value = this.state.text;

    if (! value.trim()) {
      return false;
    }

    const notes = this.state.notes;
    const newNoteId = (notes.length && notes[notes.length - 1].id + 1) || 1;

    this.setState({
      notes: notes.concat({
        id: newNoteId,
        value: value
      }),
      text: ''
    })
  }

  removeItem(id) {
    const notes = this.state.notes;

    this.setState({
      notes: notes.filter((item) => {
        return item.id !== id;
      })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h2>My daily notes</h2>
          <form
            className="form-header"
            onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              className="form-header__input"
              value={this.state.text}
              onChange={this.handleTextChange.bind(this)} />
            {/*<img src={logo} className="form-header__icon-loading" alt="loading" />*/}
          </form>
        </div>
        <ul className="notes">
          {this.state.notes.map((obj, i) => {
            return <NoteItem
                    item={obj}
                    key={i}
                    handleRemove={this.removeItem.bind(this)} />
          })}
        </ul>
      </div>
    );
  }
}

export default App;
