import React, { Component } from 'react';
import Data from '../data/Rule.json';
class List extends Component{


	constructor(props){
		super(props);
		this.state = {
			size: 5,
			start: 0,
			currentPage: 1,
			totalPages: 0
		}
	}

	componentDidMount(){
		let totalLength = Data.data.length;
		let totalPages = totalLength/this.state.size;
		if((totalLength%this.state.size) == 0){
			totalPages += 1;
		}
		this.setState({
			totalPages: totalPages
		})
	}

	increase = () =>{
		this.setState({
			start: this.state.currentPage * this.state.size,
			currentPage: this.state.currentPage + 1
		})
	}
	decrease  = () =>{
		this.setState({
			start : (this.state.currentPage - 2) * this.state.size,
			currentPage: this.state.currentPage - 1
		})
	}
	
	render(){
		return <div className="list_card">
				<div className="pagination">
					<div className="pagination_action">
						<button disabled={this.state.currentPage == 1} onClick={this.decrease} className="btn">
							{'<'}
						</button>
						<span className="btn">
							{this.state.currentPage}
						</span>
						<button disabled={this.state.currentPage == this.state.totalPages} onClick={this.increase} className="btn">
							{'>'}
						</button>
					</div>
				</div>
				<ul className="list">
					{Data.data.slice(this.state.start, this.state.start + this.state.size).map((data, ind) => {
						return <li key={ind} className="list_item">
								<span className="list_item_id">
									{data.id}
								</span>
								<span className="list_item_rule">
									{data.ruleName.split('_').join(' ')}
								</span>
							</li>;
					})}
				</ul>
			</div>;
	}
}

export default List;