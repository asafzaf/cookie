#!/bin/bash

# Check if the platform is Android
if [[ "$EAS_BUILD_PLATFORM" == "android" ]]; then
  echo "Creating google-services.json for Android build..."
  
  # Ensure the environment variable is set
  if [[ -z "$GOOGLE_SERVICES" ]]; then
    echo "Error: GOOGLE_SERVICES environment variable is not set!"
    exit 1
  fi
  
  # Write the content to the required file
  echo "$GOOGLE_SERVICES" > ./android/app/google-services.json
  echo "google-services.json created successfully."

# Check if the platform is iOS
elif [[ "$EAS_BUILD_PLATFORM" == "ios" ]]; then
  echo "Creating GoogleService-Info.plist for iOS build..."
  
  # Ensure the environment variable is set
  if [[ -z "$GOOGLE_SERVICE_INFO" ]]; then
    echo "Error: GOOGLE_SERVICE_INFO environment variable is not set!"
    exit 1
  fi
  
  # Write the content to the required file
  echo "$GOOGLE_SERVICE_INFO" > ./GoogleService-Info.plist
  echo "GoogleService-Info.plist created successfully."
else
  echo "Error: Unknown platform '$EAS_BUILD_PLATFORM'."
  exit 1
fi
