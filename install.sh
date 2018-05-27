#!/bin/bash
cp docker-extras-settings/.htaccess wordpress/.htaccess

#Custom WP constants for JWT auth
sed -i '' '/That'\''s all, stop editing! Happy blogging./i \
define('\''JWT_AUTH_SECRET_KEY'\'', '\''wpreactjwtkey'\'');
' wordpress/wp-config.php
sed -i '' '/That'\''s all, stop editing! Happy blogging./i \
define('\''JWT_AUTH_CORS_ENABLE'\'', true);
' wordpress/wp-config.php