import React from 'react';
import SiteTitle from './sitetitle'
import WithHook from './hoc';
import axios from 'axios';

class Checkout extends React.Component {

    constructor(props){
        super(props);
        this.state={
            name:'',
            number:'',
            city:''
        }
    }

    updateValue = (event) => {
        
        this.setState({
            [event.target.id]: event.target.value
        });
       
    }

    checkout = (e) =>{
        e.preventDefault();

        let api= "http://localhost:5000/checkout";
        let form = new FormData();

        form.append('name',this.state.name);
        form.append('mobile_number',this.state.number);

        axios({
            url:api,
            method:'post',
            responseType:'json',
            headers:{'Content-Type' : 'application/json'}
        }).then((response) =>{
            console.log(response.data)
        })
        
    }
    render() {
        return (
            <>
                <SiteTitle title="Checkout" />
                <div className="container my-5">
                    <h2 className="mb-4">Checkout Form</h2>
                    <form onSubmit={this.checkout}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your full name"
                                required
                                value={this.state.name}
                                onChange={(e) => {this.updateValue(e)}}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="mnumber" className="form-label">Mobile Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                id="mnumber"
                                placeholder="Enter your mobile number"
                                required

                                value={this.state.number}
                                onChange={(e)=>this.updateValue(e)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                placeholder="Enter your city"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        );
    }
}

export default WithHook(Checkout);
