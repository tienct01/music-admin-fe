import React from 'react';

const CustomTable = ({ thead, tbody }) => {
	return (
		<table className="table-auto w-full dark:text-slate-300">
			{/* Table header */}
			<thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">{thead}</thead>
			{/* Table body */}
			<tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">{tbody}</tbody>
		</table>
	);
};

export default CustomTable;
