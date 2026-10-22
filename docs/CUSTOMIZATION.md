# Customization Guide

This project is a static HTML/CSS/JavaScript template. No framework or build step is required.

## 1. Edit the central settings file

Open `customization.js` and update `window.BIRTHDAY_SITE_CONFIG`:

- `recipientName`, `senderName`, and `creatorName`
- `messageTitle`, `birthdayMessage`, and `closingMessage`
- `galleryTitles` (exactly three strings)
- `heroDescription` and `customTagline`
- `demoAccounts` and `demoPin`

Most visible text placeholders in the HTML are replaced by this configuration when each page loads. Keep `profileKey` values as `recipient` and `sender` unless you are also updating the profile-selection logic.

## 2. Replace the media files

The template includes generic placeholder media so it renders before you add personal files. Overwrite these files with media you own or have permission to use:

- `images/logo.png`
- `images/recipient-profile.png`
- `images/sender-profile.png`
- `images/hero-title.png`
- `images/featured-cover.jpg`
- `images/message-artwork.png`
- `images/1.jpg` through `images/63.jpg`
- `video/video.mp4`

Gallery rows are mapped by file number:

- Gallery 1: `1.jpg`–`21.jpg`
- Gallery 2: `22.jpg`–`42.jpg`
- Gallery 3: `43.jpg`–`63.jpg`

All gallery source files can use their original dimensions. The UI displays cards at a portrait 3:4 ratio using `object-fit: cover`; some edges may be cropped in the browser without changing the original file.

If you need more or fewer than 21 cards in a row, edit that gallery's card markup in `index.html` and check the carousel controls afterwards. Keep every carousel `id` unique.

## 3. Replace the featured video

Overwrite `video/video.mp4`. The same file is used for the background preview and the Play modal, so use an encoded MP4 supported by modern browsers. For privacy, remember that files published in a public repository can be downloaded by anyone.

The generic `audio/celebration-chime.mp3` is an original generated placeholder. Replace it only if you have permission to share the sound; update its source path in `loginPage.html` and `pin.html` if you change the filename.

## 4. Demo sign-in

Update the `demoAccounts` list and `demoPin` value in `customization.js`. These values are visible in the browser source and are not suitable for protecting sensitive material. Do not use any password that you use on another service.

## 5. Update links and branding

The sign-in footer contains a generic support-line placeholder. Update it in `loginPage.html` before sharing. The main footer currently contains example links that mirror the layout of a streaming service. Replace them with your own social links, contact information, and legal pages—or remove links that do not apply. The wordmark and assets are placeholders. The project is an independent fan-made template and is not affiliated with Netflix.

## 6. Test locally

From the repository root:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/loginPage.html` and test login, profile choice, PIN entry, the hero video, all carousel arrows, hover previews, and the More Info modal.
