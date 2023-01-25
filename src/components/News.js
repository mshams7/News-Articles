import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "science",
  };
  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    };
  }
  async newsUpdate() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af7ca1ea65d54f4cb61335d1d26bef7e&page=${this.props.page}&pageSize=${this.state.page}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    document.title = this.props.category + " News-Monkey";
  }

  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.newsUpdate();
  };
  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.newsUpdate();
  };

  async componentDidMount() {
    this.newsUpdate();
  }

  render() {
    return (
      <div className="container my-2">
        <h1 className="text-center ">
          News Monkey-Top Headlines of {this.props.category}
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <div className="row my-3 ">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={
                    element.urlToImage
                      ? element.urlToImage
                      : "https://c.ndtvimg.com/2023-01/f5p8e598_dy-chandrachud_625x300_21_January_23.jpg"
                  }
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
           <InfiniteScroll/>
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              onClick={this.handlePreviousClick}
              className="btn btn-dark "
            >
              &larr; Previous
            </button>
            <button
              type="button"
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
