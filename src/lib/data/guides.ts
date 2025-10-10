import windowsLogo from '../assets/windows_logo.svg';
import appleLogo from '../assets/apple_logo.svg';
import androidLogo from '../assets/android_logo.svg';
import fireTVLogo from '../assets/firetv_logo.png';

const slugify = (input: string) =>
	input
		.replace(/\s+/g, '-')
		.replace(/[^a-zA-Z0-9-]/g, '')
		.replace(/-+/g, '-')
		.replace(/^-+|-+$/g, '')
		.toLowerCase();

export const platformData = [
	{ src: windowsLogo, alt: 'Windows logo', width: '30em' },
	{ src: appleLogo, alt: 'Apple logo', width: '30em' },
	{ src: androidLogo, alt: 'Android logo', width: '30em' },
	{ src: fireTVLogo, alt: 'Fire TV logo', width: '60em' }
];

const rawGuides = [
	'Free Music Premium',
	'Paid Mobile Apps for Free',
	'Paid PC Games for Free',
	'All Movies and TV Shows for Free',
	'Modded YouTube',
	'Modded Instagram',
	'Modded TikTok',
	'Modded Snapchat',
	'Games with Everything Unlocked',
	'Best Free Ad Blockers',
	'Unblock Apps & Sites on School WiFi',
	'Play Nintendo Switch Games on PC'
];

const platformsList = [
	[true, true, true, false],
	[false, true, true, false],
	[true, false, false, false],
	[true, true, true, true],
	[true, true, true, true],
	[false, true, true, false],
	[false, true, true, false],
	[false, false, true, false],
	[false, true, true, false],
	[true, true, true, false],
	[true, true, true, false],
	[true, false, false, false]
];

export const guides = rawGuides.map((title, i) => ({
	title,
	slug: slugify(title),
	platforms: platformsList[i] ?? [false, false, false, false],
	windowsSteps: [],
	iPhoneSteps: [],
	androidSteps: [],
	fireTVSteps: []
}));
