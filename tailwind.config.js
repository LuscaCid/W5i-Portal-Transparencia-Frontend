/** @type {import('tailwindcss').Config} */
export default {
    important : true,
    darkMode : ['class'],
    content: [
	  "./index.html",
	  "./@/components/ui/*.tsx",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
    	extend: {
			
    		colors: {
    			'dark-text': '#3399ff',
    			'light-text': '#1280ef',
    			'darkBg': '#0f1214',
    			'bgGray': '#f6f7f9',
    			'light-blue-border': '#66b3ff',
    			'light-gray-border': '#e8eaee',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		keyframes: {
    			slideDownAndFade: {
    				from: {
    					opacity: '0',
    					transform: 'translateY(-3px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			slideLeftAndFade: {
    				from: {
    					opacity: '0',
    					transform: 'translateX(3px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			},
    			slideUpAndFade: {
    				from: {
    					opacity: '0',
    					transform: 'translateY(3px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateY(0)'
    				}
    			},
    			slideRightAndFade: {
    				from: {
    					opacity: '0',
    					transform: 'translateX(-3px)'
    				},
    				to: {
    					opacity: '1',
    					transform: 'translateX(0)'
    				}
    			}
    		},
    		animation: {
    			slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    			slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    			slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
    			slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")]
};