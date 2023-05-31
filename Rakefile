require 'aws_s3_website_sync'
require 'dotenv'

task :sync do
  puts ">> sync <<"
  puts "BUILD_DIR: #{SYNC_BUILD_DIR}"
  puts "OUTPUT_CHANGESET_PATH: #{SYNC_OUTPUT_CHANGESET_PATH}"

  AwsS3WebsiteSync::Runner.run(
    aws_access_key_id:     ENV["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
    aws_default_region:    ENV["AWS_REGION"],
    s3_bucket:             ENV["SYNC_S3_BUCKET"],
    distribution_id:       ENV["SYNC_CLOUDFRONT_DISTRUBTION_ID"],
    build_dir:             ENV["SYNC_BUILD_DIR"],
    output_changset_path:  ENV["SYNC_OUTPUT_CHANGESET_PATH"],
    auto_approve:          ENV["SYNC_AUTO_APPROVE"],
    silent: "ignore,no_change",
    ignore_files: [
      'stylesheets/index',
      'android-chrome-192x192.png',
      'android-chrome-256x256.png',
      'apple-touch-icon-precomposed.png',
      'apple-touch-icon.png',
      'site.webmanifest',
      'error.html',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'favicon.ico',
      'robots.txt',
      'safari-pinned-tab.svg'
    ]
  )
end