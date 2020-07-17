import React, { Component } from 'react';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { Modal } from 'semantic-ui-react';


export default class ModalContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price: '',           

        };
       
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }
    onCancel() {
        this.props.handleClose()
    }
   

    onSubmit(e) {
        e.preventDefault();


  

            var data = {
                'id': this.state.id,
                'name': this.state.name, 'price': this.state.price
            };

            $.ajax({
                url: "/Product/CreateUpdate",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Sucess: data })
                    this.props.handleClose()
                }.bind(this)

            });

        }

    


    render() {

        return (

           

            <div className="ui container">
                <div className="ui form ">
                   
                        <div className="field">
                            <input type="hidden" value={this.state.id} />
                        </div>
                       
                        <div className="field">
                            <label> Name</label>
                                <input
                                    placeholder='Name'

                                type="text"

                                    name="name"


                                value={this.state.name}

                                noValidate

                                onChange={this.onChange}

                            />
                        </div>

                        <div className="field">
                            <label> Price</label>
                            <input

                                placeholder="Price"

                                type="text"

                                name="price"

                                value={this.state.price}

                                noValidate

                                onChange={this.onChange}

                            />

                        </div>
                        <button className="ui button" type="submit" onClick={this.onSubmit} >Save</button>
                        <button className="ui button" type="submit" onClick={this.onCancel} >Cancel</button>
                    </div>

                </div>
               
            


            

        )
    }

}
