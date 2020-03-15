import React, { Component } from 'react';
import Data from '../data/Rule.json';
class List extends Component{


	constructor(props){
		super(props);
		this.state = {
			size: 10,
			start: 0,
			currentPage: 1,
			totalPages: 0,
			data: [...Data.data]
		}
		this.colorArray = ['#e74c3c', '#2c3e50', '#7f8c8d', '#d35400', '#f1c40f', '#2c2c54', '#c0392b', '#ffb142', '#227093', '#ff793f'];
	}

	componentDidMount(){
		let totalLength = this.state.data.length;
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

	startDrag = data => (event)=>{
		let fromBox = JSON.stringify({id: data.id});
		event.dataTransfer.setData('dragContent', fromBox);
	}

	dragOver = data => (event) =>{
		event.preventDefault();
		return false;
	}

	swapBox = (fromBox, toBox) =>{
			let data = this.state.data.slice();
			let fromIndex = -1;
			let toIndex = -1;

			 for (let i = 0; i < data.length; i++) {
					if (data[i].id === fromBox.id) {
						fromIndex = i;
					}
					if (data[i].id === toBox.id) {
						toIndex = i;
					}
				}

				if (fromIndex != -1 && toIndex != -1) {
					let { fromId, ...fromRest } = data[fromIndex];
					let { toId, ...toRest } = data[toIndex];
					data[fromIndex] = { id: fromBox.id, ...toRest };
					data[toIndex] = { id: toBox.id, ...fromRest };
					this.setState({data: data});
				}
	}

	onDrop = data=> (event)=>{
		event.preventDefault();
		let fromBox = JSON.parse(event.dataTransfer.getData('dragContent'));
		let toBox = { id: data.id};
		this.swapBox(fromBox, toBox);
		return false;
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
				<div className="list">
					{this.state.data.slice(this.state.start, this.state.start + this.state.size).map((data, ind) => {
						return <div style={{backgroundColor: this.colorArray[ind]}} draggable="true" onDragStart={this.startDrag({
										id: data.id,ind
									})} onDragOver={ this.dragOver({
										id: data.id,
									})} onDrop={ this.onDrop({
										id: data.id,ind
									})} key={ind} className="list_item">
								<span className="list_item_id">
								 <span className="sub_head">ID:</span>	{data.id}
								</span>

								<span className="list_item_rule">
								 <span className="sub_head">Rule Name:</span>	{data.ruleName.split('_').join(' ')}
								</span>
							</div>;
					})}
				</div>
			</div>;
	}
}

export default List;