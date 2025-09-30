/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'primary-foreground': '#FFFFFF',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			'secondary-foreground': '#0F172A',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			'accent-foreground': '#FFFFFF',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			'destructive-foreground': '#FFFFFF',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			'muted-foreground': '#64748B',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': '#0A0A0A',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			'poap-purple': '#6366f1',
  			'poap-pink': '#ec4899',
  			'poap-blue': '#3b82f6',
  			'poap-indigo': '#8b5cf6',
  			'poap-gray': {
  				'50': '#fafafa',
  				'100': '#f5f5f5',
  				'200': '#e5e5e5',
  				'300': '#d4d4d4',
  				'400': '#a3a3a3',
  				'500': '#737373',
  				'600': '#525252',
  				'700': '#404040',
  				'800': '#262626',
  				'900': '#171717'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'sans-serif'
  			],
  			serif: [
  				'Inter',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'Menlo',
  				'Monaco',
  				'monospace'
  			]
  		},
  		backgroundImage: {
  			'gradient-poap': 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
  			'gradient-purple': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  			'gradient-pink': 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
  			'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  			'gradient-subtle': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  		},
  		typography: {
  			DEFAULT: {
  				css: {
  					color: '#0A0A0A',
  					maxWidth: 'none',
  					h1: {
  						color: '#0A0A0A',
  						fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  						fontWeight: '800',
  						fontSize: '3rem',
  						lineHeight: '1.1'
  					},
  					h2: {
  						color: '#0A0A0A',
  						fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  						fontWeight: '700',
  						fontSize: '2rem'
  					},
  					h3: {
  						color: '#0A0A0A',
  						fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
  						fontWeight: '700',
  						fontSize: '1.5rem'
  					},
  					strong: {
  						color: '#0A0A0A',
  						fontWeight: '700'
  					},
  					code: {
  						color: '#7C3AED',
  						backgroundColor: '#F8FAFC',
  						padding: '0.125rem 0.375rem',
  						borderRadius: '0.5rem',
  						fontFamily: 'JetBrains Mono, Menlo, Monaco, monospace',
  						fontSize: '0.875em',
  						fontWeight: '600',
  						border: '1px solid #E2E8F0'
  					},
  					'code::before': {
  						content: ''
  					},
  					'code::after': {
  						content: ''
  					},
  					pre: {
  						backgroundColor: '#F8FAFC',
  						color: '#0A0A0A',
  						border: '1px solid #E2E8F0',
  						borderRadius: '1rem',
  						padding: '1.5rem'
  					},
  					'pre code': {
  						backgroundColor: 'transparent',
  						padding: '0',
  						color: 'inherit',
  						border: 'none'
  					},
  					blockquote: {
  						color: '#64748B',
  						borderLeftColor: '#7C3AED',
  						backgroundColor: '#F8FAFC',
  						padding: '1.5rem 2rem',
  						borderRadius: '1rem',
  						borderLeftWidth: '4px'
  					},
  					a: {
  						color: '#7C3AED',
  						textDecoration: 'none',
  						fontWeight: '600',
  						'&:hover': {
  							color: '#EC4899',
  							textDecoration: 'underline'
  						}
  					},
  					ul: {
  						color: '#0A0A0A'
  					},
  					ol: {
  						color: '#0A0A0A'
  					},
  					li: {
  						color: '#0A0A0A'
  					},
  					p: {
  						color: '#475569',
  						lineHeight: '1.7',
  						fontSize: '1.125rem'
  					}
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require('@tailwindcss/typography'), require("tailwindcss-animate")],
}