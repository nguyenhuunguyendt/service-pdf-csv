FROM node:14.20.0
RUN apt-get -y update && apt-get -y upgrade && apt-get install -y --no-install-recommends ffmpeg
RUN mkdir -p /ekyc-be
WORKDIR /ekyc-be
COPY . .
RUN yarn install
#EXPOSE 6969
CMD ["yarn", "start"]