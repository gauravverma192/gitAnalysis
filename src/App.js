import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './card.js'
import Actions from './actions.js'
import Chart from './barChart.js'
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: "",
      sortValue: "sort",
      toSearch: "",
      searchText: "",
      pageNumber: 1,
      cardComponent: [],
      noContent: true,
      barChartData: [],
      languageData: []
    };
  }

  searchKeywordChange() {
    this.setState({ searchKeyword: this.refs.searchKeyword.value });
  }

  setSearch() {
    this.setState({ toSearch: this.refs.searchKeyword.value }, function () {
      this.setState({ pageNumber: 1 }, function () {
        this.setState({ isAppend : false }, function() {
          this.searchRepo();
        });
      });
    });
  }

  addCards(data) {
    var createdComponent = [];
    if (this.state.isAppend) {
      createdComponent = this.state.cardComponent;
    }
    
    for (var i = 0; i < data.length; i++) {
      var element = <Card name={data[i].name} description={data[i].description} language={data[i].language} stars={data[i].stars} avatar={data[i].avatar} />;
      createdComponent.push(element);
    }
      this.setState({ cardComponent: createdComponent });
    
  }

  buildBarChart(chartLanguage) {
    console.log("chartLang : ",chartLanguage);
    var tempLanguageData = [];
     if (this.state.isAppend) {
    tempLanguageData = this.state.languageData;
    for(var language in tempLanguageData) {
      if(chartLanguage[language]) {
        chartLanguage[language] += tempLanguageData[language];
      }
      else {
        chartLanguage[language] = 1;
      }
    }
     }
    console.log("mainnn chartlang : ",chartLanguage);
    console.log("mainnn langdata : ",this.state.languageData);
    this.setState({ languageData : chartLanguage});
    var tempChartLanguage = [];
    for(var keys in chartLanguage) {
      var temp = {};
      temp[keys] = chartLanguage[keys];
     tempChartLanguage.push(temp);
    }
    console.log("tempChartLang : ",tempChartLanguage);
    var createdChartData = [];
    console.log("createdchartdata : ",createdChartData);
    createdChartData.push(tempChartLanguage);
    createdChartData=createdChartData[0];
    var sortedChartData = Actions.sortArrayWithSecondValue(createdChartData);
    console.log("sorteddata : ",sortedChartData);
    var limit = Math.min(sortedChartData.length,6);
    var displayData = [];
    for(var i=1;i<limit;i++) {
        displayData.push(sortedChartData[i]);
    }
       console.log(displayData);

    this.setState({barChartData : displayData});
    
  }
  successCB(response) {
    //console.log(response);
    if (!response.data.items.length) {
      this.setState({ noContent: true });
      if (!this.state.isAppend) {
        this.setState({ cardComponent: [] });
        var text = "Sorry! Nothing found related to \"" + this.state.toSearch + "\"";
        this.setState({ searchText: text });
      }
      return;
    }
    this.setState({ noContent: false });
    var text = "Search results for \"" + this.state.toSearch + "\"";
    this.setState({ searchText: text });
    var items = response.data.items;
    var data = [];
    var chartLanguage = {};
    for (var i = 0; i < items.length; i++) {
      var tempData = {};
      tempData.name = items[i].name;
      tempData.description = items[i].description;
      tempData.language = (items[i].language || 'N/A');
      tempData.stars = items[i].stargazers_count;
      tempData.avatar = items[i].owner.avatar_url;
      data.push(tempData);
      //For Bar Chart
      if(chartLanguage[tempData.language]) {
        chartLanguage[tempData.language]++;
      }
      else {
        chartLanguage[tempData.language] = 1;
      }
    }


    console.log(chartLanguage);
    this.buildBarChart(chartLanguage);
    this.addCards(data);
  }
  searchRepo() {
    this.setState({ searchText: "Searching..." });
    var sent = this.state.toSearch.trim();
    var words = sent.split(" ");
    var searchUrl = "https://api.github.com/search/repositories?q=";
    for (var i = 0; i < words.length; i++) {
      if(i!=0) {
        searchUrl += "+";
      }
      searchUrl += words[i];
    }
    if (this.state.sortValue != "sort") {
      searchUrl += ("&sort=" + this.state.sortValue + "&order=desc");
    }
    searchUrl += '&page=' + this.state.pageNumber + '&per_page=10';
    Actions.ajaxCall(searchUrl, this.successCB.bind(this));
  }

  sortValueChange() {
    this.setState({ sortValue: this.refs.sortValue.value }, function () {
      this.setState({ pageNumber: 1 }, function () {
        this.setState({ isAppend : false }, function() {
          this.searchRepo();
        });
      });
    });
  }
  

  componentWillMount() {
    document.body.onscroll = function () {
      if (this.state.noContent) {
        return;
      }
      if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        var nextPageNumber = this.state.pageNumber + 1;
        this.setState({ pageNumber: nextPageNumber }, function () {
          this.setState({ isAppend : true}, function() {
            this.searchRepo();
          });
        });
      }
    }.bind(this);
  }
  render() {
    return (
      <div class="app-wrapper">
        <div class="app">
          <div class="header">
            <div class="search-bar">
              <input type="text" ref="searchKeyword" value={this.state.searchKeyword} onChange={this.searchKeywordChange.bind(this)} placeholder="Search" class="search-input" />
              <div class="search-icon-wrapper" onClick={this.setSearch.bind(this)} >
                <img class="search-icon" src="http://www.freeiconspng.com/uploads/search-icon-png-21.png" />
              </div>
            </div>
            <div class="heading">
              Github Repos Insight
              </div>
            <div class="sort-bar">
              <select ref="sortValue" class="sort-input" value={this.state.sortValue}
                onChange={this.sortValueChange.bind(this)} >
                <option value="sort" disabled selected>Sort</option>
                <option value="stars">Stars</option>
                <option value="watchers">Watchers</option>
                <option value="count">Count</option>
                <option value="score">Score</option>
                <option value="name">Name</option>
                <option value="created">Created At</option>
                <option value="updated">Updated At</option>
              </select>
            </div>
          </div>
          <div class="content">
            <div class="search-status">
              {this.state.searchText}
            </div>
            <div class="content-body">
              <div id="barchart" className={"content-body-bar-chart display-"+ (this.state.noContent? "none" : "block")}>
                    <Chart chartData = {this.state.barChartData} />
                </div>
              <div class="content-body-cards">
                {this.state.cardComponent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
