module.exports = {
	content: ['./src/**/*.tsx'],
	theme: {
		extend: {
			colors: {
				brand: {
					500: '#8257E5',
					300: '#996DFF',
				},
			},
			borderRadius: {
				md: '4px',
			},
		},
	},
	plugins: [require('@tailwindcss/forms'), require('tailwind-scrollbar')],
};
