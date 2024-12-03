const fs = require('fs');
const path = require('path');

// Check platform and create appropriate configuration files
if (process.env.EAS_BUILD_PLATFORM === 'android') {
  console.log('Creating google-services.json for Android build...');

  if (!process.env.GOOGLE_SERVICES) {
    console.error('Error: GOOGLE_SERVICES environment variable is not set!');
    process.exit(1);
  }

  const androidDir = './android/app';
  const googleServicesPath = path.join(androidDir, 'google-services.json');

  try {
    if (!fs.existsSync(androidDir)) {
      fs.mkdirSync(androidDir, { recursive: true });
    }

    fs.writeFileSync(googleServicesPath, process.env.GOOGLE_SERVICES, { encoding: 'utf8' });
    console.log('google-services.json created successfully.');
  } catch (err) {
    console.error('Error writing google-services.json:', err);
    process.exit(1);
  }
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
