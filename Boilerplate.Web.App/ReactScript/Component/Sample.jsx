import React, { Component } from 'react';
import { Button, Confirm, Modal, Icon, Header } from 'semantic-ui-react';

class Sample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    open() {
        this.setState({ open: true })
    }
    close() {
        this.setState({ open: false })
    }
    render() {
        return (
            <div>
                <Modal open={this.state.open} trigger={<Icon name='tags' />} >
                    <Modal.Header>
                        <div>
                            <Header floated='left'>Title</Header>
                            <Button floated='right'>A Button</Button>
                        </div>
                    </Modal.Header>
                    <Modal.Content>

                        <p>Hello</p>

                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
    

//import React from 'react';
////import AddEditProductModal from './AddEditProductModal';
////import DeleteProductModal from './DeleteProductModal';
//import { Button, Header, Image, Modal } from 'semantic-ui-react';

//import ModalContent from './ModalContent';

//export class Sample extends React.Component {
//    constructor(props) {
//        super(props);
//        this.state = {
//            show: false,
//            product: [
//                {
//                    id: '', name: '', price: '',
//                }
//            ],
//            productId: 0,
//        };
//        this.showModal = this.showModal.bind(this);
//        this.hideModal = this.hideModal.bind(this);
//        this.loadData = this.loadData.bind(this);
//    }
   
   

//    showModal(id) {
//        this.setState({ show: true, productId: id });
//    };

//    hideModal(){
//        this.setState({ show: false });
//    };

   
//    componentDidMount() {
        
//        this.loadData();
      
       
//    }
   
//    //updateModal(id) {

//    //    this.setState({

//    //        showUpdate: true, showCreate: false, productId: id

//    //    });

//    //}

//    //createModal() {

//    //    this.setState({

//    //        showCreate: true, showUpdate: false, productId: 0
//    //    });

//    //}

//    //deleteModal(id) {
//    //    this.setState({

//    //        showDelete: true, showUpdate: false, showCreate: false, productId: id
//    //    });
//    //}

//    //saveModalDetails(item) {

//    //    const productId = this.state.productId;

//    //    let tempdata1 = this.state.product;

//    //    tempdata1[productId] = item;

//    //    this.setState({ product: tempdata1 });

//    //}

//    loadData() {
//        $.ajax({
//            url: "/Product/GetData",
//            type: "GET",
//            dataType: 'json',
//            ContentType: 'application/json',
//            success: function (data) {
               
//                    this.setState({ product: data });
              

//            }.bind(this)

//        });
//    }

//    render() {
//        let productList = this.state.product;
//        let tableData = null;
//        const productId = this.state.productId;
//        let modalData = this.state.product[productId];
//        let popup = null;

//        if (productList != "") {
//            tableData = productList.map((item, index) => (
//                <tr key={index}>
//                    <td className="two wide">{item.name}</td>
//                    <td className="two wide">{item.price}</td>
//                    <td className="two wide">

//                        < Button icon labelPosition='left' color='yellow' onClick={this.showModal.bind(this, index)}>EDIT</Button>
                              
                        
                                
//                    </td>
                    
//                </tr>
//            )
//            )
//        }
//        if (this.state.show) {
//            popup = <ModalContent show={this.state.show} handleClose={this.hideModal} 
               
//                id={modalData.id}

//               name={modalData.name}

//               price={modalData.price}

//            />
               
                
            
//        }
       
//        //if (this.state.showDelete) {

//        //    popup = <DeleteProductModal
//        //        id={modalData.id}

//        //        saveModalDetails={this.saveModalDetails}

//        //    />
//        //}

//        //if (this.state.showCreate) {
//        //    popup = <AddEditProductModal
//        //        id=''

//        //        name=''

//        //        price=''

//        //        saveModalDetails={this.saveModalDetails}

//        //    />
//        //}
//        //if (this.state.showUpdate) {
//        //    popup = < AddEditProductModal
//        //        id={modalData.id}

//        //        name={modalData.name}

//        //        price={modalData.price}

//        //        saveModalDetails={this.saveModalDetails}

//        //    />
//        //}
//        const display = {
//            display: 'block'
//        };
//        const hide = {
//            display: 'none'
//        };


//        return (
//            <React.Fragment>
//                <div>

//                    <table className="ui striped table">
//                        <thead>
//                            <tr>
//                                <th className="two wide">Name</th>
//                                <th className="two wide">Price</th>
//                                <th className="two wide">Action</th>
//                                <th className="two wide">Action</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                            {tableData}
//                        </tbody>
//                    </table>
//                    <div className="modal" style={this.state.toggle ? display : hide}>

//                        <div className="modal-content">

//                            {popup}
//                        </div>

//                    </div>
                    
                    
//                </div>
              
                
               
//            </React.Fragment>
//        );
//    }
//}

export default Sample;
