// @ts-nocheck
export const formatDate = (date) => {
	const newDate = new Date(date);
	return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(newDate);
};
