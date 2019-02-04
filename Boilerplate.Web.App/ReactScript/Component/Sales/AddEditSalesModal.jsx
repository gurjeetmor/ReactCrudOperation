import React, { Component } from 'react';
import { Button, Icon, Form, Select } from 'semantic-ui-react'



export class AddEditSalesModal extends Component {

    constructor(props) {

        super(props);

        this.state = {

            customer: [],

            product: [],

            store: [],
            id:0,
            dateSold: '',
            customerId: '',
            productId: '',
            storeId: '',
            errors: {}
        }
        this.handleSave = this.handleSave.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadCustomers = this.loadCustomers.bind(this);
        this.loadProducts = this.loadProducts.bind(this);
        this.loadStores = this.loadStores.bind(this);

    };
    componentDidMount() {
        this.loadCustomers();
        this.loadProducts();
        this.loadStores();
    }

    componentWillReceiveProps(nextProps) {

        this.setState({

            id: nextProps.id,

            customerId: nextProps.customerId,

            productId: nextProps.productId,

            storeId: nextProps.storeId,

            dateSold: nextProps.dateSold,

        });
    }
    validateForm() {

        let errors = {}
        let formIsValid = true
        if (!this.state.ProductId) {
            formIsValid = false;
            errors['productId'] = '*Please select product*'
        }
        if (!this.state.StoreId) {
            formIsValid = false;
            errors['storeId'] = '*Please select store*'
        }
        if (!this.state.CustomerId) {
            formIsValid = false;
            errors['customerId'] = '*Please select customer *'
        }
        this.setState({
            errors: errors
        });
        return formIsValid
    }
    loadCustomers() {
        $.ajax({
            url: "/Customer/GetData",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ customer: data });

            }.bind(this)

        });
    }
    loadProducts() {
        $.ajax({
            url: "/Product/GetData",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ product: data });

            }.bind(this)

        });
    }
    loadStores() {
        $.ajax({
            url: "/Store/GetData",
            type: "GET",
            dataType: 'json',
            ContentType: 'application/json',
            success: function (data) {
                this.setState({ store: data });

            }.bind(this)

        });
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => console.log(this.state));
    }

    handleSave() {     
       
        const item = this.state;

        this.props.saveModalDetails(item);
   
        var salesdata = {
            'id': this.state.id,
            'dateSold': this.state.dateSold,
            'customerId': this.state.customerId,
            'productId': this.state.productId,
            'storeId': this.state.storeId,

        }  
        
            $.ajax({
                url: "/Sales/CreateUpdate",
                dataType: 'json',
                contentType: 'application/json',
                type: 'GET',
                data: salesdata,
                success: function (json) {

                    if (json.isRedirect) {
                        window.location.href = json.redirectUrl;
                    }

                }.bind(this),
                error: function (xhr, status, err) {
                    alert(err);
                }.bind(this),

            });
      

    }

    render() {

        let CustomerList = [{ id: '', name: 'Select Customer' }].concat(this.state.customer)
        let ProductList = [{ id: '', name: 'Select Product' }].concat(this.state.product)
        let StoreList = [{ id: '', name: 'Select Store' }].concat(this.state.store) 
       
        return (

            <div className="modal fade" id="addEditModal" tabIndex="-1" role="dialog" aria-labelledby="addEditModalLabel" aria-hidden="true">

                <div className="modal-dialog" role="document">

                    <div className="modal-content">

                        <div className="modal-header">

                            <h3 className="modal-title" id="addEditModalLabel">Sales Detail</h3>

                        </div>

                        <div className="modal-body">
                            <Form noValidate>
                                <input type="hidden" value={this.state.id} />
                                <Form.Field>
                                    <div className="dateSold">

                                        <label htmlFor="dateSold">Date Sold</label>

                                        <input
                     
                                            placeholder="Date Sold"

                                            type="date"

                                            name="dateSold"

                                            value={this.state.dateSold}

                                            onChange={this.handleChange}

                                        />  
                                        <div>
                                            {this.state.errors.dateSold}
                                        </div>
                                    </div>
                                </Form.Field>

                                <Form.Field>
                                    <div className="customerId"> 

                                        <label htmlFor="customerId">Customer</label>

                                            <select name="customerId" onChange={this.handleChange} value={this.state.customerId}>

                                                {CustomerList.map((Customer) => <option key={Customer.id} value={Customer.id}>{Customer.name}</option>)}
                                            </select>
                                        <div>
                                            {this.state.errors.customerId}
                                            </div>
                                        
                                   </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="productId">

                                        <label htmlFor="productId">Product</label>

                                        
                                            <select name="productId" onChange={this.handleChange} value={this.state.productId}>

                                                {ProductList.map((Product) => <option key={Product.id} value={Product.id}>{Product.name}</option>)}
                                            </select>
                                        <div>
                                            {this.state.errors.productId}
                                        </div>

                                    </div>
                                </Form.Field>
                                <Form.Field>
                                    <div className="storeId">

                                        <label htmlFor="storeId">Store</label>
                                      
                                            <select name="storeId" onChange={this.handleChange} value={this.state.storeId}>

                                                {StoreList.map((Store) => <option key={Store.id} value={Store.id}>{Store.name}</option>)}
                                            </select>
                                        <div>
                                            {this.state.errors.storeId}
                                        </div>
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

export default AddEditSalesModal;

