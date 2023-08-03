Docker Steps and Commands to be used to Build and Run the container- 

1. Configure your Dockerfile
2. Now build the image of your application using command - sudo docker build -t test:test-image ./
3. Once the image is created, you can get the images list using command - sudo docker images ls
4. Now you'll get the list of all the images along with their image ids.
5. Using the above image Id, run your application using the command - sudo docker run --network=host -p 3000:3000 <<ImageId>>
6. Your application will be running on the exposed port. You can verify that on your browser.