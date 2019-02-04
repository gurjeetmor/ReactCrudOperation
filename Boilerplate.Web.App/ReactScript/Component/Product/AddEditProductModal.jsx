import React, { Component } from 'react';
import { Button, Icon, Form } from 'semantic-ui-react';


const numberRegex = RegExp(/^[0-9]*$/);
const charRegex = RegExp(/^[a-zA-Z\x20]*$/);

const formValid = formErrors => {

    let valid = true;

    Object.values(formErrors).forEach(val => {

        val.length > 0 && (valid = true);

    });
    return valid;
};


export class AddEditProductModal extends Component {

    constructor(props) {

        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {

            name: '',

            price: '',

            id: '',
            formErrors: {

                name: "",

                price: "",

            }
        }

    };

    componentWillReceiveProps(nextProps) {

        this.setState({

            id: nextProps.id,

            name: nextProps.name,

            price: nextProps.price,

        });
    }

    handleChange(e) {

        e.preventDefault();

        const { name, value } = e.target;

        let formErrors = this.state.formErrors;

        switch (name) {

            case "name":
                if (value.length < 1)
                    formErrors.name = "This is a required field.";
                else {
                    if (!charRegex.test(value))
                        formErrors.name = "Please enter characters only";
                    else {
                        if (value.length < 3)
                            formErrors.name = "Please enter minimum 3 characters.";
                        else
                            formErrors.name = "";
                    }
                }
                break;

            case "price":
                if (value.length < 1)
                    formErrors.price = "This is a required field.";
                else {
                    if (!numberRegex.test(value))
                        formErrors.price = "Please enter numbers only";
                    else {
                        if (value.length < 1)
                            formErrors.price = "Please enter minimum 1 characters.";
                        else
                            formErrors.price = "";
                    }
                }
                   
                break;

            default:

                break;

        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    }


    handleSave() {

        if (formValid(this.state)) {

            const item = this.state;
            this.props.saveModalDetails(item);

            var productdata = {
                'id': this.state.id,
                'name': this.state.name,
                'price': this.state.price,

            }
            $.ajax({
                url: "/Product/CreateUpdate",
                dataType: 'json',
                contentType: 'application/json',
                type: 'GET',
                data: productdata,
                success: function (json) {

                    if (json.isRedirect) {
                        window.location.href = json.redirectUrl;
                    }

                }.bind(this),
                error: function (xhr, status, err) {
                    alert(err);
                }.bind(this),

            });

        } else {
            console.error("FORM INVALID");
        }

    }

    render() {
        const { formErrors } = this.state;
        return (

            <div className="modal fade" id="addEditModal" tabIndex="-1" role="dialog" aria-labelledby="addEditModalLabel" aria-hidden="true">

                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h3 className="modal-title" id="addEditModalLabel">Product Detail</h3>

                        </div>

                        <div className="modal-body">
                            <Form noValidate>
                                <input type="hidden" value={this.state.id} />
                                <Form.Field>
                                    <div className="name">

                                        <label htmlFor="name">Name</label>

                                        <input

                                            className={formErrors.name.length > 0 ? "error" : null}

                                            placeholder="Name"

                                            type="text"

                                            name="name"

                                            value={this.state.name}

                                            noValidate

                                            onChange={this.handleChange}

                                        />

                                        {formErrors.name.length > 0 && (

                                            <span className="errorMessage">{formErrors.name}</span>

                                        )}

                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="price">

                                        <label htmlFor="price">Price</label>

                                        <input

                                            className={formErrors.price.length > 0 ? "error" : null}

                                            placeholder="Price"

                                            type="text"

                                            name="price"

                                            value={this.state.price}

                                            noValidate

                                            onChange={this.handleChange}

                                        />

                                        {formErrors.price.length > 0 && (

                                            <span className="errorMessage">{formErrors.price}</span>

                                        )}

                                    </div>
                                </Form.Field>

                            </Form>
                        </div>

                        <div className="modal-footer">

                            <Button color="black" data-dismiss="modal">Close</Button>

                            <Button icon labelPosition='right' color='green' data-dismiss="modal" onClick={() => { this.handleSave() }}><Icon name='times' />Save</Button>

                        </div>

                    </div>

                </div>

            </div>

        );

    }

}

export default AddEditProductModal;


