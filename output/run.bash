##Build APKS
java -jar bundletool.jar build-apks \
  --bundle=notes.aab \
  --output=notizenapp.apks \
  --ks=@niko1512__notes-app.jks \
  --ks-key-alias=11337d2e437c4c1da34213126878a5a4 \
  --ks-pass=pass:c9fbf5d16bffc0a231eb5391ff946062 \
  --key-pass=pass:4801db00bff999da9ba36dd53f8a1d72
  

### Install APKs
java -jar bundletool.jar install-apks --apks=notizenapp.apks