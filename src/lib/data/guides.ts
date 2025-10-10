import windowsLogo from '$lib/assets/windows_logo.svg';
import appleLogo from '$lib/assets/apple_logo.svg';
import androidLogo from '$lib/assets/android_logo.svg';
import fireTVLogo from '$lib/assets/firetv_logo.png';

export const platformData = [
	{ src: windowsLogo, alt: 'Windows logo', width: '30em' },
	{ src: appleLogo, alt: 'Apple logo', width: '30em' },
	{ src: androidLogo, alt: 'Android logo', width: '30em' },
	{ src: fireTVLogo, alt: 'Fire TV logo', width: '60em' }
];

export const guides = [
	{
		title: 'Free Music Premium',
		platforms: [true, true, true, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Paid Mobile Apps for Free',
		platforms: [false, true, true, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Paid PC Games for Free',
		platforms: [true, false, false, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'All Movies and TV Shows for Free',
		platforms: [true, true, true, true],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Modded YouTube',
		platforms: [true, true, true, true],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Modded Instagram',
		platforms: [false, true, true, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Modded TikTok',
		platforms: [false, true, true, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Modded Snapchat',
		platforms: [false, false, true, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Games with Everything Unlocked',
		platforms: [false, true, true, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Best Free Ad Blockers',
		platforms: [true, true, true, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Unblock Apps & Sites on School WiFi',
		platforms: [true, true, true, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	},
	{
		title: 'Play Nintendo Switch Games on PC',
		platforms: [true, false, false, false],
		windowsSteps: [],
		iPhoneSteps: [],
		androidSteps: [],
		fireTVSteps: []
	}
];
