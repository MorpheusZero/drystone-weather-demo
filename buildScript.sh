## Custom build process for the DrystoneWeatherDemo application.

#####
# Copy any static files to necessary locations
#####
# Copy the index.html file to the dist/static directory
cp ./src/client/index.html ./dist/static/index.html
# Copy the favicon to the dist/static directory
cp ./src/client/favicon.ico ./dist/static/favicon.ico

#####
# Set the config environment--Only if "prod" is passed in.
#####
if [ "$1" = "prod" ]
then
echo "PROD ENVIRONMENT DETECTED! - Swapping Environment Variables for Build"
node ./src/scripts/write-config.js
fi