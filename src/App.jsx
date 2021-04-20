import React from 'react';
import { extendObservable, action } from 'mobx';
import { observer } from 'mobx-react';
import './App.scss';
import Modal from './components/modal/Modal.tsx';

export default observer(class App extends React.Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      surname: '',
      isNameInvalid: false,
      isSurnameInvalid: false,
      isModalOpen: false,
      get text() {
        return `Здравствуйте, ${this.name.toUpperCase()} ${this.surname.toUpperCase()}`;
      },
      setNameInvalid: action((value) => {
        this.isNameInvalid = value;
      }),
      setSurnameInvalid: action((value) => {
        this.isSurnameInvalid = value;
      }),
      setModalOpen: action((value) => {
        this.isModalOpen = value;
      }),
      onCancel: action(() => {
        this.isModalOpen = false;
      }),
      onChangeInput: action((name, value) => {
        this[name] = value;
      })
    });
  }

  onSubmit = () => {
    let { name, surname } = this;
    name = name.trim();
    surname = surname.trim();
    if (!name.length) { this.setNameInvalid(true); } else { this.setNameInvalid(false); }
    if (!surname.length) { this.setSurnameInvalid(true); } else { this.setSurnameInvalid(false); }
    if (name.length && surname.length) {
      this.setModalOpen(true);
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.onChangeInput(name, value);
  };

  render() {
    const { name, surname } = this;

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="input-wrapper">
              <input
                name="name"
                onChange={this.onChange}
                value={name}
                type="text"
                placeholder="Имя"
                className="textfield"
                autoComplete="off"
              />
              {this.isNameInvalid && <div className="error">Введите имя!</div>}
            </div>
            <div className="input-wrapper">
              <input
                name="surname"
                onChange={this.onChange}
                value={surname}
                type="text"
                placeholder="Фамилия"
                className="textfield"
                autoComplete="off"
              />
              {this.isSurnameInvalid && <div className="error">Введите фамилию!</div>}
            </div>
          </div>
          <div className="row"><button className="btn" onClick={this.onSubmit}>Готово</button></div>
        </div>
        { this.isModalOpen && <Modal text={this.text} onCancel={this.onCancel} />}
      </>
    );
  }

}
);
