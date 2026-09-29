# Auto Wrap Coverage Mobile App — Phase 1

A native Expo / React Native starter for iOS and Android based on the current AutoWrapCoverage.com branding and public website content.

## Included in Phase 1

- Native Home dashboard
- Coverage Plans screen
- Free Quote form (opens a pre-filled email to `info@autowrapcoverage.com`)
- FAQ accordion
- Contact screen with one-tap phone, email, and Maps actions
- About Auto Wrap
- Claims & Repairs support entry point
- Customer Portal placeholder for Phase 2 backend integration
- Bottom navigation
- iOS/Android app configuration
- EAS build configuration for future App Store / Google Play builds

## Official contact details used

- Phone: 808-437-8498
- Email: info@autowrapcoverage.com
- Address: 1111 B. South Governors Ave, Dover, DE 19904
- Website: https://www.autowrapcoverage.com/

## Run locally

This project targets Expo SDK 57.

1. Install Node.js 22.13+.
2. In this folder, run:

   `npm install`

3. Sign into Expo if needed:

   `npx expo login`

4. Start the development server:

   `npm start`

5. Open with Expo Go or an iOS/Android simulator.

## Phase 2 recommended next

- Secure customer authentication
- Customer/vehicle/contract data source
- Policy document access
- Claim submission and claim status
- Payment information / payment-provider connection
- Push notifications
- In-app support message submission

## Before App Store submission

The current app is a Phase 1 working prototype. Before public store submission:

- Replace the screenshot-extracted logo asset with the original high-resolution Auto Wrap logo.
- Connect the Customer Portal to a secure backend.
- Replace FAQ fallback text with the exact approved answers from the website/contracts.
- Confirm Terms of Service and Privacy Policy URLs.
- Complete Apple privacy disclosures and Google Play Data Safety disclosures.
- Test on physical iPhone and Android devices.

The iOS bundle identifier and Android package are currently set to `com.autowrapcoverage.app` and can be changed before first production build if needed.
