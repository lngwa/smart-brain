import React from 'react';


const Rank = ({name,rank}) => {
	return (
		<div className='white f3'>
		<div>{`${name}, your current rank is ...`}</div>
		<div>#{rank}</div>
		</div>
		);
}

export default Rank;