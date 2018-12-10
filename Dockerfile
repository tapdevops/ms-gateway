FROM ruby:2.3.2-alpine

# Kita perlu menginstall packet / library yang akan 
# dibutuhkan oleh aplikasi kita.
RUN apk --update add --virtual build-dependencies \
                               build-base \
                               libxml2-dev \
                               libxslt-dev \
                               zlib-dev \
                               mysql-dev \
                               nodejs \
                               tzdata \
                               && rm -rf /var/cache/apk/*

# perintah ini akan membuat sebuah folder bernama app
# pada image baru kita
RUN mkdir -p /usr/src/app

# perintah ini akam merubah folder kerja kita menjadi
# /usr/src/app
WORKDIR /usr/src/app



# perintah ini akan menjalankan bundle install pada image
RUN gem install bundler && bundle install --jobs 20

# Perintah ini akan menjalankan proses copy folder source 
# code aplikasi noteapp kita ke dalam image.
COPY . ./
