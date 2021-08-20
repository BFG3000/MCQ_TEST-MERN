const { json } = require("express");

class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
    //console.log({ ...keyword });
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    
    const queryCopy = { ...this.queryStr };
    //Removing fields rom the query
    
    const removeFields = ['keyword', 'limit', 'page']
    removeFields.forEach(element => {
        delete queryCopy[element]
    });
    //filter for price - ratings etc

    let queryStr = JSON.stringify(queryCopy)
    queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match=>`$${match}`)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }
  pagination(itemNum){
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = itemNum * (currentPage -1);
      this.query = this.query.limit(itemNum).skip(skip)
      return this
  }
}
module.exports = APIFeatures;