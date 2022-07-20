import * as React from 'react';
import { render } from 'react-dom';
import { json } from 'stream/consumers';
import { apiGetAllProducts, apiUpdateProduct } from '../../remote/e-commerce-api/productService';
export class UpdateProduct extends React.Component <any,any>{
   constructor(props : any){
        super(props);
            this.state = {
                prouctid:"",
                name: "",
                description: "",
                price: "",
                image: "",
                quantity: "",
                products: []
            }
        }

        componentDidUpdate(){
            this.updateList();
        }
        /*componentDidMount(){
            this.updateList();
        }*/

        updateList(){
            if(this.props.currentproductid){
                fetch("https://localhost:5000"+this.props.currentproductid)
                .then(response => response.json())
                .then(product => {this.setState({currentProduct: product})})
            }
        }

    fetchData = async () => {
        const result = await apiGetAllProducts()
        this.setState({
            products: result.payload
        })
        console.log(this.state.products)
      }
    componentDidMount(){
        this.fetchData()
    }

    submit: any = async function UpdateProduct(id: any){
        const response = await apiUpdateProduct(id)
    }
    

        handleUpdate(event: any){
            event.preventDefault()
        }

        handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            let name;
            let description;
            let price;
            let image;
            let quantity;
            const response = await apiUpdateProduct({
                productid: this.state.productid,
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                image: this.state.image,
                quantity: this.state.quantity
            })
            if(this.state.name){
                name=this.state.name;
            }else{
                name=this.state.currentProduct.name;
            }
            if (this.state.description){
                description=this.state.description;
            }else{
                description=this.state.currentProduct.description;
            }
            if(this.state.price){
                price=this.state.price;
            }
            else{
                price=this.state.currentProduct.price;
            }
            if (this.state.image){
                image=this.state.image;
            }else{
                image=this.state.currentProduct.image;
            }
            if(this.state.quantity0){
                quantity=this.state.quantity;
            }else{
                quantity=this.state.currentProduct.quantity;
            }

            /*fetch("https://localhost:5000", {
                method: "POST",
                mode: "cors",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "Productid": this.props.currentproductid,
                    "name": name,
                    "description": description,
                    "price": price,
                    "image": image,
                    "quantity": quantity
    
                })
                
            }).then (this.setState, (event: any) => ({
                msg:"The product has been updated"
            }))*/
    
            
        }

        handleChange(fieldName: any, event: any){
            this.setState({
                [fieldName]: event.target.value
            }, console.log)
        };

        render(){
            return(
                <div>
                    {this.props.currentproductid&&(console.log())}
                    <div className="contentcard">
                    <form onSubmit={(event)=>{this.handleSubmit(event)}}>
                        <h3>Changes To Be Made</h3>
                        <ol>
                            <li><label data-name="productid">ProductID: </label><input type="number" value={this.state.productid} onChange={event=>this.handleChange("productid",event)} placeholder={this.state.currentProduct}></input></li>
                            <li><label data-name="name">Name:</label><input type="text" value={this.state.name} onChange={event=>this.handleChange("name",event)} placeholder={this.state.currentProduct}></input></li>
                            <li><label data-name="description">Description: </label><textarea data-type="text" value={this.state.description} onChange={event=>this.handleChange("description", event)}placeholder={this.state.currentProduct}></textarea></li>
                            <li><label data-name="price">Price: </label><input type="number" value={this.state.price} onChange={event=>this.handleChange("price", event)} placeholder={this.state.currentProduct}></input></li>
                            <li><label data-name="image">Image: </label><input type="text" value={this.state.image} onChange={event=>this.handleChange("image", event)} placeholder={this.state.currentProduct}></input></li>
                            <li><label data-name="quantity">Quantity: </label><input type="number" value={this.state.quantity} onChange={event=>this.handleChange("quantity", event)} placeholder={this.state.currentProduct}></input></li>
                        </ol>
                        <div><button type="submit">Update Product</button></div>
                    </form>
                    </div>
        
                </div>
            )
        }
    }