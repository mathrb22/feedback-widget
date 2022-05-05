import { Camera, Trash } from 'phosphor-react';
import html2canvas from 'html2canvas';
import { useState } from 'react';
import { Loading } from '../Loading';
import { Tooltip } from '../Tooltip';

interface FeedbackTypeStepProps {
	onSreenshotTook: (screenshot: string | null) => void;
	screenshot: string | null;
}

export function ScreenshotButton({
	onSreenshotTook,
	screenshot,
}: FeedbackTypeStepProps) {
	const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

	async function handleTakeScreenshot() {
		setIsTakingScreenshot(true);
		const canvas = await html2canvas(document.querySelector('html')!);
		const base64Image = canvas.toDataURL('image/png');

		setTimeout(() => {
			onSreenshotTook(base64Image);
			setIsTakingScreenshot(false);
		}, 500);
		// downloadScreenshot(base64Image);
	}

	function downloadScreenshot(base64Image: string) {
		const link = document.createElement('a');
		link.download = 'screenshot.png';
		link.href = base64Image;
		link.click();
	}

	if (screenshot) {
		return (
			<button
				type='button'
				onClick={() => onSreenshotTook(null)}
				className='p-1 w-10 h-10 rounded-md border-zinc-500 flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors'
				style={{
					backgroundImage: `url(${screenshot})`,
					backgroundPosition: 'right bottom',
					backgroundSize: 180,
				}}>
				<Trash weight='fill' />
			</button>
		);
	} else {
		return (
			<>
				<Tooltip title='Capturar tela'>
					<button
						type='button'
						disabled={isTakingScreenshot}
						onClick={handleTakeScreenshot}
						className={
							'p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500'
						}>
						{isTakingScreenshot ? <Loading /> : <Camera className='w-6 h-6' />}
					</button>
				</Tooltip>
			</>
		);
	}
}
