<h1 align="center">
  URL-Minimization
</h1>

<h4 align="center">What is URL-Minimization</h4>
<div align="center">
  <sub>Suppose you have an e-commerce application with different types of products under different categories. <br><br>
       Forex: www.myshoppingsite/category/shoe/product/nike132032<br><br>
       If a customer wants to share the product using the above link, this could be really annoying due to the excessive character length of the URL. <br><br>
       Below are listed some of the problems due to this: <br><br>
       1. Can’t remember the URL easily <br><br>
       2. Can’t use the links where there are restrictions on text length Ex. Twitter. <br><br>
       The best solution to overcome this issue is by shortening these URLs <br><br>
       Forex: www.myshoppingsite/category/shoe/product/nike132032 to www.myshoppingsite/SdfsS 
       </sub>
</div>

<br>
Building a custom URL shortening service like bitly.com using ExpressJs and Mongodb

## Technologies

- ### Back end

  - [Express](https://expressjs.com/)- Nodejs framwork for building the REST Apis
  - [Mongodb](http://mongodb.com/)- Document oriented NoSQL database
  - [Mongoose](https://http://mongoosejs.com)- MongoDB object modeling tool
  - [Short-id](https://github.com/dylang/shortid)- Short id generator
  - [Valid-url](https://github.com/ogt/valid-url)- URI validation functions

- ### Front end

  - [Pug](https://pugjs.org/api/getting-started.html)- Pug is a high performance template engine heavily influenced by Haml and implemented with JavaScript for Node.js and browsers.


## ☑ TODO

- [ ] Users can register and sign in to web-application
- [ ] Validation and logic data entry to database
- [ ] Output working short link
- [ ] Change short code algorithm and check duplicate short codes

## License

MIT
