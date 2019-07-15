#!/usr/bin/env sh

# Mapbox configuration file location
mbconfig=src/components/MapBox.vue

# bucket locations
prodbucket=wbeep-prod-website.s3-website-us-west-2.amazonaws.com
testbucket=wbeep-test-website.s3-website-us-west-2.amazonaws.com
qabucket=wbeep-qa-website.s3-website-us-west-2.amazonaws.com
betabucket=wbeep-beta-website.s3-website-us-west-2.amazonaws.com

# common prefix/suffix for Mapbox tile URL configuration
hruprefix='"tiles": ["http://'
hrusuffix='/tiles/{z}/{x}/{y}.pbf"],'

# Set up the Mapbox tile URL (use beta if no target given)
case $E_BUILDTARGET in
  "prod") hrusource="$hruprefix$prodbucket$hrusuffix";;
  "test") hrusource="$hruprefix$testbucket$hrusuffix";;
  "qa") hrusource="$hruprefix$qabucket$hrusuffix";;
  *) hrusource="$hruprefix$betabucket$hrusuffix";;
esac

# Insert Mapbox tile URL into Mapbox configuration file
sed -i "/HRU SOURCE INSERT/a $hrusource" "$mbconfig"