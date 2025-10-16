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
	'Free Spotify Premium',
	'Paid Mobile Apps for Free',
	'Paid PC Games for Free',
	'All Movies and TV Shows for Free',
	'Modded YouTube',
	'Modded Instagram',
	'Modded TikTok',
	'Modded Snapchat',
	'Unblock Apps & Sites on School WiFi',
	'Play Nintendo Switch Games on PC',
	'Allow iPhone to install unofficial apps',
	'General Tips'
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
	[true, true, true, false],
	[true, false, false, false],
	[false, true, false, false],
	[true, true, true, true]
];

const descriptions = [
	'No ads just music. Enjoy! note: If you prefer youtube for music follow modded youtube guide'
];

const windowsSteps = [
	[
		'Uninstall Spotify if you already have it',
		'Go to the <a href="https://github.com/SpotX-Official/SpotX" target="_blank">SpotX Github Page</a>',
		'Scroll down until you see "Full installation" and click on dropdown',
		'Then click on "Install_Auto.bat" and it should download',
		'Once downloaded, run the file and say allow/yes to any prompts',
		"After that just let it run and it should do it all for you once it's done you should have Spotify installed",
		'Finally, open it up, login in and enjoy!'
	]
];
const iPhoneSteps = [null];
const androidSteps = [null];
const fireTVSteps = [null];

export const guides = rawGuides.map((title, i) => ({
	title,
	slug: slugify(title),
	platforms: platformsList[i] ?? [false, false, false, false],
	description: descriptions[i] ?? 'Missing Description',
	windowsSteps: windowsSteps[i] ?? ['Missing Steps'],
	iPhoneSteps: iPhoneSteps[i] ?? ['Missing Steps'],
	androidSteps: androidSteps[i] ?? ['Missing Steps'],
	fireTVSteps: fireTVSteps[i] ?? ['Missing Steps']
}));
