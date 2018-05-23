import React , { Component } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'
import Product from './../Product'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles :[],
            nextPage : 1 ,
            hasMore : true
        }
    }



handleLoadMore() {
    axios.get(`http://roocket.org/api/products?page=${this.state.nextPage}`)
    .then(response =>{
        const { current_page ,last_page, data} = response.data.data
        this.setState(prevState =>({
            articles: [...prevState.articles , ...data],
            hasMore : current_page !== last_page,
            nextPage : current_page + 1

        }))
    })
    .catch(error =>{
        console.log(error)
    }
    )
}   

  render() {
    return(

        <div>
            <div className="jumbotron rtl">
                <h2>با سلام</h2>
                  <p>من علی مناپور هستم و عاشق برنامه نویسی!من میخواهم ری اکت رو یاد بگیرم بعد برم سراغ نود جی اس و در ادامه ری اکت نیتیو!</p>
            </div>      
           
               <InfiniteScroll 
                    className="row rtl"
                    pageStart={0}
                    loadMore={this.handleLoadMore.bind(this)}
                    hasMore={ this.state.hasMore}
                    loader={<div className="loader">Loading... </div>}
                >    
                    {this.state.articles.map((product , index)=> <Product product={product} key={index} />)}
                </InfiniteScroll>
           
                      
        </div>    
    )
  }
}