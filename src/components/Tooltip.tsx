interface TooltipProps {
	title: string;
	children: React.ReactNode;
}

export function Tooltip({ title, children }: TooltipProps) {
	return (
		<div className='relative flex items-center group'>
			{children}
			<div className='absolute bottom-0 hidden items-center justify-center mb-11 group-hover:flex transition-all'>
				<div className='relative z-10 p-1 flex justify-center text-xs font-medium leading-none text-zinc-900 bg-zinc-100 shadow-lg rounded-md w-[84px] h-5'>
					<span>{title}</span>
				</div>
			</div>
		</div>
	);
}
