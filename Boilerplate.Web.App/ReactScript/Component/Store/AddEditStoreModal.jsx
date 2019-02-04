import React, { Component } from 'react';
import { Button, Icon, Form } from 'semantic-ui-react'

const addressRegex = RegExp(/^[a-zA-Z0-9\x20!@#&()\\-`.+,/\"]*$/);
const nameRegex = RegExp(/^[a-zA-Z0-9\x20&]*$/);

const formValid = formErrors => {

    let valid = true;

    Object.values(formErrors).forEach(val => {

        val.length > 0 && (valid = true);

    });
    return valid;
};


export class AddEditStoreModal extends Component {

    constructor(props) {

        super(props);

        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {

            name: '',

            address: '',

            id: '',
            formErrors: {

                name: "",

                address: "",

            }
        }

    };

    componentWillReceiveProps(nextProps) {

        this.setState({

            id: nextProps.id,

            name: nextProps.name,

            address: nextProps.address,

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
                    if (!nameRegex.test(value))
                        formErrors.name = "Please enter characters from (a-z, A-Z, 0-9, and &)";
                    else {
                        if (value.length < 3)
                            formErrors.name = "Please enter minimum 3 characters.";
                        else
                            formErrors.name = "";
                    }
                }
                break;

            case "address":
                if (value.length < 1)
                    formErrors.address = "This is a required field.";
                else {
                    if (!addressRegex.test(value))
                        formErrors.address = "Please enter characters from ([a-zA-Z0-9!@#&()-.+,/\"])";
                    else {
                        if (value.length < 3)
                            formErrors.address = "Please enter minimum 3 characters.";
                        else
                            formErrors.address = "";
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

            var customerdata = {
                'id': this.state.id,
                'name': this.state.name,
                'address': this.state.address,

            }
            $.ajax({
                url: "/Store/CreateUpdate",
                dataType: 'json',
                contentType: 'application/json',
                type: 'GET',
                data: customerdata,
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

                            <h3 className="modal-title" id="addEditModalLabel">Store Detail</h3>

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
                                    <div className="address">

                                        <label htmlFor="address">Address</label>

                                        <input

                                            className={formErrors.address.length > 0 ? "error" : null}

                                            placeholder="Address"

                                            type="text"

                                            name="address"

                                            value={this.state.address}

                                            noValidate

                                            onChange={this.handleChange}

                                        />

                                        {formErrors.address.length > 0 && (

                                            <span className="errorMessage">{formErrors.address}</span>

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

export default AddEditStoreModal;


