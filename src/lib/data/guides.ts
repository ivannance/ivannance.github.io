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
	'All Movies and TV Shows for Free',
	'General Tips',
	'Allow iPhone to install unofficial apps',
	'Modded YouTube',
	'Modded Instagram',
	'Modded TikTok',
	'Modded Snapchat'
];

const platformsList: Record<string, boolean[]> = {
	'Free Spotify Premium': [true, true, true, false],
	'All Movies and TV Shows for Free': [true, true, true, true],
	'General Tips': [true, true, true, true],
	'Allow iPhone to install unofficial apps': [false, true, false, false],
	'Modded YouTube': [true, true, true, true],
	'Modded Instagram': [false, true, true, false],
	'Modded TikTok': [false, true, true, false],
	'Modded Snapchat': [false, false, true, false]
};

const descriptions: Record<string, string> = {
	'Free Spotify Premium':
		'No ads just music. Enjoy!<br /><span class="text-orange-400">Note: If you prefer YouTube for music, follow the <a href="/guides/modded-youtube"  data-sveltekit-reload>Modded YouTube guide</a></span>',
	'Allow iPhone to install unofficial apps':
		"Set up iPhone to install apps not from the App Store and modified apps<br /><span class='text-orange-400'>Note: this guide can be a bit tricky if you have any problems don't hesitate to reach out</span>"
};

const windowsSteps: Record<string, string[]> = {
	'Free Spotify Premium': [
		'Uninstall Spotify if you already have it.',
		'Go to the <a href="https://github.com/SpotX-Official/SpotX" target="_blank">SpotX GitHub Page</a>.',
		'Scroll down until you see "Full installation" and click on the dropdown.',
		'Then click on "Install_Auto.bat" and it should download.',
		'Once downloaded, run the file and say allow/yes to any prompts.',
		"After that, just let it run and it should do it all for you. Once it's done, you should have Spotify installed.",
		'Finally, open it up, log in, and enjoy!'
	]
};

const appleSteps: Record<string, string[]> = {
	'Free Spotify Premium': [
		'Follow my guide on how to <a href="/guides/allow-iphone-to-install-unofficial-apps" data-sveltekit-reload>Allow iPhone to install unofficial apps</a> if you haven\'t yet',
		'Open up KSign, go to "App Store" section and, once apps load, search for "Spotify" and hit "Get" on the top one',
		'When it finishes and it says "Get" again, go to the "Library" section in KSign and tap Spotify and then select "Sign & Install" and then "Start Signing"',
		'Press Install and then wait for it to say "Completed" then go to your home screen and you should see it installing',
		"When it's done installing simply open it, login and enjoy your music!"
	],
	'Allow iPhone to install unofficial apps': [
		'Click this <a href="https://github.com/esigncert/khoindvn/releases/download/DNS/signed_khoindvn.mobileconfig">link</a> then open downloaded file',
		'Go to Settings => Profiles Downloaded (VPN & Device Management) and install the "khoindvn" profile',
		'Download zip file <a href="https://github.com/esigncert/khoindvn/raw/refs/heads/main/document/DNS/Certs-Khoindvn.zip">here</a> then go to where it saved in files (usually "Downloads") and tap it to create a folder version',
		'Next open this site: <a href="https://khoindvn.io.vn/" target="_blank">https://khoindvn.io.vn/</a> it does have ads which can be annoying so an ad blocker could be useful but is not required',
		'Go down to the "KSign" section what you want to do is tap the first one which will likely open a new page if it asks to install an app say yes otherwise go back to the first tab and tap the same one again and it will probably ask you this time',
		'Once you tell it to install go to home screen and a new icon should appear on your home screen which should start to try to install',
		'If it installs and when you click on it it says something like "Untrusted Enterprise Developer" you are good to go if it has the cloud icon and says something like it is unable to verify the integrity of the app then you must go back to https://khoindvn.io.vn/ and try the next one',
		'If you go through every KSign link on their site and none of them work contact me and I will try to help you',
		'Otherwise, the next thing to do is go back to VPN & Device Management section in settings and tap on the new profile under "Enterprise Apps" then press "Trust" it will then prompt you to restart your phone',
		'When it is starting up it will ask you about installing the new profile. Confirm and enter your password',
		'You should now be able to open the Ksign app. Go to settings section and under Features hit Certificates',
		'Press the + button in the top right and then "Import Ksign file"',
		'Go to your downloads and then the folder we downloaded earlier. Go to the KsignCert folder inside of that one and then find the file that has the same name as the Enterprise App profile in your settings and select it',
		'It should now show as a valid certificate and you are officially done!'
	]
};

const androidSteps: Record<string, string[]> = {
	'Free Spotify Premium': [
		'Go to Settings > Apps > Special app access > Install unknown apps and and enable it for your web browser and your files app',
		'Download app <a href="https://drive.usercontent.google.com/download?id=1s_hYvhRYPDL2I-YjVwrFyW3v5dSRgUGK&export=download&authuser=0" target="_blank">here</a> it will most likely give you a warning about the file size just press download anyway',
		'Once the download completes simple open the download and press install',
		'Now just open the newly install Spotify, login and Enjoy!',
		"P.S. If your Spotify account is setup through your Google account just use the continue with email option and use your Google account email. If you don't know your password use the Login without password option"
	]
};

const fireTVSteps: Record<string, string[]> = {
	'Free Spotify Premium': [
		'Open Downloader on Fire TV.',
		'Navigate to the SpotX GitHub page.',
		'Download and install the latest modded version of Spotify.',
		'Open Spotify and log in.'
	]
};

export async function getGuides() {
	return rawGuides.map((title) => ({
		title,
		slug: slugify(title),
		platforms: platformsList[title] ?? [false, false, false, false],
		description: descriptions[title] ?? 'Missing Description',
		windowsSteps: windowsSteps[title] ?? ['Missing Steps'],
		appleSteps: appleSteps[title] ?? ['Missing Steps'],
		androidSteps: androidSteps[title] ?? ['Missing Steps'],
		fireTVSteps: fireTVSteps[title] ?? ['Missing Steps']
	}));
}
