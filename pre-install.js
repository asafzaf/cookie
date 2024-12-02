const fs = require('fs');

// Check platform and create appropriate configuration files
if (process.env.EAS_BUILD_PLATFORM === 'android') {
  console.log('Creating google-services.json for Android build...');

  if (!process.env.GOOGLE_SERVICES) {
    console.error('Error: GOOGLE_SERVICES environment variable is not set!');
    process.exit(1);
  }

  fs.writeFileSync('./android/app/google-services.json', process.env.GOOGLE_SERVICES, { encoding: 'utf8' });
  console.log('google-services.json created successfully.');
} else if (process.env.EAS_BUILD_PLATFORM === 'ios') {
  console.log('Creating GoogleService-Info.plist for iOS build...');

  if (!process.env.GOOGLE_SERVICE_INFO) {
    console.error('Error: GOOGLE_SERVICE_INFO environment variable is not set!');
    process.exit(1);
  }

  try {
    fs.writeFileSync('./GoogleService-Info.plist', process.env.GOOGLE_SERVICE_INFO, { encoding: 'utf8' });
    console.log('GoogleService-Info.plist created successfully.');
  } catch (err) {
    console.error('Error writing GoogleService-Info.plist:', err);
    process.exit(1);
  }
} else {
  console.error(`Error: Unknown platform '${process.env.EAS_BUILD_PLATFORM}'.`);
  process.exit(1);
}
