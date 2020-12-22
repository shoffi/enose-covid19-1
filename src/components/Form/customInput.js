import React, { Component } from "react";
import Keyboard from 'react-simple-keyboard';
import '../../styles/keyboard.css'

class Input extends Component {
  constructor(props) {
    super(props);

    this.toggleKeyboard = this.toggleKeyboard.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    layoutName: "numeric",
    input: this.props.value,
    isFocus: false
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  toggleKeyboard() {
    this.setState({ isFocus : true })
    // alert('You click input')
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      // alert('You clicked outside of me!');
      this.setState({ isFocus : false })
    }
  }

  onChange = input => {
    this.setState({ input });
    console.log("Input changed", input);
    this.props.onchange(input);
  };

  onChangeInput = event => {
    const input = event.target.value;
    this.setState({ input });
    this.keyboard.setInput(input);
  };

  render() {
    return (
      <div className="relative">
        <label className="block font-semibold text-brand-green mb-1">{ this.props.label }</label>
        <div className="relative">
          <input
            type="text"
            value={ this.state.input }
            placeholder={ this.props.label }
            onChange={ this.onChangeInput }
            onClick={ this.toggleKeyboard }
            className="w-full text-lg font-semibold pl-2 pr-10 py-1 bg-gray-200 placeholder-gray-400 outline-none border-4 border-gray-200 focus:border-brand-orange rounded-lg"
            required={this.props.required ? this.props.required : false}
          />
          <p className="absolute mx-3 text-sm text-gray-600 flex items-center inset-y-0 right-0">{ this.props.unit }</p>
        </div>
        {this.state.isFocus && (<div
        ref={this.setWrapperRef}
        className="absolute w-full mt-2 z-10">
          <Keyboard
            keyboardRef = {r => (this.keyboard = r)}
            layoutName = {this.state.layoutName}
            onChange = {this.onChange}
            onKeyPress = {this.onKeyPress}
            layout = {{
              numeric: [
                "1 2 3",
                "4 5 6",
                "7 8 9",
                ". 0 {bksp}",
              ]
            }}
            display = {{
              '{bksp}': 'Hapus',
            }} />
        </div>)}
      </div>
    )
  }
}
export default Input;