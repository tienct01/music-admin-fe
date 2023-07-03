import React from 'react';

const CardBox = ({ col = 6, children }) => {
	return (
		<div
			className={`flex flex-col col-span-full sm:col-span-${col} bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700`}
		>
			{children}
		</div>
	);
};

export default CardBox;
