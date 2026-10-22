# Netflix-Inspired Birthday Website Template

A customizable birthday-surprise website inspired by Netflix's browsing experience. Add your own photos, video, profile names, and birthday message to create a personalized gift.

> This is an independent fan-made template. It is not affiliated with, endorsed by, or sponsored by Netflix. Netflix names, logos, and related marks belong to their respective owners.

## Features

- Netflix-inspired dark interface and navigation
- Hero section with a background video, title, description, and action buttons
- Horizontal photo carousels with manual navigation
- Hover preview cards for gallery items
- Two customizable profiles and a demo PIN flow
- “More Info” modal for a birthday letter, image, or other message
- Responsive layout for desktop and mobile screens
- Plain HTML, CSS, and JavaScript; no build step required

## Project Structure

```text
.
├── index.html          # Main page, hero, carousels, preview cards, and modal
├── loginPage.html      # Sign-in screen
├── profiles.html       # Profile selection screen
├── pin.html            # PIN screen
├── landing.css         # Main-page, carousel, preview, and modal styles
├── responsive.css      # Responsive styles
├── style.css           # Shared and sign-in styles
├── profiles.css        # Profile selection styles
├── pin.css             # PIN screen styles
├── script.js           # Login and main-page interactions
├── profiles.js         # Profile selection interactions
├── pin.js              # PIN interactions
├── images/             # Add your images and artwork here
├── video/              # Add your video files here
├── tadum.mp3           # Optional sound effect
```

The repository intentionally does not include personal photos, videos, or message artwork. Add your own assets before deploying. Keep each filename and letter case consistent with the paths used in the HTML.

## Run Locally

Because this is a static website, you can open `loginPage.html` in a browser. For a more reliable test, serve the project directory with a local web server. If Python is installed:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/loginPage.html` in your browser.

## Customize the Template

### 1. Replace the placeholders

Search the HTML, JavaScript, and this README for these tokens and replace them with your own details:

- `[RECIPIENT_NAME]` — the person receiving the birthday message
- `[SENDER_NAME]` — the person sending the message
- `[CREATOR_NAME]` — your credit in the footer
- `[YEAR]` — the year to show in the footer
- `[MESSAGE_TITLE]` — the title of your message
- `[GALLERY_TITLE_1]` and `[GALLERY_TITLE_2]` — your gallery section titles
- `[CUSTOM_TAGLINE]` — short metadata for hover preview cards
- `[WRITE YOUR BIRTHDAY MESSAGE HERE. Add your wishes, a favorite memory, or a personal note.]` — your birthday letter
- `[ADD YOUR CLOSING MESSAGE HERE]` — a short sign-off

You can also edit the hero description, gallery metadata, and accessible image `alt` text directly in `index.html`.

### 2. Add your images

Add the following custom assets to `images/` (or change the source paths in `index.html` and `profiles.html`):

- `logo.png` — logo image used by the navbar and profile page
- `recipient-profile.png` — profile avatar for the recipient
- `sender-profile.png` — profile avatar for the sender
- `hero-title.png` — optional artwork/title graphic for the hero
- `featured-cover.jpg` — hero video poster and the More Info modal cover
- `message-artwork.png` — optional artwork at the end of the birthday letter
- `1.jpg`, `2.jpg`, and so on — gallery thumbnails referenced by `index.html`

The gallery thumbnails use a portrait 3:4 display ratio and `object-fit: cover`. You do not need to crop or resize your original files to use this display style.

### 3. Add your video

Place your background and playback video at `video/video.mp4`, or update the video source paths in `index.html`. Use media that you own or have permission to share. Large videos may slow down loading; consider optimizing them before publishing.

### 4. Configure demo sign-in

The sign-in and PIN screens are a front-end demonstration, not secure authentication. In `script.js`, the sample demo credentials are:

| Demo account | Email | Password |
|---|---|---|
| Recipient profile | `recipient@example.com` | `demo1234` |
| Sender profile | `sender@example.com` | `demo5678` |

Replace these sample values in the `USERS` array in `script.js` before sharing your customized version. In `pin.js`, change `DEMO_PIN` from `1234` to the PIN you want to use.

**Security note:** values stored in JavaScript or `localStorage` can be inspected or changed by visitors. Do not use real passwords, secrets, or sensitive personal information. This demo flow is not appropriate for protecting confidential content.

### 5. Customize the galleries

In `index.html`, edit `[GALLERY_TITLE_1]` and `[GALLERY_TITLE_2]`, then replace the image paths and `alt` text in each gallery card. You may duplicate an existing carousel section to add another one; give each section and carousel a unique HTML `id`, keep the required CSS classes, and test its arrow controls and hover previews.

### 6. Customize the design

- `landing.css`: hero, gallery, carousel, hover preview, modal, and footer
- `responsive.css`: layout on smaller screens
- `style.css`: shared and sign-in styles
- `profiles.css`: profile selection page
- `pin.css`: PIN screen

Make small, targeted changes and test the affected pages before publishing.

## Credits and Usage

This project recreates interaction and layout ideas for learning and personal customization. It does not include Netflix's proprietary service or catalog. Use your own images, videos, text, and other assets, and check the applicable rights before distributing or using the project commercially.
