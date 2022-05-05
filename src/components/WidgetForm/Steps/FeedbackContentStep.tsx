import { ArrowLeft, Camera } from 'phosphor-react';
import { FormEvent, useState } from 'react';
import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../CloseButton';
import { Loading } from '../../Loading';
import { ScreenshotButton } from '../ScreenshotButton';

interface FeedbackTypeStepProps {
	feedbackType: FeedbackType;
	onFeedbackRestartRequested: () => void;
	onFeedbackSent: () => void;
}

export function FeedbackContentStep({
	feedbackType,
	onFeedbackRestartRequested,
	onFeedbackSent,
}: FeedbackTypeStepProps) {
	const feedbackTypeInfo = feedbackTypes[feedbackType];
	const [screenshot, setScreenshot] = useState<string | null>(null);
	const [comment, setComment] = useState<string | null>('');
	const [isSending, setIsSending] = useState(false);

	function handleSubmitFeedback(event: FormEvent) {
		event.preventDefault();
		console.log({ screenshot, comment });
		setIsSending(true);
		setTimeout(() => {
			setIsSending(false);
			onFeedbackSent();
		}, 600);
	}

	return (
		<>
			<header>
				<button
					type='button'
					onClick={onFeedbackRestartRequested}
					className='absolute top-5 left-5 text-zinc-400 hover:text-zinc-100'>
					<ArrowLeft weight='bold' className='w-4 h-4' />
				</button>
				<span className='text-xl leading-6 flex items-center gap-2'>
					<img
						src={feedbackTypeInfo.image.source}
						alt={feedbackTypeInfo.image.alt}
						className='w-6 h-6'
					/>
					{feedbackTypeInfo.title}
				</span>
				<CloseButton />
			</header>
			<form onSubmit={handleSubmitFeedback} className='my-4 w-full'>
				<textarea
					onChange={(event) => setComment(event.target.value)}
					className='min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin'
					placeholder='Conte com detalhes o que está acontecendo...'
				/>
				<footer className='flex gap-2 mt-2'>
					<ScreenshotButton
						onSreenshotTook={setScreenshot}
						screenshot={screenshot}
					/>
					<button
						disabled={comment?.length === 0 || isSending}
						type='submit'
						className='p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500'>
						{isSending ? (
							<span className='flex items-center justify-center gap-2 leading-6'>
								Enviando <Loading />
							</span>
						) : (
							'Enviar feedback'
						)}
					</button>
				</footer>
			</form>
		</>
	);
}
