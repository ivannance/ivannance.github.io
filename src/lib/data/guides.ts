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
		"Set up iPhone to install apps not from the App Store and modified apps<br /><span class='text-orange-400'>Note: a computer is needed for the guide but after initial setup you won't need it</span>"
};

const windowsSteps: Record<string, string[]> = {
	'Free Spotify Premium': [
		'Uninstall Spotify if you already have it.',
		'Go to the <a href="https://github.com/SpotX-Official/SpotX" target="_blank">SpotX GitHub Page</a>.',
		'Scroll down until you see "Full installation" and click on the dropdown.',
		'Then click on "Install_Auto.bat" and it should download.',
		'Once downloaded, run the file and say allow/yes to any prompts.',
		'After that, just let it run and it should do it all for you. Once it’s done, you should have Spotify installed.',
		'Finally, open it up, log in, and enjoy!'
	]
};

const appleSteps: Record<string, string[]> = {
	'Free Spotify Premium': [
		'Follow my guide on how to <a href="/guides/allow-iphone-to-install-unofficial-apps" data-sveltekit-reload>Allow iPhone to install unofficial apps</a> if you haven&#39;t yet',
		'Download the .ipa file for modded Spotify <a href="https://files.catbox.moe/wetkae.ipa">here</a>',
		'Open up LiveContainer and the tap the + symbol in the top left corner',
		'Tap "Install IPA File" and then selected the .ipa file you just downloaded',
		'After a moment it should install press "Run" to open it',
		"You're done! Just login like normal and enjoy your music!",
		'If you would like to add the app to your home screen you can do so by long tapping the Spotify icon in LiveContainer then pressing "Add to Home Screen" then "Create App Clip" then "Allow" finally open settings then "Profile Downloaded" and press "Install" enter your passcode press "Next" then "Install" again DONE!'
	],
	'Allow iPhone to install unofficial apps': [
		'Before we start there are some things you will need to download/install',
		'On computer download and install the follow applications for your platform',
		'Windows: <a href="https://www.apple.com/itunes/download/win64">iTunes</a>, <a href="https://updates.cdn-apple.com/2020/windows/001-39935-20200911-1A70AA56-F448-11EA-8CC0-99D41950005E/iCloudSetup.exe">iCloud</a>, <a href="https://faq.altstore.io/altstore-classic/how-to-install-altstore-windows" target="_blank">AltServer</a> and <a href="https://github.com/jkcoxson/idevice_pair/releases/latest" target="_blank">idevice-pair</a>',
		'Mac: <a href="https://faq.altstore.io/altstore-classic/how-to-install-altstore-macos" target="_blank">AltServer</a> and <a href="https://github.com/jkcoxson/idevice_pair/releases/latest" target="_blank">idevice-pair</a>',
		'Install "StosVPN" (from the App Store) on your iPhone',
		'Download <a href="https://github.com/LiveContainer/LiveContainer/releases/latest/download/LiveContainer+SideStore.ipa">LiveContainer+SideStore.ipa</a> on your computer',
		'Make sure you have AltServer installed and set up and then plug your phone into your computer',
		'Once you run it there should be an icon for it on the taskbar on the bottom right on Windows or on the menu bar if on Mac',
		'Hold shift on Windows or option on Mac and click the icon and then click the "Sideload .ipa option" it will only appear if you are holding the shift/option key',
		'Select the downloaded "LiveContainer+SideStore.ipa" to start sideloading it',
		'If prompted, enter your Apple Account email, password, and 2FA code. If you’re concerned about this, use a burner account, you will be fine using your main account though. After this, you will see a notification that reads “Installing LiveContainer to [your device].”',
		'Once you see another notification telling you that LiveContainer installed successfully, you can move onto setting up the app. Good job so far!',
		'Before we can open LiveContainer we need to both allow the app and enable developer mode on our phone, otherwise the app won’t open',
		'Open the settings app of your device, then go to General > VPN & Device Management',
		'You should see the email of the Apple Account you use listed, tap on it, then allow app',
		'Back out to the main settings menu, then scroll to Privacy and Security',
		'Scroll to the very bottom, you will see Developer Mode as one of the last few options, turn it on then follow the directions given by your phone',
		'After your device restarts, you can now open LiveContainer! There are still a few more steps before we are finished though',
		"Before setting up SideStore, open StosVPN. Add the VPN, enable it, then make sure you're connected to Wi-Fi",
		'Open LiveContainer and you will see an icon in the top left corner, it’s the SideStore logo! Tap on it to open SideStore (if the app just closes, open it again, it should take you to SideStore)',
		'You will be greeted by probably a lot of popups, press allow to all of them and then when you see a screen asking for a pairing file, close the app. We will now load our pairing file into SideStore',
		'Plug your device into your computer and open idevice-pair, select your device from the dropdown. Make sure it is unlocked, and trust your computer if needed',
		'Press "Generate" to create your pairing file. You may be asked to trust your computer again, if you are, do it, then press "generate" again',
		'You should see your pairing file on the right and some options on the left, scroll until you see LiveContainer and press the "Install" button under it. This will sync your paring file with SideStore within LiveContainer',
		'Once your paring file is synced, open LiveContainer, then SideStore, and navigate to the "My Apps" tab. Tap on where it says "7 DAYS" next to LiveContainer to refresh the app',
		'You will likely get a purple pop up screen, press "Refresh Now" and then authenticate with the same Apple Account you used to install LiveContainer. When you see a popup titled "App Contains Extensions", press "Keep App Extensions (Use Main Profile)',
		'Now to complete setup, close SideStore and go to the main LiveContainer app. Go to settings and then tap "Import certificate from SideStore". After that tap "JIT-Less Mode Diagnose" and then "Test JIT-Less Mode". If you see "Success" then you are all done!',
		'Now you are ready to install unoffical apps just remember that every 7 days you have to refresh the apps by connecting to StosVPN then opening SideStore, going to "My Apps" and pressing "Refresh All" then after a moment all the apps should go back to "7 DAYS" and SideStore will send you a notfication reminding you that your apps have less than 24 hours left if you forget'
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

export const guides = rawGuides.map((title, i) => ({
	title,
	slug: slugify(title),
	platforms: platformsList[title] ?? [false, false, false, false],
	description: descriptions[title] ?? 'Missing Description',
	windowsSteps: windowsSteps[title] ?? ['Missing Steps'],
	appleSteps: appleSteps[title] ?? ['Missing Steps'],
	androidSteps: androidSteps[title] ?? ['Missing Steps'],
	fireTVSteps: fireTVSteps[title] ?? ['Missing Steps']
}));
