# Lonca Task

## Usage

You can run the backend project with the commands below:

```bash
npm install
npm start
```

You can change the dev.env file with your machine's configuration 

## Notes

- To populate the db with given json files, I have used mongodb-compass gui tool. (There is also another tool called mongoimport that can be used in the command line)
- In the getProductSalesReport function, it would be more optimal if I could fill product names in the db layer, instead I have mapped product names in the application layer for now.

## Tech stack

- Nodejs
- Express
- Mongodb (also using mongoose)
