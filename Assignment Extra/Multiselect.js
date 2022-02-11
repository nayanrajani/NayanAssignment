import React, { Component } from 'react';



class Multiselect extends Component {

  constructor() {

    super();

    this.state = {

      categories: [

        {id: 1, value: "PHP"},

        {id: 2, value: "Laravel"},

        {id: 3, value: "Angular"},

        {id: 4, value: "React"}

      ],

      selCategories: 'php'

    };

       

    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

  }

     

  handleChange(event) {

    

    const selected=[];

    let selectedOption=(event.target.selectedOptions);

 

    for (let i = 0; i < selectedOption.length; i++){

        selected.push(selectedOption.item(i).value)

    }

  

    this.setState({selCategories: selected});

  }

      

  handleSubmit(event) {

    console.log(this.state);

    event.preventDefault();

  }

      

  render() {

    return (

      <div>

        <h1>React Select Dropdown onChange Example - HDTuto.com</h1>

        <form onSubmit={this.handleSubmit}>

            

          <strong>Select Category:</strong>

          <select multiple onChange={this.handleChange.bind(this)}>

           {

            this.state.categories.map(item => (

               <option value={item.id}>{item.value}</option>

             ))

          }

          </select>

    

          <input type="submit" value="Submit" />

        </form>

      </div>

    );

  }

}

export default Multiselect;