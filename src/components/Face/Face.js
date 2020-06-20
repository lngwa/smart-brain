import React from 'react';
import './Face.css';

const Face = ({imgUrl, regions}) => {
	const boxes = regions.map((region, i) => {
		return (<div key= {i} className='bounding_box' 
					style = {{
								top: region.topRow, 
								right: region.rightCol, 
								bottom: region.bottomRow, 
								left: region.leftCol
							}}
					></div>);
	});
	return (
			<div className='center ma'>
				<div className='absolute mt2'>
					{imgUrl.length > 0 ? <img id='inputimage' alt="Face" src={imgUrl} width='500px' height='auto'/> : ''}
					{boxes}
				</div>
			</div>
		);
}

export default Face;